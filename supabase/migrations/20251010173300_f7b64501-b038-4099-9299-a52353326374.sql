-- Drop the restrictive type check constraint that's preventing new generator types
ALTER TABLE public.requests DROP CONSTRAINT IF EXISTS requests_type_check;

-- Add a comment explaining allowed types for documentation
COMMENT ON COLUMN public.requests.type IS 'Request type: english-to-formula, formula-to-english, explain-formula, error-fix, optimize, sql-generator, regex-generator, python-generator, javascript-generator, java-generator';