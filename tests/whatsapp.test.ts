import { describe, it, expect } from 'vitest';
import { buildWhatsAppLink } from '@/lib/whatsapp';

describe('buildWhatsAppLink', () => {
  it('produces a wa.me link with E.164 phone (no plus, no spaces)', () => {
    expect(buildWhatsAppLink({ phone: '+20 111 6200 099' }))
      .toBe('https://wa.me/201116200099');
  });

  it('encodes prefilled message as text query param', () => {
    expect(
      buildWhatsAppLink({
        phone: '+201116200099',
        message: 'Hello, I want to import a BYD Song L.',
      }),
    ).toBe(
      'https://wa.me/201116200099?text=Hello%2C%20I%20want%20to%20import%20a%20BYD%20Song%20L.',
    );
  });

  it('builds a vehicle-specific message from a slug', () => {
    expect(
      buildWhatsAppLink({
        phone: '+201116200099',
        vehicleSlug: 'mercedes-eqe-suv-350',
      }),
    ).toBe(
      'https://wa.me/201116200099?text=Hi%20VoltAuto%20%E2%80%94%20I%27m%20interested%20in%20mercedes-eqe-suv-350.',
    );
  });

  it('throws on a phone with non-digits after stripping +', () => {
    expect(() => buildWhatsAppLink({ phone: 'abc' })).toThrow(/E\.164/);
  });
});
