import * as propertyService from '../services/propertyService.js';
import { ok } from '../utils/apiResponse.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { buildPageMeta } from '../utils/pagination.js';

export const createProperty = asyncHandler(async (req, res) => {
  const property = await propertyService.createProperty(
    req.validated.body,
    req.user._id
  );
  ok(res, 'Property created successfully', { property }, 201);
});

export const getProperties = asyncHandler(async (req, res) => {
  const { properties, total, page, limit } = await propertyService.getProperties(
    req.validated.query,
    req.pagination
  );
  ok(res, 'Properties retrieved successfully', {
    properties,
    pagination: buildPageMeta({ page, limit, total }),
  });
});

export const getPropertyById = asyncHandler(async (req, res) => {
  const property = await propertyService.getPropertyById(req.validated.params.id);
  ok(res, 'Property retrieved successfully', { property });
});

export const updateProperty = asyncHandler(async (req, res) => {
  const property = await propertyService.updateProperty(
    req.validated.params.id,
    req.validated.body,
    req.user._id,
    req.user.role
  );
  ok(res, 'Property updated successfully', { property });
});

export const deleteProperty = asyncHandler(async (req, res) => {
  const result = await propertyService.deleteProperty(
    req.validated.params.id,
    req.user._id,
    req.user.role
  );
  ok(res, result.message);
});
