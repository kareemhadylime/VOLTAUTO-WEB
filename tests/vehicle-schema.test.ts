import { describe, it, expect } from 'vitest';
import { buildVehicleJsonLd } from '@/lib/seo/vehicleSchema';
import { seedVehicles } from '@/lib/seed/vehicles';

describe('buildVehicleJsonLd', () => {
  it('emits @context and @type Vehicle', () => {
    const v = seedVehicles[0]!;
    const ld = buildVehicleJsonLd(v, 'https://voltauto.biz');
    expect(ld['@context']).toBe('https://schema.org');
    expect(ld['@type']).toBe('Vehicle');
  });

  it('includes brand, model, fuelType=Electric, BatteryCapacity', () => {
    const v = seedVehicles[0]!;
    const ld = buildVehicleJsonLd(v, 'https://voltauto.biz');
    expect(ld.brand).toEqual({ '@type': 'Brand', name: v.brand });
    expect(ld.model).toBe(v.model);
    expect(ld.fuelType).toBe('Electric');
    expect(ld.vehicleEngine?.[0]?.fuelType).toBe('Electric');
    expect(ld.batteryCapacity).toEqual({
      '@type': 'QuantitativeValue',
      value: v.batteryKwh,
      unitCode: 'KWH',
    });
  });

  it('includes Offers with EGP price', () => {
    const v = seedVehicles[0]!;
    const ld = buildVehicleJsonLd(v, 'https://voltauto.biz');
    expect(ld.offers).toEqual({
      '@type': 'Offer',
      price: v.startingPriceEgp,
      priceCurrency: 'EGP',
      availability: 'https://schema.org/PreOrder',
      url: `https://voltauto.biz/vehicles/${v.slug}`,
    });
  });
});
