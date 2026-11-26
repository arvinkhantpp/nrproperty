import type { ServerProps } from 'payload'

import type { Media } from '@/payload-types'

/** Uploaded logo from the Branding global, or null while the placeholder is in use. */
async function brandingLogo(payload: ServerProps['payload'], field: 'logoDark' | 'favicon') {
  try {
    const b = await payload.findGlobal({ slug: 'branding', depth: 1 })
    const m = b?.[field] as Media | number | null | undefined
    return typeof m === 'object' && m?.url ? m.url.replace(/^https?:\/\/[^/]+/, '') : null
  } catch {
    return null
  }
}

/** Admin login logo: the Branding global's "logo for light backgrounds", else the NR placeholder. */
export async function Logo({ payload }: ServerProps) {
  const src = payload ? await brandingLogo(payload, 'logoDark') : null
  if (src)
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={src} alt="NR Property Admin" style={{ maxHeight: 56, maxWidth: 240, objectFit: 'contain' }} />
  return (
    <span className="nr-brand">
      <span className="nr-brand__mark" aria-hidden="true">
        NR
      </span>
      <span className="nr-brand__text">
        <strong>NR PROPERTY</strong>
        <span>Admin</span>
      </span>
    </span>
  )
}

/** Small nav icon: the Branding favicon when uploaded, else the NR monogram. */
export async function Icon({ payload }: ServerProps) {
  const src = payload ? await brandingLogo(payload, 'favicon') : null
  if (src)
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={src} alt="NR Property" width={22} height={22} style={{ borderRadius: 6 }} />
  return (
    <span className="nr-brand__mark nr-brand__mark--sm" aria-label="NR Property">
      NR
    </span>
  )
}
