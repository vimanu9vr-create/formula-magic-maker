import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Copy, ArrowRight, Mic, MicOff, Globe, CheckCircle } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useVoiceInput } from "@/hooks/useVoiceInput";
import { useToast } from "@/hooks/use-toast";
import heroImage from "@/assets/dashboard-demo.png";
const Hero = () => {
  const [inputText, setInputText] = useState("Find the average of values in column A where column B contains 'completed'");
  const [outputFormula] = useState("=AVERAGEIF(B:B,\"completed\",A:A)");
  const [selectedLanguage, setSelectedLanguage] = useState("en-US");
  const {
    toast
  } = useToast();
  const {
    isListening,
    isSupported,
    startListening,
    stopListening
  } = useVoiceInput({
    onResult: transcript => {
      setInputText(transcript);
      toast({
        title: "Voice input received",
        description: "Your speech has been converted to text"
      });
    },
    language: selectedLanguage
  });
  return <section className="pt-24 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="container max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-6 leading-tight">
            <span className="bg-gradient-primary bg-clip-text text-transparent">
              Excel AI: Generate Formulas, Data Analysis, Visualizations & More
            </span>
          </h1>
          <p className="text-xl text-muted-foreground mb-4 max-w-3xl mx-auto leading-relaxed">Formula Genie is your AI-powered data analyst that instantly transforms data into charts, insights, reports, and more.</p>
          <p className="text-lg text-muted-foreground mb-4 max-w-3xl mx-auto">
            <strong>With Voice Input & Google Sheets Add-on</strong> — No more endless searching or trial and error.
          </p>
          <div className="flex flex-wrap justify-center gap-3 mb-8 max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-primary/10 px-4 py-2 rounded-full border border-primary/20">
              <Mic className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-foreground">Voice Input Enabled</span>
            </div>
            <div className="inline-flex items-center gap-2 bg-primary/10 px-4 py-2 rounded-full border border-primary/20">
              <Globe className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-foreground">Google Sheets Integration</span>
            </div>
            <div className="inline-flex items-center gap-2 bg-primary/10 px-4 py-2 rounded-full border border-primary/20">
              <CheckCircle className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-foreground">99% Accuracy</span>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4 mb-12">
            <Button size="lg" className="bg-gradient-primary text-primary-foreground hover:opacity-90 shadow-elegant" asChild>
              <Link to="/auth">
                Start Free — 5 Requests/Day
                <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="border-2 border-primary/30 hover:bg-primary/5" asChild>
              <Link to="/pricing">
                View Pricing
              </Link>
            </Button>
          </div>
          <p className="text-sm text-muted-foreground mb-12">No credit card required • Upgrade anytime</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <Card className="p-6 shadow-elegant border-2">
              <div className="mb-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold text-foreground">Plain English Input</h3>
                  <div className="text-xs bg-primary/10 px-3 py-1 rounded-full text-primary font-medium border border-primary/20">
                    English to Excel Formula
                  </div>
                </div>
                
                <div className="flex gap-2 mb-3">
                  <Select value={selectedLanguage} onValueChange={setSelectedLanguage}>
                    <SelectTrigger className="w-[180px]">
                      <Globe className="h-4 w-4 mr-2" />
                      <SelectValue placeholder="Language" />
                    </SelectTrigger>
                    <SelectContent className="bg-background border-border shadow-lg z-50">
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
                  
                  {isSupported && <Button type="button" variant={isListening ? "destructive" : "outline"} size="icon" onClick={isListening ? stopListening : startListening} className="shrink-0 h-10 w-10" title={isListening ? "Stop recording" : "Start voice input"}>
                      {isListening ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
                    </Button>}
                </div>
                
                <Textarea value={inputText} onChange={e => setInputText(e.target.value)} placeholder="Describe what you want your formula to do..." className="min-h-[100px] resize-none border-2 border-primary/20 focus:border-primary focus:ring-2 focus:ring-primary/20 bg-background" />
              </div>
              
              <div className="border-t-2 border-primary/10 pt-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold text-foreground">Excel Formula Output</h3>
                  <Button size="sm" variant="ghost" className="h-8 w-8 p-0 hover:bg-primary/10 hover:text-primary">
                    <Copy className="w-4 h-4" />
                  </Button>
                </div>
                <div className="bg-primary/5 p-4 rounded-lg font-mono text-sm border-2 border-primary/20 text-foreground">
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
            <div className="relative">
              <img src={heroImage} alt="FormulaGenie AI Code Generator Dashboard - Excel formula generation with voice input and Google Sheets integration for data analysts" className="rounded-2xl shadow-elegant w-full h-auto border-2 border-primary/20" />
              <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 to-transparent rounded-2xl"></div>
              <div className="absolute -bottom-4 -right-4 bg-background border-2 border-primary/30 rounded-xl p-4 shadow-elegant">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-sm font-semibold text-foreground">Live & Ready</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>;
};
export default Hero;