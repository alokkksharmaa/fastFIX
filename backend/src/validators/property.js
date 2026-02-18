import { z } from 'zod';
import { PROPERTY_TYPES } from '../utils/constants.js';

export const createPropertySchema = z.object({
  body: z.object({
    title: z.string().min(5).max(200),
    description: z.string().min(20).max(5000),
    price: z.number().min(0),
    location: z.string().min(1).max(200),
    type: z.enum(Object.values(PROPERTY_TYPES)),
    images: z.array(z.string().url()).max(10).optional().default([]),
    specs: z.object({
      bedrooms: z.number().min(0).optional().default(0),
      bathrooms: z.number().min(0).optional().default(0),
      area: z.number().min(0).optional().default(0),
    }).optional(),
  }),
});

export const updatePropertySchema = z.object({
  body: z.object({
    title: z.string().min(5).max(200).optional(),
    description: z.string().min(20).max(5000).optional(),
    price: z.number().min(0).optional(),
    location: z.string().min(1).max(200).optional(),
    type: z.enum(Object.values(PROPERTY_TYPES)).optional(),
    images: z.array(z.string().url()).max(10).optional(),
    specs: z.object({
      bedrooms: z.number().min(0).optional(),
      bathrooms: z.number().min(0).optional(),
      area: z.number().min(0).optional(),
    }).optional(),
  }),
  params: z.object({
    id: z.string().regex(/^[0-9a-fA-F]{24}$/, 'Invalid property ID'),
  }),
});

export const getPropertiesSchema = z.object({
  query: z.object({
    page: z.string().optional(),
    limit: z.string().optional(),
    location: z.string().optional(),
    minPrice: z.string().optional(),
    maxPrice: z.string().optional(),
    type: z.enum(Object.values(PROPERTY_TYPES)).optional(),
    status: z.string().optional(),
    search: z.string().optional(),
  }),
});

export const getPropertySchema = z.object({
  params: z.object({
    id: z.string().regex(/^[0-9a-fA-F]{24}$/, 'Invalid property ID'),
  }),
});

export const deletePropertySchema = z.object({
  params: z.object({
    id: z.string().regex(/^[0-9a-fA-F]{24}$/, 'Invalid property ID'),
  }),
});
