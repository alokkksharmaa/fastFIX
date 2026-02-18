import express from 'express';
import { authenticate } from '../middleware/auth.js';
import { authorize } from '../middleware/authorize.js';
import { validate } from '../middleware/validate.js';
import { parsePagination } from '../utils/pagination.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import * as propertyController from '../controllers/propertyController.js';
import * as propertyValidators from '../validators/property.js';
import { USER_ROLES } from '../utils/constants.js';

const router = express.Router();

router.get(
  '/',
  validate(propertyValidators.getPropertiesSchema),
  asyncHandler(async (req, res, next) => {
    req.pagination = parsePagination(req.query);
    next();
  }),
  propertyController.getProperties
);

router.get(
  '/:id',
  validate(propertyValidators.getPropertySchema),
  propertyController.getPropertyById
);

router.post(
  '/',
  authenticate,
  authorize(USER_ROLES.User, USER_ROLES.Admin),
  validate(propertyValidators.createPropertySchema),
  propertyController.createProperty
);

router.put(
  '/:id',
  authenticate,
  authorize(USER_ROLES.User, USER_ROLES.Admin),
  validate(propertyValidators.updatePropertySchema),
  propertyController.updateProperty
);

router.delete(
  '/:id',
  authenticate,
  authorize(USER_ROLES.User, USER_ROLES.Admin),
  validate(propertyValidators.deletePropertySchema),
  propertyController.deleteProperty
);

export default router;
