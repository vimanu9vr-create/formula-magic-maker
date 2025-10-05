-- Create a webhook trigger for feedback email notifications
CREATE OR REPLACE FUNCTION public.trigger_feedback_email()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
BEGIN
  PERFORM net.http_post(
    url := 'https://onlasynzdryijgktfvvh.supabase.co/functions/v1/send-feedback-email',
    headers := jsonb_build_object(
      'Content-Type', 'application/json',
      'Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9ubGFzeW56ZHJ5aWpna3RmdnZoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTgyMTM3NzMsImV4cCI6MjA3Mzc4OTc3M30.6smjzvHi-D95EKZscOLhAWfwMzrlkoF13DRdjxp46xo'
    ),
    body := jsonb_build_object(
      'type', 'INSERT',
      'table', 'feedback',
      'record', jsonb_build_object(
        'id', NEW.id,
        'name', NEW.name,
        'email', NEW.email,
        'message', NEW.message,
        'created_at', NEW.created_at
      ),
      'schema', 'public'
    )
  );
  RETURN NEW;
END;
$$;

-- Create trigger that fires after insert on feedback table
DROP TRIGGER IF EXISTS on_feedback_created ON public.feedback;
CREATE TRIGGER on_feedback_created
  AFTER INSERT ON public.feedback
  FOR EACH ROW
  EXECUTE FUNCTION public.trigger_feedback_email();