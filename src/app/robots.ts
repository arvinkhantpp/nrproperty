import type { MetadataRoute } from 'next'

import { SITE_URL, siteNoIndex } from '@/lib/metadata'

/**
 * Production allows crawling except private areas. Vercel preview deployments (and any build with
 * SITE_NOINDEX=1) block everything so staging copies never show up in Google.
 */
export default function robots(): MetadataRoute.Robots {
  if (siteNoIndex()) return { rules: { userAgent: '*', disallow: '/' } }
  return {
    rules: { userAgent: '*', allow: '/', disallow: ['/admin', '/api/', '/thank-you', '/bn/thank-you', '/styleguide', '/bn/styleguide'] },
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  }
}
