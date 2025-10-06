-- Fix feedback table email harvesting vulnerability
-- Remove the insecure email-based SELECT policy

DROP POLICY IF EXISTS "Users can view own feedback" ON public.feedback;
DROP POLICY IF EXISTS "Users can view their own feedback" ON public.feedback;

-- Create a secure policy that ONLY uses user_id (no email matching)
CREATE POLICY "Users can view own feedback by user_id"
ON public.feedback
FOR SELECT
TO authenticated
USING (
  auth.uid() = user_id
);

-- Admin policy already exists and is secure
-- INSERT policy remains open for anonymous contact form submissions