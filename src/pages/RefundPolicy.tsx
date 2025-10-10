import Navigation from "@/components/Navigation";
import { Link } from "react-router-dom";

const RefundPolicy = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="pt-24 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="container max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-foreground mb-8">Refund Policy</h1>
          
          <div className="prose prose-slate dark:prose-invert max-w-none space-y-6 text-foreground">
            <section>
              <h2 className="text-2xl font-semibold mb-4">30-Day Money-Back Guarantee</h2>
              <p className="text-muted-foreground mb-4">
                We stand behind the quality of FormulaGenie. If you're not completely satisfied with your purchase, we offer a 30-day money-back guarantee for all paid plans.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">Eligibility for Refunds</h2>
              <p className="text-muted-foreground mb-4">
                You are eligible for a full refund if:
              </p>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                <li>You request a refund within 30 days of your purchase date</li>
                <li>You have a valid reason for requesting a refund</li>
                <li>You purchased a Pro monthly subscription or Lifetime Deal (LTD)</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">Non-Refundable Situations</h2>
              <p className="text-muted-foreground mb-4">
                Refunds will not be provided in the following cases:
              </p>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                <li>Requests made after 30 days from the purchase date</li>
                <li>Violation of our Terms of Service</li>
                <li>Abuse of the refund policy</li>
                <li>After significant usage that indicates full acceptance of the service</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">How to Request a Refund</h2>
              <p className="text-muted-foreground mb-4">
                To request a refund, please follow these steps:
              </p>
              <ol className="list-decimal pl-6 text-muted-foreground space-y-2">
                <li>Contact our support team through the contact form or email</li>
                <li>Include your order number or account email</li>
                <li>Provide a brief explanation for your refund request</li>
                <li>Allow 5-7 business days for processing</li>
              </ol>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">Processing Time</h2>
              <p className="text-muted-foreground mb-4">
                Once your refund request is approved, it will be processed within 5-7 business days. The refund will be credited to the original payment method used during purchase. Please note that it may take an additional 3-5 business days for the refund to appear in your account, depending on your bank or payment provider.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">Subscription Cancellations</h2>
              <p className="text-muted-foreground mb-4">
                For monthly Pro subscriptions:
              </p>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                <li>You can cancel your subscription at any time from your account settings</li>
                <li>Cancellations take effect at the end of the current billing period</li>
                <li>You will retain access to Pro features until the end of your paid period</li>
                <li>No partial refunds are provided for unused portions of the billing cycle after the 30-day guarantee period</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">Lifetime Deal (LTD) Refunds</h2>
              <p className="text-muted-foreground mb-4">
                Lifetime Deal purchases are eligible for refunds within 30 days of purchase. After this period, all LTD sales are final due to the nature of the one-time payment structure.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">Account Closure</h2>
              <p className="text-muted-foreground mb-4">
                If you receive a refund, your premium account will be downgraded to the free tier, and you will lose access to all premium features. Any saved formulas and history will be retained according to free tier limitations.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">Technical Issues</h2>
              <p className="text-muted-foreground mb-4">
                If you experience technical issues preventing you from using the service, please contact our support team before requesting a refund. We're committed to resolving technical problems and ensuring you have a smooth experience with FormulaGenie.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">Changes to This Policy</h2>
              <p className="text-muted-foreground mb-4">
                We reserve the right to modify this Refund Policy at any time. Changes will be effective immediately upon posting to our website. Your continued use of the service after changes constitutes acceptance of the modified policy.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">Contact Information</h2>
              <p className="text-muted-foreground mb-4">
                If you have any questions about our Refund Policy or need to request a refund, please contact our support team through the available support channels.
              </p>
            </section>

            <p className="text-sm text-muted-foreground mt-8">
              Last updated: {new Date().toLocaleDateString()}
            </p>
          </div>

          <div className="mt-8">
            <Link to="/" className="text-primary hover:underline">
              ← Back to Home
            </Link>
          </div>
        </div>
      </main>

      <footer className="py-12 px-4 sm:px-6 lg:px-8 bg-secondary/30">
        <div className="container max-w-7xl mx-auto">
          <div className="flex flex-col sm:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 sm:mb-0">
              <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-lg">F</span>
              </div>
              <span className="font-bold text-xl text-foreground">FormulaGenie</span>
            </div>
            <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 mb-4 sm:mb-0">
              <Link to="/terms" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Terms</Link>
              <Link to="/privacy" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Privacy</Link>
              <Link to="/refund" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Refund Policy</Link>
            </div>
            <p className="text-sm text-muted-foreground">
              © 2024 FormulaGenie. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default RefundPolicy;
