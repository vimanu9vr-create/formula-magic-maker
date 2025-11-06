import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Sparkles } from "lucide-react";

export const DemoAnimation = () => {
  const [inputText, setInputText] = useState("");
  const [showFormula, setShowFormula] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  
  const fullText = "Find total sales by region for last 3 months";
  const formula = "=SUMIFS(Sales[Amount], Sales[Region], A2, Sales[Date], \">=\"&TODAY()-90)";

  useEffect(() => {
    let currentIndex = 0;
    let typingInterval: NodeJS.Timeout;
    let processingTimeout: NodeJS.Timeout;
    let formulaTimeout: NodeJS.Timeout;
    let resetTimeout: NodeJS.Timeout;

    const startAnimation = () => {
      setInputText("");
      setShowFormula(false);
      setIsProcessing(false);

      // Typing animation
      typingInterval = setInterval(() => {
        if (currentIndex < fullText.length) {
          setInputText(fullText.slice(0, currentIndex + 1));
          currentIndex++;
        } else {
          clearInterval(typingInterval);
          // Show processing
          processingTimeout = setTimeout(() => {
            setIsProcessing(true);
            // Show formula after processing
            formulaTimeout = setTimeout(() => {
              setIsProcessing(false);
              setShowFormula(true);
              // Reset animation after showing result
              resetTimeout = setTimeout(() => {
                startAnimation();
              }, 3000);
            }, 1000);
          }, 500);
        }
      }, 50);
    };

    startAnimation();

    return () => {
      clearInterval(typingInterval);
      clearTimeout(processingTimeout);
      clearTimeout(formulaTimeout);
      clearTimeout(resetTimeout);
    };
  }, []);

  return (
    <section className="py-16 px-4 bg-gradient-to-b from-background to-secondary/10">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            See It In Action
          </h2>
          <p className="text-lg text-muted-foreground">
            Watch how FormulaGenie transforms plain English into perfect Excel formulas
          </p>
        </div>

        <Card className="p-8 bg-card/50 backdrop-blur-sm border-2">
          {/* Input Section */}
          <div className="mb-6">
            <label className="block text-sm font-medium mb-2 text-muted-foreground">
              You type:
            </label>
            <div className="bg-background border-2 border-primary/20 rounded-lg p-4 min-h-[80px] font-mono text-sm">
              {inputText}
              <span className="inline-block w-0.5 h-5 bg-primary animate-pulse ml-1" />
            </div>
          </div>

          {/* Processing Indicator */}
          {isProcessing && (
            <div className="flex items-center justify-center gap-2 py-4 animate-fade-in">
              <Sparkles className="w-5 h-5 text-primary animate-pulse" />
              <span className="text-sm text-muted-foreground">
                Generating formula...
              </span>
            </div>
          )}

          {/* Output Section */}
          {showFormula && (
            <div className="animate-fade-in">
              <label className="block text-sm font-medium mb-2 text-muted-foreground">
                You get:
              </label>
              <div className="bg-primary/10 border-2 border-primary rounded-lg p-4 font-mono text-sm text-primary font-semibold">
                {formula}
              </div>
              <div className="mt-3 text-xs text-muted-foreground">
                ✓ Ready to copy & paste into Excel
              </div>
            </div>
          )}
        </Card>

        <div className="text-center mt-8">
          <p className="text-sm text-muted-foreground">
            ⚡ Average generation time: &lt;2 seconds
          </p>
        </div>
      </div>
    </section>
  );
};
