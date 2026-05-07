'use server';

import { headers } from 'next/headers';
import { contactSchema, TOPICS, type ContactFormValues } from '@/lib/schemas/contact';
import { getSupabaseServiceClient } from '@/lib/supabase/server';
import { verifyRecaptchaToken } from '@/lib/recaptcha';

export type SubmitContactError =
  | 'invalid_payload'
  | 'recaptcha_failed'
  | 'db_error'
  | 'network_error';

export interface SubmitContactResult {
  ok: boolean;
  error?: SubmitContactError;
  leadId?: number;
}

/**
 * Map the form's `topic` (UI-facing buckets) to the website_leads.form_type
 * (CHECK-constrained enum on the table). Press / Other / Importing-an-EV all
 * fall under generic 'contact'; the granular topic is preserved in payload_json.
 */
const FORM_TYPE_BY_TOPIC: Record<(typeof TOPICS)[number], string> = {
  importing_an_ev: 'contact',
  fleet: 'fleet_enquiry',
  service: 'service_booking',
  charger_install: 'charger_install',
  press: 'contact',
  other: 'contact',
};

export async function submitContact(values: ContactFormValues): Promise<SubmitContactResult> {
  // 1. Validate (defense in depth — client also validates with the same schema)
  const parsed = contactSchema.safeParse(values);
  if (!parsed.success) {
    return { ok: false, error: 'invalid_payload' };
  }

  // 2. reCAPTCHA verify (token may be absent in dev or if site key not configured)
  const recap = await verifyRecaptchaToken(
    parsed.data.recaptchaToken ?? '',
    'contact_submit',
  );
  if (!recap.valid) {
    return { ok: false, error: 'recaptcha_failed' };
  }

  // 3. Collect server-side request metadata
  const h = await headers();
  const userAgent = h.get('user-agent') ?? null;
  const ipCountry = h.get('x-vercel-ip-country') ?? null;
  const referrer = h.get('referer') ?? null;

  // 4. Build the RPC payload. We send a flat jsonb — the RPC reads each ->> path.
  // branch + locale are HARDCODED to 'eg' / 'en' for Phase 2 (Egypt-only, English-only
  // per spec §17). Phase 3 adds AR locale routing via next-intl and will thread locale
  // from the request URL. Phase 5 adds /uae/* and will thread branch='ae' from the
  // route segment. Until then the table's CHECK constraints (locale in en/ar/en-AE,
  // branch in eg/ae) accept the hardcoded values.
  const rpcPayload = {
    source: 'website',
    form_type: FORM_TYPE_BY_TOPIC[parsed.data.topic],
    branch: 'eg',
    locale: 'en',
    topic: parsed.data.topic, // preserved in payload_json for full segmentation
    name: parsed.data.name,
    email: parsed.data.email,
    phone: parsed.data.phone,
    vehicle_make: parsed.data.vehicleMake ?? null,
    vehicle_model: parsed.data.vehicleModel ?? null,
    message: parsed.data.message,
    consent_whatsapp_followup: parsed.data.consentWhatsApp,
    user_agent: userAgent,
    ip_country: ipCountry,
    referrer,
    recaptcha_score: recap.score.toFixed(2),
  };

  let supabase;
  try {
    supabase = getSupabaseServiceClient();
  } catch {
    return { ok: false, error: 'network_error' };
  }

  const { data, error } = await supabase.rpc('insert_website_lead', {
    payload: rpcPayload,
  });

  if (error) {
    console.error('[website-lead-rpc-error]', error.message, error.details);
    return { ok: false, error: 'db_error' };
  }

  // RPC returns the new bigserial id as a number. If it returned anything else
  // (null, undefined, non-numeric), treat as a DB protocol issue rather than success.
  if (typeof data !== 'number' || !Number.isFinite(data)) {
    console.error('[website-lead-rpc-return-malformed]', data);
    return { ok: false, error: 'db_error' };
  }

  return { ok: true, leadId: data };
}
