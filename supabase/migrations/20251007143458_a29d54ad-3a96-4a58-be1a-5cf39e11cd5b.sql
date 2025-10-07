-- Fix requests table RLS policies to prevent potential security gaps
-- Restrict policies to authenticated users only

-- Drop existing policies
DROP POLICY IF EXISTS "Users can view their own requests" ON public.requests;
DROP POLICY IF EXISTS "Users can insert their own requests" ON public.requests;
DROP POLICY IF EXISTS "Users can delete their own requests" ON public.requests;

-- Recreate policies with proper authentication restrictions
CREATE POLICY "Users can view their own requests" 
ON public.requests 
FOR SELECT 
TO authenticated
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own requests" 
ON public.requests 
FOR INSERT 
TO authenticated
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete their own requests" 
ON public.requests 
FOR DELETE 
TO authenticated
USING (auth.uid() = user_id);

-- Add comments explaining the security measures
COMMENT ON POLICY "Users can view their own requests" ON public.requests IS 
'Restricts SELECT to authenticated users viewing only their own request history based on user_id match';

COMMENT ON POLICY "Users can insert their own requests" ON public.requests IS 
'Restricts INSERT to authenticated users creating only their own requests with matching user_id';

COMMENT ON POLICY "Users can delete their own requests" ON public.requests IS 
'Restricts DELETE to authenticated users removing only their own requests based on user_id match';