import express from 'express';
import { authRateLimiter } from '../middleware/rateLimiter.js';
import { authenticate } from '../middleware/auth.js';
import { validate } from '../middleware/validate.js';
import * as authController from '../controllers/authController.js';
import * as authValidators from '../validators/auth.js';

const router = express.Router();

router.post('/register', authRateLimiter, validate(authValidators.registerSchema), authController.register);
router.post('/login', authRateLimiter, validate(authValidators.loginSchema), authController.login);
router.get('/profile', authenticate, authController.getProfile);

export default router;