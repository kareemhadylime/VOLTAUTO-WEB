const formatterEgp = new Intl.NumberFormat('en-US', { maximumFractionDigits: 0 });
const formatterAed = new Intl.NumberFormat('en-US', { maximumFractionDigits: 0 });

interface CurrencyOptions {
  compact?: boolean;
}

export function formatEgp(amount: number, opts: CurrencyOptions = {}): string {
  if (opts.compact) return `EGP ${compact(amount)}`;
  return `EGP ${formatterEgp.format(amount)}`;
}

export function formatAed(amount: number, opts: CurrencyOptions = {}): string {
  if (opts.compact) return `AED ${compact(amount)}`;
  return `AED ${formatterAed.format(amount)}`;
}

export function formatKm(km: number): string {
  return `${km.toLocaleString('en-US')} km`;
}

export function formatKwh(kwh: number): string {
  if (kwh < 100 && !Number.isInteger(kwh)) {
    return `${kwh.toFixed(1)} kWh`;
  }
  return `${kwh} kWh`;
}

function compact(n: number): string {
  if (n >= 1_000_000) {
    const m = n / 1_000_000;
    const rounded = Math.floor(m * 10) / 10;
    return `${rounded === Math.floor(rounded) ? Math.floor(rounded) : rounded}M`;
  }
  if (n >= 1_000) return `${Math.round(n / 1_000)}K`;
  return String(n);
}
