import { describe, it, expect } from 'vitest';
import { vehicleSlug } from '@/lib/slug';

describe('vehicleSlug', () => {
  it('produces lowercase hyphenated slugs', () => {
    expect(vehicleSlug({ brand: 'Mercedes-Benz', model: 'EQE SUV', trim: '350' }))
      .toBe('mercedes-benz-eqe-suv-350');
  });

  it('strips diacritics and special chars', () => {
    expect(vehicleSlug({ brand: 'BYD', model: 'Sōng L', trim: 'AWD' }))
      .toBe('byd-song-l-awd');
  });

  it('handles missing trim', () => {
    expect(vehicleSlug({ brand: 'NEVO', model: 'Q05' }))
      .toBe('nevo-q05');
  });
});
