-- Phase 1: Harden RLS and protect sensitive profile fields

-- Ensure RLS is enabled
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.feedback ENABLE ROW LEVEL SECURITY;

-- PROFILES: simplify and strictly scope SELECT to the owner only (authenticated users)
DROP POLICY IF EXISTS "Users can view their own data" ON public.profiles;
DROP POLICY IF EXISTS "Users can view their own profile" ON public.profiles;

CREATE POLICY "Users can only view their own profile"
ON public.profiles
FOR SELECT
TO authenticated
USING (auth.uid() = user_id);

-- PROFILES: keep updates limited to the owner (explicitly to authenticated)
DROP POLICY IF EXISTS "Users can update their own non-sensitive profile fields" ON public.profiles;
CREATE POLICY "Users can update their own non-sensitive profile fields"
ON public.profiles
FOR UPDATE
TO authenticated
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);

-- FEEDBACK: make ownership policy explicit to authenticated users
DROP POLICY IF EXISTS "Users can view their own feedback" ON public.feedback;
CREATE POLICY "Users can view their own feedback"
ON public.feedback
FOR SELECT
TO authenticated
USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can insert their own feedback" ON public.feedback;
CREATE POLICY "Users can insert their own feedback"
ON public.feedback
FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = user_id);

-- PROFILES: Prevent client-side modification of plan fields (allow service_role only)
CREATE OR REPLACE FUNCTION public.prevent_sensitive_profile_changes()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  -- If request carries JWT and is from service_role, allow
  IF coalesce(current_setting('request.jwt.claims', true), '') <> '' THEN
    IF (auth.jwt() ->> 'role') = 'service_role' THEN
      RETURN NEW;
    END IF;
  END IF;

  -- Block changes to plan-related fields by normal clients
  IF NEW.plan IS DISTINCT FROM OLD.plan
     OR NEW.plan_status IS DISTINCT FROM OLD.plan_status
     OR NEW.plan_expires_at IS DISTINCT FROM OLD.plan_expires_at THEN
    RAISE EXCEPTION 'Updating plan fields is not permitted';
  END IF;

  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS profiles_prevent_sensitive_changes ON public.profiles;
CREATE TRIGGER profiles_prevent_sensitive_changes
BEFORE UPDATE ON public.profiles
FOR EACH ROW
EXECUTE FUNCTION public.prevent_sensitive_profile_changes();