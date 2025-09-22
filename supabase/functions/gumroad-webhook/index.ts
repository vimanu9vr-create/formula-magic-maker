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
    
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    const body = await req.json();
    console.log('Webhook payload:', body);

    // Verify webhook authenticity (Gumroad sends specific fields)
    if (!body.seller_id || !body.product_id || !body.purchaser_email) {
      console.error('Invalid webhook payload structure');
      return new Response('Invalid webhook', { status: 400, headers: corsHeaders });
    }

    const {
      seller_id,
      product_id, 
      purchaser_email,
      sale_id,
      sale_timestamp,
      product_name,
      price,
      currency
    } = body;

    // Map product IDs to plans
    const planMapping: { [key: string]: string } = {
      'vhizte': 'ltd',
      'formulagenie-pro': 'pro', 
      'formulagenie-team': 'team'
    };

    // Extract plan from product_id or product_name
    let planType = 'free';
    for (const [key, value] of Object.entries(planMapping)) {
      if (product_id.includes(key) || product_name?.toLowerCase().includes(key)) {
        planType = value;
        break;
      }
    }

    console.log(`Processing purchase: ${purchaser_email} -> ${planType} plan`);

    // Find user by email and update their plan
    const { data: profile, error: profileError } = await supabaseClient
      .from('profiles')
      .select('*')
      .eq('email', purchaser_email)
      .single();

    if (profileError) {
      console.error('Error finding user profile:', profileError);
      return new Response('User not found', { status: 404, headers: corsHeaders });
    }

    // Update user's plan
    const { error: updateError } = await supabaseClient
      .from('profiles')
      .update({ 
        plan: planType,
        updated_at: new Date().toISOString()
      })
      .eq('email', purchaser_email);

    if (updateError) {
      console.error('Error updating user plan:', updateError);
      return new Response('Failed to update plan', { status: 500, headers: corsHeaders });
    }

    console.log(`Successfully updated ${purchaser_email} to ${planType} plan`);

    // Log the successful purchase
    console.log(`Purchase processed: Sale ID: ${sale_id}, Email: ${purchaser_email}, Plan: ${planType}, Price: ${price} ${currency}`);

    return new Response('Webhook processed successfully', {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error processing Gumroad webhook:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});