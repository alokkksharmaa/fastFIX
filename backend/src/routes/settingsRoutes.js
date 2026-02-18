import express from 'express';
import { authenticate } from '../middleware/auth.js';
import { requireSuperAdmin } from '../middleware/authorize.js';
import { validate } from '../middleware/validate.js';
import * as settingsController from '../controllers/settingsController.js';
import * as settingsValidators from '../validators/settings.js';

const router = express.Router();

router.use(authenticate);
router.use(requireSuperAdmin);

router.get('/', settingsController.getSettings);
router.put('/', validate(settingsValidators.updateSettingsSchema), settingsController.updateSettings);

export default router;
