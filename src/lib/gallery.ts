import 'server-only';
import { createClient } from '@supabase/supabase-js';

export interface PublicGalleryItem {
  id: number;
  image_url: string;
  thumbnail_url: string | null;
  category: string;
  caption_en: string | null;
  caption_ar: string | null;
  aspect_ratio: string | null;
  is_video: boolean;
  duration_sec: number | null;
  width: number | null;
  height: number | null;
  car_slug: string | null;
  car_name: string | null;
  car_cover_url: string | null;
  featured_order: number;
  taken_at: string | null;
  classified_at: string | null;
}

let cachedClient: ReturnType<typeof createClient> | null = null;

function getAnonClient() {
  if (cachedClient) return cachedClient;
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) return null;
  cachedClient = createClient(url, key, {
    auth: { persistSession: false, autoRefreshToken: false, detectSessionInUrl: false },
    global: { headers: { 'x-client-info': 'voltauto-website-gallery' } },
  });
  return cachedClient;
}

export async function getPublicGallery(): Promise<PublicGalleryItem[]> {
  const client = getAnonClient();
  if (!client) return [];
  const { data, error } = await client
    .from('public_gallery')
    .select('*')
    .order('featured_order', { ascending: true })
    .order('classified_at', { ascending: false });
  if (error || !data || data.length === 0) return [];
  return data as PublicGalleryItem[];
}
