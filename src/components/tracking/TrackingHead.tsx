import type { PublicTracking } from '@/lib/tracking/config'
import { CONSENT_COOKIE } from '@/lib/tracking/config'

/**
 * Inline, render-blocking bootstrap: defines dataLayer/gtag and sets Google Consent Mode v2
 * defaults *before* GTM or gtag load. Returning visitors who accepted start as "granted".
 */
export function TrackingHead({ config }: { config: PublicTracking }) {
  if (!config.gtmId && !config.ga4Id && !config.adsId && !config.pixelId && !config.clarityId) return null
  const js = `
window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}window.gtag=gtag;
var c=null;try{c=localStorage.getItem('${CONSENT_COOKIE}')}catch(e){}
var g=${config.consentRequired ? "c==='granted'" : "c!=='denied'"}?'granted':'denied';
window.__nrConsent=g;
gtag('consent','default',{ad_storage:g,ad_user_data:g,ad_personalization:g,analytics_storage:g,functionality_storage:'granted',security_storage:'granted',wait_for_update:500});
gtag('set','ads_data_redaction',g==='denied');
${
    config.pixelId
      ? // Meta Pixel queue stub (the library itself loads later); events queue until it arrives.
        `!function(f,n){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[]}(window);
fbq('consent',g==='granted'?'grant':'revoke');fbq('init','${config.pixelId}');fbq('track','PageView');`
      : ''
  }
`.trim()
  return <script id="nr-consent-default" dangerouslySetInnerHTML={{ __html: js }} />
}
