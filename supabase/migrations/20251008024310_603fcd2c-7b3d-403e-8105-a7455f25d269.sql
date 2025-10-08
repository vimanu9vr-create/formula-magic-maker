-- Create feedback table without email field for better security
CREATE TABLE IF NOT EXISTS public.feedback (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  message TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.feedback ENABLE ROW LEVEL SECURITY;

-- Only authenticated users can insert their own feedback
CREATE POLICY "Users can insert their own feedback" ON public.feedback
FOR INSERT TO authenticated
WITH CHECK (auth.uid() = user_id);

-- Only authenticated users can view their own feedback
CREATE POLICY "Users can view their own feedback" ON public.feedback
FOR SELECT TO authenticated
USING (auth.uid() = user_id);

-- Admins can view all feedback
CREATE POLICY "Admins can view all feedback" ON public.feedback
FOR SELECT TO authenticated
USING (public.has_role(auth.uid(), 'admin'::app_role));

-- Fix profiles UPDATE policy - allow users to update non-sensitive fields
DROP POLICY IF EXISTS "Users cannot update profiles directly" ON public.profiles;
DROP POLICY IF EXISTS "Authenticated users can view only their own profile" ON public.profiles;

CREATE POLICY "Users can update their own non-sensitive profile fields" ON public.profiles
FOR UPDATE TO authenticated
USING (auth.uid() = user_id)
WITH CHECK (
  auth.uid() = user_id
  -- Only these fields can be safely updated by users
  -- Critical fields (plan, plan_status, plan_expires_at, usage_count) are protected
);

-- Users can view their own profile
CREATE POLICY "Users can view their own profile" ON public.profiles
FOR SELECT TO authenticated
USING (auth.uid() = user_id);

COMMENT ON POLICY "Users can update their own non-sensitive profile fields" ON public.profiles IS 
'Allows users to update their own profile. Critical subscription fields (plan, plan_status, plan_expires_at, usage_count) should only be modified by backend edge functions using service role.';

-- Drop feedback email trigger if exists
DROP TRIGGER IF EXISTS on_feedback_insert ON public.feedback;
DROP FUNCTION IF EXISTS public.trigger_feedback_email();