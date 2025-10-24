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
      lemonSqueezyUrl: "https://xcel.lemonsqueezy.com/buy/f0d43528-f380-4b5a-9aea-02b471a0104d",
    },
    {
      name: "LTD Special",
      price: "$49",
      period: "lifetime",
      requests: "25 conversions/day",
      features: ["Everything in Pro", "Lifetime access", "Formula library", "Error detection", "Data analysis", "Formula optimization", "No recurring fees"],
      cta: "Get Lifetime Deal",
      popular: true,
      lemonSqueezyUrl: "https://xcel.lemonsqueezy.com/buy/a169b4c4-c7c8-4bed-a3e6-ead8aaf6ed8c?discount=0",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <Hero />

      {/* SEO Content Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-background">
        <div className="container max-w-6xl mx-auto">
          <div className="prose prose-lg max-w-none">
            <h2 className="text-3xl font-bold text-foreground mb-6 text-center">
              AI Excel Formula Generator - Free Online Tool
            </h2>
            <div className="text-muted-foreground space-y-4 text-center max-w-4xl mx-auto">
              <p className="text-lg leading-relaxed">
                Transform the way you work with Excel using our powerful <strong>AI Excel Formula Generator</strong>. 
                Whether you need to create complex formulas, analyze data, or generate charts, our free tool makes it simple. 
                Just describe what you want in plain English, and our Excel AI instantly converts your text instructions into 
                accurate formulas.
              </p>
              <p className="text-lg leading-relaxed">
                Our <strong>Excel AI tool</strong> supports formula generation, explanation, optimization, and error detection. 
                Beyond Excel, generate SQL queries, Python scripts, JavaScript code, and regular expressions - all from natural language. 
                Perfect for beginners and professionals looking to boost productivity and eliminate formula errors.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-secondary/30">
        <div className="container max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
              Everything you need for Excel, SQL, Python, JavaScript & more
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Powerful AI features designed to make coding and data work effortless and efficient.
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

                {(plan as any).lemonSqueezyUrl ? (
                  <Button 
                    className={`w-full ${plan.popular ? 'bg-gradient-primary text-primary-foreground hover:opacity-90 shadow-elegant' : ''}`}
                    variant={plan.popular ? 'default' : 'outline'}
                    onClick={() => window.open((plan as any).lemonSqueezyUrl, '_blank')}
                  >
                    {plan.cta}
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                ) : (
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
                )}
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
            <Button size="lg" variant="secondary" className="bg-white/10 text-white border-2 border-white hover:bg-white hover:text-primary backdrop-blur-sm" asChild>
              <Link to="/pricing">View Pricing</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 sm:px-6 lg:px-8 bg-secondary/30">
        <div className="container max-w-7xl mx-auto">
          <div className="flex flex-col sm:flex-row justify-between items-center mb-6">
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
              © 2024 AI Finova Edge. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;