import { useAuth } from "@/contexts/AuthContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { User, Mail, Calendar, Shield } from "lucide-react";

const ROLE_CONFIG = {
  superadmin: { label: "SuperAdmin", cls: "bg-warning/10 text-warning border-warning/20" },
  admin: { label: "Admin", cls: "bg-primary/10 text-primary border-primary/20" },
  user: { label: "User", cls: "bg-muted text-muted-foreground border-border" },
};

export default function ProfilePage() {
  const { user, role } = useAuth();
  const roleConf = role ? ROLE_CONFIG[role] : ROLE_CONFIG.user;

  if (!user) return null;

  return (
    <div className="max-w-xl space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">My Profile</h1>
        <p className="text-muted-foreground text-sm mt-0.5">Manage your account details</p>
      </div>

      <Card className="shadow-card">
        <CardContent className="p-6">
          <div className="flex items-center gap-5 mb-6">
            <div className="w-20 h-20 rounded-full overflow-hidden bg-primary/10 flex items-center justify-center flex-shrink-0">
              {user.avatar ? (
                <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
              ) : (
                <User className="w-8 h-8 text-primary" />
              )}
            </div>
            <div>
              <h2 className="text-xl font-bold text-foreground">{user.name}</h2>
              <Badge variant="outline" className={`mt-1 ${roleConf.cls}`}>
                <Shield className="w-3 h-3 mr-1" />
                {roleConf.label}
              </Badge>
            </div>
          </div>

          <div className="space-y-3 border-t border-border pt-4">
            <div className="flex items-center gap-3 text-sm">
              <Mail className="w-4 h-4 text-primary flex-shrink-0" />
              <span className="text-muted-foreground">Email:</span>
              <span className="font-medium text-foreground">{user.email}</span>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <Calendar className="w-4 h-4 text-primary flex-shrink-0" />
              <span className="text-muted-foreground">Member since:</span>
              <span className="font-medium text-foreground">
                {new Date(user.joinedAt).toLocaleDateString("en-US", { year: "numeric", month: "long" })}
              </span>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <div className={`w-2 h-2 rounded-full ${user.status === "active" ? "bg-success" : "bg-destructive"}`} />
              <span className="text-muted-foreground">Status:</span>
              <span className={`font-medium capitalize ${user.status === "active" ? "text-success" : "text-destructive"}`}>{user.status}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="shadow-card">
        <CardHeader className="pb-3">
          <CardTitle className="text-base">Account Security</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-center justify-between py-2 border-b border-border">
            <div>
              <p className="text-sm font-medium text-foreground">Password</p>
              <p className="text-xs text-muted-foreground">Last changed 3 months ago</p>
            </div>
            <Button variant="outline" size="sm">Change</Button>
          </div>
          <div className="flex items-center justify-between py-2">
            <div>
              <p className="text-sm font-medium text-foreground">Two-factor authentication</p>
              <p className="text-xs text-muted-foreground">Not enabled</p>
            </div>
            <Button variant="outline" size="sm">Enable</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
