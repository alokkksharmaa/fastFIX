import { Settings } from '../models/Settings.js';
import { ApiError } from '../utils/apiError.js';

export async function getSettings() {
  return await Settings.getSettings();
}

export async function updateSettings(data) {
  let settings = await Settings.findOne();
  
  if (!settings) {
    settings = await Settings.create(data);
  } else {
    Object.assign(settings, data);
    await settings.save();
  }
  
  return settings;
}
