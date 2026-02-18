import jwt from 'jsonwebtoken';
import { config } from '../config/env.js';
import { User } from '../models/User.js';
import { ApiError } from '../utils/apiError.js';
import { Settings } from '../models/Settings.js';

export async function registerUser(data) {
  const { name, email, password } = data;
  
  const settings = await Settings.getSettings();
  if (!settings.allowRegistrations) {
    throw new ApiError(403, 'Registrations are currently disabled');
  }
  
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new ApiError(409, 'Email already registered');
  }
  
  const user = await User.create({ name, email, password });
  
  const token = generateToken(user._id.toString());
  
  return { user, token };
}

export async function loginUser(data) {
  const { email, password } = data;
  
  const user = await User.findOne({ email }).select('+password');
  
  if (!user) {
    throw new ApiError(401, 'Invalid credentials');
  }
  
  if (user.status !== 'active') {
    throw new ApiError(403, 'Account is suspended');
  }
  
  const isPasswordValid = await user.comparePassword(password);
  
  if (!isPasswordValid) {
    throw new ApiError(401, 'Invalid credentials');
  }
  
  const token = generateToken(user._id.toString());
  
  return { user, token };
}

export async function getProfile(userId) {
  const user = await User.findById(userId);
  if (!user) {
    throw new ApiError(404, 'User not found');
  }
  return user;
}

function generateToken(userId) {
  return jwt.sign({ userId }, config.jwt.accessSecret, {
    expiresIn: config.jwt.accessExpiresIn,
  });
}
