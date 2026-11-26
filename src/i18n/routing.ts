import { defineRouting } from 'next-intl/routing'

export const routing = defineRouting({
  locales: ['en', 'bn'],
  defaultLocale: 'en',
  // English lives at "/", Bangla at "/bn".
  localePrefix: 'as-needed',
  // Visitors from ads must land on exactly the URL in the ad, so never auto-redirect by browser language.
  localeDetection: false,
})

export type Locale = (typeof routing.locales)[number]
