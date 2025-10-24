import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { ArrowRight, Palette } from "lucide-react";
import { Helmet } from "react-helmet";

export default function ConditionalFormattingGuide() {
  return (
    <>
      <Helmet>
        <title>Excel Conditional Formatting Guide with Formulas | FormulaGenie</title>
        <meta name="description" content="Master Excel conditional formatting. Learn to highlight cells, create data bars, use formulas for custom rules, and visualize data effectively." />
      </Helmet>

      <div className="min-h-screen bg-background">
        <Navigation />
        
        <main className="container mx-auto px-4 pt-24 pb-16">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <div className="flex items-center justify-center gap-3 mb-4">
                <Palette className="h-12 w-12 text-primary" />
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary via-purple-600 to-indigo-600 text-transparent bg-clip-text">
                Conditional Formatting Guide
              </h1>
              <p className="text-xl text-muted-foreground mb-6">
                Visualize your data with dynamic formatting rules
              </p>
            </div>

            <div className="space-y-6 mb-12">
              <Card className="p-6">
                <h2 className="text-2xl font-bold mb-4">Popular Conditional Formatting Rules</h2>
                <div className="space-y-3">
                  <div className="p-3 bg-primary/5 rounded border border-primary/20">
                    <p className="font-semibold">Highlight Cells Greater Than</p>
                    <p className="text-sm text-muted-foreground mt-1">Formula: =A1&gt;1000</p>
                  </div>
                  <div className="p-3 bg-primary/5 rounded border border-primary/20">
                    <p className="font-semibold">Highlight Duplicates</p>
                    <p className="text-sm text-muted-foreground mt-1">Formula: =COUNTIF($A:$A,A1)&gt;1</p>
                  </div>
                  <div className="p-3 bg-primary/5 rounded border border-primary/20">
                    <p className="font-semibold">Highlight Row Based on Value</p>
                    <p className="text-sm text-muted-foreground mt-1">Formula: =$A1="Complete"</p>
                  </div>
                  <div className="p-3 bg-primary/5 rounded border border-primary/20">
                    <p className="font-semibold">Alternate Row Colors</p>
                    <p className="text-sm text-muted-foreground mt-1">Formula: =MOD(ROW(),2)=0</p>
                  </div>
                </div>
              </Card>
            </div>

            <div className="text-center">
              <Link to="/auth">
                <Button size="lg" className="gap-2">
                  Generate Excel Formulas <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
