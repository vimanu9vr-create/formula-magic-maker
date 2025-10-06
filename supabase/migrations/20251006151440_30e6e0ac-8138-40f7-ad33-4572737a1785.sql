-- Fix feedback table RLS - Remove public access and restrict to own feedback only
DROP POLICY IF EXISTS "Anyone can submit feedback" ON public.feedback;
DROP POLICY IF EXISTS "Users can view own feedback" ON public.feedback;

-- Allow anyone to insert feedback (for contact form)
CREATE POLICY "Anyone can submit feedback"
ON public.feedback
FOR INSERT
TO public
WITH CHECK (true);

-- Only allow users to view their own feedback
CREATE POLICY "Users can view own feedback"
ON public.feedback
FOR SELECT
TO authenticated
USING (auth.uid()::text = email OR email IN (
  SELECT email FROM auth.users WHERE id = auth.uid()
));

-- Add DELETE policy for requests table so users can delete their own history
CREATE POLICY "Users can delete their own requests"
ON public.requests
FOR DELETE
TO authenticated
USING (auth.uid() = user_id);