// Client-side analytics helpers — consent management + event tracking
// Safe to import in client components; all calls are no-ops if scripts haven't loaded.

// ── Global type augmentation ────────────────────────────────────────────────
declare global {
  interface Window {
    gtag: (...args: unknown[]) => void;
    dataLayer: unknown[];
    fbq: ((...args: unknown[]) => void) & { callMethod?: unknown; queue: unknown[] };
    ttq: {
      page: () => void;
      track: (event: string, params?: Record<string, unknown>) => void;
      grantConsent: () => void;
      revokeConsent: () => void;
      holdConsent: () => void;
    };
  }
}

export type ConsentLevel = 'all' | 'essential';

// ── Consent update ──────────────────────────────────────────────────────────
// Call on banner decision AND on page load (to restore prior consent from localStorage).
export function grantConsent(level: ConsentLevel) {
  if (typeof window === 'undefined') return;
  const granted = level === 'all';

  // GA4 Consent Mode v2
  if (typeof window.gtag === 'function') {
    window.gtag('consent', 'update', {
      analytics_storage:   granted ? 'granted' : 'denied',
      ad_storage:          granted ? 'granted' : 'denied',
      ad_user_data:        granted ? 'granted' : 'denied',
      ad_personalization:  granted ? 'granted' : 'denied',
    });
  }

  // Meta Pixel
  if (typeof window.fbq === 'function') {
    window.fbq('consent', granted ? 'grant' : 'revoke');
  }

  // TikTok Pixel
  if (window.ttq) {
    if (granted) window.ttq.grantConsent();
    else window.ttq.revokeConsent();
  }
}

// ── Event tracking ──────────────────────────────────────────────────────────
// Maps our internal event names to platform-specific equivalents.
const META_EVENT_MAP: Record<string, string> = {
  vehicle_view:     'ViewContent',
  whatsapp_click:   'Contact',
  calculator_lead:  'Lead',
  fleet_lead:       'Lead',
  contact_submit:   'Contact',
  import_enquiry:   'Lead',
};

const TIKTOK_EVENT_MAP: Record<string, string> = {
  vehicle_view:     'ViewContent',
  whatsapp_click:   'Contact',
  calculator_lead:  'SubmitForm',
  fleet_lead:       'SubmitForm',
  contact_submit:   'Contact',
};

export function trackEvent(name: string, params?: Record<string, unknown>) {
  if (typeof window === 'undefined') return;

  // GA4
  if (typeof window.gtag === 'function') {
    window.gtag('event', name, params);
  }

  // Meta Pixel
  if (typeof window.fbq === 'function') {
    const fbEvent = META_EVENT_MAP[name];
    if (fbEvent) window.fbq('track', fbEvent, params);
  }

  // TikTok
  if (window.ttq) {
    const ttEvent = TIKTOK_EVENT_MAP[name];
    if (ttEvent) window.ttq.track(ttEvent, params);
  }
}
