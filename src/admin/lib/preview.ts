import type { GeneratePreviewURL } from 'payload'

/** Admin "Preview" button URLs: open the draft on the website through /api/preview. */
export const previewUrl =
  (basePath: string): GeneratePreviewURL =>
  (doc, { locale }) => {
    const slug = typeof doc.slug === 'string' ? doc.slug : ''
    if (!slug) return null
    const prefix = locale && locale !== 'en' ? `/${locale}` : ''
    const tail = basePath === '' && slug === 'home' ? '' : `${basePath}/${slug}`
    return `/api/preview?path=${encodeURIComponent(`${prefix}${tail}` || '/')}`
  }
