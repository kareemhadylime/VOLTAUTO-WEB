import { describe, it, expect } from 'vitest';
import { buildLocalBusinessJsonLd } from '@/lib/seo/localBusinessSchema';

describe('buildLocalBusinessJsonLd', () => {
  it('emits AutoDealer with both branches', () => {
    const ld = buildLocalBusinessJsonLd('https://voltauto.biz');
    expect(ld['@type']).toBe('AutoDealer');
    expect(ld.name).toBe('VoltAuto');
    expect(Array.isArray(ld.subOrganization)).toBe(true);
    expect(ld.subOrganization).toHaveLength(2);
  });

  it('encodes Cairo branch geo', () => {
    const ld = buildLocalBusinessJsonLd('https://voltauto.biz');
    const cairo = ld.subOrganization.find((s) => s.address.addressCountry === 'EG');
    expect(cairo).toBeDefined();
    expect(cairo?.geo).toEqual({
      '@type': 'GeoCoordinates',
      latitude: 29.9783088,
      longitude: 31.354216,
    });
  });
});
