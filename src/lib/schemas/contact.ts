import { z } from 'zod';

export const TOPICS = [
  'importing_an_ev',
  'fleet',
  'service',
  'charger_install',
  'press',
  'other',
] as const;

export const contactSchema = z.object({
  topic: z.enum(TOPICS),
  name: z.string().min(2).max(80),
  email: z.string().email(),
  phone: z.string().regex(/^\+?\d[\d\s\-()]{6,}$/),
  vehicleMake: z.string().max(60).optional(),
  vehicleModel: z.string().max(60).optional(),
  message: z.string().min(5).max(2000),
  consentWhatsApp: z.boolean(),
});

export type ContactFormValues = z.infer<typeof contactSchema>;
