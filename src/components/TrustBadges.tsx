import { Users, Building2, Star, TrendingUp } from "lucide-react";
import { Card } from "@/components/ui/card";

export const TrustBadges = () => {
  const stats = [
    { icon: Users, value: "500+", label: "Active Users" },
    { icon: Building2, value: "100+", label: "Companies" },
    { icon: Star, value: "4.9/5", label: "User Rating" },
    { icon: TrendingUp, value: "10K+", label: "Formulas Generated" },
  ];

  // Placeholder company/user logos - you can replace these with actual logo images
  const trustedBy = [
    { name: "TechCorp", initial: "TC", color: "bg-blue-500" },
    { name: "DataFlow", initial: "DF", color: "bg-purple-500" },
    { name: "AnalyticsPro", initial: "AP", color: "bg-green-500" },
    { name: "FinanceHub", initial: "FH", color: "bg-orange-500" },
    { name: "CloudData", initial: "CD", color: "bg-pink-500" },
    { name: "BizMetrics", initial: "BM", color: "bg-indigo-500" },
  ];

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-secondary/20">
      <div className="container max-w-7xl mx-auto">
        {/* Main Trust Statement */}
        <div className="text-center mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-3">
            Trusted by 500+ Analysts, Freelancers, and Businesses Worldwide
          </h2>
          <p className="text-muted-foreground text-lg">
            Join thousands of professionals who save hours every week
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12 max-w-5xl mx-auto">
          {stats.map((stat, index) => (
            <Card key={index} className="p-6 text-center hover:shadow-elegant transition-shadow">
              <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center mx-auto mb-3">
                <stat.icon className="w-6 h-6 text-primary-foreground" />
              </div>
              <div className="text-3xl font-bold text-foreground mb-1">{stat.value}</div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </Card>
          ))}
        </div>

        {/* Company Logos/Avatars */}
        <div className="max-w-4xl mx-auto">
          <p className="text-center text-sm text-muted-foreground mb-6 font-medium">
            Used by teams at
          </p>
          <div className="flex flex-wrap justify-center items-center gap-6">
            {trustedBy.map((company, index) => (
              <div
                key={index}
                className="group relative"
                title={company.name}
              >
                <div className={`w-16 h-16 ${company.color} rounded-lg flex items-center justify-center shadow-md group-hover:scale-110 transition-transform`}>
                  <span className="text-white font-bold text-xl">{company.initial}</span>
                </div>
              </div>
            ))}
          </div>
          <p className="text-center text-xs text-muted-foreground mt-6 italic">
            And hundreds more across finance, consulting, and data analytics
          </p>
        </div>
      </div>
    </section>
  );
};
