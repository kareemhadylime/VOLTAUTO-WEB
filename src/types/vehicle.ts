export type VehicleStatus = 'currently_advertising' | 'recently_delivered' | 'catalog_only';

export interface Vehicle {
  slug: string;
  brand: string;
  model: string;
  trim?: string;
  bodyType: 'sedan' | 'suv' | 'hatchback' | 'mpv' | 'pickup';
  drivetrain: 'fwd' | 'rwd' | 'awd';
  rangeKm: number;
  rangeStandard: 'WLTP' | 'CLTC' | 'EPA';
  batteryKwh: number;
  dcChargeKw: number;
  acChargeKw: number;
  startingPriceEgp: number;
  etaWeeks: number;
  status: VehicleStatus;
  isFeatured: boolean;
  featuredWeek?: number;
  heroImageUrl: string;
  galleryImageUrls: string[];
  specs: VehicleSpec[];
  features: { adas: string[]; comfort: string[]; tech: string[] };
  countryOfOrigin: 'CN';
  deliveryBranch: 'EG' | 'AE';
}

export interface VehicleSpec {
  label: string;
  value: string;
}

export interface BrandCard {
  name: string;
  models: string[];
  cluster: 'chinese-oem' | 'china-built-legacy';
}
