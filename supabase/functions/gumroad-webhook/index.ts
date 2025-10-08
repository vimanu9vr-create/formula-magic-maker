import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    console.log('Gumroad webhook received');
    
    // SECURITY: Verify webhook secret (URL, header, or form field)
    const url = new URL(req.url);
    const expectedSecret = (Deno.env.get('GUMROAD_WEBHOOK_SECRET') ?? '').trim();

    // Parse form data once (Gumroad sends multipart/form-data)
    const formData = await req.formData();
    const body: { [key: string]: string } = {};
    for (const [key, value] of formData.entries()) {
      body[key] = value.toString();
    }

    const providedSecretRaw =
      url.searchParams.get('secret') ||
      req.headers.get('x-webhook-secret') ||
      body['secret'] ||
      body['webhook_secret'] ||
      body['token'] ||
      '';
    const providedSecret = providedSecretRaw.trim();

    // Minimal auth diagnostics (no secret leakage)
    console.log('Webhook auth debug', {
      hasExpected: Boolean(expectedSecret),
      urlHasSecret: Boolean(url.searchParams.get('secret')),
      headerHasSecret: Boolean(req.headers.get('x-webhook-secret')),
      formHasSecret: Boolean(body['secret'] || body['webhook_secret'] || body['token']),
      expectedLen: expectedSecret.length,
      providedLen: providedSecret.length,
      expectedFp: expectedSecret ? `${expectedSecret.slice(0,3)}...${expectedSecret.slice(-3)}` : null,
      providedFp: providedSecret ? `${providedSecret.slice(0,3)}...${providedSecret.slice(-3)}` : null,
    });

    if (!expectedSecret || providedSecret !== expectedSecret) {
      console.error('Webhook authentication failed');
      return new Response('Unauthorized', { status: 401, headers: corsHeaders });
    }
    
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );
    
    // Log payload without sensitive data
    console.log('Webhook payload received:', {
      seller_id: body.seller_id ? '[REDACTED]' : undefined,
      product_id: body.product_id,
      short_product_id: body.short_product_id,
      sale_id: body.sale_id ? '[REDACTED]' : undefined,
      product_name: body.product_name,
      price: body.price,
      currency: body.currency,
      email: body.purchaser_email || body.email ? '[REDACTED]' : undefined
    });

    // Verify webhook authenticity (Gumroad sends specific fields)
    const purchaserEmail = body.purchaser_email || body.email;
    if (!body.seller_id || !body.product_id || !purchaserEmail) {
      console.error('Invalid webhook payload structure');
      return new Response('Invalid webhook', { status: 400, headers: corsHeaders });
    }

    const {
      seller_id,
      product_id,
      short_product_id,
      sale_id,
      sale_timestamp,
      product_name,
      price,
      currency
    } = body;

    // Map product identifiers to plans (supports product_id, short_product_id, name)
    const planMapping: { [key: string]: 'ltd' | 'pro' } = {
      // Known Gumroad short product IDs
      'pxkfyo': 'ltd', // Life Time Deal
      'zzjoi': 'pro',  // Pro Plan (monthly)
      // Fallbacks based on product names/permalinks
      'life time deal': 'ltd',
      'lifetime': 'ltd',
      'ltd': 'ltd',
      'pro plan': 'pro',
      'pro': 'pro'
    };

    // Extract plan from any of the known fields
    let planType: 'free' | 'ltd' | 'pro' = 'free';
    const nameLower = (product_name || '').toLowerCase();
    const pid = (product_id || '').toLowerCase();
    const spid = (short_product_id || '').toLowerCase();

    for (const [key, value] of Object.entries(planMapping)) {
      if (pid.includes(key) || spid.includes(key) || nameLower.includes(key)) {
        planType = value;
        break;
      }
    }

    console.log(`Processing purchase for plan: ${planType}`);

    // Find user by email and update their plan
    const { data: profile, error: profileError } = await supabaseClient
      .from('profiles')
      .select('*')
      .eq('email', purchaserEmail)
      .maybeSingle();

    if (profileError) {
      console.error('Error finding user profile:', profileError);
      return new Response('User lookup error', { status: 500, headers: corsHeaders });
    }

    if (!profile) {
      console.warn('No matching profile for purchaser email:', purchaserEmail);
      return new Response('No matching user profile; ignoring', { status: 202, headers: corsHeaders });
    }

    // Calculate expiration date (30 days for monthly plans)
    let planExpiresAt = null;
    if (planType === 'pro') {
      const expirationDate = new Date();
      expirationDate.setDate(expirationDate.getDate() + 30);
      planExpiresAt = expirationDate.toISOString();
    }

    // Update user's plan
    const { error: updateError } = await supabaseClient
      .from('profiles')
      .update({ 
        plan: planType,
        plan_expires_at: planExpiresAt,
        plan_status: 'active',
        updated_at: new Date().toISOString()
      })
      .eq('email', purchaserEmail);

    if (updateError) {
      console.error('Error updating user plan:', updateError);
      return new Response('Failed to update plan', { status: 500, headers: corsHeaders });
    }

    console.log(`Successfully updated user to ${planType} plan`);

    // Log the successful purchase without sensitive data
    console.log(`Purchase processed: Plan: ${planType}, Price: ${price} ${currency}`);

    return new Response('Webhook processed successfully', {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error processing Gumroad webhook:', error);
    return new Response(JSON.stringify({ 
      error: 'Internal server error',
      message: error instanceof Error ? error.message : 'Unknown error'
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});