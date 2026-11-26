/**
 * Confirmed client details from the brief. These seed the Contact / Branding globals (Phase 2);
 * components never read this file directly once the CMS is wired up.
 */
export const SITE_DEFAULTS = {
  companyName: { en: 'NR Property', bn: 'এন.আর প্রোপ্রাটি' },
  hotline: '01816-917164',
  whatsapp: '01816-917164',
  email: 'nrproperty2026@gmail.com',
  facebook: 'https://www.facebook.com/share/1KP1K6THLn/',
} as const
