import axios from "axios";

// ─── API Configuration ───────────────────────────────────────────────────────
// Backend mounts routes under `/api` (see `backend/src/app.js`)
// Override in `frontend/.env` with: VITE_API_BASE_URL=http://localhost:3000/api
export const BASE_URL =
  (import.meta as any).env?.VITE_API_BASE_URL ?? "http://localhost:3000/api";

const http = axios.create({
  baseURL: BASE_URL,
  headers: { "Content-Type": "application/json" },
});

// ─── Types ───────────────────────────────────────────────────────────────────
export type UserRole = "user" | "admin" | "superadmin";

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
  status: "active" | "suspended";
  joinedAt: string;
}

type BackendSuccess<T> = { success: true; message: string; data: T };
type BackendError = { success: false; message: string; details?: unknown };

function normalizeRole(role: unknown): UserRole {
  const raw = String(role ?? "").toLowerCase();
  if (raw === "admin") return "admin";
  if (raw === "superadmin") return "superadmin";
  return "user";
}

function mapUser(raw: any): User {
  return {
    id: String(raw?._id ?? raw?.id ?? ""),
    name: String(raw?.name ?? ""),
    email: String(raw?.email ?? ""),
    role: normalizeRole(raw?.role),
    status: raw?.status === "suspended" ? "suspended" : "active",
    joinedAt: String(raw?.createdAt ?? raw?.joinedAt ?? new Date().toISOString()),
    avatar: raw?.avatar ? String(raw.avatar) : undefined,
  };
}

function toMessage(err: any): string {
  const fromAxios = err?.response?.data as BackendError | undefined;
  return fromAxios?.message || err?.message || "Request failed";
}

export interface Property {
  id: string;
  title: string;
  description: string;
  price: number;
  location: string;
  type: "apartment" | "house" | "commercial" | "land";
  status: "available" | "pending" | "sold" | "rented";
  images: string[];
  bedrooms?: number;
  bathrooms?: number;
  area?: number;
  ownerId: string;
  ownerName: string;
  ownerEmail: string;
  ownerAvatar?: string;
  submittedAt: string;
  approvedAt?: string;
}

export interface PropertyReport {
  id: string;
  propertyId: string;
  propertyTitle: string;
  reporterId: string;
  reporterName: string;
  reason: "scam" | "duplicate" | "inappropriate" | "other";
  details?: string;
  status: "pending" | "dismissed" | "resolved";
  createdAt: string;
}

export interface ActivityItem {
  id: string;
  type: "created" | "approved" | "rejected" | "updated" | "reported";
  message: string;
  timestamp: string;
  propertyId?: string;
}

export interface DashboardStats {
  totalProperties: number;
  approvedListings: number;
  pendingApprovals: number;
  rejected: number;
}

export interface AdminStats {
  totalUsers: number;
  totalProperties: number;
  pendingApprovals: number;
  reportedProperties: number;
}

export interface SystemSettings {
  maintenanceMode: boolean;
  newRegistrationsEnabled: boolean;
  emailNotifications: boolean;
  maxImagesPerProperty: number;
  defaultListingDurationDays: number;
}

// ─── Mock Data ────────────────────────────────────────────────────────────────
const PROPERTY_IMAGES = [
  "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80",
  "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80",
  "https://images.unsplash.com/photo-1583608205776-bfd35f0d9f83?w=800&q=80",
  "https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=800&q=80",
  "https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=800&q=80",
  "https://images.unsplash.com/photo-1449844908441-8829872d2607?w=800&q=80",
  "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80",
  "https://images.unsplash.com/photo-1523217582562-09d0def993a6?w=800&q=80",
];

export const mockUsers: User[] = [
  { id: "u1", name: "Alice Johnson", email: "alice@example.com", role: "superadmin", status: "active", joinedAt: "2023-01-15", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=alice" },
  { id: "u2", name: "Bob Smith", email: "bob@example.com", role: "admin", status: "active", joinedAt: "2023-03-22", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=bob" },
  { id: "u3", name: "Carol White", email: "carol@example.com", role: "user", status: "active", joinedAt: "2023-06-10", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=carol" },
  { id: "u4", name: "David Brown", email: "david@example.com", role: "user", status: "suspended", joinedAt: "2023-08-05", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=david" },
  { id: "u5", name: "Eva Martinez", email: "eva@example.com", role: "user", status: "active", joinedAt: "2023-09-18", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=eva" },
  { id: "u6", name: "Frank Lee", email: "frank@example.com", role: "admin", status: "active", joinedAt: "2023-11-01", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=frank" },
  { id: "u7", name: "Grace Kim", email: "grace@example.com", role: "user", status: "active", joinedAt: "2024-01-12", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=grace" },
  { id: "u8", name: "Henry Wilson", email: "henry@example.com", role: "user", status: "active", joinedAt: "2024-02-28", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=henry" },
];

export const mockProperties: Property[] = [
  { id: "p1", title: "Modern Downtown Apartment", description: "A stunning modern apartment in the heart of the city with breathtaking views and premium finishes throughout. Features an open-plan kitchen and living area, floor-to-ceiling windows, and access to rooftop amenities.", price: 450000, location: "New York, NY", type: "apartment", status: "available", images: [PROPERTY_IMAGES[0], PROPERTY_IMAGES[1], PROPERTY_IMAGES[2]], bedrooms: 2, bathrooms: 2, area: 1200, ownerId: "u3", ownerName: "Carol White", ownerEmail: "carol@example.com", ownerAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=carol", submittedAt: "2024-01-10", approvedAt: "2024-01-12" },
  { id: "p2", title: "Suburban Family House", description: "Spacious 4-bedroom family home in a quiet, safe neighborhood with excellent schools nearby. Large backyard, double garage, and recently renovated kitchen.", price: 720000, location: "Austin, TX", type: "house", status: "available", images: [PROPERTY_IMAGES[3], PROPERTY_IMAGES[4]], bedrooms: 4, bathrooms: 3, area: 2800, ownerId: "u5", ownerName: "Eva Martinez", ownerEmail: "eva@example.com", ownerAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=eva", submittedAt: "2024-01-15", approvedAt: "2024-01-17" },
  { id: "p3", title: "Prime Commercial Space", description: "Excellent ground-floor retail/office space in a high-traffic area. Suitable for retail, restaurant, or professional services. Ample parking available.", price: 1200000, location: "Chicago, IL", type: "commercial", status: "available", images: [PROPERTY_IMAGES[5]], bedrooms: undefined, bathrooms: 2, area: 3500, ownerId: "u7", ownerName: "Grace Kim", ownerEmail: "grace@example.com", ownerAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=grace", submittedAt: "2024-01-20", approvedAt: "2024-01-22" },
  { id: "p4", title: "Beachfront Luxury Villa", description: "Exquisite beachfront villa with direct ocean access, private pool, and panoramic sea views. Fully furnished with high-end decor and smart home technology.", price: 3500000, location: "Miami, FL", type: "house", status: "sold", images: [PROPERTY_IMAGES[6], PROPERTY_IMAGES[7]], bedrooms: 5, bathrooms: 6, area: 5200, ownerId: "u3", ownerName: "Carol White", ownerEmail: "carol@example.com", ownerAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=carol", submittedAt: "2023-11-01", approvedAt: "2023-11-05" },
  { id: "p5", title: "Investment Land Plot", description: "Prime development land with approved planning permission for residential development. Utilities connected, flat terrain, excellent road access.", price: 280000, location: "Phoenix, AZ", type: "land", status: "available", images: [PROPERTY_IMAGES[0]], bedrooms: undefined, bathrooms: undefined, area: 8000, ownerId: "u8", ownerName: "Henry Wilson", ownerEmail: "henry@example.com", ownerAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=henry", submittedAt: "2024-02-01" },
  { id: "p6", title: "Cozy Studio in Midtown", description: "Charming studio apartment perfect for young professionals. Recently renovated, bright, and fully equipped. Close to public transport and amenities.", price: 195000, location: "New York, NY", type: "apartment", status: "rented", images: [PROPERTY_IMAGES[1], PROPERTY_IMAGES[2]], bedrooms: 0, bathrooms: 1, area: 450, ownerId: "u3", ownerName: "Carol White", ownerEmail: "carol@example.com", ownerAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=carol", submittedAt: "2023-12-15", approvedAt: "2023-12-18" },
  { id: "p7", title: "Pending Review Property", description: "A great opportunity in a growing neighborhood. This property is currently under review.", price: 380000, location: "Seattle, WA", type: "house", status: "pending", images: [PROPERTY_IMAGES[3]], bedrooms: 3, bathrooms: 2, area: 1800, ownerId: "u5", ownerName: "Eva Martinez", ownerEmail: "eva@example.com", ownerAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=eva", submittedAt: "2024-02-10" },
  { id: "p8", title: "Mountain Retreat Cabin", description: "Rustic yet modern mountain cabin with stunning alpine views. Perfect for vacation rental or year-round residence. Hot tub included.", price: 550000, location: "Denver, CO", type: "house", status: "available", images: [PROPERTY_IMAGES[4], PROPERTY_IMAGES[5]], bedrooms: 3, bathrooms: 2, area: 1600, ownerId: "u7", ownerName: "Grace Kim", ownerEmail: "grace@example.com", ownerAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=grace", submittedAt: "2024-01-25", approvedAt: "2024-01-28" },
];

export const mockReports: PropertyReport[] = [
  { id: "r1", propertyId: "p1", propertyTitle: "Modern Downtown Apartment", reporterId: "u4", reporterName: "David Brown", reason: "scam", details: "Price seems too good to be true and listing has suspicious contact info.", status: "pending", createdAt: "2024-02-08" },
  { id: "r2", propertyId: "p3", propertyTitle: "Prime Commercial Space", reporterId: "u7", reporterName: "Grace Kim", reason: "duplicate", details: "Same property listed under different names.", status: "pending", createdAt: "2024-02-10" },
  { id: "r3", propertyId: "p5", propertyTitle: "Investment Land Plot", reporterId: "u8", reporterName: "Henry Wilson", reason: "inappropriate", details: "Listing contains misleading photos.", status: "dismissed", createdAt: "2024-02-05" },
  { id: "r4", propertyId: "p7", propertyTitle: "Pending Review Property", reporterId: "u3", reporterName: "Carol White", reason: "other", details: "Incorrect area details.", status: "pending", createdAt: "2024-02-12" },
];

export const mockActivity: ActivityItem[] = [
  { id: "a1", type: "approved", message: "Your property \"Modern Downtown Apartment\" was approved.", timestamp: "2024-02-12T10:30:00Z", propertyId: "p1" },
  { id: "a2", type: "created", message: "You submitted \"Pending Review Property\" for approval.", timestamp: "2024-02-10T14:15:00Z", propertyId: "p7" },
  { id: "a3", type: "updated", message: "You updated listing details for \"Cozy Studio in Midtown\".", timestamp: "2024-02-08T09:00:00Z", propertyId: "p6" },
  { id: "a4", type: "approved", message: "Your property \"Beachfront Luxury Villa\" was approved.", timestamp: "2024-01-17T16:45:00Z", propertyId: "p4" },
  { id: "a5", type: "rejected", message: "A listing you submitted was rejected. See details.", timestamp: "2024-01-05T11:20:00Z" },
];

export const mockSystemSettings: SystemSettings = {
  maintenanceMode: false,
  newRegistrationsEnabled: true,
  emailNotifications: true,
  maxImagesPerProperty: 5,
  defaultListingDurationDays: 90,
};

// ─── API Stub Helpers ─────────────────────────────────────────────────────────
// Simulate network latency. Replace with real fetch() calls when backend is ready.
const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

export const api = {
  // Auth
  login: async (email: string, _password: string): Promise<{ token: string; user: User }> => {
    try {
      const res = await http.post<BackendSuccess<{ token: string; user: any }>>(
        "/auth/login",
        { email, password: _password },
      );
      const { token, user } = res.data.data;
      return { token, user: mapUser(user) };
    } catch (err: any) {
      throw new Error(toMessage(err));
    }
  },

  register: async (name: string, email: string, _password: string): Promise<{ message: string }> => {
    try {
      const res = await http.post<BackendSuccess<{ token: string; user: any }>>(
        "/auth/register",
        { name, email, password: _password },
      );
      return { message: res.data.message };
    } catch (err: any) {
      throw new Error(toMessage(err));
    }
  },

  // Properties
  getProperties: async (): Promise<Property[]> => {
    await delay(700);
    return mockProperties;
  },

  getProperty: async (id: string): Promise<Property> => {
    await delay(500);
    const prop = mockProperties.find((p) => p.id === id);
    if (!prop) throw new Error("Property not found.");
    return prop;
  },

  createProperty: async (data: Partial<Property>): Promise<Property> => {
    await delay(1000);
    const newProp: Property = { id: `p${Date.now()}`, status: "pending", submittedAt: new Date().toISOString(), ownerId: "u3", ownerName: "Carol White", ownerEmail: "carol@example.com", images: [], ...data } as Property;
    mockProperties.push(newProp);
    return newProp;
  },

  updateProperty: async (id: string, data: Partial<Property>): Promise<Property> => {
    await delay(900);
    const idx = mockProperties.findIndex((p) => p.id === id);
    if (idx === -1) throw new Error("Property not found.");
    mockProperties[idx] = { ...mockProperties[idx], ...data };
    return mockProperties[idx];
  },

  deleteProperty: async (id: string): Promise<void> => {
    await delay(600);
    const idx = mockProperties.findIndex((p) => p.id === id);
    if (idx !== -1) mockProperties.splice(idx, 1);
  },

  approveProperty: async (id: string): Promise<void> => {
    await delay(700);
    const prop = mockProperties.find((p) => p.id === id);
    if (prop) { prop.status = "available"; prop.approvedAt = new Date().toISOString(); }
  },

  rejectProperty: async (id: string, _reason: string): Promise<void> => {
    await delay(700);
    const prop = mockProperties.find((p) => p.id === id);
    if (prop) prop.status = "pending";
  },

  // Users
  getUsers: async (): Promise<User[]> => {
    await delay(700);
    return mockUsers;
  },

  updateUserRole: async (id: string, role: UserRole): Promise<void> => {
    await delay(600);
    const user = mockUsers.find((u) => u.id === id);
    if (user) user.role = role;
  },

  updateUserStatus: async (id: string, status: "active" | "suspended"): Promise<void> => {
    await delay(600);
    const user = mockUsers.find((u) => u.id === id);
    if (user) user.status = status;
  },

  // Dashboard
  getDashboardStats: async (): Promise<DashboardStats> => {
    await delay(600);
    return { totalProperties: 6, approvedListings: 4, pendingApprovals: 1, rejected: 1 };
  },

  getAdminStats: async (): Promise<AdminStats> => {
    await delay(600);
    return { totalUsers: mockUsers.length, totalProperties: mockProperties.length, pendingApprovals: mockProperties.filter((p) => p.status === "pending").length, reportedProperties: mockReports.filter((r) => r.status === "pending").length };
  },

  getActivity: async (): Promise<ActivityItem[]> => {
    await delay(500);
    return mockActivity;
  },

  // Reports
  getReports: async (): Promise<PropertyReport[]> => {
    await delay(700);
    return mockReports;
  },

  dismissReport: async (id: string): Promise<void> => {
    await delay(500);
    const report = mockReports.find((r) => r.id === id);
    if (report) report.status = "dismissed";
  },

  resolveReport: async (id: string): Promise<void> => {
    await delay(500);
    const report = mockReports.find((r) => r.id === id);
    if (report) report.status = "resolved";
  },

  // System Settings
  getSystemSettings: async (): Promise<SystemSettings> => {
    await delay(500);
    return { ...mockSystemSettings };
  },

  updateSystemSettings: async (settings: SystemSettings): Promise<void> => {
    await delay(800);
    Object.assign(mockSystemSettings, settings);
  },
};
