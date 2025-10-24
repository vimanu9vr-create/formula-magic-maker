import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { ArrowRight, BarChart3, TrendingUp } from "lucide-react";
import { Helmet } from "react-helmet";

export default function PivotTableGuide() {
  return (
    <>
      <Helmet>
        <title>Excel Pivot Table Guide & Formulas | FormulaGenie</title>
        <meta name="description" content="Complete guide to Excel Pivot Tables. Learn GETPIVOTDATA, pivot table formulas, tips, and best practices for data analysis." />
        <meta property="og:title" content="Excel Pivot Table Guide & Formulas" />
        <meta property="og:description" content="Complete guide to Excel Pivot Tables and GETPIVOTDATA formulas." />
      </Helmet>

      <div className="min-h-screen bg-background">
        <Navigation />
        
        <main className="container mx-auto px-4 pt-24 pb-16">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary via-purple-600 to-indigo-600 text-transparent bg-clip-text">
                Excel Pivot Table Guide
              </h1>
              <p className="text-xl text-muted-foreground mb-6">
                Master pivot tables and related formulas for powerful data analysis
              </p>
              <Link to="/auth">
                <Button size="lg" className="gap-2">
                  Try FormulaGenie <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>

            <div className="mb-12">
              <Card className="p-6">
                <h2 className="text-2xl font-bold mb-4">What is a Pivot Table?</h2>
                <p className="text-muted-foreground mb-4">
                  A Pivot Table is Excel's most powerful data analysis tool. It allows you to summarize, analyze, explore, and present large amounts of data in just a few clicks.
                </p>
                <div className="grid md:grid-cols-3 gap-4 mt-6">
                  <div className="bg-primary/5 p-4 rounded-lg border border-primary/20">
                    <BarChart3 className="h-8 w-8 text-primary mb-2" />
                    <h3 className="font-semibold mb-1">Summarize Data</h3>
                    <p className="text-sm text-muted-foreground">Quickly aggregate thousands of rows</p>
                  </div>
                  <div className="bg-primary/5 p-4 rounded-lg border border-primary/20">
                    <TrendingUp className="h-8 w-8 text-primary mb-2" />
                    <h3 className="font-semibold mb-1">Analyze Trends</h3>
                    <p className="text-sm text-muted-foreground">Spot patterns and insights</p>
                  </div>
                  <div className="bg-primary/5 p-4 rounded-lg border border-primary/20">
                    <BarChart3 className="h-8 w-8 text-primary mb-2" />
                    <h3 className="font-semibold mb-1">Interactive Reports</h3>
                    <p className="text-sm text-muted-foreground">Drag and drop to reorganize</p>
                  </div>
                </div>
              </Card>
            </div>

            <div className="mb-12">
              <h2 className="text-2xl font-bold mb-6">GETPIVOTDATA Formula</h2>
              <Card className="p-6 mb-4">
                <h3 className="text-xl font-semibold mb-3">What is GETPIVOTDATA?</h3>
                <p className="text-muted-foreground mb-4">
                  GETPIVOTDATA extracts specific data from a pivot table. It's automatically created when you reference a pivot table cell, but you can write it manually for more control.
                </p>
                <code className="block bg-muted p-3 rounded text-sm mb-4">
                  =GETPIVOTDATA("Sales", $A$3, "Region", "North", "Product", "Widget")
                </code>
                <p className="text-sm text-muted-foreground">
                  This formula retrieves the sales value for North region and Widget product from the pivot table starting at cell A3.
                </p>
              </Card>

              <div className="space-y-4">
                <Card className="p-4">
                  <h3 className="font-semibold mb-2">Example: Get Total Sales</h3>
                  <code className="block bg-muted p-3 rounded text-sm">
                    =GETPIVOTDATA("Amount", $A$3)
                  </code>
                  <p className="text-sm text-muted-foreground mt-2">
                    Returns the grand total of the Amount field
                  </p>
                </Card>

                <Card className="p-4">
                  <h3 className="font-semibold mb-2">Example: Get Specific Value</h3>
                  <code className="block bg-muted p-3 rounded text-sm">
                    =GETPIVOTDATA("Revenue", $A$3, "Year", 2024, "Quarter", "Q1")
                  </code>
                  <p className="text-sm text-muted-foreground mt-2">
                    Returns revenue for Q1 2024
                  </p>
                </Card>
              </div>
            </div>

            <div className="mb-12">
              <h2 className="text-2xl font-bold mb-6">Creating a Pivot Table</h2>
              <Card className="p-6">
                <ol className="space-y-4">
                  <li className="flex gap-3">
                    <span className="flex-shrink-0 w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-semibold">1</span>
                    <div>
                      <h3 className="font-semibold mb-1">Select Your Data</h3>
                      <p className="text-sm text-muted-foreground">Click any cell in your data range. Excel will automatically detect the entire table.</p>
                    </div>
                  </li>
                  <li className="flex gap-3">
                    <span className="flex-shrink-0 w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-semibold">2</span>
                    <div>
                      <h3 className="font-semibold mb-1">Insert Pivot Table</h3>
                      <p className="text-sm text-muted-foreground">Go to Insert tab → PivotTable. Choose where to place it (new worksheet recommended).</p>
                    </div>
                  </li>
                  <li className="flex gap-3">
                    <span className="flex-shrink-0 w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-semibold">3</span>
                    <div>
                      <h3 className="font-semibold mb-1">Build Your Pivot Table</h3>
                      <p className="text-sm text-muted-foreground">Drag fields to Rows, Columns, Values, and Filters areas to structure your analysis.</p>
                    </div>
                  </li>
                  <li className="flex gap-3">
                    <span className="flex-shrink-0 w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-semibold">4</span>
                    <div>
                      <h3 className="font-semibold mb-1">Customize & Format</h3>
                      <p className="text-sm text-muted-foreground">Apply number formats, change calculation types, and adjust the layout.</p>
                    </div>
                  </li>
                </ol>
              </Card>
            </div>

            <div className="mb-12">
              <h2 className="text-2xl font-bold mb-6">Pivot Table Best Practices</h2>
              <div className="grid md:grid-cols-2 gap-4">
                <Card className="p-4">
                  <h3 className="font-semibold mb-2 text-green-600 dark:text-green-400">✓ Do This</h3>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>• Use tables (Ctrl+T) for your source data</li>
                    <li>• Keep headers in the first row</li>
                    <li>• Avoid blank rows and columns</li>
                    <li>• Use consistent data types per column</li>
                    <li>• Refresh pivot tables after data changes</li>
                  </ul>
                </Card>

                <Card className="p-4">
                  <h3 className="font-semibold mb-2 text-red-600 dark:text-red-400">✗ Avoid This</h3>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>• Merged cells in source data</li>
                    <li>• Multiple tables on one sheet</li>
                    <li>• Subtotals in source data</li>
                    <li>• Empty headers</li>
                    <li>• Mixed data types in columns</li>
                  </ul>
                </Card>
              </div>
            </div>

            <div className="mb-12">
              <h2 className="text-2xl font-bold mb-6">Common Pivot Table Calculations</h2>
              <div className="space-y-4">
                <Card className="p-4">
                  <h3 className="font-semibold mb-2">Show Values As Percentage</h3>
                  <p className="text-sm text-muted-foreground">
                    Right-click value field → Show Values As → % of Grand Total
                  </p>
                </Card>

                <Card className="p-4">
                  <h3 className="font-semibold mb-2">Calculate Difference from Previous</h3>
                  <p className="text-sm text-muted-foreground">
                    Show Values As → Difference From → Previous (useful for month-over-month changes)
                  </p>
                </Card>

                <Card className="p-4">
                  <h3 className="font-semibold mb-2">Running Total</h3>
                  <p className="text-sm text-muted-foreground">
                    Show Values As → Running Total In → Select base field
                  </p>
                </Card>
              </div>
            </div>

            <div className="text-center">
              <Link to="/auth">
                <Button size="lg" className="gap-2">
                  Generate Excel Formulas Now <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
