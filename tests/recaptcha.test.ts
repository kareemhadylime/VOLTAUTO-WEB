import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { verifyRecaptchaToken } from '@/lib/recaptcha';

const ORIG_FETCH = globalThis.fetch;

describe('verifyRecaptchaToken', () => {
  beforeEach(() => {
    vi.stubEnv('RECAPTCHA_SECRET', 'test-secret');
  });
  afterEach(() => {
    vi.unstubAllEnvs();
    globalThis.fetch = ORIG_FETCH;
  });

  it('returns valid=true and the score when Google says success', async () => {
    globalThis.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ success: true, score: 0.9, action: 'contact_submit' }),
    }) as unknown as typeof fetch;

    const r = await verifyRecaptchaToken('any-token', 'contact_submit');
    expect(r).toEqual({ valid: true, score: 0.9 });
  });

  it('returns valid=false when score is below 0.5', async () => {
    globalThis.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ success: true, score: 0.3, action: 'contact_submit' }),
    }) as unknown as typeof fetch;

    const r = await verifyRecaptchaToken('any-token', 'contact_submit');
    expect(r).toEqual({ valid: false, score: 0.3 });
  });

  it('returns valid=false when action mismatch', async () => {
    globalThis.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ success: true, score: 0.9, action: 'something_else' }),
    }) as unknown as typeof fetch;

    const r = await verifyRecaptchaToken('any-token', 'contact_submit');
    expect(r.valid).toBe(false);
  });

  it('treats reCAPTCHA as disabled (valid=true, score=0) when RECAPTCHA_SECRET is unset, in either environment', async () => {
    // Test in dev
    vi.unstubAllEnvs();
    vi.stubEnv('NODE_ENV', 'development');
    let r = await verifyRecaptchaToken('any-token');
    expect(r).toEqual({ valid: true, score: 0 });

    // And in production — same behavior per Phase 2 optional contract
    vi.unstubAllEnvs();
    vi.stubEnv('NODE_ENV', 'production');
    r = await verifyRecaptchaToken('any-token');
    expect(r).toEqual({ valid: true, score: 0 });
  });

  it('returns valid=false when Google verify fetch fails (network error)', async () => {
    globalThis.fetch = vi.fn().mockRejectedValue(new Error('network down')) as unknown as typeof fetch;
    const r = await verifyRecaptchaToken('any-token');
    expect(r).toEqual({ valid: false, score: 0 });
  });
});
