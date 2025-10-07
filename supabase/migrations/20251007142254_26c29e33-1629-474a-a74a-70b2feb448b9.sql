-- Fix privilege escalation vulnerability in profiles table
-- Remove the overly permissive UPDATE policy that allows users to modify plan fields

-- Drop the existing UPDATE policy
DROP POLICY IF EXISTS "Authenticated users can update their own profile" ON public.profiles;

-- Create a restricted UPDATE policy that prevents modification of sensitive fields
-- Users should not be able to modify: plan, plan_status, plan_expires_at, usage_count, last_reset
-- Since there are no other user-modifiable fields, we effectively disable user updates
-- System updates via edge functions will continue to work using the service role key

-- Create a policy that denies all UPDATE operations for regular users
CREATE POLICY "Users cannot update profiles directly" 
ON public.profiles 
FOR UPDATE 
USING (false);

-- Note: Edge functions using SUPABASE_SERVICE_ROLE_KEY bypass RLS and can still update
-- This ensures only the system (Gumroad webhook, plan expiration checks) can modify plan data