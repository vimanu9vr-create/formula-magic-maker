import Navigation from "@/components/Navigation";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Copy, RefreshCw, ArrowLeftRight, Zap, Clock, RotateCcw } from "lucide-react";
import { useState, useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useProfile } from "@/hooks/useProfile";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

const Dashboard = () => {
  const [mode, setMode] = useState<"english-to-formula" | "formula-to-english" | "explain-formula" | "error-fix" | "optimize" | "sql-generator" | "regex-generator" | "python-generator" | "javascript-generator">("english-to-formula");
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [recentHistory, setRecentHistory] = useState<any[]>([]);
  
  const { user, session } = useAuth();
  const { profile, loading: profileLoading, refreshProfile } = useProfile();
  const { toast } = useToast();
  
  const requestsLimit = profile?.plan === 'free' ? 5 : Infinity;
  const requestsUsed = profile?.usage_count || 0;
  const requestsRemaining = Math.max(0, requestsLimit - requestsUsed);

  const modes = [
    { key: "english-to-formula", label: "English → Formula", icon: "→" },
    { key: "formula-to-english", label: "Formula → English", icon: "←" },
    { key: "explain-formula", label: "Explain Formula", icon: "📚" },
    { key: "error-fix", label: "Fix Formula", icon: "🔧" },
    { key: "optimize", label: "Optimize Formula", icon: "⚡" },
    { key: "sql-generator", label: "SQL Generator", icon: "🗄️" },
    { key: "regex-generator", label: "Regex Generator", icon: "🔍" },
    { key: "python-generator", label: "Python Generator", icon: "🐍" },
    { key: "javascript-generator", label: "JS Generator", icon: "⚡" }
  ];

  const currentModeIndex = modes.findIndex(m => m.key === mode);
  
  const handleModeSwitch = () => {
    const nextIndex = (currentModeIndex + 1) % modes.length;
    setMode(modes[nextIndex].key as typeof mode);
    setInput("");
    setOutput("");
  };

  const getModeDisplay = () => {
    return modes.find(m => m.key === mode)?.label || "Unknown Mode";
  };

  const getPlaceholder = () => {
    switch (mode) {
      case "english-to-formula":
        return "Describe what you want your formula to do... (e.g., 'Sum all values in column A where column B contains completed')";
      case "formula-to-english":
        return "Paste your formula here... (e.g., '=SUMIF(B:B,\"completed\",A:A)')";
      case "explain-formula":
        return "Paste any formula to learn how it works step-by-step... (e.g., '=VLOOKUP(A2,Sheet2!A:B,2,FALSE)')";
      case "error-fix":
        return "Paste your broken formula here and I'll fix it... (e.g., '=SUMIF(B:B,completed,A:A)')";
      case "optimize":
        return "Paste your formula here and I'll suggest optimizations... (e.g., '=IF(A1>0,IF(A1<100,\"Medium\",\"High\"),\"Low\")')";
      case "sql-generator":
        return "Describe what data you want to query... (e.g., 'Get all customers who made orders in the last 30 days')";
      case "regex-generator":
        return "Describe the pattern you want to match... (e.g., 'Match email addresses' or 'Find phone numbers')";
      case "python-generator":
        return "Describe what you want the Python code to do... (e.g., 'Read CSV file and calculate average of column A')";
      case "javascript-generator":
        return "Describe what you want the JavaScript code to do... (e.g., 'Validate form input and show error messages')";
      default:
        return "Enter your input...";
    }
  };

  const getButtonText = () => {
    switch (mode) {
      case "english-to-formula":
        return "Generate Formula";
      case "formula-to-english":
        return "Generate Explanation";
      case "explain-formula":
        return "Learn How It Works";
      case "error-fix":
        return "Fix Formula";
      case "optimize":
        return "Optimize Formula";
      case "sql-generator":
        return "Generate SQL";
      case "regex-generator":
        return "Generate Regex";
      case "python-generator":
        return "Generate Python";
      case "javascript-generator":
        return "Generate JavaScript";
      default:
        return "Process";
    }
  };

  const handleReset = () => {
    setInput("");
    setOutput("");
  };

  const handleProcess = async () => {
    if (!input.trim() || !session) return;
    
    setIsProcessing(true);
    
    try {
      const { data, error } = await supabase.functions.invoke('generate-formula', {
        body: {
          input: input.trim(),
          type: mode
        }
      });

      if (error) {
        throw error;
      }

      if (data.error) {
        toast({
          title: "Error",
          description: data.message || data.error,
          variant: "destructive"
        });
        return;
      }

      setOutput(data.output);
      refreshProfile();
      fetchRecentHistory();
      
      toast({
        title: "Success",
        description: `${mode === "english-to-formula" ? "Formula" : 
                      mode === "explain-formula" ? "Formula explanation" : 
                      mode === "sql-generator" ? "SQL query" :
                      mode === "regex-generator" ? "Regex pattern" :
                      mode === "python-generator" ? "Python code" :
                      mode === "javascript-generator" ? "JavaScript code" : "Result"} generated successfully!`
      });

    } catch (error: any) {
      console.error('Error:', error);
      toast({
        title: "Error",
        description: error.message || "Failed to process request",
        variant: "destructive"
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(output);
      toast({
        title: "Copied!",
        description: "Output copied to clipboard"
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to copy to clipboard",
        variant: "destructive"
      });
    }
  };

  const fetchRecentHistory = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('requests')
        .select('*')
        .eq('user_id', user.id)
        .order('timestamp', { ascending: false })
        .limit(5);

      if (error) {
        console.error('Error fetching history:', error);
      } else {
        setRecentHistory(data || []);
      }
    } catch (error) {
      console.error('Error fetching history:', error);
    }
  };

  useEffect(() => {
    if (user) {
      fetchRecentHistory();
    }
  }, [user]);

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours} hours ago`;
    
    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays === 1) return '1 day ago';
    if (diffInDays < 7) return `${diffInDays} days ago`;
    
    return date.toLocaleDateString();
  };

  if (profileLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen bg-background flex flex-col">
      <Navigation />
      
      <div className="flex-1 overflow-hidden">
        <div className="h-full overflow-y-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="container max-w-6xl mx-auto">
            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
              <div>
                <h1 className="text-3xl font-bold text-foreground mb-2">Dashboard</h1>
                <p className="text-muted-foreground">Generate formulas, SQL, regex, and code snippets instantly</p>
              </div>
              
              <div className="flex items-center space-x-4 mt-4 sm:mt-0">
                <Badge variant="outline" className="flex items-center space-x-2">
                  <Zap className="w-4 h-4" />
                  <span>{profile?.plan ? profile.plan.charAt(0).toUpperCase() + profile.plan.slice(1) : 'Free'} Plan</span>
                </Badge>
                <Badge 
                  variant={requestsRemaining > 1 ? "default" : "destructive"} 
                  className="flex items-center space-x-2"
                >
                  <span>{requestsRemaining} of {requestsLimit} requests left</span>
                </Badge>
              </div>
            </div>

            <div className="space-y-6">
              {/* Main Converter */}
              <Card className="p-6 shadow-soft">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold text-foreground">AI Code Generator</h2>
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="outline"
                      onClick={handleReset}
                      className="flex items-center space-x-2"
                    >
                      <RotateCcw className="w-4 h-4" />
                      <span>Reset</span>
                    </Button>
                    <Button
                      variant="outline"
                      onClick={handleModeSwitch}
                      className="flex items-center space-x-2"
                    >
                      <ArrowLeftRight className="w-4 h-4" />
                      <span>Switch Mode</span>
                    </Button>
                  </div>
                </div>

                {/* Mode Selector */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {modes.map((modeOption) => (
                    <Button
                      key={modeOption.key}
                      variant={mode === modeOption.key ? "default" : "outline"}
                      onClick={() => {
                        setMode(modeOption.key as typeof mode);
                        setInput("");
                        setOutput("");
                      }}
                      className="flex items-center space-x-2"
                    >
                      <span>{modeOption.icon}</span>
                      <span>{modeOption.label}</span>
                    </Button>
                  ))}
                </div>

                <div className="space-y-6">
                  <div>
                    <div className="flex items-center space-x-2 mb-2">
                      <Badge variant="secondary">
                        {getModeDisplay()}
                      </Badge>
                    </div>
                    <Textarea
                      placeholder={getPlaceholder()}
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
                          {getButtonText()}
                        </>
                      )}
                    </Button>
                  </div>

                  {output && (
                    <div>
                      <div className="flex items-center justify-between mb-2">
                         <label className="font-medium text-foreground">
                           {mode === "english-to-formula" ? "Excel Formula" : 
                            mode === "formula-to-english" ? "Plain English Explanation" :
                            mode === "explain-formula" ? "Step-by-Step Explanation" :
                            mode === "error-fix" ? "Fixed Formula" : 
                            mode === "optimize" ? "Optimized Formula" :
                            mode === "sql-generator" ? "SQL Query" : 
                            mode === "regex-generator" ? "Regex Pattern" :
                            mode === "python-generator" ? "Python Code" : "JavaScript Code"}
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
                      <div className="bg-muted p-4 rounded-lg font-mono text-sm break-all">
                        {output}
                      </div>
                    </div>
                  )}
                </div>
              </Card>

              {requestsRemaining === 0 && (
                <Card className="p-6 border-destructive/20 bg-destructive/5">
                  <div className="text-center">
                    <h3 className="font-semibold text-foreground mb-2">Daily Limit Reached</h3>
                    <p className="text-muted-foreground mb-4">
                      You've used all your free requests for today. Upgrade to Pro for unlimited access.
                    </p>
                    <Button 
                      className="bg-gradient-primary text-primary-foreground hover:opacity-90"
                      onClick={() => window.open("https://aiformulagenie.gumroad.com/l/zzjoi", "_blank")}
                    >
                      Upgrade to Pro
                    </Button>
                  </div>
                </Card>
              )}

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
                <div className="space-y-4 max-h-60 overflow-y-auto">
                  {recentHistory.length > 0 ? (
                    recentHistory.map((item, index) => (
                      <div key={index} className="border-b pb-3 last:border-b-0">
                        <div className="flex items-center space-x-2 mb-1">
                          <Badge variant="outline" className="text-xs">
                            {item.type === "english-to-formula" ? "E→F" : "F→E"}
                          </Badge>
                          <div className="flex items-center text-xs text-muted-foreground">
                            <Clock className="w-3 h-3 mr-1" />
                            {formatTimestamp(item.timestamp)}
                          </div>
                        </div>
                        <p className="text-sm text-foreground break-words">{item.input}</p>
                        <p className="text-xs text-muted-foreground mt-1 font-mono break-all">
                          {item.output}
                        </p>
                      </div>
                    ))
                  ) : (
                    <p className="text-sm text-muted-foreground text-center py-4">
                      No recent activity
                    </p>
                  )}
                </div>
              </Card>

              {/* Upgrade CTA - Only show for free plan users */}
              {profile?.plan === 'free' && (
                <Card className="p-6 bg-gradient-hero text-primary-foreground">
                  <h3 className="font-semibold mb-2">Unlock Unlimited Access</h3>
                  <p className="text-sm text-primary-foreground/90 mb-4">
                    Upgrade to Pro for unlimited conversions and advanced features.
                  </p>
                  <Button 
                    variant="secondary" 
                    className="w-full bg-white text-primary hover:bg-white/90"
                    onClick={() => window.open("https://aiformulagenie.gumroad.com/l/zzjoi", "_blank")}
                  >
                    Upgrade Now
                  </Button>
                </Card>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;