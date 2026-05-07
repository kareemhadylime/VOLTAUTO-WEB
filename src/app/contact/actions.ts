'use server';

import { headers } from 'next/headers';
import { contactSchema, type ContactFormValues } from '@/lib/schemas/contact';
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
  const rpcPayload = {
    source: 'website',
    form_type: 'contact',
    branch: 'eg',
    locale: 'en',
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

  return { ok: true, leadId: typeof data === 'number' ? data : Number(data) };
}
