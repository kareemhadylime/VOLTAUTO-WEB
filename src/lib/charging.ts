import 'server-only';
import type { OcmPoi, CountryCode } from './charging-shared';

// Re-export shared types/constants so page.tsx can use a single import
export type { OcmConnection, OcmPoi, CountryCode } from './charging-shared';
export { COUNTRY_CONFIG, ocmStats } from './charging-shared';

const OCM_BASE = 'https://api.openchargemap.io/v3/poi';

export async function fetchOcmPois(country: CountryCode): Promise<OcmPoi[]> {
  try {
    const url = `${OCM_BASE}/?output=json&countrycode=${country}&maxresults=200&compact=true&verbose=false`;
    const res = await fetch(url, {
      next: { revalidate: 3600 },
      headers: { 'User-Agent': 'VoltAutoWebsite/1.0 (voltauto.biz)' },
    });
    if (!res.ok) return [];
    const data = await res.json();
    return Array.isArray(data) ? data : [];
  } catch {
    return [];
  }
}
