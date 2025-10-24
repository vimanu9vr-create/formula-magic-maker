import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Smartphone, Monitor, Download, CheckCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { useToast } from "@/hooks/use-toast";

export default function Install() {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [isInstallable, setIsInstallable] = useState(false);
  const [isIOS, setIsIOS] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    // Check if iOS
    const iOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
    setIsIOS(iOS);

    // Listen for beforeinstallprompt event
    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setIsInstallable(true);
    };

    window.addEventListener("beforeinstallprompt", handler);

    return () => {
      window.removeEventListener("beforeinstallprompt", handler);
    };
  }, []);

  const handleInstall = async () => {
    if (!deferredPrompt) {
      toast({
        title: "Already Installed",
        description: "FormulaGenie is already installed on your device.",
      });
      return;
    }

    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;

    if (outcome === "accepted") {
      toast({
        title: "Success!",
        description: "FormulaGenie has been installed to your device.",
      });
    }

    setDeferredPrompt(null);
    setIsInstallable(false);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <main className="container mx-auto px-4 pt-24 pb-16">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <div className="flex justify-center mb-6">
              <div className="w-24 h-24 bg-gradient-primary rounded-2xl flex items-center justify-center shadow-elegant">
                <span className="text-primary-foreground font-bold text-5xl">F</span>
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary via-purple-600 to-indigo-600 text-transparent bg-clip-text">
              Install FormulaGenie
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Get the full app experience - install FormulaGenie on your device
            </p>

            {isInstallable && !isIOS && (
              <Button size="lg" onClick={handleInstall} className="gap-2 mb-8">
                <Download className="h-5 w-5" />
                Install App Now
              </Button>
            )}
          </div>

          <div className="space-y-8 mb-12">
            <Card className="p-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <CheckCircle className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Why Install?</h3>
                  <ul className="space-y-2 text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                      <span>Works offline - generate formulas without internet</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                      <span>Faster loading and better performance</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                      <span>Native app experience on your home screen</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                      <span>No app store required - install directly</span>
                    </li>
                  </ul>
                </div>
              </div>
            </Card>

            {isIOS && (
              <Card className="p-6 border-primary/20">
                <div className="flex items-start gap-4">
                  <Smartphone className="h-8 w-8 text-primary flex-shrink-0" />
                  <div>
                    <h3 className="text-xl font-semibold mb-3">Install on iPhone/iPad</h3>
                    <ol className="space-y-3 text-muted-foreground">
                      <li className="flex gap-3">
                        <span className="flex-shrink-0 w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-semibold">1</span>
                        <span>Tap the <strong>Share</strong> button in Safari (the square with arrow pointing up)</span>
                      </li>
                      <li className="flex gap-3">
                        <span className="flex-shrink-0 w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-semibold">2</span>
                        <span>Scroll down and tap <strong>"Add to Home Screen"</strong></span>
                      </li>
                      <li className="flex gap-3">
                        <span className="flex-shrink-0 w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-semibold">3</span>
                        <span>Tap <strong>"Add"</strong> in the top right corner</span>
                      </li>
                      <li className="flex gap-3">
                        <span className="flex-shrink-0 w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-semibold">4</span>
                        <span>FormulaGenie will appear on your home screen!</span>
                      </li>
                    </ol>
                  </div>
                </div>
              </Card>
            )}

            {!isIOS && (
              <Card className="p-6 border-primary/20">
                <div className="flex items-start gap-4">
                  <Monitor className="h-8 w-8 text-primary flex-shrink-0" />
                  <div>
                    <h3 className="text-xl font-semibold mb-3">Install on Android/Chrome</h3>
                    <ol className="space-y-3 text-muted-foreground">
                      <li className="flex gap-3">
                        <span className="flex-shrink-0 w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-semibold">1</span>
                        <span>Click the <strong>Install App</strong> button above (or look for the install icon in your browser address bar)</span>
                      </li>
                      <li className="flex gap-3">
                        <span className="flex-shrink-0 w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-semibold">2</span>
                        <span>Click <strong>"Install"</strong> in the popup</span>
                      </li>
                      <li className="flex gap-3">
                        <span className="flex-shrink-0 w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-semibold">3</span>
                        <span>FormulaGenie will open as a standalone app</span>
                      </li>
                      <li className="flex gap-3">
                        <span className="flex-shrink-0 w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-semibold">4</span>
                        <span>Find it in your app drawer or desktop!</span>
                      </li>
                    </ol>
                  </div>
                </div>
              </Card>
            )}
          </div>

          <Card className="p-6 bg-primary/5 border-primary/20">
            <h3 className="text-xl font-semibold mb-3">Features Available Offline</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <p className="font-medium">✓ Generate Excel formulas</p>
                <p className="font-medium">✓ Explain complex formulas</p>
                <p className="font-medium">✓ SQL query generator</p>
              </div>
              <div className="space-y-2">
                <p className="font-medium">✓ Python code generator</p>
                <p className="font-medium">✓ JavaScript generator</p>
                <p className="font-medium">✓ Formula library access</p>
              </div>
            </div>
          </Card>
        </div>
      </main>
    </div>
  );
}
