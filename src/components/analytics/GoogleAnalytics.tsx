'use client';

import Script from 'next/script';

const GA_ID = process.env.NEXT_PUBLIC_GA_ID;

export function GoogleAnalytics() {
  if (!GA_ID) return null;

  return (
    <>
      {/* Consent default loaded from public file — avoids inline script encoding issues */}
      <Script src="/ga4-consent.js" strategy="afterInteractive" />

      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
        strategy="afterInteractive"
      />

      <Script src="/ga4-init.js" strategy="afterInteractive" />
    </>
  );
}