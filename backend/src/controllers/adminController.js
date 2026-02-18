import * as adminService from '../services/adminService.js';
import * as propertyService from '../services/propertyService.js';
import { ok } from '../utils/apiResponse.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { buildPageMeta } from '../utils/pagination.js';

export const getUsers = asyncHandler(async (req, res) => {
  const { users, total, page, limit } = await adminService.getUsers(
    req.validated.query,
    req.pagination
  );
  ok(res, 'Users retrieved successfully', {
    users,
    pagination: buildPageMeta({ page, limit, total }),
  });
});

export const updateUserRole = asyncHandler(async (req, res) => {
  const user = await adminService.updateUserRole(
    req.validated.params.id,
    req.validated.body.role
  );
  ok(res, 'User role updated successfully', { user });
});

export const updateUserStatus = asyncHandler(async (req, res) => {
  const user = await adminService.updateUserStatus(
    req.validated.params.id,
    req.validated.body.status
  );
  ok(res, 'User status updated successfully', { user });
});

export const approveProperty = asyncHandler(async (req, res) => {
  const property = await propertyService.approveProperty(req.validated.params.id);
  ok(res, 'Property approved successfully', { property });
});

export const rejectProperty = asyncHandler(async (req, res) => {
  const property = await propertyService.rejectProperty(req.validated.params.id);
  ok(res, 'Property rejected successfully', { property });
});
