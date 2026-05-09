// GA4 Consent Mode v2 — reads prior consent from localStorage at load time
window.dataLayer = window.dataLayer || [];
function gtag() { dataLayer.push(arguments); }
var stored = null;
try { stored = localStorage.getItem('voltauto-consent-v1'); } catch (e) {}
var level = stored === 'all' ? 'granted' : 'denied';
gtag('consent', 'default', {
  analytics_storage: level,
  ad_storage: level,
  ad_user_data: level,
  ad_personalization: level,
});
