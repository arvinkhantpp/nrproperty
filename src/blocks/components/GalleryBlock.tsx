import { GalleryGrid } from '@/components/site/Lightbox'
import { SectionHeader } from '@/components/ui'
import { imageOf } from '@/lib/media'
import { withAccent } from '@/lib/text'

import { Section, toneOf } from './Section'
import type { BlockOf } from './types'

export function GalleryBlock({ data }: { data: BlockOf<'gallery'> }) {
  const tone = toneOf(data.background)
  const images = (data.images ?? [])
    .map((m) => {
      const thumb = imageOf(m, 'card')
      const full = imageOf(m, 'wide')
      return thumb ? { src: thumb.src, alt: thumb.alt, full: full?.src } : null
    })
    .filter((x): x is NonNullable<typeof x> => Boolean(x))
  if (!images.length) return null
  return (
    <Section background={data.background} anchorId={data.anchorId}>
      {data.title ? (
        <SectionHeader eyebrow={data.eyebrow} title={withAccent(data.title, tone)} description={data.description} tone={tone} className="mb-10 lg:mb-14" />
      ) : null}
      <GalleryGrid images={images} />
    </Section>
  )
}
