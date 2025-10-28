import Navigation from "@/components/Navigation";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Copy, RefreshCw, ArrowLeftRight, Zap, Clock, RotateCcw, Mic, MicOff, Globe } from "lucide-react";
import { useState, useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useProfile } from "@/hooks/useProfile";
import { useUsageCount } from "@/hooks/useUsageCount";
import { useVoiceInput } from "@/hooks/useVoiceInput";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const [mode, setMode] = useState<"english-to-formula" | "formula-to-english" | "explain-formula" | "error-fix" | "optimize" | "sql-generator" | "regex-generator" | "python-generator" | "javascript-generator">("english-to-formula");
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [recentHistory, setRecentHistory] = useState<any[]>([]);
  const [selectedLanguage, setSelectedLanguage] = useState("en-US");
  
  const { user, session } = useAuth();
  const { profile, loading: profileLoading, refreshProfile } = useProfile();
  const { usageCount, refreshUsageCount } = useUsageCount();
  const { toast } = useToast();
  
  const { isListening, isSupported, startListening, stopListening } = useVoiceInput({
    onResult: (transcript) => {
      setInput(transcript);
      toast({
        title: "Voice input received",
        description: "Your speech has been converted to text",
      });
    },
    language: selectedLanguage,
  });
  
  const planLower = (profile?.plan || 'free').toLowerCase();
  const isExpired = profile?.plan_status === 'expired';
  
  // Determine request limits based on plan
  let requestsLimit: number;
  if (planLower === 'free' || isExpired) {
    requestsLimit = 5;
  } else if (planLower === 'ltd') {
    requestsLimit = 25;
  } else if (planLower === 'pro') {
    requestsLimit = Infinity;
  } else {
    requestsLimit = 5; // Default to free tier
  }
  
  const isLimited = requestsLimit !== Infinity;
  const requestsUsed = usageCount;
  const requestsRemaining = isLimited ? Math.max(0, requestsLimit - requestsUsed) : Infinity;

  const modes = [
    { key: "english-to-formula", label: "English to Excel Formula", icon: "→" },
    { key: "formula-to-english", label: "Excel Formula to English", icon: "←" },
    { key: "explain-formula", label: "Explain Formula", icon: "📚" },
    { key: "error-fix", label: "Fix Excel Formula", icon: "🔧" },
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
      refreshUsageCount();
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
        <div className="h-full overflow-y-auto pt-16 px-4 sm:px-6 lg:px-8 py-6">
          <div className="container max-w-6xl mx-auto">
            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
              <div>
                <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-2">Dashboard</h1>
                <p className="text-sm sm:text-base text-muted-foreground">Generate formulas, SQL, regex, and code snippets instantly</p>
              </div>
              
              <div className="flex flex-wrap items-center gap-3">
                <Badge variant="outline" className="flex items-center gap-2 px-3 py-2 bg-primary/5 border-primary/20 hover:bg-primary/10 transition-colors">
                  <Zap className="w-4 h-4 text-primary" />
                  <span className="text-xs sm:text-sm font-medium text-primary">{profile?.plan ? profile.plan.charAt(0).toUpperCase() + profile.plan.slice(1) : 'Free'} Plan</span>
                </Badge>
                <Badge 
                  variant={requestsRemaining > 1 || requestsRemaining === Infinity ? "default" : "destructive"} 
                  className="flex items-center gap-2 px-3 py-2 bg-gradient-primary text-primary-foreground shadow-sm"
                >
                  <span className="text-xs sm:text-sm font-medium">
                    {requestsRemaining === Infinity 
                      ? "Unlimited" 
                      : `${requestsRemaining}/${requestsLimit} left`}
                  </span>
                </Badge>
              </div>
            </div>

            <div className="space-y-6">
              {/* Main Converter */}
              <Card className="p-6 sm:p-8 shadow-elegant border-2 border-primary/10 hover:border-primary/20 transition-colors">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl sm:text-2xl font-bold text-foreground flex items-center gap-2">
                    <span className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
                      <span className="text-primary-foreground text-sm">AI</span>
                    </span>
                    AI Code Generator
                  </h2>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      onClick={handleReset}
                      className="flex items-center gap-2 hover:bg-primary/5 hover:text-primary hover:border-primary/30 transition-all"
                    >
                      <RotateCcw className="w-4 h-4" />
                      <span className="hidden sm:inline">Reset</span>
                    </Button>
                    <Button
                      variant="outline"
                      onClick={handleModeSwitch}
                      className="hidden md:flex items-center gap-2 hover:bg-primary/5 hover:text-primary hover:border-primary/30 transition-all"
                    >
                      <ArrowLeftRight className="w-4 h-4" />
                      <span>Switch Mode</span>
                    </Button>
                  </div>
                </div>

                {/* Mode Selector */}
                <div className="flex flex-wrap gap-2 mb-8">
                  {modes.map((modeOption) => (
                    <Button
                      key={modeOption.key}
                      variant={mode === modeOption.key ? "default" : "outline"}
                      onClick={() => {
                        setMode(modeOption.key as typeof mode);
                        setInput("");
                        setOutput("");
                      }}
                      className={`flex items-center gap-2 transition-all hover:scale-105 ${
                        mode === modeOption.key 
                          ? "bg-gradient-primary text-primary-foreground shadow-md" 
                          : "hover:bg-primary/5 hover:text-primary hover:border-primary/30"
                      }`}
                    >
                      <span>{modeOption.icon}</span>
                      <span>{modeOption.label}</span>
                    </Button>
                  ))}
                </div>

                <div className="space-y-6">
                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20 px-3 py-1">
                        {getModeDisplay()}
                      </Badge>
                    </div>
                    
                    <div className="flex gap-2 mb-3">
                      <Select value={selectedLanguage} onValueChange={setSelectedLanguage}>
                        <SelectTrigger className="w-[200px]">
                          <Globe className="h-4 w-4 mr-2" />
                          <SelectValue placeholder="Language" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="en-US">English (US)</SelectItem>
                          <SelectItem value="en-GB">English (UK)</SelectItem>
                          <SelectItem value="es-ES">Spanish</SelectItem>
                          <SelectItem value="fr-FR">French</SelectItem>
                          <SelectItem value="de-DE">German</SelectItem>
                          <SelectItem value="it-IT">Italian</SelectItem>
                          <SelectItem value="pt-BR">Portuguese (BR)</SelectItem>
                          <SelectItem value="pt-PT">Portuguese (PT)</SelectItem>
                          <SelectItem value="zh-CN">Chinese (CN)</SelectItem>
                          <SelectItem value="ja-JP">Japanese</SelectItem>
                          <SelectItem value="ko-KR">Korean</SelectItem>
                          <SelectItem value="ar-SA">Arabic</SelectItem>
                          <SelectItem value="hi-IN">Hindi</SelectItem>
                          <SelectItem value="ru-RU">Russian</SelectItem>
                          <SelectItem value="nl-NL">Dutch</SelectItem>
                          <SelectItem value="pl-PL">Polish</SelectItem>
                          <SelectItem value="tr-TR">Turkish</SelectItem>
                          <SelectItem value="sv-SE">Swedish</SelectItem>
                          <SelectItem value="fil-PH">Filipino</SelectItem>
                        </SelectContent>
                      </Select>
                      
                      {isSupported && (
                        <Button
                          type="button"
                          variant={isListening ? "destructive" : "outline"}
                          size="icon"
                          onClick={isListening ? stopListening : startListening}
                          className="shrink-0 h-10 w-10"
                          title={isListening ? "Stop recording" : "Start voice input"}
                        >
                          {isListening ? (
                            <MicOff className="h-4 w-4" />
                          ) : (
                            <Mic className="h-4 w-4" />
                          )}
                        </Button>
                      )}
                      
                      {!isSupported && (
                        <span className="text-xs text-muted-foreground flex items-center">
                          Voice input not supported in this browser
                        </span>
                      )}
                    </div>
                    
                    <Textarea
                      placeholder={getPlaceholder()}
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      className="min-h-[140px] resize-none border-2 border-primary/20 focus:border-primary focus:ring-2 focus:ring-primary/20 bg-background transition-all"
                    />
                  </div>

                  <div className="flex justify-center">
                    <Button
                      onClick={handleProcess}
                      disabled={!input.trim() || isProcessing || requestsRemaining === 0}
                      className="bg-gradient-primary text-primary-foreground hover:opacity-90 shadow-elegant px-8 py-6 text-base hover:scale-105 transition-all disabled:opacity-50 disabled:hover:scale-100"
                    >
                      {isProcessing ? (
                        <>
                          <RefreshCw className="w-5 h-5 mr-2 animate-spin" />
                          Processing...
                        </>
                      ) : (
                        <>
                          <Zap className="w-5 h-5 mr-2" />
                          {getButtonText()}
                        </>
                      )}
                    </Button>
                  </div>

                  {output && (
                    <div className="animate-fade-in">
                      <div className="flex items-center justify-between mb-3">
                         <label className="font-semibold text-foreground flex items-center gap-2">
                           <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
                           {mode === "english-to-formula" ? "Excel Formula" : 
                            mode === "formula-to-english" ? "Plain English Explanation" :
                            mode === "explain-formula" ? "Step-by-Step Explanation" :
                            mode === "error-fix" ? "Fixed Formula" : 
                            mode === "optimize" ? "Optimized Formula" :
                             mode === "sql-generator" ? "SQL Query" : 
                             mode === "regex-generator" ? "Regex Pattern" :
                             mode === "python-generator" ? "Python Code" : 
                             mode === "javascript-generator" ? "JavaScript Code" : "Result"}
                         </label>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={copyToClipboard}
                          className="h-9 w-9 p-0 hover:bg-primary/10 hover:text-primary transition-all"
                        >
                          <Copy className="w-4 h-4" />
                        </Button>
                      </div>
                      <div className="bg-primary/5 p-5 rounded-lg font-mono text-sm break-all border-2 border-primary/20 hover:border-primary/30 transition-colors">
                        {output}
                      </div>
                    </div>
                  )}
                </div>
              </Card>

              {requestsRemaining === 0 && isLimited && (
                <Card className="p-8 border-2 border-destructive/30 bg-destructive/5 shadow-lg animate-fade-in">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-destructive/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Clock className="w-8 h-8 text-destructive" />
                    </div>
                    <h3 className="text-xl font-bold text-foreground mb-2">Daily Limit Reached</h3>
                    <p className="text-muted-foreground mb-6">
                      You've used all your daily requests. Upgrade to Pro for unlimited access.
                    </p>
                    <Button 
                      className="bg-gradient-primary text-primary-foreground hover:opacity-90 shadow-elegant px-6 py-5 hover:scale-105 transition-all"
                      asChild
                    >
                      <Link to="/pricing">
                        <Zap className="w-4 h-4 mr-2" />
                        Upgrade to Pro
                      </Link>
                    </Button>
                  </div>
                </Card>
              )}

              {/* Usage Stats - Only show for limited users */}
              {isLimited && (
                <Card className="p-6 border-2 border-primary/10 hover:border-primary/20 transition-colors shadow-soft">
                  <h3 className="font-bold text-lg text-foreground mb-4 flex items-center gap-2">
                    <Clock className="w-5 h-5 text-primary" />
                    Today's Usage
                  </h3>
                  <div className="space-y-4">
                    <div>
                       <div className="flex justify-between text-sm mb-2">
                         <span className="text-muted-foreground font-medium">Requests Used Today</span>
                         <span className="font-bold text-foreground">{requestsUsed}/{requestsLimit}</span>
                       </div>
                      <div className="w-full bg-secondary rounded-full h-3 overflow-hidden">
                        <div 
                          className="bg-gradient-primary h-3 rounded-full transition-all duration-500 shadow-sm"
                          style={{ width: `${Math.min((requestsUsed / requestsLimit) * 100, 100)}%` }}
                        ></div>
                      </div>
                    </div>
                    
                    <div className="pt-2 border-t border-primary/10">
                      <p className="text-xs text-muted-foreground flex items-center gap-2">
                        <RefreshCw className="w-3 h-3" />
                        Resets at midnight (UTC)
                      </p>
                    </div>
                  </div>
                </Card>
              )}

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
                    asChild
                  >
                    <Link to="/pricing">Upgrade Now</Link>
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