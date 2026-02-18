import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import AppLayout from "@/components/layout/AppLayout";

// Auth pages
import LoginPage from "@/pages/auth/LoginPage";
import RegisterPage from "@/pages/auth/RegisterPage";

// User pages
import UserDashboard from "@/pages/user/UserDashboard";
import BrowsePropertiesPage from "@/pages/user/BrowsePropertiesPage";
import MyPropertiesPage from "@/pages/user/MyPropertiesPage";
import PropertyDetailsPage from "@/pages/user/PropertyDetailsPage";
import PropertyFormPage from "@/pages/user/PropertyFormPage";
import ProfilePage from "@/pages/user/ProfilePage";

// Admin pages
import UserManagementPage from "@/pages/admin/UserManagementPage";
import PropertyApprovalsPage from "@/pages/admin/PropertyApprovalsPage";
import ReportsPage from "@/pages/admin/ReportsPage";
import SystemSettingsPage from "@/pages/admin/SystemSettingsPage";

import NotFound from "./pages/NotFound";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: { retry: 1, staleTime: 30000 },
  },
});

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner richColors position="top-right" />
        <BrowserRouter>
          <AuthProvider>
            <Routes>
              {/* Public Routes */}
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/" element={<Navigate to="/dashboard" replace />} />

              {/* Protected Routes */}
              <Route element={<ProtectedRoute roles={[]} />}>
                <Route element={<AppLayout />}>
                  <Route path="/dashboard" element={<UserDashboard />} />
                  <Route
                    path="/properties"
                    element={<BrowsePropertiesPage />}
                  />
                  <Route
                    path="/properties/new"
                    element={<PropertyFormPage />}
                  />
                  <Route
                    path="/properties/:id"
                    element={<PropertyDetailsPage />}
                  />
                  <Route
                    path="/properties/:id/edit"
                    element={<PropertyFormPage />}
                  />
                  <Route path="/my-properties" element={<MyPropertiesPage />} />
                  <Route path="/profile" element={<ProfilePage />} />

                  {/* Admin + SuperAdmin */}
                  <Route
                    element={<ProtectedRoute roles={["admin", "superadmin"]} />}
                  >
                    <Route
                      path="/admin/users"
                      element={<UserManagementPage />}
                    />
                    <Route
                      path="/admin/approvals"
                      element={<PropertyApprovalsPage />}
                    />
                    <Route path="/admin/reports" element={<ReportsPage />} />
                  </Route>

                  {/* SuperAdmin only */}
                  <Route element={<ProtectedRoute roles={["superadmin"]} />}>
                    <Route
                      path="/admin/settings"
                      element={<SystemSettingsPage />}
                    />
                  </Route>
                </Route>
              </Route>

              {/* Fallback */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </AuthProvider>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
}
