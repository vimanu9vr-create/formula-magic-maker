import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { ArrowRight, BookOpen, AlertCircle } from "lucide-react";
import { Helmet } from "react-helmet";

export default function VlookupTutorial() {
  return (
    <>
      <Helmet>
        <title>Complete Excel VLOOKUP Tutorial - Step by Step Guide | FormulaGenie</title>
        <meta name="description" content="Learn VLOOKUP with our comprehensive tutorial. Master exact match, approximate match, common errors, and best practices with real examples." />
        <meta property="og:title" content="Complete Excel VLOOKUP Tutorial - Step by Step Guide" />
        <meta property="og:description" content="Learn VLOOKUP with our comprehensive tutorial. Step-by-step guide with examples." />
      </Helmet>

      <div className="min-h-screen bg-background">
        <Navigation />
        
        <main className="container mx-auto px-4 pt-24 pb-16">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary via-purple-600 to-indigo-600 text-transparent bg-clip-text">
                Excel VLOOKUP Tutorial
              </h1>
              <p className="text-xl text-muted-foreground mb-6">
                Master VLOOKUP step-by-step with practical examples
              </p>
              <Link to="/vlookup-generator">
                <Button size="lg" className="gap-2">
                  Try VLOOKUP Generator <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>

            <div className="space-y-12">
              <section>
                <div className="flex items-center gap-3 mb-6">
                  <BookOpen className="h-8 w-8 text-primary" />
                  <h2 className="text-3xl font-bold">What is VLOOKUP?</h2>
                </div>
                <Card className="p-6">
                  <p className="text-muted-foreground mb-4">
                    VLOOKUP stands for "Vertical Lookup." It's a function that searches for a value in the leftmost column of a table and returns a value in the same row from a column you specify.
                  </p>
                  <div className="bg-primary/5 p-4 rounded-lg border border-primary/20">
                    <p className="font-semibold mb-2">Think of it like:</p>
                    <p className="text-sm text-muted-foreground">
                      You're looking up a word in a dictionary (leftmost column) to find its definition (another column to the right).
                    </p>
                  </div>
                </Card>
              </section>

              <section>
                <h2 className="text-3xl font-bold mb-6">VLOOKUP Syntax Explained</h2>
                <Card className="p-6">
                  <code className="block bg-muted p-4 rounded text-sm mb-4">
                    =VLOOKUP(lookup_value, table_array, col_index_num, [range_lookup])
                  </code>
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-semibold text-primary">1. lookup_value</h3>
                      <p className="text-sm text-muted-foreground">The value you want to find (e.g., employee ID, product code)</p>
                    </div>
                    <div>
                      <h3 className="font-semibold text-primary">2. table_array</h3>
                      <p className="text-sm text-muted-foreground">The range of cells containing your data (e.g., A2:D100)</p>
                    </div>
                    <div>
                      <h3 className="font-semibold text-primary">3. col_index_num</h3>
                      <p className="text-sm text-muted-foreground">Which column number to return (counting from the left of your range)</p>
                    </div>
                    <div>
                      <h3 className="font-semibold text-primary">4. range_lookup (optional)</h3>
                      <p className="text-sm text-muted-foreground">FALSE or 0 for exact match, TRUE or 1 for approximate match</p>
                    </div>
                  </div>
                </Card>
              </section>

              <section>
                <h2 className="text-3xl font-bold mb-6">Step-by-Step Example</h2>
                <div className="space-y-4">
                  <Card className="p-6">
                    <h3 className="text-xl font-semibold mb-3">Scenario</h3>
                    <p className="text-muted-foreground mb-4">
                      You have a list of products with their IDs in column A and prices in column C. You want to find the price for product "P101".
                    </p>
                    
                    <div className="bg-muted p-4 rounded mb-4">
                      <p className="font-mono text-sm mb-2">Your data (A1:C10):</p>
                      <table className="text-xs font-mono">
                        <thead>
                          <tr className="border-b border-border">
                            <th className="text-left p-2">A: Product ID</th>
                            <th className="text-left p-2">B: Name</th>
                            <th className="text-left p-2">C: Price</th>
                          </tr>
                        </thead>
                        <tbody className="text-muted-foreground">
                          <tr><td className="p-2">P101</td><td className="p-2">Widget</td><td className="p-2">$25</td></tr>
                          <tr><td className="p-2">P102</td><td className="p-2">Gadget</td><td className="p-2">$50</td></tr>
                          <tr><td className="p-2">P103</td><td className="p-2">Tool</td><td className="p-2">$75</td></tr>
                        </tbody>
                      </table>
                    </div>

                    <div className="space-y-3">
                      <div className="flex items-start gap-3">
                        <span className="flex-shrink-0 w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-semibold">1</span>
                        <div>
                          <p className="font-semibold">lookup_value: "P101"</p>
                          <p className="text-sm text-muted-foreground">The product ID we're searching for</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <span className="flex-shrink-0 w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-semibold">2</span>
                        <div>
                          <p className="font-semibold">table_array: A1:C10</p>
                          <p className="text-sm text-muted-foreground">The entire data range</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <span className="flex-shrink-0 w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-semibold">3</span>
                        <div>
                          <p className="font-semibold">col_index_num: 3</p>
                          <p className="text-sm text-muted-foreground">Column C is the 3rd column in our range</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <span className="flex-shrink-0 w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-semibold">4</span>
                        <div>
                          <p className="font-semibold">range_lookup: FALSE</p>
                          <p className="text-sm text-muted-foreground">We want an exact match</p>
                        </div>
                      </div>
                    </div>

                    <div className="mt-6 bg-primary/5 p-4 rounded-lg border border-primary/20">
                      <p className="font-semibold mb-2">Final Formula:</p>
                      <code className="block bg-background/50 p-3 rounded text-sm">
                        =VLOOKUP("P101", A1:C10, 3, FALSE)
                      </code>
                      <p className="text-sm text-muted-foreground mt-2">Result: $25</p>
                    </div>
                  </Card>
                </div>
              </section>

              <section>
                <h2 className="text-3xl font-bold mb-6">Exact vs Approximate Match</h2>
                <div className="grid md:grid-cols-2 gap-4">
                  <Card className="p-6">
                    <h3 className="text-xl font-semibold mb-3">Exact Match (FALSE)</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Finds the exact value. Returns #N/A if not found.
                    </p>
                    <code className="block bg-muted p-3 rounded text-sm mb-3">
                      =VLOOKUP("A123", A:D, 2, FALSE)
                    </code>
                    <div className="text-sm">
                      <p className="font-semibold mb-1">Use when:</p>
                      <ul className="list-disc list-inside text-muted-foreground space-y-1">
                        <li>Looking up IDs or codes</li>
                        <li>Finding specific names</li>
                        <li>Data doesn't need to be sorted</li>
                      </ul>
                    </div>
                  </Card>

                  <Card className="p-6">
                    <h3 className="text-xl font-semibold mb-3">Approximate Match (TRUE)</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Finds the closest match less than or equal to the value.
                    </p>
                    <code className="block bg-muted p-3 rounded text-sm mb-3">
                      =VLOOKUP(85, A:B, 2, TRUE)
                    </code>
                    <div className="text-sm">
                      <p className="font-semibold mb-1">Use when:</p>
                      <ul className="list-disc list-inside text-muted-foreground space-y-1">
                        <li>Looking up grades or tax brackets</li>
                        <li>Finding price tiers</li>
                        <li>Data MUST be sorted ascending</li>
                      </ul>
                    </div>
                  </Card>
                </div>
              </section>

              <section>
                <div className="flex items-center gap-3 mb-6">
                  <AlertCircle className="h-8 w-8 text-red-500" />
                  <h2 className="text-3xl font-bold">Common VLOOKUP Errors</h2>
                </div>
                <div className="space-y-4">
                  <Card className="p-4 border-red-200 dark:border-red-900">
                    <h3 className="font-semibold text-red-600 dark:text-red-400 mb-2">#N/A Error</h3>
                    <p className="text-sm text-muted-foreground mb-2">Value not found in the first column</p>
                    <p className="text-xs text-muted-foreground">
                      <strong>Fix:</strong> Check spelling, ensure the value exists, or use IFERROR to handle missing values
                    </p>
                  </Card>

                  <Card className="p-4 border-red-200 dark:border-red-900">
                    <h3 className="font-semibold text-red-600 dark:text-red-400 mb-2">#REF! Error</h3>
                    <p className="text-sm text-muted-foreground mb-2">Column index number is greater than the number of columns</p>
                    <p className="text-xs text-muted-foreground">
                      <strong>Fix:</strong> Reduce the col_index_num to match your table width
                    </p>
                  </Card>

                  <Card className="p-4 border-red-200 dark:border-red-900">
                    <h3 className="font-semibold text-red-600 dark:text-red-400 mb-2">#VALUE! Error</h3>
                    <p className="text-sm text-muted-foreground mb-2">Col_index_num is less than 1</p>
                    <p className="text-xs text-muted-foreground">
                      <strong>Fix:</strong> Use a positive number for col_index_num (minimum is 1)
                    </p>
                  </Card>

                  <Card className="p-4 border-red-200 dark:border-red-900">
                    <h3 className="font-semibold text-red-600 dark:text-red-400 mb-2">Wrong Result</h3>
                    <p className="text-sm text-muted-foreground mb-2">Getting incorrect values returned</p>
                    <p className="text-xs text-muted-foreground">
                      <strong>Fix:</strong> If using TRUE, ensure data is sorted. Check if you're using the right column number
                    </p>
                  </Card>
                </div>
              </section>

              <section>
                <h2 className="text-3xl font-bold mb-6">VLOOKUP Best Practices</h2>
                <Card className="p-6">
                  <ul className="space-y-3">
                    <li className="flex gap-3">
                      <span className="text-primary">✓</span>
                      <span><strong>Always use FALSE</strong> unless you specifically need approximate match</span>
                    </li>
                    <li className="flex gap-3">
                      <span className="text-primary">✓</span>
                      <span><strong>Use absolute references</strong> ($A$1:$D$100) for table_array when copying formulas</span>
                    </li>
                    <li className="flex gap-3">
                      <span className="text-primary">✓</span>
                      <span><strong>Wrap with IFERROR</strong> to handle missing values gracefully</span>
                    </li>
                    <li className="flex gap-3">
                      <span className="text-primary">✓</span>
                      <span><strong>Consider INDEX MATCH</strong> for more flexible lookups</span>
                    </li>
                    <li className="flex gap-3">
                      <span className="text-primary">✓</span>
                      <span><strong>Remove duplicates</strong> from your lookup column for accurate results</span>
                    </li>
                  </ul>
                </Card>
              </section>

              <div className="text-center pt-8">
                <Link to="/auth">
                  <Button size="lg" className="gap-2">
                    Generate VLOOKUP Formulas with AI <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
