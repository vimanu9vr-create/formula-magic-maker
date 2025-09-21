-- Enable Row Level Security on formula_examples table
ALTER TABLE public.formula_examples ENABLE ROW LEVEL SECURITY;

-- Create policy to allow public read access to formula examples
-- This allows anyone to view the formula examples, which appears to be the intended behavior
-- since this contains public reference data like examples, categories, and difficulty levels
CREATE POLICY "Formula examples are publicly viewable" 
ON public.formula_examples 
FOR SELECT 
USING (true);

-- Create policy to restrict write access to authenticated users only
-- This prevents anonymous users from modifying the formula examples
CREATE POLICY "Only authenticated users can manage formula examples" 
ON public.formula_examples 
FOR ALL
USING (auth.uid() IS NOT NULL)
WITH CHECK (auth.uid() IS NOT NULL);