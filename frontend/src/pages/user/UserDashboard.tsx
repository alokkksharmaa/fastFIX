import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import {
  Home, CheckCircle, Clock, XCircle, PlusCircle, Search,
  Activity, ArrowRight, Building2, TrendingUp,
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { api } from "@/lib/api";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

function StatCard({
  label, value, icon: Icon, color, loading,
}: {
  label: string; value: number | string; icon: React.ElementType;
  color: string; loading: boolean;
}) {
  return (
    <Card className="shadow-card hover:shadow-md transition-shadow duration-200">
      <CardContent className="p-5">
        {loading ? (
          <div className="space-y-3">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-8 w-16" />
          </div>
        ) : (
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-muted-foreground mb-1">{label}</p>
              <p className="text-3xl font-bold text-foreground">{value}</p>
            </div>
            <div className={cn("w-11 h-11 rounded-xl flex items-center justify-center", color)}>
              <Icon className="w-5 h-5" />
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

function ActivityIcon({ type }: { type: string }) {
  const map: Record<string, { icon: React.ElementType; cls: string }> = {
    approved: { icon: CheckCircle, cls: "text-success bg-success/10" },
    rejected: { icon: XCircle, cls: "text-destructive bg-destructive/10" },
    created: { icon: PlusCircle, cls: "text-primary bg-primary/10" },
    updated: { icon: TrendingUp, cls: "text-info bg-info/10" },
    reported: { icon: Activity, cls: "text-warning bg-warning/10" },
  };
  const { icon: Icon, cls } = map[type] || { icon: Activity, cls: "text-muted-foreground bg-muted" };
  return (
    <div className={cn("w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0", cls)}>
      <Icon className="w-4 h-4" />
    </div>
  );
}

export default function UserDashboard() {
  const { user } = useAuth();

  const hour = new Date().getHours();
  const greeting = hour < 12 ? "Good morning" : hour < 17 ? "Good afternoon" : "Good evening";

  const { data: stats, isLoading: statsLoading } = useQuery({
    queryKey: ["dashboard-stats"],
    queryFn: api.getDashboardStats,
  });

  const { data: activity, isLoading: activityLoading } = useQuery({
    queryKey: ["activity"],
    queryFn: api.getActivity,
  });

  const statCards = [
    { label: "Total Properties", value: stats?.totalProperties ?? 0, icon: Home, color: "bg-primary/10 text-primary" },
    { label: "Approved Listings", value: stats?.approvedListings ?? 0, icon: CheckCircle, color: "bg-success/10 text-success" },
    { label: "Pending Approvals", value: stats?.pendingApprovals ?? 0, icon: Clock, color: "bg-warning/10 text-warning" },
    { label: "Rejected", value: stats?.rejected ?? 0, icon: XCircle, color: "bg-destructive/10 text-destructive" },
  ];

  const formatTimestamp = (ts: string) => {
    const d = new Date(ts);
    return d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
  };

  return (
    <div className="space-y-6 max-w-6xl">
      {/* Welcome header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">
            {greeting}, {user?.name?.split(" ")[0]} 👋
          </h1>
          <p className="text-muted-foreground mt-1">
            Here's an overview of your property portfolio.
          </p>
        </div>
        <div className="flex gap-3">
          <Button asChild variant="outline">
            <Link to="/properties">
              <Search className="mr-2 w-4 h-4" /> Browse Listings
            </Link>
          </Button>
          <Button asChild>
            <Link to="/properties/new">
              <PlusCircle className="mr-2 w-4 h-4" /> Add Property
            </Link>
          </Button>
        </div>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map((c) => (
          <StatCard key={c.label} {...c} loading={statsLoading} />
        ))}
      </div>

      {/* Recent activity */}
      <Card className="shadow-card">
        <CardHeader className="flex flex-row items-center justify-between pb-3">
          <CardTitle className="text-base font-semibold flex items-center gap-2">
            <Activity className="w-4 h-4 text-primary" />
            Recent Activity
          </CardTitle>
          <Button variant="ghost" size="sm" className="text-primary text-xs" asChild>
            <Link to="/my-properties">
              View all <ArrowRight className="ml-1 w-3 h-3" />
            </Link>
          </Button>
        </CardHeader>
        <CardContent>
          {activityLoading ? (
            <div className="space-y-4">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="flex items-start gap-3">
                  <Skeleton className="w-8 h-8 rounded-full" />
                  <div className="flex-1 space-y-1.5">
                    <Skeleton className="h-4 w-3/4" />
                    <Skeleton className="h-3 w-24" />
                  </div>
                </div>
              ))}
            </div>
          ) : activity?.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <Building2 className="w-10 h-10 mx-auto mb-2 opacity-30" />
              <p>No recent activity yet.</p>
              <Button asChild variant="link" className="mt-2">
                <Link to="/properties/new">Add your first property</Link>
              </Button>
            </div>
          ) : (
            <div className="relative">
              <div className="absolute left-4 top-0 bottom-0 w-px bg-border" />
              <div className="space-y-5 pl-2">
                {activity?.map((item) => (
                  <div key={item.id} className="flex items-start gap-3 relative">
                    <ActivityIcon type={item.type} />
                    <div className="flex-1 min-w-0 pt-1">
                      <p className="text-sm text-foreground leading-snug">{item.message}</p>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        {formatTimestamp(item.timestamp)}
                      </p>
                    </div>
                    {item.propertyId && (
                      <Link
                        to={`/properties/${item.propertyId}`}
                        className="text-xs text-primary hover:underline flex-shrink-0 mt-1"
                      >
                        View →
                      </Link>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
