import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Navigation from "@/components/Navigation";
import { FeedbackDialog } from "@/components/FeedbackDialog";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { useAuth } from "@/hooks/useAuth";
import { useProfile } from "@/hooks/useProfile";
import { useUsageCount } from "@/hooks/useUsageCount";
import { supabase } from "@/integrations/supabase/client";
import { User, Settings, CreditCard, History, AlertCircle, Mail } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Account = () => {
  const { user, signOut } = useAuth();
  const { profile, loading: profileLoading, refreshProfile } = useProfile();
  const { usageCount } = useUsageCount();
  const { toast } = useToast();
  const [recentRequests, setRecentRequests] = useState<any[]>([]);
  const [loadingRequests, setLoadingRequests] = useState(true);

  useEffect(() => {
    if (user) {
      fetchRecentRequests();
    }
  }, [user]);

  const fetchRecentRequests = async () => {
    if (!user) return;
    
    try {
      const { data, error } = await supabase
        .from('requests')
        .select('*')
        .eq('user_id', user.id)
        .order('timestamp', { ascending: false })
        .limit(10);

      if (error) {
        console.error('Error fetching requests:', error);
      } else {
        setRecentRequests(data || []);
      }
    } catch (error) {
      console.error('Error fetching requests:', error);
    } finally {
      setLoadingRequests(false);
    }
  };

  const formatTimestamp = (timestamp: string) => {
    return new Date(timestamp).toLocaleString();
  };

  const getPlanColor = (plan: string, status?: string) => {
    if (status === 'expired') {
      return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
    }
    
    switch (plan) {
      case 'pro':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
      case 'team':
        return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200';
      case 'ltd':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
    }
  };

  const getPlanDisplayName = (plan: string, status?: string) => {
    if (status === 'expired') {
      return 'FREE';
    }
    return plan?.toUpperCase() || 'FREE';
  };

  const isExpired = profile?.plan_status === 'expired';
  const hasExpiration = profile?.plan_expires_at && profile?.plan !== 'free' && profile?.plan !== 'ltd';

  const formatExpirationDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = date.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays < 0) {
      return `Expired ${Math.abs(diffDays)} days ago`;
    } else if (diffDays === 0) {
      return 'Expires today';
    } else if (diffDays === 1) {
      return 'Expires tomorrow';
    } else {
      return `Expires in ${diffDays} days`;
    }
  };

  const getUsagePercentage = () => {
    if (!profile) return 0;
    const isLimited = profile.plan === 'free' || profile.plan_status === 'expired';
    const limit = isLimited ? 5 : Infinity;
    if (limit === Infinity) return 0;
    return Math.min((usageCount / limit) * 100, 100);
  };

  const handleSignOut = async () => {
    const { error } = await signOut();
    if (error) {
      toast({
        title: "Error",
        description: "Failed to sign out",
        variant: "destructive"
      });
    } else {
      toast({
        title: "Success",
        description: "Signed out successfully"
      });
    }
  };

  if (profileLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="pt-24 pb-20 px-4 sm:px-6 lg:px-8">
          <div className="container max-w-4xl mx-auto">
            <div className="flex items-center justify-center py-20">
              <div className="text-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
                <p className="text-muted-foreground">Loading account...</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <section className="pt-24 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="container max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">Account Settings</h1>
            <p className="text-muted-foreground">Manage your FormulaGenie account and subscription</p>
          </div>

          <div className="space-y-6">
            {/* Profile Information */}
            <Card className="p-6">
              <div className="flex items-center mb-6">
                <User className="w-5 h-5 text-primary mr-2" />
                <h2 className="text-xl font-semibold text-foreground">Profile Information</h2>
              </div>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Email</label>
                  <p className="text-foreground font-medium">{user?.email}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Member Since</label>
                  <p className="text-foreground font-medium">
                    {profile?.created_at ? new Date(profile.created_at).toLocaleDateString() : 'N/A'}
                  </p>
                </div>
              </div>
            </Card>

            {/* Subscription & Usage */}
            <Card className="p-6">
              <div className="flex items-center mb-6">
                <CreditCard className="w-5 h-5 text-primary mr-2" />
                <h2 className="text-xl font-semibold text-foreground">Subscription & Usage</h2>
              </div>
              
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium text-foreground">Current Plan</h3>
                    <p className="text-sm text-muted-foreground">Your active subscription</p>
                  </div>
                  <Badge className={getPlanColor(profile?.plan || 'free', profile?.plan_status)}>
                    {getPlanDisplayName(profile?.plan, profile?.plan_status)}
                  </Badge>
                </div>

                {/* Plan expiration warning for expired plans */}
                {isExpired && (
                  <div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
                    <div className="flex items-start">
                      <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400 mr-3 mt-0.5" />
                      <div>
                        <h3 className="text-sm font-medium text-red-800 dark:text-red-200">
                          Your Plan Has Expired
                        </h3>
                        <p className="text-sm text-red-700 dark:text-red-300 mt-1">
                          Your {profile?.plan} plan has expired. Please renew your subscription to continue using premium features.
                        </p>
                        <div className="mt-3">
                          <Button size="sm" className="bg-red-600 hover:bg-red-700 text-white" asChild>
                            <Link to="/pricing">Renew Subscription</Link>
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Plan expiration info for active plans */}
                {hasExpiration && !isExpired && (
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium text-foreground">Plan Expiration</h3>
                      <p className="text-sm text-muted-foreground">
                        {formatExpirationDate(profile.plan_expires_at)}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium text-foreground">
                        {new Date(profile.plan_expires_at).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                )}

                {(profile?.plan === 'free' || isExpired) && (
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-medium text-foreground">24-Hour Usage</h3>
                      <span className="text-sm text-muted-foreground">
                        {usageCount} of 5 requests
                      </span>
                    </div>
                    <Progress value={getUsagePercentage()} className="mb-2" />
                    <p className="text-xs text-muted-foreground">
                      Rolling 24-hour window from your first request
                    </p>
                    
                    {usageCount >= 5 && (
                      <div className="mt-4 p-3 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg">
                        <div className="flex items-start">
                          <AlertCircle className="w-4 h-4 text-amber-600 dark:text-amber-400 mr-2 mt-0.5" />
                          <div>
                            <p className="text-sm font-medium text-amber-800 dark:text-amber-200">
                              Daily Limit Reached
                            </p>
                            <p className="text-xs text-amber-700 dark:text-amber-300">
                              {isExpired ? 'Renew your subscription for unlimited requests' : 'Upgrade to Pro for unlimited requests'}
                            </p>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {(profile?.plan !== 'free' && !isExpired) ? (
                  <div className="p-4 bg-primary/5 border border-primary/20 rounded-lg">
                    <p className="text-sm font-medium text-primary">
                      🎉 You have unlimited requests with your {profile?.plan} plan!
                    </p>
                  </div>
                ) : isExpired ? (
                  <div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
                    <p className="text-sm font-medium text-red-800 dark:text-red-200">
                      ⚠️ Plan expired - You're now limited to 5 requests per day until you renew.
                    </p>
                  </div>
                ) : null}

                {(profile?.plan === 'free' || isExpired) && (
                  <div className="flex gap-3">
                    <Button variant="outline" className="flex-1" asChild>
                      <Link to="/pricing">View Pricing</Link>
                    </Button>
                    <Button className="flex-1" asChild>
                      <Link to="/pricing">Upgrade to Pro</Link>
                    </Button>
                  </div>
                )}
              </div>
            </Card>

            {/* Recent Activity */}
            <Card className="p-6">
              <div className="flex items-center mb-6">
                <History className="w-5 h-5 text-primary mr-2" />
                <h2 className="text-xl font-semibold text-foreground">Recent Activity</h2>
              </div>
              
              {loadingRequests ? (
                <div className="text-center py-8">
                  <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary mx-auto mb-2"></div>
                  <p className="text-sm text-muted-foreground">Loading activity...</p>
                </div>
              ) : recentRequests.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-muted-foreground">No recent activity</p>
                  <p className="text-sm text-muted-foreground mt-1">
                    Your formula conversions will appear here
                  </p>
                </div>
              ) : (
                <div className="space-y-3">
                  {recentRequests.slice(0, 5).map((request, index) => (
                    <div key={index} className="flex items-start justify-between p-3 bg-secondary/30 rounded-lg">
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-foreground truncate">
                          {request.type === 'english-to-formula' ? '📝' : '🔍'} {request.input}
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">
                          {formatTimestamp(request.timestamp)}
                        </p>
                      </div>
                      <Badge variant="outline" className="ml-2 text-xs">
                        {request.type === 'english-to-formula' ? 'Formula' : 'Explain'}
                      </Badge>
                    </div>
                  ))}
                  
                  {recentRequests.length > 5 && (
                    <p className="text-xs text-muted-foreground text-center pt-2">
                      And {recentRequests.length - 5} more requests...
                    </p>
                  )}
                </div>
              )}
            </Card>

            {/* Support & Feedback */}
            <Card className="p-6">
              <div className="flex items-center mb-6">
                <Mail className="w-5 h-5 text-primary mr-2" />
                <h2 className="text-xl font-semibold text-foreground">Support & Feedback</h2>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium text-foreground">Send Feedback</h3>
                    <p className="text-sm text-muted-foreground">Share your thoughts or get help</p>
                  </div>
                  <FeedbackDialog />
                </div>
                
                <div className="pt-4 border-t">
                  <div>
                    <h3 className="font-medium text-foreground mb-2">Contact Us</h3>
                    <p className="text-sm text-muted-foreground">
                      Need help? Email us at{' '}
                      <a 
                        href="mailto:support@aifinovaedge.com" 
                        className="text-primary hover:underline"
                      >
                        support@aifinovaedge.com
                      </a>
                    </p>
                  </div>
                </div>
              </div>
            </Card>

            {/* Account Actions */}
            <Card className="p-6">
              <div className="flex items-center mb-6">
                <Settings className="w-5 h-5 text-primary mr-2" />
                <h2 className="text-xl font-semibold text-foreground">Account Actions</h2>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium text-foreground">Sign Out</h3>
                    <p className="text-sm text-muted-foreground">Sign out of your account</p>
                  </div>
                  <Button variant="outline" onClick={handleSignOut}>
                    Sign Out
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Account;