-- Move extensions to the extensions schema (recommended by Supabase)
DROP EXTENSION IF EXISTS pg_cron;
DROP EXTENSION IF EXISTS pg_net;

-- Create extensions in the extensions schema
CREATE EXTENSION IF NOT EXISTS pg_cron WITH SCHEMA extensions;
CREATE EXTENSION IF NOT EXISTS pg_net WITH SCHEMA extensions;

-- Reschedule the check-expired-plans function (functions are available globally)
SELECT cron.schedule(
  'check-expired-plans-daily',
  '0 0 * * *', -- Daily at midnight UTC
  $$
  SELECT
    net.http_post(
        url:='https://onlasynzdryijgktfvvh.supabase.co/functions/v1/check-expired-plans',
        headers:='{"Content-Type": "application/json", "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9ubGFzeW56ZHJ5aWpna3RmdnZoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTgyMTM3NzMsImV4cCI6MjA3Mzc4OTc3M30.6smjzvHi-D95EKZscOLhAWfwMzrlkoF13DRdjxp46xo"}'::jsonb,
        body:='{"scheduled": true}'::jsonb
    ) as request_id;
  $$
);

-- Update the manual trigger function 
CREATE OR REPLACE FUNCTION public.trigger_plan_expiration_check()
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $function$
BEGIN
  PERFORM net.http_post(
    url := 'https://onlasynzdryijgktfvvh.supabase.co/functions/v1/check-expired-plans',
    headers := '{"Content-Type": "application/json", "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9ubGFzeW56ZHJ5aWpna3RmdnZoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTgyMTM3NzMsImV4cCI6MjA3Mzc4OTc3M30.6smjzvHi-D95EKZscOLhAWfwMzrlkoF13DRdjxp46xo"}'::jsonb,
    body := '{"manual_trigger": true}'::jsonb
  );
END;
$function$;