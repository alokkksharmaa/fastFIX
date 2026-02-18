import express from 'express';
import { authenticate } from '../middleware/auth.js';
import { requireAdmin } from '../middleware/authorize.js';
import { validate } from '../middleware/validate.js';
import { parsePagination } from '../utils/pagination.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import * as adminController from '../controllers/adminController.js';
import * as adminValidators from '../validators/admin.js';

const router = express.Router();

router.use(authenticate);
router.use(requireAdmin);

router.get(
  '/users',
  validate(adminValidators.getUsersSchema),
  asyncHandler(async (req, res, next) => {
    req.pagination = parsePagination(req.query);
    next();
  }),
  adminController.getUsers
);

router.patch(
  '/user/:id/role',
  validate(adminValidators.updateUserRoleSchema),
  adminController.updateUserRole
);

router.patch(
  '/user/:id/status',
  validate(adminValidators.updateUserStatusSchema),
  adminController.updateUserStatus
);

router.patch(
  '/property/:id/approve',
  validate(adminValidators.approvePropertySchema),
  adminController.approveProperty
);

router.patch(
  '/property/:id/reject',
  validate(adminValidators.rejectPropertySchema),
  adminController.rejectProperty
);

export default router;
