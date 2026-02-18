import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  CheckCircle, XCircle, Eye, Building2, Clock, ChevronDown,
} from "lucide-react";
import { api } from "@/lib/api";
import type { Property } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Skeleton } from "@/components/ui/skeleton";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter,
} from "@/components/ui/dialog";
import { toast } from "sonner";

export default function PropertyApprovalsPage() {
  const queryClient = useQueryClient();
  const [selected, setSelected] = useState<string[]>([]);
  const [preview, setPreview] = useState<Property | null>(null);
  const [rejectModal, setRejectModal] = useState<{ id: string; title: string } | null>(null);
  const [rejectReason, setRejectReason] = useState("");

  const { data: properties, isLoading } = useQuery({
    queryKey: ["properties"],
    queryFn: api.getProperties,
  });

  const pending = properties?.filter((p) => p.status === "pending") ?? [];

  const approveMutation = useMutation({
    mutationFn: (id: string) => api.approveProperty(id),
    onSuccess: () => {
      toast.success("Property approved!");
      queryClient.invalidateQueries({ queryKey: ["properties"] });
      queryClient.invalidateQueries({ queryKey: ["admin-stats"] });
      setSelected([]);
    },
  });

  const rejectMutation = useMutation({
    mutationFn: ({ id, reason }: { id: string; reason: string }) => api.rejectProperty(id, reason),
    onSuccess: () => {
      toast.success("Property rejected.");
      queryClient.invalidateQueries({ queryKey: ["properties"] });
      setRejectModal(null);
      setRejectReason("");
      setSelected([]);
    },
  });

  const batchApprove = async () => {
    await Promise.all(selected.map((id) => api.approveProperty(id)));
    toast.success(`${selected.length} properties approved.`);
    queryClient.invalidateQueries({ queryKey: ["properties"] });
    setSelected([]);
  };

  const toggleSelect = (id: string) =>
    setSelected((prev) => prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]);

  const toggleAll = () =>
    setSelected((prev) => prev.length === pending.length ? [] : pending.map((p) => p.id));

  const formatPrice = (p: number) =>
    new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(p);

  return (
    <div className="space-y-5 max-w-5xl">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Property Approvals</h1>
          <p className="text-muted-foreground text-sm mt-0.5">
            {isLoading ? "Loading…" : `${pending.length} pending review${pending.length !== 1 ? "s" : ""}`}
          </p>
        </div>
        {selected.length > 0 && (
          <div className="flex items-center gap-3">
            <span className="text-sm text-muted-foreground">{selected.length} selected</span>
            <Button
              size="sm"
              onClick={batchApprove}
              className="bg-success hover:bg-success/90 text-success-foreground"
            >
              <CheckCircle className="mr-1.5 w-3.5 h-3.5" /> Approve All
            </Button>
          </div>
        )}
      </div>

      {isLoading ? (
        <div className="space-y-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="rounded-xl border border-border p-4">
              <div className="flex items-center gap-4">
                <Skeleton className="w-5 h-5 rounded" />
                <Skeleton className="w-16 h-16 rounded-lg" />
                <div className="flex-1 space-y-2">
                  <Skeleton className="h-4 w-64" />
                  <Skeleton className="h-3 w-32" />
                </div>
                <Skeleton className="h-8 w-24" />
                <Skeleton className="h-8 w-20" />
                <Skeleton className="h-8 w-20" />
              </div>
            </div>
          ))}
        </div>
      ) : pending.length === 0 ? (
        <div className="text-center py-16 space-y-3">
          <CheckCircle className="w-14 h-14 mx-auto text-success opacity-40" />
          <p className="text-foreground font-medium text-lg">All caught up!</p>
          <p className="text-muted-foreground text-sm">No properties are awaiting approval.</p>
        </div>
      ) : (
        <div className="rounded-xl border border-border bg-card shadow-card overflow-hidden">
          {/* Select all header */}
          <div className="flex items-center gap-3 px-4 py-3 border-b border-border bg-muted/30">
            <Checkbox
              checked={selected.length === pending.length}
              onCheckedChange={toggleAll}
            />
            <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Select all</span>
          </div>

          <div className="divide-y divide-border">
            {pending.map((p) => (
              <div key={p.id} className="flex items-center gap-4 p-4 hover:bg-muted/20 transition-colors">
                <Checkbox
                  checked={selected.includes(p.id)}
                  onCheckedChange={() => toggleSelect(p.id)}
                />

                {/* Thumbnail */}
                <div className="w-16 h-16 rounded-lg overflow-hidden bg-muted flex-shrink-0">
                  {p.images[0] ? (
                    <img src={p.images[0]} alt={p.title} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <Building2 className="w-6 h-6 text-muted-foreground" />
                    </div>
                  )}
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-foreground truncate">{p.title}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    by {p.ownerName} · {p.location} · {formatPrice(p.price)}
                  </p>
                  <div className="flex items-center gap-2 mt-1">
                    <Badge variant="outline" className="text-xs capitalize">{p.type}</Badge>
                    <span className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Clock className="w-3 h-3" />
                      {new Date(p.submittedAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                    </span>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => setPreview(p)}
                    className="text-xs"
                  >
                    <Eye className="mr-1.5 w-3.5 h-3.5" /> Preview
                  </Button>
                  <Button
                    size="sm"
                    className="text-xs bg-success hover:bg-success/90 text-success-foreground border-0"
                    onClick={() => approveMutation.mutate(p.id)}
                    disabled={approveMutation.isPending}
                  >
                    <CheckCircle className="mr-1.5 w-3.5 h-3.5" /> Approve
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    className="text-xs text-destructive border-destructive/30 hover:bg-destructive/10"
                    onClick={() => setRejectModal({ id: p.id, title: p.title })}
                  >
                    <XCircle className="mr-1.5 w-3.5 h-3.5" /> Reject
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Quick Preview Modal */}
      <Dialog open={!!preview} onOpenChange={() => setPreview(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Property Preview</DialogTitle>
          </DialogHeader>
          {preview && (
            <div className="space-y-4">
              {preview.images[0] && (
                <img src={preview.images[0]} alt={preview.title} className="w-full h-56 object-cover rounded-lg" />
              )}
              <div>
                <h3 className="font-semibold text-foreground text-lg">{preview.title}</h3>
                <p className="text-muted-foreground text-sm">{preview.location}</p>
                <p className="text-primary font-bold text-xl mt-1">
                  {new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(preview.price)}
                </p>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">{preview.description}</p>
              <div className="flex gap-2">
                <Badge variant="outline" className="capitalize">{preview.type}</Badge>
                {preview.bedrooms !== undefined && preview.bedrooms > 0 && <Badge variant="secondary">{preview.bedrooms} bd</Badge>}
                {preview.bathrooms !== undefined && <Badge variant="secondary">{preview.bathrooms} ba</Badge>}
                {preview.area && <Badge variant="secondary">{preview.area.toLocaleString()} sqft</Badge>}
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setPreview(null)}>Close</Button>
            {preview && (
              <>
                <Button
                  variant="outline"
                  className="text-destructive border-destructive/30"
                  onClick={() => { setPreview(null); setRejectModal({ id: preview.id, title: preview.title }); }}
                >
                  <XCircle className="mr-1.5 w-4 h-4" /> Reject
                </Button>
                <Button
                  className="bg-success hover:bg-success/90 text-success-foreground"
                  onClick={() => { approveMutation.mutate(preview.id); setPreview(null); }}
                >
                  <CheckCircle className="mr-1.5 w-4 h-4" /> Approve
                </Button>
              </>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Reject Reason Modal */}
      <Dialog open={!!rejectModal} onOpenChange={() => setRejectModal(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Reject Property</DialogTitle>
          </DialogHeader>
          <p className="text-sm text-muted-foreground">
            Rejecting: <span className="font-semibold text-foreground">{rejectModal?.title}</span>
          </p>
          <div className="space-y-1.5">
            <Label>Reason for rejection</Label>
            <Textarea
              placeholder="Explain why this property is being rejected…"
              value={rejectReason}
              onChange={(e) => setRejectReason(e.target.value)}
              rows={3}
            />
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setRejectModal(null)}>Cancel</Button>
            <Button
              variant="destructive"
              disabled={!rejectReason.trim() || rejectMutation.isPending}
              onClick={() => rejectModal && rejectMutation.mutate({ id: rejectModal.id, reason: rejectReason })}
            >
              Confirm Rejection
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
