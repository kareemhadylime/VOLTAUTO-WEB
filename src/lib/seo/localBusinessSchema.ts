import { brand } from '@/lib/tokens';

interface BranchLd {
  '@type': 'AutoDealer';
  name: string;
  address: {
    '@type': 'PostalAddress';
    streetAddress: string;
    addressCountry: 'EG' | 'AE';
  };
  geo: { '@type': 'GeoCoordinates'; latitude: number; longitude: number };
  telephone?: string;
}

export interface LocalBusinessJsonLd {
  '@context': 'https://schema.org';
  '@type': 'AutoDealer';
  name: 'VoltAuto';
  url: string;
  parentOrganization: { '@type': 'Organization'; name: 'Lime Investments Holding' };
  subOrganization: BranchLd[];
}

export function buildLocalBusinessJsonLd(baseUrl: string): LocalBusinessJsonLd {
  return {
    '@context': 'https://schema.org',
    '@type': 'AutoDealer',
    name: 'VoltAuto',
    url: baseUrl,
    parentOrganization: { '@type': 'Organization', name: 'Lime Investments Holding' },
    subOrganization: [
      {
        '@type': 'AutoDealer',
        name: brand.showroom.cairo.name,
        address: {
          '@type': 'PostalAddress',
          streetAddress: brand.showroom.cairo.address,
          addressCountry: 'EG',
        },
        geo: {
          '@type': 'GeoCoordinates',
          latitude: brand.showroom.cairo.lat,
          longitude: brand.showroom.cairo.lng,
        },
        telephone: brand.whatsapp.egypt,
      },
      {
        '@type': 'AutoDealer',
        name: brand.showroom.dubai.name,
        address: {
          '@type': 'PostalAddress',
          streetAddress: brand.showroom.dubai.address,
          addressCountry: 'AE',
        },
        geo: {
          '@type': 'GeoCoordinates',
          latitude: brand.showroom.dubai.lat,
          longitude: brand.showroom.dubai.lng,
        },
      },
    ],
  };
}
