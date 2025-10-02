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

    // Check if user has exceeded daily limit (free plan or expired plan = 5 requests)
    const isLimited = profile.plan === 'free' || profile.plan_status === 'expired';
    const dailyLimit = isLimited ? 5 : Infinity;
    
    // Calculate usage in the last 24 hours from the requests table (robust rolling window)
    const now = new Date();
    const cutoffISO = new Date(now.getTime() - 24 * 60 * 60 * 1000).toISOString();
    const { count: recentCount, error: countError } = await supabase
      .from('requests')
      .select('id', { count: 'exact', head: true })
      .eq('user_id', user.id)
      .gte('timestamp', cutoffISO);

    if (countError) {
      console.error('Usage count error:', countError);
      return new Response(JSON.stringify({ error: 'Failed to check usage' }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    let currentUsage = recentCount ?? 0;

    if (currentUsage >= dailyLimit) {
      const message = profile.plan_status === 'expired' 
        ? 'Your plan has expired. Please renew your subscription for unlimited access.'
        : 'You have reached your daily request limit. Upgrade to Pro for unlimited access.';
        
      return new Response(JSON.stringify({ 
        error: 'Daily limit exceeded',
        message
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
      systemPrompt = `You are a coding assistant that fixes errors. You MUST follow these rules:
        1. ONLY return the corrected code wrapped in a code block
        2. NO explanations, NO comments, NO additional text whatsoever
        3. Fix syntax errors, logic errors, and return clean working code
        4. Response format: \`\`\`[language]\n[corrected_code]\n\`\`\`
        5. NEVER provide explanations or descriptions outside the code block`;
      userPrompt = `Fix this code:\n${input}`;
    } else if (type === 'optimize') {
      systemPrompt = `You are an Excel/Google Sheets formula optimization expert. 
        Return the optimized version of the formula inside a code block with proper formatting.
        After the code block, provide a brief explanation of the improvements made.
        Focus on performance, readability, and best practices.
        Use proper line breaks for complex formulas.`;
      userPrompt = `Optimize this Excel formula: ${input}`;
    } else if (type === 'sql-generator') {
      systemPrompt = `You are a SQL generator. 
        ONLY return valid SQL code inside one code block with proper formatting and indentation.
        Use proper line breaks for readability.
        Do not add explanations or any text outside the code block.`;
      userPrompt = `User request: ${input}`;
    } else if (type === 'regex-generator') {
      systemPrompt = `You are a Regex generator. 
        ONLY return the regex pattern inside one code block.
        Do not add explanations or any text outside the code block.`;
      userPrompt = `User request: ${input}`;
    } else if (type === 'python-generator') {
      systemPrompt = `You are a Python code generator. 
        ONLY return valid Python code inside one code block with proper formatting and indentation.
        Use proper line breaks and Python indentation for readability.
        Do not add explanations or any text outside the code block.`;
      userPrompt = `User request: ${input}`;
    } else if (type === 'javascript-generator') {
      systemPrompt = `You are a JavaScript code generator. 
        ONLY return valid JavaScript code inside one code block with proper formatting and indentation.
        Use proper line breaks and indentation for readability.
        Do not add explanations or any text outside the code block.`;
      userPrompt = `User request: ${input}`;
    } else if (type === 'java-generator') {
      systemPrompt = `You are a Java code generator. 
        ONLY return valid Java code inside one code block with proper formatting and indentation.
        Use proper line breaks and Java indentation for readability.
        Do not add explanations or any text outside the code block.`;
      userPrompt = `User request: ${input}`;
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
    const allowedTypes = ['english-to-formula','formula-to-english','explain-formula','error-fix','optimize','sql-generator','regex-generator','python-generator','javascript-generator'];
    const recordType = allowedTypes.includes(type) ? type : 'explain-formula';
    await supabase
      .from('requests')
      .insert({
        user_id: user.id,
        type: recordType,
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
      message: error instanceof Error ? error.message : 'Unknown error'
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});