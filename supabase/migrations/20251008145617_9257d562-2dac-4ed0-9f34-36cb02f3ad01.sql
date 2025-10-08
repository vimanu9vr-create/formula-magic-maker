-- Fix security warning: Prevent modifications to request history
-- Requests should be immutable once created (prevents users from hiding abuse/usage)

-- Add UPDATE policy that blocks all modifications
CREATE POLICY "Request history is immutable"
ON public.requests
FOR UPDATE
TO authenticated
USING (false)
WITH CHECK (false);