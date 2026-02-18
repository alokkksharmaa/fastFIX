import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  LayoutDashboard, Building2, Home, Search, PlusCircle, User,
  Users, ClipboardCheck, Flag, Settings, ChevronLeft, ChevronRight,
  LogOut, Shield,
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { cn } from "@/lib/utils";

interface NavItem {
  label: string;
  to: string;
  icon: React.ElementType;
  roles?: string[];
}

const NAV_ITEMS: NavItem[] = [
  { label: "Dashboard", to: "/dashboard", icon: LayoutDashboard },
  { label: "Browse Properties", to: "/properties", icon: Search },
  { label: "My Properties", to: "/my-properties", icon: Home },
  { label: "Add Property", to: "/properties/new", icon: PlusCircle },
  { label: "My Profile", to: "/profile", icon: User },
  // Admin
  { label: "User Management", to: "/admin/users", icon: Users, roles: ["admin", "superadmin"] },
  { label: "Property Approvals", to: "/admin/approvals", icon: ClipboardCheck, roles: ["admin", "superadmin"] },
  { label: "Reports", to: "/admin/reports", icon: Flag, roles: ["admin", "superadmin"] },
  // SuperAdmin
  { label: "System Settings", to: "/admin/settings", icon: Settings, roles: ["superadmin"] },
];

const ROLE_BADGE: Record<string, { label: string; cls: string }> = {
  superadmin: { label: "SuperAdmin", cls: "bg-warning/20 text-warning" },
  admin: { label: "Admin", cls: "bg-primary/30 text-primary-foreground" },
  user: { label: "User", cls: "bg-sidebar-accent text-sidebar-accent-foreground" },
};

interface AppSidebarProps {
  collapsed: boolean;
  onToggle: () => void;
}

export default function AppSidebar({ collapsed, onToggle }: AppSidebarProps) {
  const { user, role, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const visibleItems = NAV_ITEMS.filter((item) => {
    if (!item.roles) return true;
    return role && item.roles.includes(role);
  });

  const isActive = (to: string) =>
    to === "/dashboard"
      ? location.pathname === "/dashboard"
      : location.pathname.startsWith(to);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const badge = role ? ROLE_BADGE[role] : null;

  return (
    <aside
      className={cn(
        "flex flex-col h-screen sticky top-0 z-40 transition-all duration-300 border-r",
        "bg-sidebar border-sidebar-border",
        collapsed ? "w-16" : "w-64"
      )}
    >
      {/* Logo */}
      <div className={cn("flex items-center gap-3 px-4 py-5 border-b border-sidebar-border", collapsed && "justify-center px-2")}>
        <div className="w-9 h-9 flex-shrink-0 rounded-xl bg-white/20 flex items-center justify-center">
          <Building2 className="w-5 h-5 text-white" />
        </div>
        {!collapsed && (
          <span className="font-bold text-white text-lg tracking-tight">PropManager</span>
        )}
      </div>

      {/* Nav items */}
      <nav className="flex-1 py-4 overflow-y-auto">
        <div className="space-y-0.5 px-2">
          {/* Section divider for admin items */}
          {visibleItems.map((item, i) => {
            const isAdminSection =
              i > 0 && item.roles && !visibleItems[i - 1].roles;
            return (
              <div key={item.to}>
                {isAdminSection && (
                  <div className={cn("pt-3 pb-1", collapsed ? "px-1" : "px-2")}>
                    {!collapsed && (
                      <p className="text-xs font-semibold uppercase tracking-widest text-sidebar-foreground/40">
                        Administration
                      </p>
                    )}
                    {collapsed && <div className="border-t border-sidebar-border" />}
                  </div>
                )}
                <Link
                  to={item.to}
                  className={cn(
                    "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-150",
                    isActive(item.to)
                      ? "bg-white/15 text-white shadow-sm"
                      : "text-sidebar-foreground/70 hover:bg-white/8 hover:text-sidebar-foreground",
                    collapsed && "justify-center px-2"
                  )}
                  title={collapsed ? item.label : undefined}
                >
                  <item.icon
                    className={cn(
                      "flex-shrink-0 w-4.5 h-4.5",
                      isActive(item.to) ? "text-white" : "text-sidebar-foreground/60"
                    )}
                  />
                  {!collapsed && <span>{item.label}</span>}
                  {isActive(item.to) && !collapsed && (
                    <div className="ml-auto w-1.5 h-1.5 rounded-full bg-white" />
                  )}
                </Link>
              </div>
            );
          })}
        </div>
      </nav>

      {/* User footer */}
      <div className="border-t border-sidebar-border">
        {/* Toggle button */}
        <button
          onClick={onToggle}
          className={cn(
            "w-full flex items-center gap-2 px-4 py-2 text-sidebar-foreground/50 hover:text-sidebar-foreground hover:bg-white/8 transition-colors text-xs",
            collapsed && "justify-center px-2"
          )}
        >
          {collapsed ? <ChevronRight className="w-4 h-4" /> : (
            <>
              <ChevronLeft className="w-4 h-4" />
              <span>Collapse sidebar</span>
            </>
          )}
        </button>

        {user && (
          <div className={cn("p-3", collapsed && "flex flex-col items-center gap-2")}>
            {!collapsed && (
              <div className="flex items-center gap-3 p-2 rounded-lg bg-white/8">
                <div className="w-8 h-8 rounded-full overflow-hidden flex-shrink-0 bg-white/20">
                  {user.avatar ? (
                    <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <User className="w-4 h-4 text-white" />
                    </div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-white truncate">{user.name}</p>
                  {badge && (
                    <span className={cn("text-xs px-1.5 py-0.5 rounded-full font-medium", badge.cls)}>
                      {badge.label}
                    </span>
                  )}
                </div>
                <button
                  onClick={handleLogout}
                  className="text-sidebar-foreground/50 hover:text-white transition-colors flex-shrink-0"
                  title="Logout"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            )}
            {collapsed && (
              <>
                <div className="w-8 h-8 rounded-full overflow-hidden bg-white/20">
                  {user.avatar ? (
                    <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
                  ) : (
                    <User className="w-4 h-4 text-white" />
                  )}
                </div>
                <button onClick={handleLogout} className="text-sidebar-foreground/50 hover:text-white" title="Logout">
                  <LogOut className="w-3.5 h-3.5" />
                </button>
              </>
            )}
          </div>
        )}
      </div>
    </aside>
  );
}
