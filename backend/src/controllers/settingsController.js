import * as settingsService from '../services/settingsService.js';
import { ok } from '../utils/apiResponse.js';
import { asyncHandler } from '../utils/asyncHandler.js';

export const getSettings = asyncHandler(async (req, res) => {
  const settings = await settingsService.getSettings();
  ok(res, 'Settings retrieved successfully', { settings });
});

export const updateSettings = asyncHandler(async (req, res) => {
  const settings = await settingsService.updateSettings(req.validated.body);
  ok(res, 'Settings updated successfully', { settings });
});
