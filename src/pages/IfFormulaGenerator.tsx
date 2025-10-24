import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Link } from "react-router-dom";
import { ArrowRight, CheckCircle } from "lucide-react";
import { Helmet } from "react-helmet";
import { useState } from "react";

export default function IfFormulaGenerator() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("=IF(logical_test, value_if_true, value_if_false)");

  return (
    <>
      <Helmet>
        <title>Excel IF Formula Generator - Create IF Statements Easily | FormulaGenie</title>
        <meta name="description" content="Generate Excel IF formulas instantly. Create simple IF statements, nested IFs, and complex conditional logic with our free AI-powered tool." />
        <meta property="og:title" content="Excel IF Formula Generator - Create IF Statements Easily" />
        <meta property="og:description" content="Generate Excel IF formulas instantly. Create simple IF statements, nested IFs, and complex conditional logic." />
      </Helmet>

      <div className="min-h-screen bg-background">
        <Navigation />
        
        <main className="container mx-auto px-4 pt-24 pb-16">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary via-purple-600 to-indigo-600 text-transparent bg-clip-text">
                Excel IF Formula Generator
              </h1>
              <p className="text-xl text-muted-foreground mb-6">
                Create conditional formulas with IF statements effortlessly
              </p>
              <Link to="/auth">
                <Button size="lg" className="gap-2">
                  Generate IF Formula <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>

            <Card className="p-6 mb-12 border-2 shadow-elegant">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Describe Your Condition</label>
                  <Textarea
                    placeholder="Example: If sales are greater than 1000, show 'High', otherwise show 'Low'"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    className="min-h-[100px] border-2 border-primary/20 focus:border-primary focus:ring-2 focus:ring-primary/20 bg-background"
                  />
                </div>
                
                <div className="border-t-2 border-primary/10" />
                
                <div>
                  <label className="block text-sm font-medium mb-2">Generated IF Formula</label>
                  <div className="bg-primary/5 p-4 rounded-lg border-2 border-primary/20 text-foreground font-mono">
                    {output}
                  </div>
                </div>
              </div>
            </Card>

            <div className="grid md:grid-cols-2 gap-8 mb-12">
              <div>
                <h2 className="text-2xl font-bold mb-4">Understanding IF Formulas</h2>
                <p className="text-muted-foreground mb-4">
                  The IF function tests a condition and returns one value if true and another if false. It's the foundation of conditional logic in Excel.
                </p>
                <h3 className="text-xl font-semibold mb-2">IF Syntax</h3>
                <code className="block bg-muted p-3 rounded text-sm">
                  =IF(logical_test, value_if_true, value_if_false)
                </code>
              </div>

              <div>
                <h2 className="text-2xl font-bold mb-4">Popular Applications</h2>
                <ul className="space-y-2 text-muted-foreground">
                  <li className="flex gap-2">
                    <CheckCircle className="h-5 w-5 text-primary flex-shrink-0" />
                    <span>Pass/Fail grade calculations</span>
                  </li>
                  <li className="flex gap-2">
                    <CheckCircle className="h-5 w-5 text-primary flex-shrink-0" />
                    <span>Sales commission calculations</span>
                  </li>
                  <li className="flex gap-2">
                    <CheckCircle className="h-5 w-5 text-primary flex-shrink-0" />
                    <span>Budget variance analysis</span>
                  </li>
                  <li className="flex gap-2">
                    <CheckCircle className="h-5 w-5 text-primary flex-shrink-0" />
                    <span>Data validation and error checking</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="mb-12">
              <h2 className="text-2xl font-bold mb-4">IF Formula Examples</h2>
              <div className="space-y-4">
                <Card className="p-4">
                  <h3 className="font-semibold mb-2">Simple IF Statement</h3>
                  <code className="block bg-muted p-3 rounded text-sm">
                    =IF(A1&gt;100, "High", "Low")
                  </code>
                  <p className="text-sm text-muted-foreground mt-2">
                    Returns "High" if A1 is greater than 100, otherwise "Low"
                  </p>
                </Card>

                <Card className="p-4">
                  <h3 className="font-semibold mb-2">Nested IF Statement</h3>
                  <code className="block bg-muted p-3 rounded text-sm">
                    =IF(A1&gt;=90, "A", IF(A1&gt;=80, "B", IF(A1&gt;=70, "C", "F")))
                  </code>
                  <p className="text-sm text-muted-foreground mt-2">
                    Multiple conditions for letter grades based on score
                  </p>
                </Card>

                <Card className="p-4">
                  <h3 className="font-semibold mb-2">IF with AND Function</h3>
                  <code className="block bg-muted p-3 rounded text-sm">
                    =IF(AND(A1&gt;=18, B1="Active"), "Eligible", "Not Eligible")
                  </code>
                  <p className="text-sm text-muted-foreground mt-2">
                    Tests multiple conditions - both must be true
                  </p>
                </Card>
              </div>
            </div>

            <div className="text-center">
              <Link to="/auth">
                <Button size="lg" className="gap-2">
                  Start Creating IF Formulas <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
