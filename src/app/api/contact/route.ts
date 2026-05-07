import { NextResponse } from 'next/server';
import { contactSchema } from '@/lib/schemas/contact';

export async function POST(request: Request) {
  const json = await request.json().catch(() => null);
  const parsed = contactSchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, error: 'invalid_payload', issues: parsed.error.flatten() },
      { status: 400 },
    );
  }
  // Phase 1: log only. Phase 2 inserts into Supabase website_leads via SECURITY DEFINER RPC.
  console.log('[website-lead]', { source: 'website', form_type: 'contact', ...parsed.data });
  return NextResponse.json({ ok: true });
}
