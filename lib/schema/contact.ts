import { z } from 'zod';

export const contactSchema = z.object({
  name: z.string().min(1, 'Обязательное поле'),
  email: z.string().email('Некорректный email'),
  message: z.string().max(200, 'Максимум 200 символов').optional(),
  website: z.string().optional(), // honeypot: checked in API, not sent to integrations
});

export type ContactFormData = z.infer<typeof contactSchema>;
