import mongoose from 'mongoose';
import { REPORT_STATUSES } from '../utils/constants.js';

const reportSchema = new mongoose.Schema(
  {
    property: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Property',
      required: [true, 'Property is required'],
    },
    reporter: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Reporter is required'],
    },
    reason: {
      type: String,
      required: [true, 'Reason is required'],
      trim: true,
      minlength: [10, 'Reason must be at least 10 characters'],
      maxlength: [1000, 'Reason cannot exceed 1000 characters'],
    },
    status: {
      type: String,
      enum: Object.values(REPORT_STATUSES),
      default: REPORT_STATUSES.open,
    },
  },
  {
    timestamps: true,
  }
);

reportSchema.index({ property: 1 });
reportSchema.index({ reporter: 1 });
reportSchema.index({ status: 1 });

export const Report = mongoose.model('Report', reportSchema);
