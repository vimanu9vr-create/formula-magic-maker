import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Link } from "react-router-dom";
import { ArrowRight, Search } from "lucide-react";
import { Helmet } from "react-helmet";
import { useState } from "react";

export default function IndexMatchGenerator() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("=INDEX(return_range, MATCH(lookup_value, lookup_range, 0))");

  return (
    <>
      <Helmet>
        <title>Excel INDEX MATCH Generator - Better Than VLOOKUP | FormulaGenie</title>
        <meta name="description" content="Generate INDEX MATCH formulas instantly. More flexible than VLOOKUP, lookup values in any direction with our free Excel formula generator." />
        <meta property="og:title" content="Excel INDEX MATCH Generator - Better Than VLOOKUP" />
        <meta property="og:description" content="Generate INDEX MATCH formulas instantly. More flexible than VLOOKUP." />
      </Helmet>

      <div className="min-h-screen bg-background">
        <Navigation />
        
        <main className="container mx-auto px-4 pt-24 pb-16">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary via-purple-600 to-indigo-600 text-transparent bg-clip-text">
                INDEX MATCH Generator
              </h1>
              <p className="text-xl text-muted-foreground mb-6">
                Create powerful lookup formulas - the VLOOKUP alternative
              </p>
              <Link to="/auth">
                <Button size="lg" className="gap-2">
                  Generate INDEX MATCH <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>

            <Card className="p-6 mb-12 border-2 shadow-elegant">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Describe Your Lookup</label>
                  <Textarea
                    placeholder="Example: Look up price from column D by matching product name in column B"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    className="min-h-[100px] border-2 border-primary/20 focus:border-primary focus:ring-2 focus:ring-primary/20 bg-background"
                  />
                </div>
                
                <div className="border-t-2 border-primary/10" />
                
                <div>
                  <label className="block text-sm font-medium mb-2">Generated Formula</label>
                  <div className="bg-primary/5 p-4 rounded-lg border-2 border-primary/20 text-foreground font-mono text-sm break-all">
                    {output}
                  </div>
                </div>
              </div>
            </Card>

            <div className="grid md:grid-cols-2 gap-8 mb-12">
              <div>
                <h2 className="text-2xl font-bold mb-4">Why INDEX MATCH?</h2>
                <p className="text-muted-foreground mb-4">
                  INDEX MATCH is more flexible and powerful than VLOOKUP. It can look left, right, up, or down, and doesn't break when columns are inserted or deleted.
                </p>
                <h3 className="text-xl font-semibold mb-2">How It Works</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li><strong>MATCH</strong> - Finds the position of your lookup value</li>
                  <li><strong>INDEX</strong> - Returns the value at that position</li>
                  <li>Together they create a robust lookup formula</li>
                </ul>
              </div>

              <div>
                <h2 className="text-2xl font-bold mb-4">Advantages</h2>
                <ul className="space-y-2 text-muted-foreground">
                  <li className="flex gap-2">
                    <Search className="h-5 w-5 text-primary flex-shrink-0" />
                    <span>Lookup to the left (VLOOKUP can't do this)</span>
                  </li>
                  <li className="flex gap-2">
                    <Search className="h-5 w-5 text-primary flex-shrink-0" />
                    <span>Insert/delete columns without breaking</span>
                  </li>
                  <li className="flex gap-2">
                    <Search className="h-5 w-5 text-primary flex-shrink-0" />
                    <span>Faster performance on large datasets</span>
                  </li>
                  <li className="flex gap-2">
                    <Search className="h-5 w-5 text-primary flex-shrink-0" />
                    <span>More flexible and easier to understand</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="mb-12">
              <h2 className="text-2xl font-bold mb-4">INDEX MATCH Examples</h2>
              <div className="space-y-4">
                <Card className="p-4">
                  <h3 className="font-semibold mb-2">Basic INDEX MATCH</h3>
                  <code className="block bg-muted p-3 rounded text-sm break-all">
                    =INDEX(D2:D100, MATCH("Product A", B2:B100, 0))
                  </code>
                  <p className="text-sm text-muted-foreground mt-2">
                    Finds "Product A" in B2:B100 and returns the corresponding value from D2:D100
                  </p>
                </Card>

                <Card className="p-4">
                  <h3 className="font-semibold mb-2">Two-Way Lookup (INDEX MATCH MATCH)</h3>
                  <code className="block bg-muted p-3 rounded text-sm break-all">
                    =INDEX(B2:E10, MATCH("John", A2:A10, 0), MATCH("Sales", B1:E1, 0))
                  </code>
                  <p className="text-sm text-muted-foreground mt-2">
                    Looks up both row and column - finds where "John" row meets "Sales" column
                  </p>
                </Card>

                <Card className="p-4">
                  <h3 className="font-semibold mb-2">Looking Left with INDEX MATCH</h3>
                  <code className="block bg-muted p-3 rounded text-sm break-all">
                    =INDEX(A2:A100, MATCH("Value", C2:C100, 0))
                  </code>
                  <p className="text-sm text-muted-foreground mt-2">
                    Returns value from column A based on match in column C (left lookup)
                  </p>
                </Card>
              </div>
            </div>

            <div className="bg-primary/5 border border-primary/20 rounded-lg p-6 mb-12">
              <h2 className="text-xl font-bold mb-3">INDEX MATCH vs VLOOKUP</h2>
              <div className="grid md:grid-cols-2 gap-4 text-sm">
                <div>
                  <h3 className="font-semibold mb-2 text-primary">INDEX MATCH Wins</h3>
                  <ul className="space-y-1 text-muted-foreground">
                    <li>✓ Can lookup left</li>
                    <li>✓ Column changes safe</li>
                    <li>✓ Faster on large data</li>
                    <li>✓ More flexible</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">VLOOKUP</h3>
                  <ul className="space-y-1 text-muted-foreground">
                    <li>✓ Simpler syntax</li>
                    <li>✓ More widely known</li>
                    <li>✗ Can't lookup left</li>
                    <li>✗ Breaks with column changes</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="text-center">
              <Link to="/auth">
                <Button size="lg" className="gap-2">
                  Generate Your INDEX MATCH Formula <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
