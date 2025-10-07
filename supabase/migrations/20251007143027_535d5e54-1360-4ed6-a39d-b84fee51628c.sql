-- Fix feedback table security vulnerability
-- Restrict feedback submission to authenticated users only to prevent email harvesting

-- Step 1: Delete any existing feedback without user_id (anonymous submissions)
DELETE FROM public.feedback WHERE user_id IS NULL;

-- Step 2: Drop the overly permissive INSERT policy that allows anonymous feedback
DROP POLICY IF EXISTS "Anyone can submit feedback" ON public.feedback;

-- Step 3: Create a new policy that requires authentication and proper user_id association
CREATE POLICY "Authenticated users can submit feedback" 
ON public.feedback 
FOR INSERT 
TO authenticated
WITH CHECK (auth.uid() = user_id);

-- Step 4: Make user_id NOT NULL to enforce authentication requirement going forward
ALTER TABLE public.feedback 
ALTER COLUMN user_id SET NOT NULL;

-- Add comment explaining the security measure
COMMENT ON POLICY "Authenticated users can submit feedback" ON public.feedback IS 
'Requires authentication to prevent email harvesting attacks. Users must be logged in and user_id must match auth.uid().';