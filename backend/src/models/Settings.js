import mongoose from 'mongoose';

const settingsSchema = new mongoose.Schema(
  {
    maintenanceMode: {
      type: Boolean,
      default: false,
    },
    allowRegistrations: {
      type: Boolean,
      default: true,
    },
    maxImages: {
      type: Number,
      default: 10,
      min: [1, 'Max images must be at least 1'],
      max: [20, 'Max images cannot exceed 20'],
    },
    defaultListingDuration: {
      type: Number,
      default: 30,
      min: [1, 'Default listing duration must be at least 1 day'],
      max: [365, 'Default listing duration cannot exceed 365 days'],
    },
  },
  {
    timestamps: true,
  }
);

settingsSchema.statics.getSettings = async function () {
  let settings = await this.findOne();
  if (!settings) {
    settings = await this.create({});
  }
  return settings;
};

export const Settings = mongoose.model('Settings', settingsSchema);
