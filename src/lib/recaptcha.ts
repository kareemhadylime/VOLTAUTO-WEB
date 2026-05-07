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
 * - In production WITHOUT a secret env var → returns valid=false, score=0
 *   (so we never silently let unverified traffic through).
 * - In non-production WITHOUT a secret → returns valid=true, score=0.5
 *   (dev convenience; lets local form submission work without keys).
 * - With a secret + token → POSTs to Google, returns Google's verdict.
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
    if (process.env.NODE_ENV === 'production') {
      return { valid: false, score: 0 };
    }
    return { valid: true, score: 0.5 };
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
