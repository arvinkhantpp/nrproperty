import Image from 'next/image'

import { Icon, SectionHeader } from '@/components/ui'
import type { Locale } from '@/i18n/routing'
import { cn } from '@/lib/cn'
import { getTestimonials } from '@/lib/cms'
import { imageOf } from '@/lib/media'
import { withAccent } from '@/lib/text'

import { Section, toneOf } from './Section'
import type { BlockOf } from './types'

export async function TestimonialsBlock({ data, locale }: { data: BlockOf<'testimonials'>; locale: Locale }) {
  const items = await getTestimonials(locale, data.filter ?? 'all', data.limit ?? 3)
  if (!items.length) return null
  const tone = toneOf(data.background)
  const dark = tone !== 'light'
  return (
    <Section background={data.background} anchorId={data.anchorId}>
      <SectionHeader eyebrow={data.eyebrow} title={withAccent(data.title, tone)} description={data.description} tone={tone} />
      <ul className="mt-10 grid gap-5 md:grid-cols-2 lg:mt-14 lg:grid-cols-3 lg:gap-6">
        {items.map((it) => {
          const photo = imageOf(it.photo, 'thumb')
          const project = it.project && typeof it.project === 'object' ? it.project.name : null
          return (
            <li key={it.id}>
              <figure className={cn('flex h-full flex-col gap-6 rounded-lg p-7 lg:p-8', dark ? 'bg-white/[0.06]' : 'bg-white')}>
                <Icon name="quote" size={28} className={dark ? 'text-gold-light' : 'text-gold'} aria-hidden="true" />
                <blockquote className={cn('flex-1 font-display text-[1.375rem] leading-snug', dark ? 'text-cream' : 'text-ink')}>
                  {it.quote}
                </blockquote>
                <figcaption className={cn('flex items-center gap-3 border-t pt-5', dark ? 'border-white/10' : 'border-line')}>
                  {photo ? (
                    <Image src={photo.src} alt="" width={48} height={48} className="size-12 rounded-full object-cover" />
                  ) : (
                    <span
                      aria-hidden="true"
                      className={cn(
                        'flex size-12 items-center justify-center rounded-full font-display text-xl',
                        dark ? 'bg-white/10 text-gold-light' : 'bg-gold-soft text-forest',
                      )}
                    >
                      {(it.name ?? '?').charAt(0)}
                    </span>
                  )}
                  <span className="flex flex-col">
                    <span className={cn('font-semibold', dark ? 'text-cream' : 'text-ink')}>{it.name}</span>
                    <span className={cn('text-small', dark ? 'text-cream/65' : 'text-muted')}>
                      {[it.role, project].filter(Boolean).join(' · ')}
                    </span>
                  </span>
                </figcaption>
              </figure>
            </li>
          )
        })}
      </ul>
    </Section>
  )
}
