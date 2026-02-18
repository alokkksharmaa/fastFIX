import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Flag, Filter } from "lucide-react";
import { api } from "@/lib/api";
import type { PropertyReport } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter,
} from "@/components/ui/dialog";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

const REASON_CONFIG = {
  scam: { label: "Scam", cls: "bg-destructive/10 text-destructive border-destructive/20" },
  duplicate: { label: "Duplicate", cls: "bg-warning/10 text-warning border-warning/20" },
  inappropriate: { label: "Inappropriate", cls: "bg-orange-50 text-orange-600 border-orange-200" },
  other: { label: "Other", cls: "bg-muted text-muted-foreground border-border" },
};

const STATUS_CONFIG = {
  pending: "bg-warning/10 text-warning border-warning/20",
  dismissed: "bg-muted text-muted-foreground border-border",
  resolved: "bg-success/10 text-success border-success/20",
};

export default function ReportsPage() {
  const queryClient = useQueryClient();
  const [filterReason, setFilterReason] = useState("all");
  const [confirmAction, setConfirmAction] = useState<{ report: PropertyReport; action: "dismiss" | "resolve" } | null>(null);

  const { data: reports, isLoading } = useQuery({
    queryKey: ["reports"],
    queryFn: api.getReports,
  });

  const dismissMutation = useMutation({
    mutationFn: (id: string) => api.dismissReport(id),
    onSuccess: () => {
      toast.success("Report dismissed.");
      queryClient.invalidateQueries({ queryKey: ["reports"] });
      setConfirmAction(null);
    },
  });

  const resolveMutation = useMutation({
    mutationFn: (id: string) => api.resolveReport(id),
    onSuccess: () => {
      toast.success("Report resolved. Property removed.");
      queryClient.invalidateQueries({ queryKey: ["reports"] });
      setConfirmAction(null);
    },
  });

  const filtered = (reports ?? []).filter((r) =>
    filterReason === "all" ? true : r.reason === filterReason
  );

  return (
    <div className="space-y-5 max-w-5xl">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Reports</h1>
          <p className="text-muted-foreground text-sm mt-0.5">
            {isLoading ? "Loading…" : `${filtered.length} report${filtered.length !== 1 ? "s" : ""}`}
          </p>
        </div>
        {/* Filter */}
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-muted-foreground" />
          <Select value={filterReason} onValueChange={setFilterReason}>
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Reasons</SelectItem>
              <SelectItem value="scam">Scam</SelectItem>
              <SelectItem value="duplicate">Duplicate</SelectItem>
              <SelectItem value="inappropriate">Inappropriate</SelectItem>
              <SelectItem value="other">Other</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {isLoading ? (
        <div className="space-y-3">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="rounded-xl border border-border p-4">
              <Skeleton className="h-5 w-48 mb-2" />
              <Skeleton className="h-3 w-32" />
            </div>
          ))}
        </div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-16 space-y-3">
          <Flag className="w-14 h-14 mx-auto text-muted-foreground opacity-25" />
          <p className="text-foreground font-medium text-lg">No reports found</p>
          <p className="text-muted-foreground text-sm">Nothing matching the selected filter.</p>
        </div>
      ) : (
        <div className="rounded-xl border border-border bg-card shadow-card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="border-b border-border bg-muted/40">
                <tr>
                  {["Property", "Reporter", "Reason", "Details", "Date", "Status", "Actions"].map((h) => (
                    <th key={h} className="text-left px-4 py-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map((report) => {
                  const reason = REASON_CONFIG[report.reason];
                  return (
                    <tr key={report.id} className="border-b border-border last:border-0 hover:bg-muted/20 transition-colors">
                      <td className="px-4 py-3 font-medium text-foreground max-w-36 truncate">{report.propertyTitle}</td>
                      <td className="px-4 py-3 text-muted-foreground">{report.reporterName}</td>
                      <td className="px-4 py-3">
                        <Badge variant="outline" className={cn("text-xs", reason.cls)}>{reason.label}</Badge>
                      </td>
                      <td className="px-4 py-3 text-muted-foreground text-xs max-w-48 truncate">
                        {report.details || "—"}
                      </td>
                      <td className="px-4 py-3 text-muted-foreground whitespace-nowrap">
                        {new Date(report.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                      </td>
                      <td className="px-4 py-3">
                        <Badge variant="outline" className={cn("text-xs capitalize", STATUS_CONFIG[report.status])}>
                          {report.status}
                        </Badge>
                      </td>
                      <td className="px-4 py-3">
                        {report.status === "pending" ? (
                          <div className="flex gap-1.5">
                            <Button
                              size="sm"
                              variant="outline"
                              className="h-7 px-2 text-xs"
                              onClick={() => setConfirmAction({ report, action: "dismiss" })}
                            >
                              Dismiss
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              className="h-7 px-2 text-xs text-destructive border-destructive/30 hover:bg-destructive/10"
                              onClick={() => setConfirmAction({ report, action: "resolve" })}
                            >
                              Remove
                            </Button>
                          </div>
                        ) : (
                          <span className="text-xs text-muted-foreground capitalize">{report.status}</span>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Confirmation modal */}
      <Dialog open={!!confirmAction} onOpenChange={() => setConfirmAction(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {confirmAction?.action === "dismiss" ? "Dismiss Report" : "Remove Property"}
            </DialogTitle>
          </DialogHeader>
          <p className="text-sm text-muted-foreground">
            {confirmAction?.action === "dismiss"
              ? `Dismiss report for "${confirmAction.report.propertyTitle}"? The listing will remain visible.`
              : `Remove "${confirmAction?.report.propertyTitle}" from the platform? This action cannot be undone.`
            }
          </p>
          <DialogFooter>
            <Button variant="outline" onClick={() => setConfirmAction(null)}>Cancel</Button>
            <Button
              variant={confirmAction?.action === "resolve" ? "destructive" : "default"}
              onClick={() => {
                if (!confirmAction) return;
                if (confirmAction.action === "dismiss") dismissMutation.mutate(confirmAction.report.id);
                else resolveMutation.mutate(confirmAction.report.id);
              }}
              disabled={dismissMutation.isPending || resolveMutation.isPending}
            >
              {confirmAction?.action === "dismiss" ? "Dismiss Report" : "Remove Property"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
