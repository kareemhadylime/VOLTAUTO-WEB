import 'server-only';
import { createClient } from '@supabase/supabase-js';

export interface UaeVehicle {
  id: number;
  slug: string;
  manufacturer: string;
  model: string;
  trim: string | null;
  model_ar: string | null;
  hero_image_url: string | null;
  photo_url: string | null;
  body_type: string | null;
  drivetrain: string | null;
  range_km: number | null;
  battery_kwh: number | null;
  starting_price_aed: number | null;
  starting_price_egp: number | null;
  eta_weeks: number | null;
  status: string | null;
  delivery_branch: string | null;
  colors: string[] | null;
  is_featured: boolean | null;
}

let cachedClient: ReturnType<typeof createClient> | null = null;

function getAnonClient() {
  if (cachedClient) return cachedClient;
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) return null;
  cachedClient = createClient(url, key, {
    auth: { persistSession: false, autoRefreshToken: false, detectSessionInUrl: false },
    global: { headers: { 'x-client-info': 'voltauto-website-uae' } },
  });
  return cachedClient;
}

export async function getUAEVehicles(): Promise<UaeVehicle[]> {
  const client = getAnonClient();
  if (!client) return [];
  const { data, error } = await client
    .from('public_inventory')
    .select(
      'id,slug,manufacturer,model,trim,model_ar,hero_image_url,photo_url,body_type,drivetrain,range_km,battery_kwh,starting_price_aed,starting_price_egp,eta_weeks,status,delivery_branch,colors,is_featured'
    )
    .in('delivery_branch', ['ae', 'both'])
    .order('is_featured', { ascending: false })
    .order('starting_price_aed', { ascending: true });
  if (error || !data) return [];
  return data as UaeVehicle[];
}

export function formatAed(aed: number | null): string {
  if (!aed) return 'Price on request';
  return `AED ${new Intl.NumberFormat('en-AE').format(Math.round(aed))}`;
}
