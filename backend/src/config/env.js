import dotenv from 'dotenv';

dotenv.config();

export const config = {
  env: process.env.NODE_ENV || 'development',
  port: Number(process.env.PORT) || 3000,
  mongoUri: process.env.MONGO_URI || 'mongodb://localhost:27017/real_estate_api',
  jwt: {
    accessSecret: process.env.JWT_ACCESS_SECRET || 'change_me_in_production',
    accessExpiresIn: process.env.JWT_ACCESS_EXPIRES_IN || '15m',
  },
  cors: {
    origin: process.env.CORS_ORIGIN || 'http://localhost:5173',
  },
  requestBodyLimit: process.env.REQUEST_BODY_LIMIT || '200kb',
  logLevel: process.env.LOG_LEVEL || 'info',
};
