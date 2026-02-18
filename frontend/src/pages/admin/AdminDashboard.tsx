import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import {
  Users, Building2, Clock, Flag, TrendingUp, CheckCircle,
  XCircle, ArrowRight, BarChart3,
} from "lucide-react";
import { api } from "@/lib/api";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "sonner";
import {
  BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer,
} from "recharts";

const propertyTypeData = [
  { name: "Apartment", count: 3 },
  { name: "House", count: 3 },
  { name: "Commercial", count: 1 },
  { name: "Land", count: 1 },
];

const listingsOverTimeData = [
  { month: "Sep", listings: 2 },
  { month: "Oct", listings: 3 },
  { month: "Nov", listings: 1 },
  { month: "Dec", listings: 4 },
  { month: "Jan", listings: 5 },
  { month: "Feb", listings: 3 },
];

function StatCard({ label, value, icon: Icon, color, loading }: {
  label: string; value: number | string; icon: React.ElementType; color: string; loading: boolean;
}) {
  return (
    <Card className="shadow-card hover:shadow-md transition-shadow duration-200">
      <CardContent className="p-5">
        {loading ? (
          <div className="space-y-3"><Skeleton className="h-4 w-24" /><Skeleton className="h-8 w-16" /></div>
        ) : (
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-muted-foreground mb-1">{label}</p>
              <p className="text-3xl font-bold text-foreground">{value}</p>
            </div>
            <div className={`w-11 h-11 rounded-xl flex items-center justify-center ${color}`}>
              <Icon className="w-5 h-5" />
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

export default function AdminDashboard() {
  const queryClient = useQueryClient();

  const { data: stats, isLoading: statsLoading } = useQuery({
    queryKey: ["admin-stats"],
    queryFn: api.getAdminStats,
  });

  const { data: properties, isLoading: propsLoading } = useQuery({
    queryKey: ["properties"],
    queryFn: api.getProperties,
  });

  const { data: reports } = useQuery({
    queryKey: ["reports"],
    queryFn: api.getReports,
  });

  const approveMutation = useMutation({
    mutationFn: (id: string) => api.approveProperty(id),
    onSuccess: () => {
      toast.success("Property approved!");
      queryClient.invalidateQueries({ queryKey: ["properties"] });
      queryClient.invalidateQueries({ queryKey: ["admin-stats"] });
    },
  });

  const rejectMutation = useMutation({
    mutationFn: (id: string) => api.rejectProperty(id, "Does not meet requirements"),
    onSuccess: () => {
      toast.success("Property rejected.");
      queryClient.invalidateQueries({ queryKey: ["properties"] });
    },
  });

  const pendingProperties = properties?.filter((p) => p.status === "pending") ?? [];
  const pendingReports = reports?.filter((r) => r.status === "pending") ?? [];

  const statCards = [
    { label: "Total Users", value: stats?.totalUsers ?? 0, icon: Users, color: "bg-primary/10 text-primary" },
    { label: "Total Properties", value: stats?.totalProperties ?? 0, icon: Building2, color: "bg-info/10 text-info" },
    { label: "Pending Approvals", value: stats?.pendingApprovals ?? 0, icon: Clock, color: "bg-warning/10 text-warning" },
    { label: "Reported Properties", value: stats?.reportedProperties ?? 0, icon: Flag, color: "bg-destructive/10 text-destructive" },
  ];

  return (
    <div className="space-y-6 max-w-7xl">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Admin Dashboard</h1>
        <p className="text-muted-foreground text-sm mt-0.5">Platform overview and quick actions</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map((c) => <StatCard key={c.label} {...c} loading={statsLoading} />)}
      </div>

      {/* Charts */}
      <div className="grid lg:grid-cols-2 gap-5">
        <Card className="shadow-card">
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-semibold flex items-center gap-2">
              <BarChart3 className="w-4 h-4 text-primary" /> Properties by Type
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={propertyTypeData} barSize={32}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="name" tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }} />
                <YAxis tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }} />
                <Tooltip
                  contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: "8px", fontSize: "12px" }}
                />
                <Bar dataKey="count" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="shadow-card">
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-semibold flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-primary" /> New Listings Over Time
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={listingsOverTimeData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="month" tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }} />
                <YAxis tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }} />
                <Tooltip
                  contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: "8px", fontSize: "12px" }}
                />
                <Line type="monotone" dataKey="listings" stroke="hsl(var(--primary))" strokeWidth={2} dot={{ fill: "hsl(var(--primary))", r: 4 }} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Quick lists */}
      <div className="grid lg:grid-cols-2 gap-5">
        {/* Pending approvals */}
        <Card className="shadow-card">
          <CardHeader className="flex flex-row items-center justify-between pb-3">
            <CardTitle className="text-base font-semibold flex items-center gap-2">
              <Clock className="w-4 h-4 text-warning" /> Pending Approvals
            </CardTitle>
            <Button variant="ghost" size="sm" className="text-primary text-xs" asChild>
              <Link to="/admin/approvals">View all <ArrowRight className="ml-1 w-3 h-3" /></Link>
            </Button>
          </CardHeader>
          <CardContent>
            {propsLoading ? (
              <div className="space-y-3">
                {[0, 1].map((i) => <Skeleton key={i} className="h-14 w-full" />)}
              </div>
            ) : pendingProperties.length === 0 ? (
              <p className="text-sm text-muted-foreground text-center py-4">No pending approvals 🎉</p>
            ) : (
              <div className="space-y-3">
                {pendingProperties.slice(0, 3).map((p) => (
                  <div key={p.id} className="flex items-center gap-3 p-3 rounded-lg border border-border hover:bg-muted/30 transition-colors">
                    <div className="w-10 h-10 rounded-lg overflow-hidden bg-muted flex-shrink-0">
                      {p.images[0] ? <img src={p.images[0]} alt="" className="w-full h-full object-cover" /> : <Building2 className="w-5 h-5 text-muted-foreground m-auto" />}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-foreground truncate">{p.title}</p>
                      <p className="text-xs text-muted-foreground">{p.ownerName}</p>
                    </div>
                    <div className="flex gap-1.5">
                      <Button size="sm" variant="outline" className="h-7 px-2 text-xs text-success border-success/30 hover:bg-success/10"
                        onClick={() => approveMutation.mutate(p.id)}
                        disabled={approveMutation.isPending}>
                        <CheckCircle className="w-3 h-3" />
                      </Button>
                      <Button size="sm" variant="outline" className="h-7 px-2 text-xs text-destructive border-destructive/30 hover:bg-destructive/10"
                        onClick={() => rejectMutation.mutate(p.id)}
                        disabled={rejectMutation.isPending}>
                        <XCircle className="w-3 h-3" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Recent reports */}
        <Card className="shadow-card">
          <CardHeader className="flex flex-row items-center justify-between pb-3">
            <CardTitle className="text-base font-semibold flex items-center gap-2">
              <Flag className="w-4 h-4 text-destructive" /> Recent Reports
            </CardTitle>
            <Button variant="ghost" size="sm" className="text-primary text-xs" asChild>
              <Link to="/admin/reports">View all <ArrowRight className="ml-1 w-3 h-3" /></Link>
            </Button>
          </CardHeader>
          <CardContent>
            {pendingReports.length === 0 ? (
              <p className="text-sm text-muted-foreground text-center py-4">No pending reports 🎉</p>
            ) : (
              <div className="space-y-3">
                {pendingReports.slice(0, 3).map((r) => (
                  <div key={r.id} className="flex items-center gap-3 p-3 rounded-lg border border-border">
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-foreground truncate">{r.propertyTitle}</p>
                      <p className="text-xs text-muted-foreground">by {r.reporterName}</p>
                    </div>
                    <Badge variant="outline" className="capitalize text-xs flex-shrink-0">
                      {r.reason}
                    </Badge>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
