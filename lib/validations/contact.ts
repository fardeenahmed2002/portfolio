import { z } from 'zod';

/**
 * Server-side validation for the public contact form.
 * The client form validates too, but server validation is the source of truth
 * and must never be skipped (per security requirements).
 */
export const contactSchema = z.object({
  name: z.string().trim().min(2, 'Name must be at least 2 characters').max(100),
  email: z.string().trim().email('A valid email is required').max(200),
  subject: z.string().trim().max(200).optional().or(z.literal('')),
  message: z.string().trim().min(10, 'Message must be at least 10 characters').max(5000),
});

export type ContactInput = z.infer<typeof contactSchema>;
