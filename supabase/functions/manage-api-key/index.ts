import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.57.4";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    // Get JWT from header
    const authHeader = req.headers.get('Authorization');
    if (!authHeader) {
      return new Response(JSON.stringify({ error: 'No authorization header' }), {
        status: 401,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Verify user
    const jwt = authHeader.replace('Bearer ', '');
    const { data: { user }, error: authError } = await supabase.auth.getUser(jwt);
    
    if (authError || !user) {
      console.error('Auth error:', authError);
      return new Response(JSON.stringify({ error: 'Unauthorized' }), {
        status: 401,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const { action, keyId, keyName } = await req.json();

    // LIST: Get all API keys for user
    if (action === 'list') {
      const { data: keys, error } = await supabase
        .from('api_keys')
        .select('id, name, key_prefix, created_at, last_used_at, is_active, revoked_at')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error listing keys:', error);
        return new Response(JSON.stringify({ error: 'Failed to list keys' }), {
          status: 500,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }

      return new Response(JSON.stringify({ keys }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // GENERATE: Create new API key
    if (action === 'generate') {
      // Generate a random API key (32 bytes = 64 hex characters)
      const keyBytes = new Uint8Array(32);
      crypto.getRandomValues(keyBytes);
      const apiKey = Array.from(keyBytes)
        .map(b => b.toString(16).padStart(2, '0'))
        .join('');
      
      const fullKey = `fg_${apiKey}`;
      const keyPrefix = fullKey.substring(0, 10) + '...';
      
      // Hash the key for storage (SHA-256)
      const encoder = new TextEncoder();
      const data = encoder.encode(fullKey);
      const hashBuffer = await crypto.subtle.digest('SHA-256', data);
      const hashArray = Array.from(new Uint8Array(hashBuffer));
      const keyHash = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');

      // Store in database
      const { data: newKey, error } = await supabase
        .from('api_keys')
        .insert({
          user_id: user.id,
          name: keyName || 'Google Sheets Add-on',
          key_hash: keyHash,
          key_prefix: keyPrefix,
        })
        .select()
        .single();

      if (error) {
        console.error('Error creating key:', error);
        return new Response(JSON.stringify({ error: 'Failed to create key' }), {
          status: 500,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }

      return new Response(JSON.stringify({ 
        key: newKey,
        apiKey: fullKey, // Only returned once!
      }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // REVOKE: Deactivate an API key
    if (action === 'revoke') {
      const { error } = await supabase
        .from('api_keys')
        .update({ 
          is_active: false,
          revoked_at: new Date().toISOString(),
        })
        .eq('id', keyId)
        .eq('user_id', user.id);

      if (error) {
        console.error('Error revoking key:', error);
        return new Response(JSON.stringify({ error: 'Failed to revoke key' }), {
          status: 500,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }

      return new Response(JSON.stringify({ success: true }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // DELETE: Permanently delete an API key
    if (action === 'delete') {
      const { error } = await supabase
        .from('api_keys')
        .delete()
        .eq('id', keyId)
        .eq('user_id', user.id);

      if (error) {
        console.error('Error deleting key:', error);
        return new Response(JSON.stringify({ error: 'Failed to delete key' }), {
          status: 500,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }

      return new Response(JSON.stringify({ success: true }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    return new Response(JSON.stringify({ error: 'Invalid action' }), {
      status: 400,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error in manage-api-key:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
