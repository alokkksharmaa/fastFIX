# jwt-real-estate-api
Real Estate API
# Property Listing System – Production-Grade Backend

A secure, scalable, role-based backend system for managing property listings.  
Built with **Node.js, Express, MongoDB**, and protected using **JWT Authentication** with **Role-Based Access Control (RBAC)**.

This project is designed to be like a real-world production backend—clean architecture, predictable APIs, and strict access control.

---

## Overview

The Property Listing System allows:

- Users to register, authenticate, browse listings, and manage their own properties.
- Admins to control master data, moderate properties, manage users, access reports, and configure system-wide settings.

All protected routes are secured via JWT, and sensitive operations are restricted to admins using role middleware.

---

##  Objectives

- Build a **secure and scalable** property management backend.
- Implement **full CRUD** for properties.
- Enforce **JWT-based authentication** for all protected routes.
- Apply **role-based guards** for admin-only operations.
- Maintain **clean separation of concerns** across modules.
- Provide **consistent API contracts** for frontend integration.
- Follow industry standards for **validation, error handling, and security**.

---

## User Roles

| Role  | Permissions                                                                 |
|-------|------------------------------------------------------------------------------|
| Admin | Manage users, approve/reject properties, access reports, update settings     |
| User  | Register, login, create/edit own properties, browse listings                  |

---

## System Architecture

- **Backend:** Node.js + Express  
- **Database:** MongoDB  
- **Authentication:** JWT (Access Token)  
- **Security:**
  - Password hashing with `bcrypt`
  - JWT verification middleware
  - Role-based route guards

### High-Level Flow

1. User registers → password hashed → stored in DB  
2. User logs in → JWT generated  
3. Token stored on frontend (cookie / localStorage)  
4. Each request sends: `Authorization: Bearer <token>`  
5. Middleware verifies token & role  
6. Access granted or denied  

---

## Core Modules / Collections

1. **Users** – Authentication & roles  
2. **Property Listings** – Main business entity  
3. **Reports** – System analytics & moderation data  
4. **Settings** – Application-wide configuration  

---

## 🔌 API Design

**Base URL:** `/api`

### Auth APIs
1. `POST /auth/register` – Register new user  
2. `POST /auth/login` – Login and receive JWT  
3. `GET /auth/profile` – Get current user profile  

### Property APIs
4. `POST /property` – Create property (User/Admin)  
5. `GET /property` – List all properties  
6. `GET /property/:id` – Get single property  
7. `PUT /property/:id` – Update property (Owner/Admin)  
8. `DELETE /property/:id` – Delete property (Owner/Admin)  

### Admin APIs
9. `GET /admin/users` – List all users (Admin)  
10. `PUT /admin/user/:id/role` – Change user role (Admin)  
11. `PUT /admin/property/:id/approve` – Approve property (Admin)  

### Reports & Settings
12. `GET /reports/summary` – System stats (Admin)  
13. `POST /reports/property/:id` – Report a property (User)  
14. `GET /settings` – Fetch system settings  
15. `PUT /settings` – Update system settings (Admin)  

---

## Data Models (Simplified)

### User
```json
{
  "_id": "ObjectId",
  "name": "string",
  "email": "string",
  "password": "hashed",
  "role": "admin | user",
  "createdAt": "date"
}
