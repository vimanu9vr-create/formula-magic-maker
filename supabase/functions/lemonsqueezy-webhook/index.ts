import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';
import { createHmac } from "https://deno.land/std@0.170.0/node/crypto.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-signature',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    console.log('Lemon Squeezy webhook received');
    
    // Get webhook signature for verification
    const signature = req.headers.get('x-signature');
    const webhookSecret = Deno.env.get('LEMONSQUEEZY_WEBHOOK_SECRET');
    
    // Read the raw body
    const rawBody = await req.text();
    
    // Verify webhook signature if secret is configured
    if (webhookSecret && signature) {
      const hmac = createHmac("sha256", webhookSecret);
      hmac.update(rawBody);
      const digest = hmac.digest("hex");
      
      if (digest !== signature) {
        console.error('Webhook signature verification failed');
        return new Response('Unauthorized', { status: 401, headers: corsHeaders });
      }
      console.log('Webhook signature verified');
    } else {
      console.warn('Webhook secret not configured - signature verification skipped');
    }
    
    const body = JSON.parse(rawBody);
    
    // Log event type
    console.log('Webhook event:', body.meta?.event_name);
    
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );
    
    // Handle different event types
    const eventName = body.meta?.event_name;
    
    if (eventName === 'order_created' || eventName === 'subscription_created') {
      const data = body.data;
      const attributes = data.attributes;
      const userEmail = attributes.user_email;
      const productName = attributes.product_name?.toLowerCase() || '';
      const variantName = attributes.variant_name?.toLowerCase() || '';
      
      if (!userEmail) {
        console.error('No user email in webhook payload');
        return new Response('Invalid webhook - no email', { status: 400, headers: corsHeaders });
      }
      
      console.log('Processing purchase for:', userEmail);
      
      // Determine plan type based on product/variant name
      let planType: 'free' | 'ltd' | 'pro' = 'free';
      
      if (productName.includes('lifetime') || productName.includes('ltd') || 
          variantName.includes('lifetime') || variantName.includes('ltd')) {
        planType = 'ltd';
      } else if (productName.includes('pro') || variantName.includes('pro') ||
                 eventName === 'subscription_created') {
        planType = 'pro';
      }
      
      console.log(`Determined plan type: ${planType}`);
      
      // Find user by email
      const { data: profile, error: profileError } = await supabaseClient
        .from('profiles')
        .select('*')
        .eq('email', userEmail)
        .maybeSingle();
      
      if (profileError) {
        console.error('Error finding user profile:', profileError);
        return new Response('Webhook processing failed', { status: 500, headers: corsHeaders });
      }
      
      if (!profile) {
        console.warn('No matching profile for email:', userEmail);
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
        .eq('email', userEmail);
      
      if (updateError) {
        console.error('Error updating user plan:', updateError);
        return new Response('Webhook processing failed', { status: 500, headers: corsHeaders });
      }
      
      console.log(`Successfully updated user to ${planType} plan`);
      
    } else if (eventName === 'subscription_cancelled' || eventName === 'subscription_expired') {
      const data = body.data;
      const attributes = data.attributes;
      const userEmail = attributes.user_email;
      
      if (userEmail) {
        console.log('Processing subscription cancellation/expiration for:', userEmail);
        
        // Update user's plan status
        const { error: updateError } = await supabaseClient
          .from('profiles')
          .update({ 
            plan_status: 'expired',
            updated_at: new Date().toISOString()
          })
          .eq('email', userEmail);
        
        if (updateError) {
          console.error('Error updating user plan status:', updateError);
        } else {
          console.log('Successfully marked plan as expired');
        }
      }
    }
    
    return new Response('Webhook processed successfully', {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error processing Lemon Squeezy webhook:', error);
    return new Response('Webhook processing failed', { 
      status: 500, 
      headers: corsHeaders 
    });
  }
});
