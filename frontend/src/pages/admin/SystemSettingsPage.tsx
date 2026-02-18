import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Save, Loader2, Settings } from "lucide-react";
import { api } from "@/lib/api";
import type { SystemSettings } from "@/lib/api";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "sonner";

export default function SystemSettingsPage() {
  const queryClient = useQueryClient();
  const [localSettings, setLocalSettings] = useState<SystemSettings | null>(null);

  const { data: settings, isLoading } = useQuery<SystemSettings>({
    queryKey: ["system-settings"],
    queryFn: api.getSystemSettings,
  });

  const activeSettings: SystemSettings | null = localSettings ?? settings ?? null;

  // Populate local state once data arrives
  if (settings && !localSettings) {
    setLocalSettings(settings);
  }

  const saveMutation = useMutation({
    mutationFn: (s: SystemSettings) => api.updateSystemSettings(s),
    onSuccess: () => {
      toast.success("Settings saved successfully!");
      queryClient.invalidateQueries({ queryKey: ["system-settings"] });
    },
    onError: () => toast.error("Failed to save settings."),
  });

  const update = (key: keyof SystemSettings, value: any) => {
    setLocalSettings((prev) => ({ ...(prev ?? settings!), [key]: value }));
  };

  if (isLoading || !activeSettings) {
    return (
      <div className="max-w-2xl space-y-6">
        <Skeleton className="h-8 w-48" />
        <div className="rounded-xl border p-5 space-y-4">
          {Array.from({ length: 3 }).map((_, i) => <Skeleton key={i} className="h-12 w-full" />)}
        </div>
        <div className="rounded-xl border p-5 space-y-4">
          {Array.from({ length: 2 }).map((_, i) => <Skeleton key={i} className="h-12 w-full" />)}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl space-y-6">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
          <Settings className="w-5 h-5 text-primary" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-foreground">System Settings</h1>
          <p className="text-muted-foreground text-sm">SuperAdmin configuration panel</p>
        </div>
      </div>

      {/* Platform toggles */}
      <Card className="shadow-card">
        <CardHeader className="pb-3">
          <CardTitle className="text-base">Platform Controls</CardTitle>
          <CardDescription>Enable or disable core platform features</CardDescription>
        </CardHeader>
        <CardContent className="space-y-0">
          {[
            {
              key: "maintenanceMode" as keyof SystemSettings,
              label: "Maintenance Mode",
              desc: "When enabled, the platform will display a maintenance notice to all users.",
              danger: true,
            },
            {
              key: "newRegistrationsEnabled" as keyof SystemSettings,
              label: "New Registrations",
              desc: "Allow new users to create accounts on the platform.",
              danger: false,
            },
            {
              key: "emailNotifications" as keyof SystemSettings,
              label: "Email Notifications",
              desc: "Send automated email notifications for approvals, rejections, and reports.",
              danger: false,
            },
          ].map((item, i, arr) => (
            <div
              key={item.key}
              className={`flex items-start justify-between gap-4 py-4 ${i < arr.length - 1 ? "border-b border-border" : ""}`}
            >
              <div>
                <p className={`font-medium text-sm ${item.danger && activeSettings[item.key] ? "text-destructive" : "text-foreground"}`}>
                  {item.label}
                  {item.danger && activeSettings[item.key] && (
                    <span className="ml-2 text-xs px-1.5 py-0.5 rounded bg-destructive/10 text-destructive font-normal">Active</span>
                  )}
                </p>
                <p className="text-xs text-muted-foreground mt-0.5 max-w-xs">{item.desc}</p>
              </div>
              <Switch
                checked={!!activeSettings[item.key]}
                onCheckedChange={(v) => update(item.key, v)}
                className="flex-shrink-0 mt-0.5"
              />
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Configuration fields */}
      <Card className="shadow-card">
        <CardHeader className="pb-3">
          <CardTitle className="text-base">Listing Configuration</CardTitle>
          <CardDescription>Control default limits and durations for property listings</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-1.5">
            <Label htmlFor="maxImages">Max Images per Property</Label>
            <div className="flex items-center gap-3">
              <Input
                id="maxImages"
                type="number"
                min={1}
                max={20}
                value={activeSettings.maxImagesPerProperty}
                onChange={(e) => update("maxImagesPerProperty", Number(e.target.value))}
                className="max-w-32"
              />
              <span className="text-sm text-muted-foreground">images per listing</span>
            </div>
            <p className="text-xs text-muted-foreground">Controls how many photos an owner can upload per listing.</p>
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="listingDuration">Default Listing Duration</Label>
            <div className="flex items-center gap-3">
              <Input
                id="listingDuration"
                type="number"
                min={7}
                max={365}
                value={activeSettings.defaultListingDurationDays}
                onChange={(e) => update("defaultListingDurationDays", Number(e.target.value))}
                className="max-w-32"
              />
              <span className="text-sm text-muted-foreground">days</span>
            </div>
            <p className="text-xs text-muted-foreground">How long a listing stays active before requiring renewal.</p>
          </div>
        </CardContent>
      </Card>

      {/* Save button */}
      <div className="flex items-center justify-between">
        <p className="text-xs text-muted-foreground">Changes take effect immediately after saving.</p>
        <Button
          onClick={() => saveMutation.mutate(activeSettings)}
          disabled={saveMutation.isPending}
        >
          {saveMutation.isPending ? (
            <><Loader2 className="mr-2 w-4 h-4 animate-spin" /> Saving…</>
          ) : (
            <><Save className="mr-2 w-4 h-4" /> Save Settings</>
          )}
        </Button>
      </div>
    </div>
  );
}
