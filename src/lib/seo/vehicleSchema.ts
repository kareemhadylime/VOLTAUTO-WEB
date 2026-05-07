import type { Vehicle } from '@/types/vehicle';

export interface VehicleJsonLd {
  '@context': 'https://schema.org';
  '@type': 'Vehicle';
  brand: { '@type': 'Brand'; name: string };
  model: string;
  vehicleConfiguration?: string;
  fuelType: 'Electric';
  driveWheelConfiguration: string;
  vehicleEngine: { '@type': 'EngineSpecification'; fuelType: 'Electric'; enginePower: { '@type': 'QuantitativeValue'; value: number; unitCode: 'KWT' } }[];
  batteryCapacity: { '@type': 'QuantitativeValue'; value: number; unitCode: 'KWH' };
  fuelEfficiency?: { '@type': 'QuantitativeValue'; value: number; unitCode: 'KMT' };
  offers: {
    '@type': 'Offer';
    price: number;
    priceCurrency: 'EGP';
    availability: 'https://schema.org/PreOrder';
    url: string;
  };
}

const DRIVE_MAP: Record<Vehicle['drivetrain'], string> = {
  fwd: 'FrontWheelDriveConfiguration',
  rwd: 'RearWheelDriveConfiguration',
  awd: 'AllWheelDriveConfiguration',
};

export function buildVehicleJsonLd(v: Vehicle, baseUrl: string): VehicleJsonLd {
  return {
    '@context': 'https://schema.org',
    '@type': 'Vehicle',
    brand: { '@type': 'Brand', name: v.brand },
    model: v.model,
    vehicleConfiguration: v.trim,
    fuelType: 'Electric',
    driveWheelConfiguration: DRIVE_MAP[v.drivetrain],
    vehicleEngine: [
      {
        '@type': 'EngineSpecification',
        fuelType: 'Electric',
        enginePower: { '@type': 'QuantitativeValue', value: 0, unitCode: 'KWT' },
      },
    ],
    batteryCapacity: {
      '@type': 'QuantitativeValue',
      value: v.batteryKwh,
      unitCode: 'KWH',
    },
    offers: {
      '@type': 'Offer',
      price: v.startingPriceEgp,
      priceCurrency: 'EGP',
      availability: 'https://schema.org/PreOrder',
      url: `${baseUrl}/vehicles/${v.slug}`,
    },
  };
}
