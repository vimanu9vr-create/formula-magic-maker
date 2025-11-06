import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const Landing = () => {
  const { user } = useAuth();
  const features = [
    {
      title: "Excel Formula Generator",
      description: "Turn plain English into complex Excel formulas instantly.",
      popular: true,
    },
    {
      title: "SQL Query Assistant",
      description: "Generate queries from natural language for any database.",
    },
    {
      title: "Regex Simplifier",
      description: "Create regex patterns without memorizing syntax.",
    },
    {
      title: "Python Snippet Generator",
      description: "Generate Python functions from natural-language descriptions.",
    },
    {
      title: "Formula & Code Explainer",
      description: "Paste a formula/code — get instant plain-English explanation.",
    },
    {
      title: "Smart Error Fixer",
      description: "Auto-correct syntax and logic issues in Excel formulas.",
    },
    {
      title: "Multi-Language Support",
      description: "Generate code in multiple programming languages from the same natural language input.",
    },
    {
      title: "JavaScript Code Generator",
      description: "Create JavaScript snippets, functions, and automation from simple descriptions.",
    },
  ];

  const pricingPlans = [
    {
      name: "Free",
      price: "$0",
      period: "forever",
      requests: "5 requests/day",
      microcopy: "Perfect for testing the AI — up to 5 requests/day.",
      features: ["English to Formula", "Formula Explanation", "Basic Support"],
      cta: "Get Started Free",
      ctaArrow: true,
      popular: false,
    },
    {
      name: "Pro",
      price: "$9",
      period: "month",
      requests: "Unlimited requests",
      microcopy: "For daily users who rely on Excel or SQL.",
      features: ["Everything in Free", "Unlimited conversions", "Google Sheets add-on", "Priority support", "Advanced formulas"],
      cta: "Upgrade to Pro",
      ctaArrow: true,
      popular: false,
      lemonSqueezyUrl: "https://xcel.lemonsqueezy.com/buy/f0d43528-f380-4b5a-9aea-02b471a0104d",
    },
    {
      name: "Lifetime Deal",
      price: "$49",
      period: "one-time",
      requests: "25 conversions/day",
      microcopy: "One-time payment, unlimited power. No recurring fees.",
      features: ["Everything in Pro", "Google Sheets add-on", "Lifetime access", "Formula library", "Error detection", "Data analysis", "Formula optimization", "No recurring fees"],
      cta: "Grab Lifetime Access",
      ctaArrow: true,
      popular: true,
      lemonSqueezyUrl: "https://xcel.lemonsqueezy.com/buy/a169b4c4-c7c8-4bed-a3e6-ead8aaf6ed8c?discount=0",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <Hero />

      {/* Problem & Solution Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-secondary/30">
        <div className="container max-w-6xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-6">
            Built for Data Analysts Who Live in Excel
          </h2>
          <div className="text-muted-foreground space-y-4 max-w-4xl mx-auto">
            <p className="text-lg leading-relaxed">
              Every analyst knows the struggle — nested IFs, missing brackets, or Google searches for formulas that never quite fit.
            </p>
            <p className="text-lg leading-relaxed">
              <strong>FormulaGenie saves hours by translating your text into working formulas instantly</strong> — error-free and explained clearly.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 mt-12 max-w-4xl mx-auto">
            <Card className="p-6 text-center">
              <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center mb-4 mx-auto">
                <CheckCircle className="w-6 h-6 text-primary-foreground" />
              </div>
              <h3 className="font-bold text-foreground mb-2">Excel & Google Sheets</h3>
              <p className="text-sm text-muted-foreground">Works seamlessly with both platforms</p>
            </Card>
            
            <Card className="p-6 text-center">
              <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center mb-4 mx-auto">
                <CheckCircle className="w-6 h-6 text-primary-foreground" />
              </div>
              <h3 className="font-bold text-foreground mb-2">SQL Queries</h3>
              <p className="text-sm text-muted-foreground">For data extraction and analysis</p>
            </Card>
            
            <Card className="p-6 text-center">
              <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center mb-4 mx-auto">
                <CheckCircle className="w-6 h-6 text-primary-foreground" />
              </div>
              <h3 className="font-bold text-foreground mb-2">Python & JavaScript</h3>
              <p className="text-sm text-muted-foreground">Snippets for automation</p>
            </Card>
          </div>
          
          <p className="text-xl font-semibold text-foreground mt-12">
            Just tell it what you want. FormulaGenie writes it for you.
          </p>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-background">
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
              <Card key={index} className={`p-6 hover:shadow-soft transition-shadow ${(feature as any).popular ? 'border-primary ring-1 ring-primary/20' : ''}`}>
                {(feature as any).popular && (
                  <div className="inline-block bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-medium mb-3">
                    ⭐ Most Used by Analysts
                  </div>
                )}
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

      {/* Google Sheets Integration Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-primary/10">
        <div className="container max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-block bg-gradient-primary text-primary-foreground px-4 py-2 rounded-full text-sm font-medium mb-4">
                Now Available
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-6">
                Now in Google Sheets — Generate Formulas Without Leaving Your Spreadsheet
              </h2>
              <p className="text-lg text-muted-foreground mb-6">
                With the FormulaGenie Sheets Add-on, you can generate formulas, SQL queries, and regex patterns right inside your sheet. No tab-switching. No copy-pasting. Just pure flow.
              </p>
              <ul className="space-y-4 mb-8">
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-primary mr-3 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-foreground">Work directly in Google Sheets</p>
                    <p className="text-sm text-muted-foreground">Generate formulas without leaving your spreadsheet</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-primary mr-3 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-foreground">Easy API integration</p>
                    <p className="text-sm text-muted-foreground">Secure API keys for seamless access</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-primary mr-3 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-foreground">Available for all paid plans</p>
                    <p className="text-sm text-muted-foreground">Included with Pro and LTD subscriptions</p>
                  </div>
                </li>
              </ul>
              <Button size="lg" className="bg-gradient-primary text-primary-foreground hover:opacity-90 shadow-elegant" asChild>
                <Link to={user ? "/google-sheets-addon" : "/auth"}>
                  Install the Sheets Add-on
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Link>
              </Button>
            </div>
            <div className="relative">
              <Card className="p-6 shadow-elegant">
                <div className="bg-muted rounded-lg p-4 mb-4">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  </div>
                  <div className="space-y-2 text-sm font-mono">
                    <div className="bg-background p-2 rounded">
                      <span className="text-primary">function</span> <span className="text-foreground">FORMULAGENIE</span>
                    </div>
                    <div className="bg-background p-2 rounded text-muted-foreground">
                      Generate formulas in real-time
                    </div>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span className="text-sm text-foreground">Formula generation</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span className="text-sm text-foreground">SQL queries</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span className="text-sm text-foreground">Regex patterns</span>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Excel Formula Tools & Guides Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-primary/5">
        <div className="container max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
              Free Excel Formula Tools & Guides
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Explore ready-made AI generators for common analyst formulas — from VLOOKUPs and Pivot Tables to SUMIFS and advanced date formulas.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Link to="/vlookup-generator">
              <Card className="p-6 hover:shadow-elegant transition-all hover:scale-105 h-full">
                <h3 className="font-bold text-lg text-foreground mb-2">VLOOKUP Generator</h3>
                <p className="text-sm text-muted-foreground">Create VLOOKUP formulas instantly with AI</p>
              </Card>
            </Link>

            <Link to="/if-formula-generator">
              <Card className="p-6 hover:shadow-elegant transition-all hover:scale-105 h-full">
                <h3 className="font-bold text-lg text-foreground mb-2">IF Formula Generator</h3>
                <p className="text-sm text-muted-foreground">Generate IF statements and nested conditions</p>
              </Card>
            </Link>

            <Link to="/sumif-generator">
              <Card className="p-6 hover:shadow-elegant transition-all hover:scale-105 h-full">
                <h3 className="font-bold text-lg text-foreground mb-2">SUMIF & SUMIFS Generator</h3>
                <p className="text-sm text-muted-foreground">Create conditional sum formulas easily</p>
              </Card>
            </Link>

            <Link to="/index-match-generator">
              <Card className="p-6 hover:shadow-elegant transition-all hover:scale-105 h-full">
                <h3 className="font-bold text-lg text-foreground mb-2">INDEX MATCH Generator</h3>
                <p className="text-sm text-muted-foreground">Better than VLOOKUP - powerful lookup formulas</p>
              </Card>
            </Link>

            <Link to="/pivot-table-guide">
              <Card className="p-6 hover:shadow-elegant transition-all hover:scale-105 h-full">
                <h3 className="font-bold text-lg text-foreground mb-2">Pivot Table Guide</h3>
                <p className="text-sm text-muted-foreground">Master pivot tables and GETPIVOTDATA</p>
              </Card>
            </Link>

            <Link to="/vlookup-tutorial">
              <Card className="p-6 hover:shadow-elegant transition-all hover:scale-105 h-full">
                <h3 className="font-bold text-lg text-foreground mb-2">VLOOKUP Tutorial</h3>
                <p className="text-sm text-muted-foreground">Complete step-by-step VLOOKUP guide</p>
              </Card>
            </Link>

            <Link to="/excel-date-formulas">
              <Card className="p-6 hover:shadow-elegant transition-all hover:scale-105 h-full">
                <h3 className="font-bold text-lg text-foreground mb-2">Excel Date Formulas</h3>
                <p className="text-sm text-muted-foreground">TODAY, DATE, DATEDIF and more</p>
              </Card>
            </Link>

            <Link to="/excel-tips-tricks">
              <Card className="p-6 hover:shadow-elegant transition-all hover:scale-105 h-full">
                <h3 className="font-bold text-lg text-foreground mb-2">Excel Tips & Tricks</h3>
                <p className="text-sm text-muted-foreground">Boost productivity with shortcuts and hacks</p>
              </Card>
            </Link>

            <Link to="/common-excel-formulas">
              <Card className="p-6 hover:shadow-elegant transition-all hover:scale-105 h-full">
                <h3 className="font-bold text-lg text-foreground mb-2">Common Excel Formulas</h3>
                <p className="text-sm text-muted-foreground">Quick reference for essential functions</p>
              </Card>
            </Link>

            <Link to="/conditional-formatting-guide">
              <Card className="p-6 hover:shadow-elegant transition-all hover:scale-105 h-full">
                <h3 className="font-bold text-lg text-foreground mb-2">Conditional Formatting</h3>
                <p className="text-sm text-muted-foreground">Visualize data with dynamic formatting</p>
              </Card>
            </Link>
          </div>
        </div>
      </section>

      {/* Pricing Preview Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="container max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
              Simple Plans. Serious Productivity.
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
                  <p className="text-sm text-muted-foreground mb-3">{plan.requests}</p>
                  <p className="text-xs text-muted-foreground italic">{(plan as any).microcopy}</p>
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
                    {(plan as any).ctaArrow && <ArrowRight className="ml-2 w-4 h-4" />}
                  </Button>
                ) : (
                  <Button 
                    className={`w-full ${plan.popular ? 'bg-gradient-primary text-primary-foreground hover:opacity-90 shadow-elegant' : ''}`}
                    variant={plan.popular ? 'default' : 'outline'}
                    asChild
                  >
                    <Link to={user ? "/dashboard" : "/auth"}>
                      {plan.cta}
                      {(plan as any).ctaArrow && <ArrowRight className="ml-2 w-4 h-4" />}
                    </Link>
                  </Button>
                )}
              </Card>
            ))}
          </div>
          
          <p className="text-center text-sm text-muted-foreground mt-12">
            Trusted by 500+ analysts, freelancers, and businesses worldwide.
          </p>
        </div>
      </section>

      {/* Social Proof Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-background">
        <div className="container max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
              What Early Users Are Saying
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Real feedback from data professionals who've transformed their workflow
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="p-6 hover:shadow-elegant transition-shadow animate-fade-in">
              <div className="flex items-center mb-4">
                <div className="flex text-yellow-500 mb-2">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                      <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                    </svg>
                  ))}
                </div>
              </div>
              <p className="text-muted-foreground mb-4">
                "I saved 2 hours cleaning data with FormulaGenie."
              </p>
              <div className="flex items-center">
                <div className="w-10 h-10 bg-gradient-primary rounded-full flex items-center justify-center text-primary-foreground font-semibold">
                  A
                </div>
                <div className="ml-3">
                  <p className="font-semibold text-foreground">Anjali</p>
                  <p className="text-sm text-muted-foreground">Data Analyst</p>
                </div>
              </div>
            </Card>

            <Card className="p-6 hover:shadow-elegant transition-shadow animate-fade-in" style={{ animationDelay: "0.1s" }}>
              <div className="flex items-center mb-4">
                <div className="flex text-yellow-500 mb-2">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                      <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                    </svg>
                  ))}
                </div>
              </div>
              <p className="text-muted-foreground mb-4">
                "No more Googling syntax. It just works."
              </p>
              <div className="flex items-center">
                <div className="w-10 h-10 bg-gradient-primary rounded-full flex items-center justify-center text-primary-foreground font-semibold">
                  T
                </div>
                <div className="ml-3">
                  <p className="font-semibold text-foreground">Tom</p>
                  <p className="text-sm text-muted-foreground">BI Consultant</p>
                </div>
              </div>
            </Card>

            <Card className="p-6 hover:shadow-elegant transition-shadow animate-fade-in" style={{ animationDelay: "0.2s" }}>
              <div className="flex items-center mb-4">
                <div className="flex text-yellow-500 mb-2">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                      <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                    </svg>
                  ))}
                </div>
              </div>
              <p className="text-muted-foreground mb-4">
                "The Sheets add-on changed my workflow."
              </p>
              <div className="flex items-center">
                <div className="w-10 h-10 bg-gradient-primary rounded-full flex items-center justify-center text-primary-foreground font-semibold">
                  R
                </div>
                <div className="ml-3">
                  <p className="font-semibold text-foreground">Raj</p>
                  <p className="text-sm text-muted-foreground">Finance Analyst</p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-secondary/30">
        <div className="container max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-muted-foreground">
              Everything you need to know about FormulaGenie
            </p>
          </div>

          <Accordion type="single" collapsible className="w-full space-y-4">
            <AccordionItem value="item-1" className="border border-border bg-card rounded-lg px-6">
              <AccordionTrigger className="text-left hover:no-underline">
                <span className="font-semibold text-lg text-foreground">
                  How does FormulaGenie work?
                </span>
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground pb-4">
                Simply describe what you want in plain English, and our AI instantly converts it into the correct Excel formula, SQL query, or code. You can also paste existing formulas to get clear explanations.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-2" className="border border-border bg-card rounded-lg px-6">
              <AccordionTrigger className="text-left hover:no-underline">
                <span className="font-semibold text-lg text-foreground">
                  Do I need to know Excel formulas to use this?
                </span>
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground pb-4">
                Not at all! That's the beauty of FormulaGenie. You just describe what you want in simple terms, and we handle the complex formula syntax. It's perfect for beginners and experts alike.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-3" className="border border-border bg-card rounded-lg px-6">
              <AccordionTrigger className="text-left hover:no-underline">
                <span className="font-semibold text-lg text-foreground">
                  What's included in the free plan?
                </span>
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground pb-4">
                The free plan includes 5 formula conversions per day, formula explanations, and basic support. It's perfect for trying out FormulaGenie and occasional use.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-4" className="border border-border bg-card rounded-lg px-6">
              <AccordionTrigger className="text-left hover:no-underline">
                <span className="font-semibold text-lg text-foreground">
                  Can I use this with Google Sheets?
                </span>
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground pb-4">
                Yes! FormulaGenie works with both Excel and Google Sheets. Most formulas are compatible between the two platforms, and our AI understands the context.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-5" className="border border-border bg-card rounded-lg px-6">
              <AccordionTrigger className="text-left hover:no-underline">
                <span className="font-semibold text-lg text-foreground">
                  What if I'm not satisfied with my purchase?
                </span>
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground pb-4">
                We offer a 14-day money-back guarantee on all paid plans. If you're not completely satisfied, just contact us for a full refund—no questions asked.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-6" className="border border-border bg-card rounded-lg px-6">
              <AccordionTrigger className="text-left hover:no-underline">
                <span className="font-semibold text-lg text-foreground">
                  Does FormulaGenie support other programming languages?
                </span>
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground pb-4">
                Absolutely! In addition to Excel formulas, FormulaGenie can generate SQL queries, Python scripts, JavaScript code, and regular expressions—all from natural language descriptions.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-hero relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/30 to-transparent"></div>
        <div className="container max-w-4xl mx-auto text-center relative z-10">
          <h2 className="text-3xl sm:text-4xl font-bold text-primary-foreground mb-6">
            Ready to Let AI Handle Your Excel Formulas?
          </h2>
          <p className="text-xl text-primary-foreground/90 mb-8 max-w-2xl mx-auto">
            Join hundreds of data analysts who've eliminated formula frustration forever.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" className="bg-white text-primary hover:bg-white/90 shadow-elegant" asChild>
              <Link to={user ? "/dashboard" : "/auth"}>
                Try FormulaGenie Free
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