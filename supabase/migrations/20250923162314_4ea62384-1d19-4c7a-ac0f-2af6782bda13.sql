-- Add expiration tracking to profiles table
ALTER TABLE public.profiles 
ADD COLUMN plan_expires_at TIMESTAMP WITH TIME ZONE,
ADD COLUMN plan_status TEXT NOT NULL DEFAULT 'active';

-- Add index for efficient expiration queries
CREATE INDEX idx_profiles_plan_expires_at ON public.profiles(plan_expires_at);

-- Create function to check and update expired plans
CREATE OR REPLACE FUNCTION public.update_expired_plans()
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = 'public'
AS $$
BEGIN
  UPDATE public.profiles 
  SET plan_status = 'expired'
  WHERE plan_expires_at IS NOT NULL 
    AND plan_expires_at < now() 
    AND plan_status = 'active'
    AND plan != 'free'
    AND plan != 'ltd';
END;
$$;