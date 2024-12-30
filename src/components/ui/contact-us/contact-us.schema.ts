import { z } from 'zod';

export const contactUsFormSchema = z.object({
  email: z.string().email('Invalid email address'),
});
