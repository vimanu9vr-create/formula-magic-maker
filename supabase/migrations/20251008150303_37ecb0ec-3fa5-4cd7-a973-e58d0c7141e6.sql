-- Fix: Explicitly block direct INSERT to profiles table
-- Profiles are created automatically by handle_new_user() trigger on signup
-- This policy makes the security design explicit

-- Add INSERT policy that blocks all direct attempts
-- (Trigger runs with elevated privileges and bypasses RLS)
CREATE POLICY "Profiles created only by signup trigger"
ON public.profiles
FOR INSERT
TO authenticated
WITH CHECK (false);

-- Also add policy for anon to be extra safe
CREATE POLICY "Anonymous users cannot insert profiles"
ON public.profiles
FOR INSERT
TO anon
WITH CHECK (false);