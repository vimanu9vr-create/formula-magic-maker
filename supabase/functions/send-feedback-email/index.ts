import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.38.4";
import { Resend } from "npm:resend@2.0.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface WebhookPayload {
  type: 'INSERT';
  table: string;
  record: {
    id: string;
    name: string;
    email: string;
    message: string;
    created_at: string;
  };
  schema: string;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const resendApiKey = Deno.env.get("RESEND_API_KEY");
    
    if (!resendApiKey) {
      throw new Error("RESEND_API_KEY not configured");
    }

    const resend = new Resend(resendApiKey);
    const payload: WebhookPayload = await req.json();

    console.log("Received feedback webhook:", payload);

    if (payload.type !== 'INSERT' || payload.table !== 'feedback') {
      return new Response(JSON.stringify({ error: "Invalid webhook payload" }), {
        status: 400,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      });
    }

    const { name, email, message } = payload.record;

    // Send notification email to admin
    const adminEmailResponse = await resend.emails.send({
      from: "FormulaGenie Feedback <onboarding@resend.dev>",
      to: ["support@aifinovaedge.com"], // Admin email
      replyTo: email,
      subject: `New Feedback from ${name}`,
      html: `
        <h2>New Feedback Received</h2>
        <p><strong>From:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <hr style="margin: 20px 0;">
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\n/g, '<br>')}</p>
        <hr style="margin: 20px 0;">
        <p style="color: #666; font-size: 12px;">Reply directly to this email to respond to ${email}</p>
      `,
    });

    console.log("Admin notification sent:", adminEmailResponse);

    // Send confirmation email to user
    const userEmailResponse = await resend.emails.send({
      from: "FormulaGenie <onboarding@resend.dev>",
      to: [email],
      subject: "We received your feedback!",
      html: `
        <h2>Thank you for your feedback, ${name}!</h2>
        <p>We've received your message and will get back to you soon.</p>
        <hr style="margin: 20px 0;">
        <p><strong>Your message:</strong></p>
        <p>${message.replace(/\n/g, '<br>')}</p>
        <hr style="margin: 20px 0;">
        <p style="color: #666; font-size: 12px;">This is an automated confirmation. Our team will review your feedback and respond to ${email} shortly.</p>
      `,
    });

    console.log("User confirmation sent:", userEmailResponse);

    return new Response(JSON.stringify({ 
      success: true,
      adminEmail: adminEmailResponse,
      userEmail: userEmailResponse 
    }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });
  } catch (error: any) {
    console.error("Error in send-feedback-email function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
