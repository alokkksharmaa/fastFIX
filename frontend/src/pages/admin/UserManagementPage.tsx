import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Search, ChevronUp, ChevronDown, Shield, CheckCircle } from "lucide-react";
import { api } from "@/lib/api";
import type { User, UserRole } from "@/lib/api";
import { Input } from "@/components/ui/input";
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

const ROLE_OPTIONS: UserRole[] = ["user", "admin", "superadmin"];
const PAGE_SIZE = 6;

const ROLE_BADGE: Record<string, string> = {
  superadmin: "bg-warning/10 text-warning border-warning/20",
  admin: "bg-primary/10 text-primary border-primary/20",
  user: "bg-muted text-muted-foreground border-border",
};

type SortKey = "name" | "email" | "role" | "joinedAt";
type SortDir = "asc" | "desc";

export default function UserManagementPage() {
  const queryClient = useQueryClient();
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [sortKey, setSortKey] = useState<SortKey>("joinedAt");
  const [sortDir, setSortDir] = useState<SortDir>("desc");
  const [confirmRole, setConfirmRole] = useState<{ user: User; newRole: UserRole } | null>(null);

  const { data: users, isLoading } = useQuery({
    queryKey: ["users"],
    queryFn: api.getUsers,
  });

  const roleMutation = useMutation({
    mutationFn: ({ id, role }: { id: string; role: UserRole }) => api.updateUserRole(id, role),
    onSuccess: () => {
      toast.success("User role updated.");
      queryClient.invalidateQueries({ queryKey: ["users"] });
      setConfirmRole(null);
    },
    onError: () => toast.error("Failed to update role."),
  });

  const statusMutation = useMutation({
    mutationFn: ({ id, status }: { id: string; status: "active" | "suspended" }) => api.updateUserStatus(id, status),
    onSuccess: () => {
      toast.success("User status updated.");
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
    onError: () => toast.error("Failed to update status."),
  });

  const sorted = [...(users ?? [])].sort((a, b) => {
    const av = a[sortKey] ?? "";
    const bv = b[sortKey] ?? "";
    const cmp = av < bv ? -1 : av > bv ? 1 : 0;
    return sortDir === "asc" ? cmp : -cmp;
  });

  const filtered = sorted.filter((u) =>
    u.name.toLowerCase().includes(search.toLowerCase()) ||
    u.email.toLowerCase().includes(search.toLowerCase())
  );

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const toggleSort = (key: SortKey) => {
    if (sortKey === key) setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    else { setSortKey(key); setSortDir("asc"); }
  };

  const SortIcon = ({ k }: { k: SortKey }) =>
    sortKey === k
      ? sortDir === "asc" ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />
      : <ChevronDown className="w-3.5 h-3.5 opacity-30" />;

  return (
    <div className="space-y-5 max-w-6xl">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">User Management</h1>
          <p className="text-muted-foreground text-sm mt-0.5">
            {isLoading ? "Loading…" : `${filtered.length} user${filtered.length !== 1 ? "s" : ""}`}
          </p>
        </div>
      </div>

      {/* Search */}
      <div className="relative max-w-sm">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input
          placeholder="Search users…"
          value={search}
          onChange={(e) => { setSearch(e.target.value); setPage(1); }}
          className="pl-9"
        />
      </div>

      {/* Table */}
      <div className="rounded-xl border border-border bg-card shadow-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="border-b border-border bg-muted/40">
              <tr>
                {[
                  { label: "Name", key: "name" },
                  { label: "Email", key: "email" },
                  { label: "Role", key: "role" },
                  { label: "Status", key: null },
                  { label: "Joined", key: "joinedAt" },
                  { label: "Actions", key: null },
                ].map(({ label, key }) => (
                  <th
                    key={label}
                    className={cn(
                      "text-left px-4 py-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground",
                      key && "cursor-pointer hover:text-foreground select-none"
                    )}
                    onClick={() => key && toggleSort(key as SortKey)}
                  >
                    <span className="flex items-center gap-1">
                      {label}
                      {key && <SortIcon k={key as SortKey} />}
                    </span>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                Array.from({ length: 5 }).map((_, i) => (
                  <tr key={i} className="border-b border-border">
                    {Array.from({ length: 6 }).map((_, j) => (
                      <td key={j} className="px-4 py-3"><Skeleton className="h-4 w-full" /></td>
                    ))}
                  </tr>
                ))
              ) : paginated.length === 0 ? (
                <tr>
                  <td colSpan={6} className="text-center py-10 text-muted-foreground">
                    No users found
                  </td>
                </tr>
              ) : (
                paginated.map((u) => (
                  <tr key={u.id} className="border-b border-border last:border-0 hover:bg-muted/20 transition-colors">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-full overflow-hidden bg-primary/10 flex-shrink-0">
                          {u.avatar ? (
                            <img src={u.avatar} alt={u.name} className="w-full h-full object-cover" />
                          ) : (
                            <span className="text-xs font-semibold text-primary w-full h-full flex items-center justify-center">
                              {u.name[0]}
                            </span>
                          )}
                        </div>
                        <span className="font-medium text-foreground">{u.name}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-muted-foreground">{u.email}</td>
                    <td className="px-4 py-3">
                      <Badge variant="outline" className={cn("capitalize", ROLE_BADGE[u.role])}>
                        <Shield className="w-3 h-3 mr-1" />{u.role}
                      </Badge>
                    </td>
                    <td className="px-4 py-3">
                      <button
                        onClick={() => statusMutation.mutate({ id: u.id, status: u.status === "active" ? "suspended" : "active" })}
                        disabled={statusMutation.isPending}
                        className={cn(
                          "flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-full border transition-colors",
                          u.status === "active"
                            ? "text-success bg-success/10 border-success/20 hover:bg-success/20"
                            : "text-destructive bg-destructive/10 border-destructive/20 hover:bg-destructive/20"
                        )}
                      >
                        <span className={`w-1.5 h-1.5 rounded-full ${u.status === "active" ? "bg-success" : "bg-destructive"}`} />
                        {u.status === "active" ? "Active" : "Suspended"}
                      </button>
                    </td>
                    <td className="px-4 py-3 text-muted-foreground">
                      {new Date(u.joinedAt).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" })}
                    </td>
                    <td className="px-4 py-3">
                      <Select
                        value={u.role}
                        onValueChange={(v) => setConfirmRole({ user: u, newRole: v as UserRole })}
                      >
                        <SelectTrigger className="h-8 w-28 text-xs">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {ROLE_OPTIONS.map((r) => (
                            <SelectItem key={r} value={r} className="text-xs capitalize">{r}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between px-4 py-3 border-t border-border bg-muted/20">
            <p className="text-xs text-muted-foreground">
              Page {page} of {totalPages} · {filtered.length} users
            </p>
            <div className="flex gap-1">
              <Button size="sm" variant="outline" disabled={page === 1} onClick={() => setPage((p) => p - 1)}>Previous</Button>
              <Button size="sm" variant="outline" disabled={page === totalPages} onClick={() => setPage((p) => p + 1)}>Next</Button>
            </div>
          </div>
        )}
      </div>

      {/* Role change confirmation */}
      <Dialog open={!!confirmRole} onOpenChange={() => setConfirmRole(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Role Change</DialogTitle>
          </DialogHeader>
          <p className="text-sm text-muted-foreground">
            Change <span className="font-semibold text-foreground">{confirmRole?.user.name}</span>'s role from{" "}
            <span className="font-semibold capitalize text-foreground">{confirmRole?.user.role}</span> to{" "}
            <span className="font-semibold capitalize text-primary">{confirmRole?.newRole}</span>?
          </p>
          <DialogFooter>
            <Button variant="outline" onClick={() => setConfirmRole(null)}>Cancel</Button>
            <Button
              onClick={() => confirmRole && roleMutation.mutate({ id: confirmRole.user.id, role: confirmRole.newRole })}
              disabled={roleMutation.isPending}
            >
              <CheckCircle className="mr-2 w-4 h-4" /> Confirm
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
