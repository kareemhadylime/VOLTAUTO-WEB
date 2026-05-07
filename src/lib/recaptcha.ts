export interface RecaptchaResult {
  valid: boolean;
  score: number;
}

interface RecaptchaSiteVerifyResponse {
  success: boolean;
  score?: number;
  action?: string;
  challenge_ts?: string;
  hostname?: string;
  'error-codes'?: string[];
}

/**
 * Server-side reCAPTCHA v3 token verification.
 *
 * - Without RECAPTCHA_SECRET set → reCAPTCHA is treated as DISABLED (not failed).
 *   Returns valid=true with score=0. Match's the plan's "Phase 2 optional" contract.
 *   To enable real spam protection, set both NEXT_PUBLIC_RECAPTCHA_SITE_KEY (client)
 *   and RECAPTCHA_SECRET (server) and redeploy.
 * - With RECAPTCHA_SECRET set + a valid token from grecaptcha.execute → POSTs to
 *   Google's siteverify endpoint and returns the verdict (success && score>=0.5
 *   && action match if expectedAction provided).
 * - With RECAPTCHA_SECRET set but token empty/invalid OR Google rejects →
 *   returns valid=false. This is what enforces real spam protection once enabled.
 *
 * Pass `expectedAction` when the client called `grecaptcha.execute(siteKey, { action })`
 * with a specific action — Google verifies the submitted token was issued for that action.
 */
export async function verifyRecaptchaToken(
  token: string,
  expectedAction?: string,
): Promise<RecaptchaResult> {
  const secret = process.env.RECAPTCHA_SECRET;
  if (!secret) {
    // reCAPTCHA disabled (no secret configured). Plan-defined "optional" behavior.
    return { valid: true, score: 0 };
  }

  const params = new URLSearchParams();
  params.set('secret', secret);
  params.set('response', token);

  let res: Response;
  try {
    res = await fetch('https://www.google.com/recaptcha/api/siteverify', {
      method: 'POST',
      headers: { 'content-type': 'application/x-www-form-urlencoded' },
      body: params,
    });
  } catch {
    return { valid: false, score: 0 };
  }

  if (!res.ok) return { valid: false, score: 0 };

  let data: RecaptchaSiteVerifyResponse;
  try {
    data = (await res.json()) as RecaptchaSiteVerifyResponse;
  } catch {
    return { valid: false, score: 0 };
  }

  const score = typeof data.score === 'number' ? data.score : 0;
  const success = data.success === true;
  const scorePass = score >= 0.5;
  const actionPass = !expectedAction || data.action === expectedAction;

  return {
    valid: success && scorePass && actionPass,
    score,
  };
}
