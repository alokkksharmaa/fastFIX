import { z } from 'zod';

export const updateSettingsSchema = z.object({
  body: z.object({
    maintenanceMode: z.boolean().optional(),
    allowRegistrations: z.boolean().optional(),
    maxImages: z.number().min(1).max(20).optional(),
    defaultListingDuration: z.number().min(1).max(365).optional(),
  }),
});
