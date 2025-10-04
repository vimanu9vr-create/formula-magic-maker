-- Step 1: Create role enum
CREATE TYPE public.app_role AS ENUM ('admin', 'user');

-- Step 2: Create user_roles table
CREATE TABLE public.user_roles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    role public.app_role NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    UNIQUE (user_id, role)
);

-- Enable RLS on user_roles
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- Step 3: Create security definer function to check roles
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role public.app_role)
RETURNS BOOLEAN
LANGUAGE SQL
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id
      AND role = _role
  )
$$;

-- Step 4: Drop the dangerous policy on formula_examples
DROP POLICY IF EXISTS "Only authenticated users can manage formula examples" ON public.formula_examples;

-- Step 5: Create secure policies for formula_examples
-- Keep public read access (examples should be viewable by everyone)
CREATE POLICY "Anyone can view formula examples"
ON public.formula_examples
FOR SELECT
USING (true);

-- Only admins can insert examples
CREATE POLICY "Only admins can insert formula examples"
ON public.formula_examples
FOR INSERT
TO authenticated
WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- Only admins can update examples
CREATE POLICY "Only admins can update formula examples"
ON public.formula_examples
FOR UPDATE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'))
WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- Only admins can delete examples
CREATE POLICY "Only admins can delete formula examples"
ON public.formula_examples
FOR DELETE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- Step 6: Create policy for user_roles table (only admins can manage roles)
CREATE POLICY "Admins can manage all user roles"
ON public.user_roles
FOR ALL
TO authenticated
USING (public.has_role(auth.uid(), 'admin'))
WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Users can view their own roles"
ON public.user_roles
FOR SELECT
TO authenticated
USING (auth.uid() = user_id);