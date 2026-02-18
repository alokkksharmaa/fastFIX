# Real Estate Property Management API

A production-grade REST API for a Real Estate Property Management System with JWT authentication, Role-Based Access Control (RBAC), and comprehensive security features.

## 🏗️ Architecture

```
src/
 ├── config/          # Configuration (database, environment)
 ├── controllers/     # Thin controllers (request/response handling)
 ├── middleware/      # Auth, validation, error handling, rate limiting
 ├── models/          # Mongoose schemas (User, Property, Report, Settings)
 ├── routes/          # Route definitions
 ├── services/        # Business logic layer
 ├── validators/      # Zod validation schemas
 ├── utils/           # Utilities (constants, errors, pagination, logger)
 ├── app.js           # Express app setup
 └── server.js        # Server entry point
```

## 🚀 Quick Start

### Prerequisites

- Node.js (v18+)
- MongoDB (local or Atlas)
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Create `.env` file (copy from `.env.example`):
```bash
cp .env.example .env
```

3. Update `.env` with your configuration:
```env
NODE_ENV=development
PORT=3000
MONGO_URI=mongodb://localhost:27017/real_estate_api
JWT_ACCESS_SECRET=your_super_secret_key_change_in_production
JWT_ACCESS_EXPIRES_IN=15m
CORS_ORIGIN=http://localhost:5173
REQUEST_BODY_LIMIT=200kb
LOG_LEVEL=info
```

4. Start MongoDB (if running locally)

5. Start the server:
```bash
# Development mode (with nodemon)
npm run dev

# Production mode
npm start
```

## 📚 API Documentation

### Base URL
```
http://localhost:3000/api
```

### Authentication

All protected routes require JWT token in Authorization header:
```
Authorization: Bearer <token>
```

### Response Format

**Success:**
```json
{
  "success": true,
  "message": "Operation successful",
  "data": { ... }
}
```

**Error:**
```json
{
  "success": false,
  "message": "Error message",
  "details": [ ... ]
}
```

## 🔐 User Roles

- **User**: Create & manage own properties, browse listings, report properties
- **Admin**: Manage users, approve/reject properties, review reports
- **SuperAdmin**: Manage system settings, platform-level control

## 📍 API Endpoints

### Auth Routes (`/api/auth`)

- `POST /register` - Register new user
- `POST /login` - Login user (returns JWT token)
- `GET /profile` - Get current user profile (protected)

### Property Routes (`/api/property`)

- `GET /` - Get all properties (public, supports filtering & pagination)
  - Query params: `page`, `limit`, `location`, `minPrice`, `maxPrice`, `type`, `status`, `search`
- `GET /:id` - Get property by ID (public)
- `POST /` - Create property (User/Admin)
- `PUT /:id` - Update property (Owner/Admin)
- `DELETE /:id` - Delete property (Owner/Admin)

### Admin Routes (`/api/admin`)

- `GET /users` - Get all users (Admin/SuperAdmin)
- `PATCH /user/:id/role` - Update user role (Admin/SuperAdmin)
- `PATCH /user/:id/status` - Update user status (Admin/SuperAdmin)
- `PATCH /property/:id/approve` - Approve property (Admin/SuperAdmin)
- `PATCH /property/:id/reject` - Reject property (Admin/SuperAdmin)

### Report Routes (`/api/reports`)

- `POST /property/:id` - Report a property (User)
- `GET /` - Get all reports (Admin/SuperAdmin)
- `PATCH /:id` - Update report status (Admin/SuperAdmin)

### Settings Routes (`/api/settings`)

- `GET /` - Get system settings (SuperAdmin only)
- `PUT /` - Update system settings (SuperAdmin only)

## 🔒 Security Features

- **Helmet**: Security headers
- **CORS**: Configurable cross-origin resource sharing
- **Rate Limiting**: Protection against brute force attacks
- **MongoDB Sanitization**: Prevents NoSQL injection
- **HPP**: Protects against HTTP Parameter Pollution
- **JWT Authentication**: Secure token-based auth
- **Password Hashing**: bcrypt with salt rounds
- **Input Validation**: Zod schema validation
- **Request Size Limits**: Prevents DoS attacks

## 🗄️ Database Models

### User
- name, email (unique), password (hashed), role, status, timestamps

### Property
- title, description, price, location, type, status, images, specs (bedrooms, bathrooms, area), owner (ref), timestamps

### Report
- property (ref), reporter (ref), reason, status, timestamps

### Settings
- maintenanceMode, allowRegistrations, maxImages, defaultListingDuration

## 🧪 Testing

```bash
npm test
```

## 📝 Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `NODE_ENV` | Environment mode | `development` |
| `PORT` | Server port | `3000` |
| `MONGO_URI` | MongoDB connection string | `mongodb://localhost:27017/real_estate_api` |
| `JWT_ACCESS_SECRET` | JWT secret key | `change_me_in_production` |
| `JWT_ACCESS_EXPIRES_IN` | JWT expiration | `15m` |
| `CORS_ORIGIN` | Allowed CORS origin | `http://localhost:5173` |
| `REQUEST_BODY_LIMIT` | Max request body size | `200kb` |
| `LOG_LEVEL` | Winston log level | `info` |

## 🏭 Production Considerations

1. **Change JWT_SECRET**: Use a strong, random secret in production
2. **Enable HTTPS**: Use reverse proxy (nginx) with SSL
3. **Database Indexing**: Already implemented for frequently queried fields
4. **Error Logging**: Winston logger configured for structured logging
5. **Environment Variables**: Never commit `.env` file
6. **Rate Limiting**: Adjust limits based on your traffic
7. **MongoDB**: Use MongoDB Atlas or managed MongoDB for production

## 📦 Dependencies

- **express**: Web framework
- **mongoose**: MongoDB ODM
- **jsonwebtoken**: JWT authentication
- **bcrypt**: Password hashing
- **zod**: Schema validation
- **helmet**: Security headers
- **cors**: CORS middleware
- **express-rate-limit**: Rate limiting
- **express-mongo-sanitize**: NoSQL injection prevention
- **hpp**: HTTP Parameter Pollution protection
- **morgan**: HTTP request logger
- **winston**: Structured logging
- **dotenv**: Environment variables

## 🎯 Key Features

✅ JWT Authentication with role-based access control  
✅ Comprehensive input validation with Zod  
✅ Pagination for all list endpoints  
✅ Advanced filtering and search  
✅ Centralized error handling  
✅ Security best practices  
✅ Production-ready logging  
✅ Modular, scalable architecture  
✅ Clean separation of concerns  

## 📄 License

ISC
