import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Link } from "react-router-dom";
import { ArrowRight, Calculator } from "lucide-react";
import { Helmet } from "react-helmet";
import { useState } from "react";

export default function SumifGenerator() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("=SUMIF(range, criteria, [sum_range])");

  return (
    <>
      <Helmet>
        <title>Excel SUMIF & SUMIFS Generator - Conditional Sum Formulas | FormulaGenie</title>
        <meta name="description" content="Create SUMIF and SUMIFS formulas instantly. Generate conditional sum formulas for single or multiple criteria with our free Excel formula tool." />
        <meta property="og:title" content="Excel SUMIF & SUMIFS Generator - Conditional Sum Formulas" />
        <meta property="og:description" content="Create SUMIF and SUMIFS formulas instantly. Generate conditional sum formulas for Excel." />
      </Helmet>

      <div className="min-h-screen bg-background">
        <Navigation />
        
        <main className="container mx-auto px-4 pt-24 pb-16">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary via-purple-600 to-indigo-600 text-transparent bg-clip-text">
                SUMIF & SUMIFS Generator
              </h1>
              <p className="text-xl text-muted-foreground mb-6">
                Generate conditional sum formulas for Excel in seconds
              </p>
              <Link to="/auth">
                <Button size="lg" className="gap-2">
                  Generate SUMIF Formula <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>

            <Card className="p-6 mb-12 border-2 shadow-elegant">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Describe Your Sum Criteria</label>
                  <Textarea
                    placeholder="Example: Sum all sales values where the region is 'North' and amount is greater than 500"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    className="min-h-[100px] border-2 border-primary/20 focus:border-primary focus:ring-2 focus:ring-primary/20 bg-background"
                  />
                </div>
                
                <div className="border-t-2 border-primary/10" />
                
                <div>
                  <label className="block text-sm font-medium mb-2">Generated Formula</label>
                  <div className="bg-primary/5 p-4 rounded-lg border-2 border-primary/20 text-foreground font-mono">
                    {output}
                  </div>
                </div>
              </div>
            </Card>

            <div className="grid md:grid-cols-2 gap-8 mb-12">
              <div>
                <h2 className="text-2xl font-bold mb-4">SUMIF vs SUMIFS</h2>
                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-semibold mb-2">SUMIF</h3>
                    <p className="text-muted-foreground mb-2">
                      Sums values based on a single condition
                    </p>
                    <code className="block bg-muted p-3 rounded text-sm">
                      =SUMIF(range, criteria, [sum_range])
                    </code>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-2">SUMIFS</h3>
                    <p className="text-muted-foreground mb-2">
                      Sums values based on multiple conditions
                    </p>
                    <code className="block bg-muted p-3 rounded text-sm">
                      =SUMIFS(sum_range, criteria_range1, criteria1, ...)
                    </code>
                  </div>
                </div>
              </div>

              <div>
                <h2 className="text-2xl font-bold mb-4">Common Uses</h2>
                <ul className="space-y-2 text-muted-foreground">
                  <li className="flex gap-2">
                    <Calculator className="h-5 w-5 text-primary flex-shrink-0" />
                    <span>Calculate sales by region or product</span>
                  </li>
                  <li className="flex gap-2">
                    <Calculator className="h-5 w-5 text-primary flex-shrink-0" />
                    <span>Sum expenses by category or date range</span>
                  </li>
                  <li className="flex gap-2">
                    <Calculator className="h-5 w-5 text-primary flex-shrink-0" />
                    <span>Total hours worked by employee or project</span>
                  </li>
                  <li className="flex gap-2">
                    <Calculator className="h-5 w-5 text-primary flex-shrink-0" />
                    <span>Aggregate data matching specific criteria</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="mb-12">
              <h2 className="text-2xl font-bold mb-4">Formula Examples</h2>
              <div className="space-y-4">
                <Card className="p-4">
                  <h3 className="font-semibold mb-2">Basic SUMIF</h3>
                  <code className="block bg-muted p-3 rounded text-sm">
                    =SUMIF(A2:A100, "North", B2:B100)
                  </code>
                  <p className="text-sm text-muted-foreground mt-2">
                    Sums values in B2:B100 where corresponding cell in A2:A100 equals "North"
                  </p>
                </Card>

                <Card className="p-4">
                  <h3 className="font-semibold mb-2">SUMIF with Comparison</h3>
                  <code className="block bg-muted p-3 rounded text-sm">
                    =SUMIF(B2:B100, "&gt;1000", C2:C100)
                  </code>
                  <p className="text-sm text-muted-foreground mt-2">
                    Sums values in C2:C100 where corresponding value in B2:B100 is greater than 1000
                  </p>
                </Card>

                <Card className="p-4">
                  <h3 className="font-semibold mb-2">SUMIFS with Multiple Criteria</h3>
                  <code className="block bg-muted p-3 rounded text-sm">
                    =SUMIFS(D2:D100, A2:A100, "North", B2:B100, "&gt;500")
                  </code>
                  <p className="text-sm text-muted-foreground mt-2">
                    Sums D2:D100 where A2:A100 is "North" AND B2:B100 is greater than 500
                  </p>
                </Card>
              </div>
            </div>

            <div className="text-center">
              <Link to="/auth">
                <Button size="lg" className="gap-2">
                  Start Generating Formulas <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
