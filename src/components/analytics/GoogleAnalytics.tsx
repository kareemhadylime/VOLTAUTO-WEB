'use client';

import Script from 'next/script';

const GA_ID = process.env.NEXT_PUBLIC_GA_ID;

export function GoogleAnalytics() {
  if (!GA_ID) return null;

  return (
    <>
      {/* Consent Mode v2 defaults must fire BEFORE the GA4 tag loads */}
      <Script id="ga4-consent-default" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          var _c = (typeof localStorage !== 'undefined' && localStorage.getItem('voltauto-consent-v1')) || 'denied';
          var _g = _c === 'all' ? 'granted' : 'denied';
          gtag('consent', 'default', {
            analytics_storage:  _g,
            ad_storage:         _g,
            ad_user_data:       _g,
            ad_personalization: _g,
          });
        `}
      </Script>

      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
        strategy="afterInteractive"
      />

      <Script id="ga4-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GA_ID}', { send_page_view: true });
        `}
      </Script>
    </>
  );
}
