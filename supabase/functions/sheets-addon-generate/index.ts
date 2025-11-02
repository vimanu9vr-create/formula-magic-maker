import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.57.4";

const openAIApiKey = Deno.env.get('OPENAI_API_KEY');
const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-api-key',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Get API key from header
    const apiKey = req.headers.get('x-api-key');
    if (!apiKey) {
      return new Response(JSON.stringify({ error: 'API key required' }), {
        status: 401,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Validate API key and get user
    const supabase = createClient(supabaseUrl, supabaseServiceKey);
    
    // Hash the provided API key
    const encoder = new TextEncoder();
    const data = encoder.encode(apiKey);
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const keyHash = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');

    const { data: apiKeyData, error: keyError } = await supabase
      .from('api_keys')
      .select('id, user_id')
      .eq('key_hash', keyHash)
      .eq('is_active', true)
      .is('revoked_at', null)
      .single();

    if (keyError || !apiKeyData) {
      console.error('Invalid API key:', keyError);
      return new Response(JSON.stringify({ error: 'Invalid or revoked API key' }), {
        status: 401,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Update last_used_at
    await supabase
      .from('api_keys')
      .update({ last_used_at: new Date().toISOString() })
      .eq('id', apiKeyData.id);

    // Get user profile for usage limits
    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('*')
      .eq('user_id', apiKeyData.user_id)
      .single();

    if (profileError || !profile) {
      console.error('Profile error:', profileError);
      return new Response(JSON.stringify({ error: 'User profile not found' }), {
        status: 404,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Check usage limits
    const dailyLimit = profile.plan === 'free' ? 50 : 
                      profile.plan === 'basic' ? 200 :
                      profile.plan === 'pro' ? 500 : 999999;

    // Count today's usage
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const { count, error: countError } = await supabase
      .from('requests')
      .select('*', { count: 'exact', head: true })
      .eq('user_id', apiKeyData.user_id)
      .gte('timestamp', today.toISOString());

    if (countError) {
      console.error('Count error:', countError);
    }

    const usageCount = count || 0;

    if (usageCount >= dailyLimit) {
      return new Response(JSON.stringify({ 
        error: 'Daily limit reached',
        limit: dailyLimit,
        used: usageCount,
      }), {
        status: 429,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Get request data
    const { input, type = 'formula' } = await req.json();

    if (!input) {
      return new Response(JSON.stringify({ error: 'Input required' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Prepare system prompt based on type
    let systemPrompt = '';
    if (type === 'formula') {
      systemPrompt = `You are an expert Excel/Google Sheets formula generator. Convert the user's natural language request into the appropriate formula. Return ONLY the formula, nothing else. Use Excel/Google Sheets compatible syntax.`;
    } else if (type === 'explain') {
      systemPrompt = `You are an expert at explaining Excel and Google Sheets formulas. Explain the formula clearly and concisely.`;
    } else if (type === 'sql') {
      systemPrompt = `You are an expert SQL query generator. Convert the user's request into SQL. Return ONLY the SQL query, nothing else.`;
    } else if (type === 'regex') {
      systemPrompt = `You are an expert at regular expressions. Create a regex pattern for the user's request. Return ONLY the regex pattern, nothing else.`;
    }

    // Call OpenAI
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: input }
        ],
        temperature: 0.7,
        max_tokens: 500,
      }),
    });

    if (!response.ok) {
      const errorData = await response.text();
      console.error('OpenAI API error:', response.status, errorData);
      return new Response(JSON.stringify({ error: 'AI generation failed' }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const data = await response.json();
    const output = data.choices[0].message.content.trim();

    // Save request to database
    await supabase
      .from('requests')
      .insert({
        user_id: apiKeyData.user_id,
        input,
        output,
        type,
      });

    // Update usage count
    await supabase
      .from('profiles')
      .update({ usage_count: usageCount + 1 })
      .eq('user_id', apiKeyData.user_id);

    return new Response(JSON.stringify({ 
      output,
      usage: {
        used: usageCount + 1,
        limit: dailyLimit,
        remaining: dailyLimit - (usageCount + 1),
      }
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error in sheets-addon-generate:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
