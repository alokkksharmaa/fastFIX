import express from 'express';
import { authenticate } from '../middleware/auth.js';
import { requireAdmin, authorize } from '../middleware/authorize.js';
import { validate } from '../middleware/validate.js';
import { parsePagination } from '../utils/pagination.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import * as reportController from '../controllers/reportController.js';
import * as reportValidators from '../validators/report.js';
import { USER_ROLES } from '../utils/constants.js';

const router = express.Router();

router.post(
  '/property/:id',
  authenticate,
  authorize(USER_ROLES.User),
  validate(reportValidators.createReportSchema),
  reportController.createReport
);

router.get(
  '/',
  authenticate,
  requireAdmin,
  validate(reportValidators.getReportsSchema),
  asyncHandler(async (req, res, next) => {
    req.pagination = parsePagination(req.query);
    next();
  }),
  reportController.getReports
);

router.patch(
  '/:id',
  authenticate,
  requireAdmin,
  validate(reportValidators.updateReportSchema),
  reportController.updateReportStatus
);

export default router;
