import type { ProjectCardProps, ProjectStatus } from '@/components/ui'
import type { Project } from '@/payload-types'

import { formatPriceShort, formatSizeRange } from './format'
import { imageOf } from './media'

export const PLACEHOLDER_IMAGE = { src: '/images/placeholder/project-white.jpg', alt: '' }

export const areaName = (p: Project) => (p.area && typeof p.area === 'object' ? (p.area.name ?? '') : '')

/** e.g. "3–4 Beds · 1,850–2,450 sft" */
export function projectMeta(p: Project, bedsLabel: string) {
  const parts: string[] = []
  if (p.facts?.bedrooms) parts.push(`${p.facts.bedrooms} ${bedsLabel}`)
  const size = formatSizeRange(p.facts?.sizeMinSft, p.facts?.sizeMaxSft)
  if (size) parts.push(size)
  return parts.join(' · ')
}

export function toCardProps(p: Project, labels: { beds: string; city: string }): ProjectCardProps {
  const cover = Array.isArray(p.gallery) ? p.gallery[0] : undefined
  const img = imageOf(typeof cover === 'object' ? cover : null, 'card')
  return {
    href: `/projects/${p.slug}`,
    name: p.name ?? '',
    location: [areaName(p), labels.city].filter(Boolean).join(', '),
    status: (p.status ?? 'ongoing') as ProjectStatus,
    image: img ? { src: img.src, alt: img.alt || p.name || '' } : { ...PLACEHOLDER_IMAGE, alt: p.name ?? '' },
    meta: projectMeta(p, labels.beds),
    price: p.showPrice ? formatPriceShort(p.startingPrice) : null,
  }
}
