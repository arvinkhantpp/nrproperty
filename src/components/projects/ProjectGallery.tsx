'use client'

import Image from 'next/image'
import { useTranslations } from 'next-intl'
import { useState } from 'react'

import { Lightbox, type LightboxImage } from '@/components/site/Lightbox'
import { Icon } from '@/components/ui'

/** Desktop: one large photo + two stacked (2fr/1fr). Phones: one tall photo. Any photo opens the lightbox. */
export function ProjectGallery({ images, name }: { images: LightboxImage[]; name: string }) {
  const t = useTranslations('gallery')
  const [index, setIndex] = useState<number | null>(null)
  const [first, second, third] = images
  if (!first) return null

  const tile = (img: LightboxImage, i: number, className: string, sizes: string, priority = false) => (
    <button
      type="button"
      onClick={() => setIndex(i)}
      aria-label={t('open', { n: i + 1 })}
      className={`group relative overflow-hidden bg-sand ${className}`}
    >
      <Image
        src={img.src}
        alt={img.alt || name}
        fill
        priority={priority}
        sizes={sizes}
        className="object-cover transition-transform duration-[900ms] ease-out-soft group-hover:scale-[1.03]"
      />
    </button>
  )

  return (
    <>
      <div className="relative grid h-[420px] grid-cols-1 gap-3 sm:h-[460px] lg:h-[520px] lg:grid-cols-[2fr_1fr]">
        {tile(first, 0, 'h-full w-full sm:rounded-lg', '(min-width: 1024px) 800px, 100vw', true)}
        {second ? (
          <div className="hidden grid-rows-2 gap-3 lg:grid">
            {tile(second, 1, 'h-full w-full rounded-lg', '400px')}
            {third ? tile(third, 2, 'h-full w-full rounded-lg', '400px') : <div className="rounded-lg bg-sand" />}
          </div>
        ) : null}
        {images.length > 1 ? (
          <button
            type="button"
            onClick={() => setIndex(0)}
            className="absolute right-4 bottom-10 inline-flex h-10 items-center gap-2 rounded-full bg-white/95 px-4 text-sm font-semibold text-ink shadow-card backdrop-blur hover:bg-white sm:bottom-4"
          >
            <Icon name="grid" size={16} />
            {t('viewAll', { count: images.length })}
          </button>
        ) : null}
      </div>
      <Lightbox images={images} index={index} onClose={() => setIndex(null)} onIndex={setIndex} />
    </>
  )
}
