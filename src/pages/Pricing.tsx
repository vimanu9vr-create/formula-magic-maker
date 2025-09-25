import Navigation from "@/components/Navigation";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle, ArrowRight, X } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";

const Pricing = () => {
  const { user } = useAuth();
  const plans = [
    {
      name: "LTD Launch Special",
      price: "$49",
      period: "lifetime",
      description: "Limited time launch offer - Pay once, use forever",
      requests: "Unlimited requests forever",
      features: [
        "Everything in Pro plan",
        "Unlimited conversions forever",
        "Advanced formula support",
        "Priority email support",
        "Formula history & saved templates",
        "Complex nested formulas",
        "Array formulas support",
        "No monthly fees ever",
        "Future updates included"
      ],
      limitations: [],
      cta: "Get Lifetime Access",
      popular: true,
      gumroadUrl: "https://vimanu.gumroad.com/l/vhizte",
      badge: "Launch Special",
    },
    {
      name: "Free",
      price: "$0",
      period: "forever",
      description: "Perfect for trying out FormulaGenie",
      requests: "5 requests per day",
      features: [
        "English to Formula conversion",
        "Formula explanation",
        "Basic support",
        "Excel & Google Sheets support"
      ],
      limitations: [
        "Limited to 5 requests daily",
        "Basic formulas only"
      ],
      cta: "Get Started Free",
      popular: false,
    },
    {
      name: "Pro",
      price: "$19",
      period: "month",
      description: "For professionals who work with spreadsheets daily",
      requests: "Unlimited requests",
      features: [
        "Everything in Free",
        "Unlimited conversions",
        "Advanced formula support",
        "Priority email support",
        "Formula history & saved templates",
        "Complex nested formulas",
        "Array formulas support"
      ],
      limitations: [],
      cta: "Subscribe Monthly",
      popular: false,
      gumroadUrl: "https://aiformulagenie.gumroad.com/l/pxkfyo",
    },
    {
      name: "Team",
      price: "$59", 
      period: "month",
      description: "For teams collaborating on spreadsheet projects",
      requests: "Unlimited requests for all members",
      features: [
        "Everything in Pro",
        "Shared formula library",
        "Team collaboration tools",
        "Admin dashboard",
        "User management",
        "Team analytics",
        "Priority phone support",
        "Custom integrations"
      ],
      limitations: [],
      cta: "Contact Sales",
      popular: false,
      gumroadUrl: "https://your-username.gumroad.com/l/formulagenie-team", // Replace with your actual Gumroad URL
    },
  ];

  const faqs = [
    {
      question: "Can I change my plan anytime?",
      answer: "Yes, you can upgrade or downgrade your plan at any time. Changes take effect immediately and we'll prorate the billing."
    },
    {
      question: "What happens when I reach my daily limit on the free plan?",
      answer: "You'll need to wait until the next day (resets at midnight UTC) or upgrade to a paid plan for unlimited access."
    },
    {
      question: "Do you support Google Sheets formulas?",
      answer: "Yes! FormulaGenie works with both Excel and Google Sheets formulas, automatically detecting the format you need."
    },
    {
      question: "Is there a refund policy?",
      answer: "We offer a 30-day money-back guarantee on all paid plans. If you're not satisfied, we'll refund your payment."
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <section className="pt-24 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="container max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-6">
              Choose your plan
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
              Start free and upgrade when you need more power. All plans include our core formula conversion features.
            </p>
            
            <div className="inline-flex items-center p-1 bg-secondary rounded-lg">
              <button className="px-4 py-2 text-sm font-medium bg-background text-foreground rounded-md shadow-sm">
                Monthly
              </button>
              <button className="px-4 py-2 text-sm font-medium text-muted-foreground">
                Annual (Save 20%)
              </button>
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto mb-20">
            {plans.map((plan, index) => (
              <Card 
                key={index} 
                className={`p-8 relative ${plan.popular ? 'border-primary ring-2 ring-primary/20 shadow-elegant scale-105' : ''}`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-gradient-primary text-primary-foreground px-6 py-2 rounded-full text-sm font-medium shadow-orange-glow animate-pulse-glow">
                      {plan.badge || "Most Popular"}
                    </span>
                  </div>
                )}
                
                <div className="text-center mb-8">
                  <h3 className="font-bold text-2xl text-foreground mb-2">{plan.name}</h3>
                  <p className="text-muted-foreground mb-4">{plan.description}</p>
                  <div className="mb-2">
                    <span className="text-5xl font-bold text-foreground">{plan.price}</span>
                    <span className="text-muted-foreground text-lg">/{plan.period}</span>
                  </div>
                  <p className="text-sm font-medium text-primary">{plan.requests}</p>
                </div>

                <div className="mb-8">
                  <h4 className="font-semibold text-foreground mb-4">What's included:</h4>
                  <ul className="space-y-3">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-primary mr-3 flex-shrink-0 mt-0.5" />
                        <span className="text-sm text-foreground">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  {plan.limitations.length > 0 && (
                    <div className="mt-6">
                      <h4 className="font-semibold text-muted-foreground mb-3">Limitations:</h4>
                      <ul className="space-y-2">
                        {plan.limitations.map((limitation, limitIndex) => (
                          <li key={limitIndex} className="flex items-start">
                            <X className="w-4 h-4 text-muted-foreground mr-3 flex-shrink-0 mt-0.5" />
                            <span className="text-sm text-muted-foreground">{limitation}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>

                {plan.gumroadUrl ? (
                  <Button 
                    className={`w-full ${plan.popular ? 'bg-gradient-primary text-primary-foreground hover:opacity-90 shadow-orange-glow hover:shadow-orange-intense transition-glow' : ''}`}
                    variant={plan.popular ? 'default' : 'outline'}
                    size="lg"
                    onClick={() => window.open(plan.gumroadUrl, '_blank')}
                  >
                    {plan.cta}
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                ) : (
                  <Button 
                    className={`w-full ${plan.popular ? 'bg-gradient-primary text-primary-foreground hover:opacity-90 shadow-elegant' : ''}`}
                    variant={plan.popular ? 'default' : 'outline'}
                    size="lg"
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

          {/* FAQ Section */}
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center text-foreground mb-12">
              Frequently Asked Questions
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              {faqs.map((faq, index) => (
                <Card key={index} className="p-6">
                  <h3 className="font-semibold text-foreground mb-3">{faq.question}</h3>
                  <p className="text-muted-foreground">{faq.answer}</p>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-hero">
        <div className="container max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-primary-foreground mb-6">
            Still have questions?
          </h2>
          <p className="text-xl text-primary-foreground/90 mb-8">
            Our team is here to help you choose the right plan for your needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" className="bg-white text-primary hover:bg-white/90" asChild>
              <Link to="/auth">Contact Sales</Link>
            </Button>
            <Button size="lg" variant="outline" className="border-white/20 text-primary-foreground hover:bg-white/10" asChild>
              <Link to={user ? "/dashboard" : "/auth"}>Start Free Trial</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Pricing;