import { z } from 'zod';
import { USER_ROLES, USER_STATUSES } from '../utils/constants.js';

export const updateUserRoleSchema = z.object({
  body: z.object({
    role: z.enum(Object.values(USER_ROLES)),
  }),
  params: z.object({
    id: z.string().regex(/^[0-9a-fA-F]{24}$/, 'Invalid user ID'),
  }),
});

export const updateUserStatusSchema = z.object({
  body: z.object({
    status: z.enum(Object.values(USER_STATUSES)),
  }),
  params: z.object({
    id: z.string().regex(/^[0-9a-fA-F]{24}$/, 'Invalid user ID'),
  }),
});

export const getUsersSchema = z.object({
  query: z.object({
    page: z.string().optional(),
    limit: z.string().optional(),
    role: z.string().optional(),
    status: z.string().optional(),
  }),
});

export const approvePropertySchema = z.object({
  params: z.object({
    id: z.string().regex(/^[0-9a-fA-F]{24}$/, 'Invalid property ID'),
  }),
});

export const rejectPropertySchema = z.object({
  params: z.object({
    id: z.string().regex(/^[0-9a-fA-F]{24}$/, 'Invalid property ID'),
  }),
});
