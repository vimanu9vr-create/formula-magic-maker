import { CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Link } from "react-router-dom";

const PurchaseSuccess = () => {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <Card className="max-w-2xl w-full p-8 sm:p-12 text-center shadow-elegant">
        <div className="mb-6 flex justify-center">
          <div className="w-20 h-20 rounded-full bg-gradient-primary flex items-center justify-center shadow-orange-glow">
            <CheckCircle className="w-12 h-12 text-primary-foreground" />
          </div>
        </div>
        
        <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
          Payment Successful! 🎉
        </h1>
        
        <p className="text-lg text-muted-foreground mb-8">
          Thank you for your purchase! Your plan has been activated and is ready to use.
        </p>
        
        <div className="bg-secondary/50 rounded-lg p-6 mb-8 text-left">
          <h2 className="font-semibold text-foreground mb-3">Next Steps:</h2>
          <ol className="space-y-2 text-muted-foreground">
            <li className="flex items-start">
              <span className="font-semibold text-primary mr-2">1.</span>
              <span>Sign up or log in using the <strong>same email address</strong> you used for this purchase</span>
            </li>
            <li className="flex items-start">
              <span className="font-semibold text-primary mr-2">2.</span>
              <span>Your plan will be automatically activated on your account</span>
            </li>
            <li className="flex items-start">
              <span className="font-semibold text-primary mr-2">3.</span>
              <span>Start generating formulas and code immediately!</span>
            </li>
          </ol>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button 
            size="lg" 
            className="bg-gradient-primary text-primary-foreground hover:opacity-90 shadow-elegant"
            asChild
          >
            <Link to="/auth">
              Continue to Sign In
            </Link>
          </Button>
          <Button 
            size="lg" 
            variant="outline"
            asChild
          >
            <Link to="/landing">
              Back to Home
            </Link>
          </Button>
        </div>
        
        <p className="text-sm text-muted-foreground mt-8">
          Need help? Contact us at <a href="mailto:support@formulagenie.com" className="text-primary hover:underline">support@formulagenie.com</a>
        </p>
      </Card>
    </div>
  );
};

export default PurchaseSuccess;
