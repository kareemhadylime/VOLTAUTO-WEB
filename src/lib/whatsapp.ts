export interface WhatsAppLinkOptions {
  /** International format, accepts spaces and `+` (stripped). */
  phone: string;
  /** Pre-filled message body. UTF-8 safe. */
  message?: string;
  /** Convenience: slug of a vehicle to embed in the default-message. */
  vehicleSlug?: string;
}

const DIGIT_ONLY = /^\d+$/;

export function buildWhatsAppLink({ phone, message, vehicleSlug }: WhatsAppLinkOptions): string {
  const stripped = phone.replace(/[+\s\-()]/g, '');
  if (!DIGIT_ONLY.test(stripped)) {
    throw new Error(`buildWhatsAppLink: phone "${phone}" is not E.164 (digits only after stripping)`);
  }

  let body = message;
  if (!body && vehicleSlug) {
    body = `Hi VoltAuto — I'm interested in ${vehicleSlug}.`;
  }

  if (!body) {
    return `https://wa.me/${stripped}`;
  }
  return `https://wa.me/${stripped}?text=${encodeURIComponent(body).replace(/'/g, '%27')}`;
}
