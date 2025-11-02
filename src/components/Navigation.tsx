import { Button } from "@/components/ui/button";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import { useProfile } from "@/hooks/useProfile";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import { useState } from "react";

const Navigation = () => {
  const location = useLocation();
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { profile } = useProfile();
  const [isOpen, setIsOpen] = useState(false);

  const handleSignOut = async () => {
    const { error } = await signOut();
    if (error) {
      toast({
        title: "Error",
        description: "Failed to sign out",
        variant: "destructive"
      });
    } else {
      navigate('/');
      toast({
        title: "Success",
        description: "Signed out successfully"
      });
    }
  };

  return (
    <nav className="fixed top-0 w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 z-50 border-b border-border">
      <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-lg">F</span>
              </div>
              <span className="font-bold text-base sm:text-xl text-foreground">FormulaGenie</span>
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            {(!user || profile?.plan === 'free' || profile?.plan_status === 'expired') && (
              <Link 
                to="/pricing" 
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  location.pathname === '/pricing' ? 'text-primary' : 'text-muted-foreground'
                }`}
              >
                Pricing
              </Link>
            )}
            {user && (
              <>
                <Link 
                  to="/dashboard" 
                  className={`text-sm font-medium transition-colors hover:text-primary ${
                    location.pathname === '/dashboard' ? 'text-primary' : 'text-muted-foreground'
                  }`}
                >
                  Dashboard
                </Link>
                <Link 
                  to="/library" 
                  className={`text-sm font-medium transition-colors hover:text-primary ${
                    location.pathname === '/library' ? 'text-primary' : 'text-muted-foreground'
                  }`}
                >
                  Library
                </Link>
                  <Link 
                    to="/account" 
                    className={`text-sm font-medium transition-colors hover:text-primary ${
                      location.pathname === '/account' ? 'text-primary' : 'text-muted-foreground'
                    }`}
                  >
                    Account
                  </Link>
                  <Link 
                    to="/google-sheets-addon" 
                    className={`text-sm font-medium transition-colors hover:text-primary ${
                      location.pathname === '/google-sheets-addon' ? 'text-primary' : 'text-muted-foreground'
                    }`}
                  >
                    Google Sheets
                  </Link>
                </>
              )}
          </div>

          <div className="flex items-center space-x-2 sm:space-x-4">
            {user ? (
              <>
                <span className="text-xs sm:text-sm text-muted-foreground hidden lg:block truncate max-w-[150px]">
                  {user.email}
                </span>
                <Button variant="ghost" size="sm" className="text-xs sm:text-sm font-medium hidden md:inline-flex" onClick={handleSignOut}>
                  Sign Out
                </Button>
              </>
            ) : (
              <>
                <Button variant="ghost" size="sm" className="text-xs sm:text-sm font-medium hidden sm:inline-flex" asChild>
                  <Link to="/auth">Sign In</Link>
                </Button>
                <Button size="sm" className="bg-gradient-primary text-primary-foreground hover:opacity-90 shadow-elegant text-xs sm:text-sm hidden md:inline-flex" asChild>
                  <Link to="/auth">Get Started</Link>
                </Button>
              </>
            )}
            
            {/* Mobile Menu */}
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="sm" className="md:hidden">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[280px] sm:w-[350px]">
                <nav className="flex flex-col space-y-4 mt-8">
                  {(!user || profile?.plan === 'free' || profile?.plan_status === 'expired') && (
                    <Link 
                      to="/pricing" 
                      className="text-base font-medium transition-colors hover:text-primary text-foreground py-2"
                      onClick={() => setIsOpen(false)}
                    >
                      Pricing
                    </Link>
                  )}
                  {user ? (
                    <>
                      <Link 
                        to="/dashboard" 
                        className="text-base font-medium transition-colors hover:text-primary text-foreground py-2"
                        onClick={() => setIsOpen(false)}
                      >
                        Dashboard
                      </Link>
                      <Link 
                        to="/library" 
                        className="text-base font-medium transition-colors hover:text-primary text-foreground py-2"
                        onClick={() => setIsOpen(false)}
                      >
                        Library
                      </Link>
                        <Link 
                          to="/account" 
                          className="text-base font-medium transition-colors hover:text-primary text-foreground py-2"
                          onClick={() => setIsOpen(false)}
                        >
                          Account
                        </Link>
                        <Link 
                          to="/google-sheets-addon" 
                          className="text-base font-medium transition-colors hover:text-primary text-foreground py-2"
                          onClick={() => setIsOpen(false)}
                        >
                          Google Sheets
                        </Link>
                        <div className="pt-4 border-t border-border">
                        <Button 
                          variant="outline" 
                          className="w-full" 
                          onClick={() => {
                            handleSignOut();
                            setIsOpen(false);
                          }}
                        >
                          Sign Out
                        </Button>
                      </div>
                    </>
                  ) : (
                    <>
                      <Link 
                        to="/auth" 
                        className="text-base font-medium transition-colors hover:text-primary text-foreground py-2"
                        onClick={() => setIsOpen(false)}
                      >
                        Sign In
                      </Link>
                      <Button 
                        className="bg-gradient-primary text-primary-foreground hover:opacity-90 shadow-elegant w-full" 
                        asChild
                      >
                        <Link to="/auth" onClick={() => setIsOpen(false)}>Get Started</Link>
                      </Button>
                    </>
                  )}
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;