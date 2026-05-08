import 'server-only';

export interface OcmConnection {
  PowerKW: number | null;
  ConnectionType: { Title: string } | null;
  Level: { Title: string } | null;
  Quantity: number | null;
}

export interface OcmPoi {
  ID: number;
  AddressInfo: {
    Title: string;
    AddressLine1: string | null;
    Town: string | null;
    StateOrProvince: string | null;
    Latitude: number;
    Longitude: number;
  };
  Connections: OcmConnection[] | null;
  StatusType: { IsOperational: boolean; Title: string } | null;
  NumberOfPoints: number | null;
  OperatorInfo: { Title: string } | null;
}

export const COUNTRY_CONFIG = {
  EG: { name: 'Egypt', center: [26.8206, 30.8025] as [number, number], zoom: 6, flag: '🇪🇬' },
  AE: { name: 'UAE',   center: [24.4539, 54.3773] as [number, number], zoom: 8, flag: '🇦🇪' },
} as const;

export type CountryCode = keyof typeof COUNTRY_CONFIG;

const OCM_BASE = 'https://api.openchargemap.io/v3/poi';

export async function fetchOcmPois(country: CountryCode): Promise<OcmPoi[]> {
  try {
    const url = `${OCM_BASE}/?output=json&countrycode=${country}&maxresults=200&compact=true&verbose=false`;
    const res = await fetch(url, {
      next: { revalidate: 3600 }, // cache 1 hour
      headers: { 'User-Agent': 'VoltAutoWebsite/1.0 (voltauto.biz)' },
    });
    if (!res.ok) return [];
    const data = await res.json();
    return Array.isArray(data) ? data : [];
  } catch {
    return [];
  }
}

export function ocmStats(pois: OcmPoi[]) {
  const operational = pois.filter(p => p.StatusType?.IsOperational !== false);
  const fastChargers = pois.filter(p =>
    p.Connections?.some(c => (c.PowerKW ?? 0) >= 50)
  );
  const totalPoints = pois.reduce((s, p) => s + (p.NumberOfPoints ?? 1), 0);
  return { total: pois.length, operational: operational.length, fast: fastChargers.length, points: totalPoints };
}
