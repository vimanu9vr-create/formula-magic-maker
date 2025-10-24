import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Helmet } from "react-helmet";

export default function CommonExcelFormulas() {
  return (
    <>
      <Helmet>
        <title>Most Common Excel Formulas - Complete Reference Guide | FormulaGenie</title>
        <meta name="description" content="Quick reference for the most common Excel formulas. SUM, AVERAGE, COUNT, IF, VLOOKUP and more with examples and use cases." />
      </Helmet>

      <div className="min-h-screen bg-background">
        <Navigation />
        
        <main className="container mx-auto px-4 pt-24 pb-16">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary via-purple-600 to-indigo-600 text-transparent bg-clip-text">
                Common Excel Formulas
              </h1>
              <p className="text-xl text-muted-foreground mb-6">
                Quick reference for essential Excel functions
              </p>
            </div>

            <div className="space-y-4 mb-12">
              {[
                { name: "SUM", formula: "=SUM(A1:A10)", desc: "Adds all numbers in a range" },
                { name: "AVERAGE", formula: "=AVERAGE(A1:A10)", desc: "Calculates average of numbers" },
                { name: "COUNT", formula: "=COUNT(A1:A10)", desc: "Counts cells with numbers" },
                { name: "MAX", formula: "=MAX(A1:A10)", desc: "Returns largest value" },
                { name: "MIN", formula: "=MIN(A1:A10)", desc: "Returns smallest value" },
                { name: "IF", formula: "=IF(A1>100, 'Yes', 'No')", desc: "Tests a condition" },
                { name: "CONCATENATE", formula: "=A1&' '&B1", desc: "Joins text from cells" },
                { name: "LEN", formula: "=LEN(A1)", desc: "Returns text length" },
              ].map((item, i) => (
                <Card key={i} className="p-4">
                  <h3 className="font-semibold mb-2">{item.name}</h3>
                  <code className="block bg-muted p-2 rounded text-sm mb-2">{item.formula}</code>
                  <p className="text-sm text-muted-foreground">{item.desc}</p>
                </Card>
              ))}
            </div>

            <div className="text-center">
              <Link to="/auth">
                <Button size="lg" className="gap-2">
                  Generate Custom Formulas <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
