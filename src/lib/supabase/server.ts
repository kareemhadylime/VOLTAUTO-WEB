import { createClient, type SupabaseClient } from '@supabase/supabase-js';

let cached: SupabaseClient | null = null;

/**
 * Returns a Supabase client authenticated with the service-role key.
 * MUST only be called from server-side code (Server Actions, route handlers, RSC).
 * Never import this from a 'use client' component — Next.js will throw at build time
 * because SUPABASE_SERVICE_ROLE_KEY isn't NEXT_PUBLIC_-prefixed.
 */
export function getSupabaseServiceClient(): SupabaseClient {
  if (cached) return cached;

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url) throw new Error('NEXT_PUBLIC_SUPABASE_URL is not set');
  if (!key) throw new Error('SUPABASE_SERVICE_ROLE_KEY is not set');

  cached = createClient(url, key, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
      detectSessionInUrl: false,
    },
    global: {
      headers: { 'x-client-info': 'voltauto-website' },
    },
  });

  return cached;
}
