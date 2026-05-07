import { describe, it, expect } from 'vitest';
import { formatEgp, formatAed, formatKm, formatKwh } from '@/lib/format';

describe('format', () => {
  it('formats EGP with thousands separators', () => {
    expect(formatEgp(4250000)).toBe('EGP 4,250,000');
    expect(formatEgp(1100000)).toBe('EGP 1,100,000');
  });

  it('formats EGP in compact mode (M / K)', () => {
    expect(formatEgp(4250000, { compact: true })).toBe('EGP 4.2M');
    expect(formatEgp(950000, { compact: true })).toBe('EGP 950K');
  });

  it('formats AED', () => {
    expect(formatAed(1158000)).toBe('AED 1,158,000');
  });

  it('formats km with thousands separator', () => {
    expect(formatKm(146000)).toBe('146,000 km');
    expect(formatKm(590)).toBe('590 km');
  });

  it('formats kWh with one decimal when under 100', () => {
    expect(formatKwh(58.8)).toBe('58.8 kWh');
    expect(formatKwh(96)).toBe('96 kWh');
  });
});
