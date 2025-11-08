import { Card } from "@/components/ui/card";
import { Clock, Search, AlertCircle, Zap, CheckCircle, TrendingUp } from "lucide-react";

export const BeforeAfterComparison = () => {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-background">
      <div className="container max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Before vs After FormulaGenie
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            See how much time you'll save by letting AI handle your formulas
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Before - Manual Way */}
          <Card className="p-8 border-2 border-muted relative overflow-hidden">
            <div className="absolute top-0 right-0 bg-destructive text-destructive-foreground px-4 py-1 text-sm font-medium">
              The Old Way
            </div>
            <div className="mt-8">
              <h3 className="text-2xl font-bold text-foreground mb-6">Manual Formula Creation</h3>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg bg-destructive/10 flex items-center justify-center flex-shrink-0">
                    <Clock className="w-6 h-6 text-destructive" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-1">15-30 Minutes Per Formula</h4>
                    <p className="text-sm text-muted-foreground">Complex formulas require extensive research and testing</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg bg-destructive/10 flex items-center justify-center flex-shrink-0">
                    <Search className="w-6 h-6 text-destructive" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-1">Endless Google Searches</h4>
                    <p className="text-sm text-muted-foreground">Jumping between Stack Overflow, forums, and documentation</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg bg-destructive/10 flex items-center justify-center flex-shrink-0">
                    <AlertCircle className="w-6 h-6 text-destructive" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-1">Trial & Error Debugging</h4>
                    <p className="text-sm text-muted-foreground">Missing brackets, wrong syntax, logic errors to fix</p>
                  </div>
                </div>
              </div>

              <div className="mt-8 p-4 bg-destructive/5 rounded-lg border border-destructive/20">
                <p className="text-center font-bold text-destructive text-lg">
                  ⏱️ Average: 2-3 hours per day wasted
                </p>
              </div>
            </div>
          </Card>

          {/* After - With FormulaGenie */}
          <Card className="p-8 border-2 border-primary relative overflow-hidden shadow-elegant">
            <div className="absolute top-0 right-0 bg-gradient-primary text-primary-foreground px-4 py-1 text-sm font-medium">
              With FormulaGenie
            </div>
            <div className="mt-8">
              <h3 className="text-2xl font-bold text-foreground mb-6">AI-Powered Instant Results</h3>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Zap className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-1">10-30 Seconds Per Formula</h4>
                    <p className="text-sm text-muted-foreground">Type what you need in plain English, get instant results</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <CheckCircle className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-1">Zero Research Needed</h4>
                    <p className="text-sm text-muted-foreground">No more tab-switching or searching for syntax</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <TrendingUp className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-1">Error-Free & Optimized</h4>
                    <p className="text-sm text-muted-foreground">Perfect syntax every time with clear explanations</p>
                  </div>
                </div>
              </div>

              <div className="mt-8 p-4 bg-gradient-primary/10 rounded-lg border border-primary/20">
                <p className="text-center font-bold text-primary text-lg">
                  ✨ Save 90% of your formula time
                </p>
              </div>
            </div>
          </Card>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16 max-w-5xl mx-auto">
          <Card className="p-6 text-center">
            <div className="text-4xl font-bold text-primary mb-2">50x</div>
            <p className="text-muted-foreground">Faster than manual creation</p>
          </Card>
          <Card className="p-6 text-center">
            <div className="text-4xl font-bold text-primary mb-2">10+ hrs</div>
            <p className="text-muted-foreground">Saved per week on average</p>
          </Card>
          <Card className="p-6 text-center">
            <div className="text-4xl font-bold text-primary mb-2">99.9%</div>
            <p className="text-muted-foreground">Accuracy rate</p>
          </Card>
        </div>
      </div>
    </section>
  );
};
