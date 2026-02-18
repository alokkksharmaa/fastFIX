import mongoose from 'mongoose';
import { PROPERTY_TYPES, PROPERTY_STATUSES } from '../utils/constants.js';

const propertySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Title is required'],
      trim: true,
      minlength: [5, 'Title must be at least 5 characters'],
      maxlength: [200, 'Title cannot exceed 200 characters'],
    },
    description: {
      type: String,
      required: [true, 'Description is required'],
      trim: true,
      minlength: [20, 'Description must be at least 20 characters'],
      maxlength: [5000, 'Description cannot exceed 5000 characters'],
    },
    price: {
      type: Number,
      required: [true, 'Price is required'],
      min: [0, 'Price must be positive'],
    },
    location: {
      type: String,
      required: [true, 'Location is required'],
      trim: true,
      maxlength: [200, 'Location cannot exceed 200 characters'],
    },
    type: {
      type: String,
      required: [true, 'Property type is required'],
      enum: Object.values(PROPERTY_TYPES),
    },
    status: {
      type: String,
      enum: Object.values(PROPERTY_STATUSES),
      default: PROPERTY_STATUSES.pending,
    },
    images: {
      type: [String],
      default: [],
      validate: {
        validator: function (v) {
          return v.length <= 10;
        },
        message: 'Cannot have more than 10 images',
      },
    },
    specs: {
      bedrooms: {
        type: Number,
        min: [0, 'Bedrooms must be non-negative'],
        default: 0,
      },
      bathrooms: {
        type: Number,
        min: [0, 'Bathrooms must be non-negative'],
        default: 0,
      },
      area: {
        type: Number,
        min: [0, 'Area must be non-negative'],
        default: 0,
      },
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

propertySchema.index({ location: 1 });
propertySchema.index({ price: 1 });
propertySchema.index({ type: 1 });
propertySchema.index({ status: 1 });
propertySchema.index({ owner: 1 });
propertySchema.index({ createdAt: -1 });
propertySchema.index({ title: 'text', description: 'text' });

export const Property = mongoose.model('Property', propertySchema);
