import Navigation from "@/components/Navigation";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Copy, RefreshCw, ArrowLeftRight, Zap, Clock } from "lucide-react";
import { useState } from "react";

const Dashboard = () => {
  const [mode, setMode] = useState<"english-to-formula" | "formula-to-english">("english-to-formula");
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  
  // Mock user data - in real app this would come from Supabase
  const userPlan = "Free";
  const requestsUsed = 3;
  const requestsLimit = 5;
  const requestsRemaining = requestsLimit - requestsUsed;

  const handleModeSwitch = () => {
    setMode(mode === "english-to-formula" ? "formula-to-english" : "english-to-formula");
    setInput("");
    setOutput("");
  };

  const handleProcess = async () => {
    if (!input.trim()) return;
    
    setIsProcessing(true);
    
    // Simulate API call
    setTimeout(() => {
      if (mode === "english-to-formula") {
        setOutput("=SUMIF(B:B,\"completed\",A:A)");
      } else {
        setOutput("This formula sums all values in column A where the corresponding cell in column B contains the text 'completed'.");
      }
      setIsProcessing(false);
    }, 1500);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(output);
  };

  const recentHistory = [
    {
      input: "Sum values where status is complete",
      output: "=SUMIF(B:B,\"complete\",A:A)",
      timestamp: "2 hours ago",
      type: "english-to-formula"
    },
    {
      input: "=VLOOKUP(A2,Table1,2,FALSE)",
      output: "Looks up the value in A2 within Table1 and returns the corresponding value from the 2nd column",
      timestamp: "1 day ago", 
      type: "formula-to-english"
    },
    {
      input: "Count cells that are not empty",
      output: "=COUNTA(A:A)",
      timestamp: "2 days ago",
      type: "english-to-formula"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="pt-20 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="container max-w-6xl mx-auto">
          {/* Header */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-2">Dashboard</h1>
              <p className="text-muted-foreground">Convert formulas and plain English instantly</p>
            </div>
            
            <div className="flex items-center space-x-4 mt-4 sm:mt-0">
              <Badge variant="outline" className="flex items-center space-x-2">
                <Zap className="w-4 h-4" />
                <span>{userPlan} Plan</span>
              </Badge>
              <Badge 
                variant={requestsRemaining > 1 ? "default" : "destructive"} 
                className="flex items-center space-x-2"
              >
                <span>{requestsRemaining} of {requestsLimit} requests left</span>
              </Badge>
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Converter */}
            <div className="lg:col-span-2">
              <Card className="p-6 shadow-soft">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold text-foreground">Formula Converter</h2>
                  <Button
                    variant="outline"
                    onClick={handleModeSwitch}
                    className="flex items-center space-x-2"
                  >
                    <ArrowLeftRight className="w-4 h-4" />
                    <span>Switch Mode</span>
                  </Button>
                </div>

                <div className="space-y-6">
                  <div>
                    <div className="flex items-center space-x-2 mb-2">
                      <Badge variant="secondary">
                        {mode === "english-to-formula" ? "English → Formula" : "Formula → English"}
                      </Badge>
                    </div>
                    <Textarea
                      placeholder={
                        mode === "english-to-formula" 
                          ? "Describe what you want your formula to do... (e.g., 'Sum all values in column A where column B contains completed')"
                          : "Paste your formula here... (e.g., '=SUMIF(B:B,\"completed\",A:A)')"
                      }
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      className="min-h-[120px] resize-none"
                    />
                  </div>

                  <div className="flex justify-center">
                    <Button
                      onClick={handleProcess}
                      disabled={!input.trim() || isProcessing || requestsRemaining === 0}
                      className="bg-gradient-primary text-primary-foreground hover:opacity-90 shadow-elegant"
                    >
                      {isProcessing ? (
                        <>
                          <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                          Processing...
                        </>
                      ) : (
                        <>
                          Generate {mode === "english-to-formula" ? "Formula" : "Explanation"}
                        </>
                      )}
                    </Button>
                  </div>

                  {output && (
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <label className="font-medium text-foreground">
                          {mode === "english-to-formula" ? "Excel Formula" : "Plain English Explanation"}
                        </label>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={copyToClipboard}
                          className="h-8 w-8 p-0"
                        >
                          <Copy className="w-4 h-4" />
                        </Button>
                      </div>
                      <div className="bg-muted p-4 rounded-lg font-mono text-sm">
                        {output}
                      </div>
                    </div>
                  )}
                </div>
              </Card>

              {requestsRemaining === 0 && (
                <Card className="p-6 mt-6 border-destructive/20 bg-destructive/5">
                  <div className="text-center">
                    <h3 className="font-semibold text-foreground mb-2">Daily Limit Reached</h3>
                    <p className="text-muted-foreground mb-4">
                      You've used all your free requests for today. Upgrade to Pro for unlimited access.
                    </p>
                    <Button className="bg-gradient-primary text-primary-foreground hover:opacity-90">
                      Upgrade to Pro
                    </Button>
                  </div>
                </Card>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Usage Stats */}
              <Card className="p-6">
                <h3 className="font-semibold text-foreground mb-4">Today's Usage</h3>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-muted-foreground">Requests Used</span>
                      <span className="font-medium">{requestsUsed}/{requestsLimit}</span>
                    </div>
                    <div className="w-full bg-secondary rounded-full h-2">
                      <div 
                        className="bg-gradient-primary h-2 rounded-full transition-all duration-300"
                        style={{ width: `${(requestsUsed / requestsLimit) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                  
                  <div className="pt-2 border-t">
                    <p className="text-xs text-muted-foreground">
                      Usage resets daily at midnight UTC
                    </p>
                  </div>
                </div>
              </Card>

              {/* Recent History */}
              <Card className="p-6">
                <h3 className="font-semibold text-foreground mb-4">Recent History</h3>
                <div className="space-y-4">
                  {recentHistory.map((item, index) => (
                    <div key={index} className="border-b pb-3 last:border-b-0">
                      <div className="flex items-center space-x-2 mb-1">
                        <Badge variant="outline" className="text-xs">
                          {item.type === "english-to-formula" ? "E→F" : "F→E"}
                        </Badge>
                        <div className="flex items-center text-xs text-muted-foreground">
                          <Clock className="w-3 h-3 mr-1" />
                          {item.timestamp}
                        </div>
                      </div>
                      <p className="text-sm text-foreground truncate">{item.input}</p>
                      <p className="text-xs text-muted-foreground mt-1 font-mono truncate">
                        {item.output}
                      </p>
                    </div>
                  ))}
                </div>
              </Card>

              {/* Upgrade CTA */}
              <Card className="p-6 bg-gradient-hero text-primary-foreground">
                <h3 className="font-semibold mb-2">Unlock Unlimited Access</h3>
                <p className="text-sm text-primary-foreground/90 mb-4">
                  Upgrade to Pro for unlimited conversions and advanced features.
                </p>
                <Button variant="secondary" className="w-full bg-white text-primary hover:bg-white/90">
                  Upgrade Now
                </Button>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;