import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Copy, ArrowRight } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import heroImage from "@/assets/hero-image.jpg";

const Hero = () => {
  const [inputText, setInputText] = useState("Find the average of values in column A where column B contains 'completed'");
  const [outputFormula] = useState("=AVERAGEIF(B:B,\"completed\",A:A)");

  return (
    <section className="pt-24 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="container max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-6 leading-tight">
            Turn plain English into{" "}
            <span className="bg-gradient-primary bg-clip-text text-transparent">
              Excel, SQL, Python & more
            </span>{" "}
            instantly
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
            Stop struggling with complex formulas and code. FormulaGenie converts your plain English descriptions 
            into perfect Excel formulas, SQL queries, Python scripts, JavaScript code, and more.
          </p>
          
          <div className="flex justify-center mb-12">
            <Button size="lg" className="bg-gradient-primary text-primary-foreground hover:opacity-90 shadow-elegant" asChild>
              <Link to="/auth">
                Start Free Trial
                <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </Button>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <Card className="p-6 shadow-soft">
              <div className="mb-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold text-foreground">Plain English Input</h3>
                  <div className="text-xs bg-secondary px-2 py-1 rounded text-secondary-foreground">
                    English → Formula
                  </div>
                </div>
                <Textarea
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  placeholder="Describe what you want your formula to do..."
                  className="min-h-[100px] resize-none"
                />
              </div>
              
              <div className="border-t pt-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold text-foreground">Excel Formula Output</h3>
                  <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                    <Copy className="w-4 h-4" />
                  </Button>
                </div>
                <div className="bg-muted p-3 rounded-md font-mono text-sm">
                  {outputFormula}
                </div>
              </div>
            </Card>

            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-primary mb-1">10k+</div>
                <div className="text-sm text-muted-foreground">Formulas Generated</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-primary mb-1">99%</div>
                <div className="text-sm text-muted-foreground">Accuracy Rate</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-primary mb-1">5sec</div>
                <div className="text-sm text-muted-foreground">Avg Response Time</div>
              </div>
            </div>
          </div>

          <div className="relative">
            <img
              src={heroImage}
              alt="FormulaGenie Interface"
              className="rounded-2xl shadow-elegant w-full h-auto"
            />
            <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-transparent rounded-2xl"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;