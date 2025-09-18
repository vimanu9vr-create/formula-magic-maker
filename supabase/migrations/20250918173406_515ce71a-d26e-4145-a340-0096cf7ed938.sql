-- Create saved_formulas table for user's formula library
CREATE TABLE public.saved_formulas (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  input_text TEXT NOT NULL,
  formula_output TEXT NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('english-to-formula', 'formula-to-english', 'error-fix', 'optimize')),
  tags TEXT[] DEFAULT '{}',
  is_favorite BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.saved_formulas ENABLE ROW LEVEL SECURITY;

-- Create policies for saved_formulas
CREATE POLICY "Users can view their own saved formulas" 
ON public.saved_formulas 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own saved formulas" 
ON public.saved_formulas 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own saved formulas" 
ON public.saved_formulas 
FOR UPDATE 
USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own saved formulas" 
ON public.saved_formulas 
FOR DELETE 
USING (auth.uid() = user_id);

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_saved_formulas_updated_at
BEFORE UPDATE ON public.saved_formulas
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Create examples table for smart suggestions
CREATE TABLE public.formula_examples (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  example_input TEXT NOT NULL,
  expected_output TEXT NOT NULL,
  category TEXT NOT NULL,
  difficulty TEXT NOT NULL CHECK (difficulty IN ('beginner', 'intermediate', 'advanced')),
  tags TEXT[] DEFAULT '{}',
  is_popular BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Insert some example formulas
INSERT INTO public.formula_examples (title, description, example_input, expected_output, category, difficulty, tags, is_popular) VALUES
('Sum with Condition', 'Calculate sum based on criteria', 'Sum all values in column B where column A equals "Complete"', '=SUMIF(A:A,"Complete",B:B)', 'Math', 'beginner', '{"sum", "conditional", "basic"}', true),
('Find Last Value', 'Get the last non-empty value in a column', 'Find the last value in column A that is not empty', '=INDEX(A:A,COUNTA(A:A))', 'Lookup', 'intermediate', '{"index", "last", "lookup"}', true),
('Count Unique Values', 'Count distinct values in a range', 'Count how many unique values are in column A', '=SUMPRODUCT(1/COUNTIF(A:A,A:A))', 'Analysis', 'advanced', '{"count", "unique", "distinct"}', true),
('Average Excluding Zeros', 'Calculate average ignoring zero values', 'Calculate average of column B but skip any cells with 0', '=AVERAGEIF(B:B,">0")', 'Math', 'beginner', '{"average", "conditional", "exclude"}', true),
('Concatenate with Separator', 'Join text from multiple cells with delimiter', 'Combine first name in A1 and last name in B1 with a space between', '=A1&" "&B1', 'Text', 'beginner', '{"concatenate", "text", "join"}', true);