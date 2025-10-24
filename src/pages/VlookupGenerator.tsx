import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Link } from "react-router-dom";
import { ArrowRight, Zap } from "lucide-react";
import { Helmet } from "react-helmet";
import { useState } from "react";

export default function VlookupGenerator() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("=VLOOKUP(lookup_value, table_array, col_index_num, [range_lookup])");

  return (
    <>
      <Helmet>
        <title>Excel VLOOKUP Generator - Create VLOOKUP Formulas Instantly | FormulaGenie</title>
        <meta name="description" content="Free VLOOKUP formula generator. Convert your requirements into Excel VLOOKUP formulas instantly. Learn VLOOKUP syntax, examples, and best practices." />
        <meta property="og:title" content="Excel VLOOKUP Generator - Create VLOOKUP Formulas Instantly" />
        <meta property="og:description" content="Free VLOOKUP formula generator. Convert your requirements into Excel VLOOKUP formulas instantly." />
      </Helmet>

      <div className="min-h-screen bg-background">
        <Navigation />
        
        <main className="container mx-auto px-4 pt-24 pb-16">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary via-purple-600 to-indigo-600 text-transparent bg-clip-text">
                Excel VLOOKUP Generator
              </h1>
              <p className="text-xl text-muted-foreground mb-6">
                Create perfect VLOOKUP formulas in seconds with AI
              </p>
              <Link to="/auth">
                <Button size="lg" className="gap-2">
                  Generate VLOOKUP Formula <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>

            <Card className="p-6 mb-12 border-2 shadow-elegant">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Describe Your VLOOKUP Need</label>
                  <Textarea
                    placeholder="Example: Look up employee salary from a table where column A has employee IDs and column D has salaries"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    className="min-h-[100px] border-2 border-primary/20 focus:border-primary focus:ring-2 focus:ring-primary/20 bg-background"
                  />
                </div>
                
                <div className="border-t-2 border-primary/10" />
                
                <div>
                  <label className="block text-sm font-medium mb-2">Generated VLOOKUP Formula</label>
                  <div className="bg-primary/5 p-4 rounded-lg border-2 border-primary/20 text-foreground font-mono">
                    {output}
                  </div>
                </div>
              </div>
            </Card>

            <div className="grid md:grid-cols-2 gap-8 mb-12">
              <div>
                <h2 className="text-2xl font-bold mb-4">What is VLOOKUP?</h2>
                <p className="text-muted-foreground mb-4">
                  VLOOKUP (Vertical Lookup) searches for a value in the first column of a table and returns a value in the same row from another column. It's one of Excel's most powerful lookup functions.
                </p>
                <h3 className="text-xl font-semibold mb-2">VLOOKUP Syntax</h3>
                <code className="block bg-muted p-3 rounded text-sm">
                  =VLOOKUP(lookup_value, table_array, col_index_num, [range_lookup])
                </code>
              </div>

              <div>
                <h2 className="text-2xl font-bold mb-4">Common Use Cases</h2>
                <ul className="space-y-2 text-muted-foreground">
                  <li className="flex gap-2">
                    <Zap className="h-5 w-5 text-primary flex-shrink-0" />
                    <span>Looking up product prices from a price list</span>
                  </li>
                  <li className="flex gap-2">
                    <Zap className="h-5 w-5 text-primary flex-shrink-0" />
                    <span>Finding employee details from employee database</span>
                  </li>
                  <li className="flex gap-2">
                    <Zap className="h-5 w-5 text-primary flex-shrink-0" />
                    <span>Matching customer names with their orders</span>
                  </li>
                  <li className="flex gap-2">
                    <Zap className="h-5 w-5 text-primary flex-shrink-0" />
                    <span>Retrieving grades from a grading scale</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="mb-12">
              <h2 className="text-2xl font-bold mb-4">VLOOKUP Examples</h2>
              <div className="space-y-4">
                <Card className="p-4">
                  <h3 className="font-semibold mb-2">Exact Match VLOOKUP</h3>
                  <code className="block bg-muted p-3 rounded text-sm">
                    =VLOOKUP("A123", A2:D100, 3, FALSE)
                  </code>
                  <p className="text-sm text-muted-foreground mt-2">
                    Finds "A123" in column A and returns the value from column 3 of the range
                  </p>
                </Card>

                <Card className="p-4">
                  <h3 className="font-semibold mb-2">Approximate Match VLOOKUP</h3>
                  <code className="block bg-muted p-3 rounded text-sm">
                    =VLOOKUP(85, A2:B10, 2, TRUE)
                  </code>
                  <p className="text-sm text-muted-foreground mt-2">
                    Finds the closest value to 85 in column A and returns the corresponding value from column 2
                  </p>
                </Card>
              </div>
            </div>

            <div className="text-center">
              <Link to="/auth">
                <Button size="lg" className="gap-2">
                  Start Generating VLOOKUP Formulas <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
