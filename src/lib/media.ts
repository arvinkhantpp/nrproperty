import type { Media } from '@/payload-types'

const SITE = (process.env.NEXT_PUBLIC_SITE_URL || '').replace(/\/$/, '')

/** Payload prefixes local files with the site URL; next/image wants them relative (see localPatterns). */
export const relativeUrl = (url: string) => (SITE && url.startsWith(SITE) ? url.slice(SITE.length) || '/' : url)

export type ImageRef = { src: string; alt: string; width?: number; height?: number; focal?: string }

/** Normalises an upload field (populated doc, id or null) into something next/image can render. */
export function imageOf(m: number | Media | null | undefined, size?: 'thumb' | 'card' | 'wide'): ImageRef | null {
  if (!m || typeof m === 'number') return null
  const sized = size ? m.sizes?.[size] : undefined
  const raw = sized?.url || m.url
  if (!raw) return null
  const src = relativeUrl(raw)
  return {
    src,
    alt: m.alt ?? '',
    width: sized?.width ?? m.width ?? undefined,
    height: sized?.height ?? m.height ?? undefined,
    focal: m.focalX != null && m.focalY != null ? `${m.focalX}% ${m.focalY}%` : undefined,
  }
}

export const fileUrl = (m: number | Media | null | undefined) => (m && typeof m === 'object' && m.url ? relativeUrl(m.url) : null)
