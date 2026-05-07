import { describe, it, expect } from 'vitest';
import { contactSchema } from '@/lib/schemas/contact';

describe('contactSchema', () => {
  it('accepts a minimal valid payload', () => {
    const result = contactSchema.safeParse({
      topic: 'importing_an_ev',
      name: 'Mona K.',
      email: 'mona@example.com',
      phone: '+201116200099',
      message: 'I want a BYD Song L AWD.',
      consentWhatsApp: true,
    });
    expect(result.success).toBe(true);
  });

  it('rejects invalid email', () => {
    const result = contactSchema.safeParse({
      topic: 'service',
      name: 'Mona',
      email: 'not-an-email',
      phone: '+201116200099',
      message: 'Hi',
      consentWhatsApp: false,
    });
    expect(result.success).toBe(false);
  });

  it('requires consent or rejects', () => {
    const result = contactSchema.safeParse({
      topic: 'fleet',
      name: 'Ali',
      email: 'ali@example.com',
      phone: '+201116200099',
      message: '50-vehicle fleet inquiry',
      consentWhatsApp: false,
    });
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.consentWhatsApp).toBe(false);
    }
  });
});
