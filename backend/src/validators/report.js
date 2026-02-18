import { z } from 'zod';

export const createReportSchema = z.object({
  body: z.object({
    reason: z.string().min(10).max(1000),
  }),
  params: z.object({
    id: z.string().regex(/^[0-9a-fA-F]{24}$/, 'Invalid property ID'),
  }),
});

export const updateReportSchema = z.object({
  body: z.object({
    status: z.enum(['open', 'reviewed', 'resolved', 'dismissed']),
  }),
  params: z.object({
    id: z.string().regex(/^[0-9a-fA-F]{24}$/, 'Invalid report ID'),
  }),
});

export const getReportsSchema = z.object({
  query: z.object({
    page: z.string().optional(),
    limit: z.string().optional(),
    status: z.string().optional(),
  }),
});
