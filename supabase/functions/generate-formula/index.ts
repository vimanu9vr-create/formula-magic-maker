import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.57.4';

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
    const openAIApiKey = Deno.env.get('OPENAI_API_KEY');
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    
    if (!openAIApiKey) {
      throw new Error('OpenAI API key not configured');
    }

    const supabase = createClient(supabaseUrl, supabaseServiceKey);
    
    // Get user from auth header
    const authToken = req.headers.get('Authorization')?.replace('Bearer ', '');
    if (!authToken) {
      return new Response(JSON.stringify({ error: 'Authorization required' }), {
        status: 401,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const { data: { user }, error: authError } = await supabase.auth.getUser(authToken);
    if (authError || !user) {
      return new Response(JSON.stringify({ error: 'Invalid authorization' }), {
        status: 401,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const { input, type } = await req.json();

    // Check user's usage limits
    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('*')
      .eq('user_id', user.id)
      .single();

    if (profileError) {
      console.error('Profile fetch error:', profileError);
      return new Response(JSON.stringify({ error: 'User profile not found' }), {
        status: 404,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Check if user has exceeded daily limit (free plan = 5 requests)
    const dailyLimit = profile.plan === 'free' ? 5 : Infinity;
    
    // Reset usage if it's a new day
    const lastReset = new Date(profile.last_reset);
    const now = new Date();
    const isNewDay = now.getDate() !== lastReset.getDate() || 
                     now.getMonth() !== lastReset.getMonth() || 
                     now.getFullYear() !== lastReset.getFullYear();

    let currentUsage = profile.usage_count;
    if (isNewDay) {
      currentUsage = 0;
      await supabase
        .from('profiles')
        .update({ usage_count: 0, last_reset: now.toISOString() })
        .eq('user_id', user.id);
    }

    if (currentUsage >= dailyLimit) {
      return new Response(JSON.stringify({ 
        error: 'Daily limit exceeded',
        message: 'You have reached your daily request limit. Upgrade to Pro for unlimited access.'
      }), {
        status: 429,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Create OpenAI prompt based on type
    let systemPrompt, userPrompt;
    
    if (type === 'english-to-formula') {
      systemPrompt = `You are an Excel/Google Sheets formula expert. Convert plain English descriptions into exact formulas. 
        - Return ONLY the formula, no explanations
        - Use proper Excel/Google Sheets syntax
        - Assume standard column references (A, B, C, etc.)
        - For ranges, use appropriate syntax like A:A or A1:A100
        - Common functions: SUM, AVERAGE, COUNT, COUNTIF, SUMIF, VLOOKUP, INDEX, MATCH, IF, etc.`;
      userPrompt = `Convert this to an Excel formula: ${input}`;
    } else if (type === 'formula-to-english') {
      systemPrompt = `You are an Excel/Google Sheets formula expert. Explain formulas in simple, clear English.
        - Break down what each part does
        - Use plain language, avoid technical jargon
        - Explain the purpose and result of the formula
        - Be concise but complete`;
      userPrompt = `Explain this Excel formula in simple English: ${input}`;
    } else if (type === 'explain-formula') {
      systemPrompt = `You are an Excel/Google Sheets formula teacher. Provide step-by-step educational explanations.
        - Break down each function and operator
        - Explain what each part does and why
        - Use examples to illustrate concepts
        - Structure as a learning resource
        - Include tips for remembering or using similar formulas`;
      userPrompt = `Provide a detailed, step-by-step explanation of this Excel formula for learning purposes: ${input}`;
    } else if (type === 'error-fix') {
      systemPrompt = `You are an Excel/Google Sheets formula debugger. Fix broken formulas and explain the issues.
        - Identify what's wrong with the formula
        - Provide the corrected formula
        - Explain what was fixed and why
        - Use proper Excel/Google Sheets syntax`;
      userPrompt = `Fix this broken Excel formula and explain what was wrong: ${input}`;
    } else if (type === 'optimize') {
      systemPrompt = `You are an Excel/Google Sheets formula optimization expert. Improve formulas for better performance and readability.
        - Provide an optimized version of the formula
        - Explain what improvements were made
        - Focus on performance, readability, and best practices
        - Suggest alternative approaches if applicable`;
      userPrompt = `Optimize this Excel formula and explain the improvements: ${input}`;
    } else if (type === 'sql-generator') {
      systemPrompt = `You are a SQL expert. Generate SQL queries based on plain English descriptions.
        - Write clean, efficient SQL queries
        - Use standard SQL syntax that works across major databases
        - Include comments for complex parts
        - Assume common table structures when not specified
        - Return ONLY the SQL query with brief explanations`;
      userPrompt = `Generate a SQL query for this request: ${input}`;
    } else if (type === 'regex-generator') {
      systemPrompt = `You are a regex expert. Create regular expressions based on plain English descriptions.
        - Generate clean, efficient regex patterns
        - Provide the regex pattern and explain what it matches
        - Include common flags when relevant (i, g, m)
        - Test the pattern with examples
        - Explain each part of the regex pattern`;
      userPrompt = `Create a regex pattern for this requirement: ${input}`;
    } else if (type === 'python-generator') {
      systemPrompt = `You are a Python programming expert. Generate clean, efficient Python code based on descriptions.
        - Write production-ready Python code with proper imports
        - Include comments explaining key parts
        - Use best practices and proper error handling
        - Provide complete, runnable code snippets
        - Use appropriate libraries when needed`;
      userPrompt = `Generate Python code for this task: ${input}`;
    } else if (type === 'javascript-generator') {
      systemPrompt = `You are a JavaScript programming expert. Generate clean, modern JavaScript code based on descriptions.
        - Write ES6+ JavaScript with modern syntax
        - Include comments explaining key parts
        - Use best practices and proper error handling
        - Provide complete, runnable code snippets
        - Use appropriate APIs and methods`;
      userPrompt = `Generate JavaScript code for this task: ${input}`;
    } else {
      systemPrompt = `You are an Excel/Google Sheets formula expert. Explain formulas in simple, clear English.
        - Break down what each part does
        - Use plain language, avoid technical jargon
        - Explain the purpose and result of the formula
        - Be concise but complete`;
      userPrompt = `Explain this Excel formula in simple English: ${input}`;
    }

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
          { role: 'user', content: userPrompt }
        ],
        max_tokens: 500,
        temperature: 0.1,
      }),
    });

    const openAIData = await response.json();
    
    if (!response.ok) {
      console.error('OpenAI API error:', openAIData);
      throw new Error('Failed to generate response');
    }

    const output = openAIData.choices[0].message.content.trim();

    // Save the request to database
    await supabase
      .from('requests')
      .insert({
        user_id: user.id,
        type,
        input,
        output
      });

    // Update usage count
    await supabase
      .from('profiles')
      .update({ usage_count: currentUsage + 1 })
      .eq('user_id', user.id);

    return new Response(JSON.stringify({ 
      output,
      usage: {
        used: currentUsage + 1,
        limit: dailyLimit,
        remaining: Math.max(0, dailyLimit - (currentUsage + 1))
      }
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error in generate-formula function:', error);
    return new Response(JSON.stringify({ 
      error: 'Internal server error',
      message: error.message 
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});