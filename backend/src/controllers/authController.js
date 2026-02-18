import * as authService from '../services/authService.js';
import { ok } from '../utils/apiResponse.js';
import { asyncHandler } from '../utils/asyncHandler.js';

export const register = asyncHandler(async (req, res) => {
  const { user, token } = await authService.registerUser(req.validated.body);
  ok(res, 'User registered successfully', { user, token }, 201);
});

export const login = asyncHandler(async (req, res) => {
  const { user, token } = await authService.loginUser(req.validated.body);
  ok(res, 'Login successful', { user, token });
});

export const getProfile = asyncHandler(async (req, res) => {
  const user = await authService.getProfile(req.user._id);
  ok(res, 'Profile retrieved successfully', { user });
});
