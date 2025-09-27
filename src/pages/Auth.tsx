import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/hooks/useAuth';

const Auth = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { user, signUp, signIn, signInWithGoogle } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate('/dashboard');
    }
  }, [user, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password || (isSignUp && !confirmPassword)) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive"
      });
      return;
    }

    if (password.length < 6) {
      toast({
        title: "Error",
        description: "Password must be at least 6 characters",
        variant: "destructive"
      });
      return;
    }

    if (isSignUp && password !== confirmPassword) {
      toast({
        title: "Error",
        description: "Passwords do not match",
        variant: "destructive"
      });
      return;
    }

    setLoading(true);
    try {
      const { error } = isSignUp ? 
        await signUp(email, password) : 
        await signIn(email, password);

      if (error) {
        toast({
          title: "Error",
          description: error.message,
          variant: "destructive"
        });
      } else if (isSignUp) {
        toast({
          title: "Account Created!",
          description: "Please check your email to confirm your account before signing in.",
        });
        // Clear form and switch to sign in mode
        setEmail('');
        setPassword('');
        setConfirmPassword('');
        setIsSignUp(false);
      } else {
        toast({
          title: "Success",
          description: "Signed in successfully!",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "An unexpected error occurred",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setLoading(true);
    try {
      const { error } = await signInWithGoogle();
      if (error) {
        console.log('Google OAuth Error:', error);
        // Handle specific Google OAuth errors
        if (error.message.includes('provider') || 
            error.message.includes('not enabled') ||
            error.message.includes('Invalid login credentials') ||
            error.message.includes('validation_failed')) {
          toast({
            title: "Google Sign-In Not Available",
            description: "Google authentication is not configured. Please use email/password or configure Google OAuth in Supabase settings.",
            variant: "destructive"
          });
        } else {
          toast({
            title: "Google Sign-In Error",
            description: error.message,
            variant: "destructive"
          });
        }
      }
    } catch (error: any) {
      console.error('Google OAuth catch error:', error);
      toast({
        title: "Google Sign-In Unavailable",
        description: "Google authentication needs to be configured in your Supabase project settings.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <Card className="w-full max-w-md p-8 shadow-elegant">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-foreground mb-2">
            {isSignUp ? 'Create Account' : 'Welcome Back'}
          </h1>
          <p className="text-muted-foreground">
            {isSignUp ? 'Start converting formulas today' : 'Sign in to your account'}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
            />
          </div>
          
          <div>
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
            />
          </div>

          {isSignUp && (
            <div>
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <Input
                id="confirmPassword"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm your password"
                required
              />
            </div>
          )}

          <Button 
            type="submit" 
            className="w-full bg-gradient-primary text-primary-foreground hover:opacity-90"
            disabled={loading}
          >
            {loading ? 'Processing...' : (isSignUp ? 'Create Account' : 'Sign In')}
          </Button>
        </form>

        <div className="my-6">
          <Separator />
          <div className="text-center -mt-3">
            <span className="bg-background px-2 text-sm text-muted-foreground">or</span>
          </div>
        </div>

        <Button 
          onClick={handleGoogleSignIn}
          variant="outline" 
          className="w-full"
          disabled={loading}
        >
          Continue with Google
        </Button>

        <div className="text-center mt-6">
          <button
            type="button"
            onClick={() => setIsSignUp(!isSignUp)}
            className="text-sm text-primary hover:underline"
          >
            {isSignUp ? 'Already have an account? Sign in' : "Don't have an account? Sign up"}
          </button>
        </div>
      </Card>
    </div>
  );
};

export default Auth;