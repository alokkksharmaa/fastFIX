import React, { createContext, useContext, useState, useCallback, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import type { User, UserRole } from "@/lib/api";

interface AuthContextValue {
  user: User | null;
  token: string | null;
  role: UserRole | null;
  isAuthenticated: boolean;
  login: (token: string, user: User) => void;
  logout: () => void;
  hasRole: (...roles: UserRole[]) => boolean;
}

const AuthContext = createContext<AuthContextValue | null>(null);

const TOKEN_KEY = "re_token";
const USER_KEY = "re_user";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [token, setToken] = useState<string | null>(() => sessionStorage.getItem(TOKEN_KEY));
  const [user, setUser] = useState<User | null>(() => {
    try {
      const raw = sessionStorage.getItem(USER_KEY);
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  });

  const role: UserRole | null = user?.role ?? null;

  const login = useCallback((newToken: string, newUser: User) => {
    sessionStorage.setItem(TOKEN_KEY, newToken);
    sessionStorage.setItem(USER_KEY, JSON.stringify(newUser));
    setToken(newToken);
    setUser(newUser);
  }, []);

  const logout = useCallback(() => {
    sessionStorage.removeItem(TOKEN_KEY);
    sessionStorage.removeItem(USER_KEY);
    setToken(null);
    setUser(null);
  }, []);

  const hasRole = useCallback(
    (...roles: UserRole[]) => (role ? roles.includes(role) : false),
    [role]
  );

  // Validate token expiry on mount
  useEffect(() => {
    if (token) {
      try {
        const decoded = jwtDecode<{ exp?: number }>(token);
        if (decoded?.exp && decoded.exp * 1000 < Date.now()) logout();
      } catch {
        logout();
      }
    }
  }, [token, logout]);
  

  return (
    <AuthContext.Provider value={{ user, token, role, isAuthenticated: !!token && !!user, login, logout, hasRole }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
}
