import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { ArrowRight, Lightbulb } from "lucide-react";
import { Helmet } from "react-helmet";

export default function ExcelTipsAndTricks() {
  return (
    <>
      <Helmet>
        <title>50 Excel Tips and Tricks to Boost Productivity | FormulaGenie</title>
        <meta name="description" content="Master Excel with essential tips and tricks. Learn keyboard shortcuts, formula hacks, and productivity techniques for faster spreadsheet work." />
      </Helmet>

      <div className="min-h-screen bg-background">
        <Navigation />
        
        <main className="container mx-auto px-4 pt-24 pb-16">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary via-purple-600 to-indigo-600 text-transparent bg-clip-text">
                Excel Tips & Tricks
              </h1>
              <p className="text-xl text-muted-foreground mb-6">
                Boost your Excel productivity with these essential tips
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-4 mb-12">
              {[
                "Ctrl+; to insert today's date",
                "Ctrl+Shift+; to insert current time",
                "Alt+= for quick SUM formula",
                "F4 to toggle absolute references",
                "Ctrl+D to fill down",
                "Ctrl+R to fill right",
                "Alt+Enter for line break in cell",
                "Ctrl+1 to open Format Cells",
                "Ctrl+T to create a table",
                "Ctrl+Shift+L to add filters"
              ].map((tip, i) => (
                <Card key={i} className="p-4">
                  <div className="flex gap-3 items-start">
                    <Lightbulb className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-sm">{tip}</span>
                  </div>
                </Card>
              ))}
            </div>

            <div className="text-center">
              <Link to="/auth">
                <Button size="lg" className="gap-2">
                  Try FormulaGenie <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
