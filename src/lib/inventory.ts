import 'server-only';
import { createClient } from '@supabase/supabase-js';
import type { Vehicle, VehicleStatus } from '@/types/vehicle';
import { seedVehicles } from '@/lib/seed/vehicles';

/**
 * Inventory loader — reads from the `public_inventory` Supabase view (added by
 * migration 20260508_website_public_views) and falls back to seedVehicles
 * whenever the view returns 0 rows OR Supabase env vars aren't configured. This
 * keeps the marketing site renderable in three modes:
 *
 *   1. Local dev / preview without env → pure seed (Phase 1 of the spec).
 *   2. Production with env but nothing yet `is_publishable=true` → seed.
 *   3. Production with publishable rows → live data, seed used only to fill any
 *      slug not present in the live set (so we don't suddenly drop a vehicle
 *      page mid-campaign while an admin migrates a row).
 *
 * The view never exposes pricing FOB / shipping / cost basis — only the
 * manually-set `starting_price_egp` column an admin populated through the CRM
 * "🌐 Website Publishing" block. That guarantees no internal numbers reach anon.
 *
 * All callers are Server Components / route handlers — never client.
 */

type PublicInventoryRow = {
  id: number;
  slug: string;
  brand: string | null;
  model: string | null;
  trim: string | null;
  power_type: string | null;
  body_type: string | null;
  drivetrain: string | null;
  range_km: number | null;
  range_standard: string | null;
  battery_kwh: number | null;
  dc_charge_kw: number | null;
  ac_charge_kw: number | null;
  starting_price_egp: number | null;
  starting_price_aed: number | null;
  eta_weeks: number | null;
  status: string | null;
  is_featured: boolean | null;
  featured_week: number | null;
  featured_order: number | null;
  country_of_origin: string | null;
  delivery_branch: string | null;
  hero_image_url: string | null;
  gallery_image_urls: string[] | null;
  spec_sheet_url: string | null;
  description: string | null;
  description_ar: string | null;
  model_ar: string | null;
  exterior_colors: string[] | null;
  interior_colors: string[] | null;
};

let cachedClient: ReturnType<typeof createClient> | null = null;

function getAnonClient() {
  if (cachedClient) return cachedClient;
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) return null;
  cachedClient = createClient(url, key, {
    auth: { persistSession: false, autoRefreshToken: false, detectSessionInUrl: false },
    global: { headers: { 'x-client-info': 'voltauto-website-inventory' } },
  });
  return cachedClient;
}

function coerceStatus(s: string | null | undefined): VehicleStatus {
  if (s === 'currently_advertising' || s === 'recently_delivered' || s === 'catalog_only') return s;
  return 'catalog_only';
}

function coerceBody(s: string | null | undefined): Vehicle['bodyType'] {
  if (s === 'sedan' || s === 'suv' || s === 'hatchback' || s === 'mpv' || s === 'pickup') return s;
  return 'suv';
}

function coerceDrive(s: string | null | undefined): Vehicle['drivetrain'] {
  if (s === 'fwd' || s === 'rwd' || s === 'awd') return s;
  return 'fwd';
}

function coerceRangeStd(s: string | null | undefined): Vehicle['rangeStandard'] {
  if (s === 'WLTP' || s === 'CLTC' || s === 'EPA') return s;
  return 'CLTC';
}

function coerceBranch(s: string | null | undefined): Vehicle['deliveryBranch'] {
  if (s === 'ae') return 'AE';
  return 'EG';
}

function rowToVehicle(r: PublicInventoryRow, fallback?: Vehicle): Vehicle {
  const brand = r.brand ?? fallback?.brand ?? 'Unknown';
  const model = r.model ?? fallback?.model ?? 'Unknown';
  return {
    slug: r.slug,
    brand,
    model,
    trim: r.trim ?? fallback?.trim,
    bodyType: coerceBody(r.body_type ?? fallback?.bodyType),
    drivetrain: coerceDrive(r.drivetrain ?? fallback?.drivetrain),
    rangeKm: r.range_km ?? fallback?.rangeKm ?? 0,
    rangeStandard: coerceRangeStd(r.range_standard ?? fallback?.rangeStandard),
    batteryKwh: r.battery_kwh ?? fallback?.batteryKwh ?? 0,
    dcChargeKw: r.dc_charge_kw ?? fallback?.dcChargeKw ?? 0,
    acChargeKw: r.ac_charge_kw ?? fallback?.acChargeKw ?? 0,
    startingPriceEgp: r.starting_price_egp ?? fallback?.startingPriceEgp ?? 0,
    etaWeeks: r.eta_weeks ?? fallback?.etaWeeks ?? 0,
    status: coerceStatus(r.status ?? fallback?.status),
    isFeatured: !!r.is_featured,
    featuredWeek: r.featured_week ?? fallback?.featuredWeek,
    heroImageUrl: r.hero_image_url || fallback?.heroImageUrl || '/images/seed/placeholder-hero.jpg',
    galleryImageUrls: r.gallery_image_urls?.length ? r.gallery_image_urls : (fallback?.galleryImageUrls ?? []),
    specs: fallback?.specs ?? [],
    features: fallback?.features ?? { adas: [], comfort: [], tech: [] },
    countryOfOrigin: 'CN',
    deliveryBranch: coerceBranch(r.delivery_branch ?? fallback?.deliveryBranch),
  };
}

let cachedAll: Vehicle[] | null = null;
let cachedAt = 0;
const CACHE_TTL_MS = 60_000; // 60s — pages also use ISR; cache is just within a request burst.

export async function getAllVehicles(): Promise<Vehicle[]> {
  const now = Date.now();
  if (cachedAll && now - cachedAt < CACHE_TTL_MS) return cachedAll;

  const client = getAnonClient();
  if (!client) {
    cachedAll = seedVehicles;
    cachedAt = now;
    return seedVehicles;
  }

  try {
    const { data, error } = await client
      .from('public_inventory')
      .select('*')
      .order('featured_order', { ascending: true, nullsFirst: false })
      .limit(200);

    if (error || !data || data.length === 0) {
      cachedAll = seedVehicles;
      cachedAt = now;
      return seedVehicles;
    }

    // Merge: live rows override seed by slug; seed-only slugs are kept so the
    // catalog stays populated while admins are still flipping is_publishable.
    const seedBySlug = new Map(seedVehicles.map((v) => [v.slug, v]));
    const liveBySlug = new Map<string, Vehicle>();
    (data as unknown as PublicInventoryRow[]).forEach((r) => {
      const fallback = seedBySlug.get(r.slug);
      liveBySlug.set(r.slug, rowToVehicle(r, fallback));
    });

    const merged: Vehicle[] = [];
    liveBySlug.forEach((v) => merged.push(v));
    seedBySlug.forEach((v, slug) => {
      if (!liveBySlug.has(slug)) merged.push(v);
    });

    cachedAll = merged;
    cachedAt = now;
    return merged;
  } catch {
    cachedAll = seedVehicles;
    cachedAt = now;
    return seedVehicles;
  }
}

export async function getVehicleBySlug(slug: string): Promise<Vehicle | null> {
  const all = await getAllVehicles();
  return all.find((v) => v.slug === slug) ?? null;
}

export async function getFeaturedVehicles(): Promise<Vehicle[]> {
  const all = await getAllVehicles();
  return all
    .filter((v) => v.isFeatured)
    .sort((a, b) => (a.featuredWeek ?? 0) - (b.featuredWeek ?? 0));
}
