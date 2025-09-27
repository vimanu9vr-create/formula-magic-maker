import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";

const Landing = () => {
  const { user } = useAuth();
  const features = [
    {
      title: "English to Formula",
      description: "Convert plain English descriptions into perfect Excel formulas instantly.",
    },
    {
      title: "SQL Query Generator",
      description: "Generate complex SQL queries from natural language descriptions for any database.",
    },
    {
      title: "Regex Pattern Builder",
      description: "Create and test regular expressions with plain English input and explanations.",
    },
    {
      title: "Python Code Generator",
      description: "Generate Python scripts and functions from natural language requirements.",
    },
    {
      title: "JavaScript Generator",
      description: "Create JavaScript code snippets, functions, and logic from simple descriptions.",
    },
    {
      title: "Code Explanation",
      description: "Paste complex code and get clear, simple explanations of what it does.",
    },
    {
      title: "Multi-Language Support",
      description: "Generate code in multiple programming languages from the same natural language input.",
    },
    {
      title: "Error Detection & Fixes",
      description: "Automatically detect syntax errors and get intelligent suggestions for fixes.",
    },
  ];

  const pricingPlans = [
    {
      name: "Free",
      price: "$0",
      period: "forever",
      requests: "5 requests/day",
      features: ["English to Formula", "Formula Explanation", "Basic Support"],
      cta: "Get Started",
      popular: false,
    },
    {
      name: "Pro",
      price: "$9",
      period: "month",
      requests: "Unlimited requests",
      features: ["Everything in Free", "Unlimited conversions", "Priority support", "Advanced formulas"],
      cta: "Start Pro Trial",
      popular: false,
    },
    {
      name: "LTD Special",
      price: "$49",
      period: "lifetime",
      requests: "Unlimited forever",
      features: ["Everything in Pro", "Lifetime access", "Formula library", "Error detection", "Data analysis", "Formula optimization", "No recurring fees"],
      cta: "Get Lifetime Deal",
      popular: true,
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <Hero />

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-secondary/30">
        <div className="container max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
              Everything you need to master Excel formulas
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Powerful features designed to make spreadsheet work effortless and efficient.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="p-6 hover:shadow-soft transition-shadow">
                <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center mb-4">
                  <CheckCircle className="w-6 h-6 text-primary-foreground" />
                </div>
                <h3 className="font-bold text-lg text-foreground mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Preview Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="container max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
              Simple, transparent pricing
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Choose the plan that's right for you. Start free, upgrade when you need more.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {pricingPlans.map((plan, index) => (
              <Card 
                key={index} 
                className={`p-8 relative ${plan.popular ? 'border-primary ring-1 ring-primary/20 shadow-elegant' : ''}`}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <span className="bg-gradient-primary text-primary-foreground px-4 py-1 rounded-full text-sm font-medium">
                      Most Popular
                    </span>
                  </div>
                )}
                
                <div className="text-center mb-6">
                  <h3 className="font-bold text-xl text-foreground mb-2">{plan.name}</h3>
                  <div className="mb-2">
                    <span className="text-4xl font-bold text-foreground">{plan.price}</span>
                    <span className="text-muted-foreground">/{plan.period}</span>
                  </div>
                  <p className="text-sm text-muted-foreground">{plan.requests}</p>
                </div>

                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center">
                      <CheckCircle className="w-4 h-4 text-primary mr-3 flex-shrink-0" />
                      <span className="text-sm text-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Button 
                  className={`w-full ${plan.popular ? 'bg-gradient-primary text-primary-foreground hover:opacity-90 shadow-elegant' : ''}`}
                  variant={plan.popular ? 'default' : 'outline'}
                  asChild
                >
                  <Link to={user ? "/dashboard" : "/auth"}>
                    {plan.cta}
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Link>
                </Button>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-hero">
        <div className="container max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-primary-foreground mb-6">
            Ready to transform your spreadsheet workflow?
          </h2>
          <p className="text-xl text-primary-foreground/90 mb-8 max-w-2xl mx-auto">
            Join thousands of professionals who've already simplified their Excel work with FormulaGenie.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" className="bg-white text-primary hover:bg-white/90" asChild>
              <Link to={user ? "/dashboard" : "/auth"}>
                Start Free Trial
                <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="border-white/20 text-primary-foreground hover:bg-white/10" asChild>
              <Link to="/pricing">View Pricing</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 sm:px-6 lg:px-8 bg-secondary/30">
        <div className="container max-w-7xl mx-auto">
          <div className="flex flex-col sm:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 sm:mb-0">
              <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-lg">F</span>
              </div>
              <span className="font-bold text-xl text-foreground">FormulaGenie</span>
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

export default Landing;