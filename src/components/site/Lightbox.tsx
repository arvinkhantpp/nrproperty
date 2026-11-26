'use client'

import Image from 'next/image'
import { useTranslations } from 'next-intl'
import { useCallback, useEffect, useRef, useState } from 'react'

import { Icon } from '@/components/ui'

export type LightboxImage = { src: string; alt: string; full?: string }

type Props = {
  images: LightboxImage[]
  index: number | null
  onClose: () => void
  onIndex: (i: number) => void
}

/** Full-screen photo viewer on the native <dialog>: Esc closes, arrow keys and swipes move. */
export function Lightbox({ images, index, onClose, onIndex }: Props) {
  const t = useTranslations('gallery')
  const ref = useRef<HTMLDialogElement>(null)
  const touchX = useRef<number | null>(null)
  const open = index !== null
  const count = images.length

  const go = useCallback(
    (delta: number) => {
      if (index === null) return
      onIndex((index + delta + count) % count)
    },
    [index, count, onIndex],
  )

  useEffect(() => {
    const d = ref.current
    if (!d) return
    if (open && !d.open) d.showModal()
    if (!open && d.open) d.close()
  }, [open])

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') go(1)
      if (e.key === 'ArrowLeft') go(-1)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, go])

  const img = index !== null ? images[index] : undefined

  return (
    <dialog
      ref={ref}
      onClose={onClose}
      onCancel={onClose}
      aria-label={t('label')}
      className="m-0 h-dvh max-h-none w-screen max-w-none bg-ink/95 p-0 text-white backdrop:bg-black/60 open:flex open:flex-col"
      onTouchStart={(e) => (touchX.current = e.touches[0]?.clientX ?? null)}
      onTouchEnd={(e) => {
        const start = touchX.current
        const end = e.changedTouches[0]?.clientX
        if (start != null && end != null && Math.abs(end - start) > 50) go(end < start ? 1 : -1)
        touchX.current = null
      }}
    >
      <div className="flex h-16 shrink-0 items-center justify-between px-4 sm:px-6">
        <p className="text-small text-white/70" aria-live="polite">
          {index !== null ? t('counter', { current: index + 1, total: count }) : ''}
        </p>
        <button
          type="button"
          onClick={onClose}
          aria-label={t('close')}
          className="flex size-11 items-center justify-center rounded-full bg-white/10 hover:bg-white/20"
        >
          <Icon name="close" size={22} />
        </button>
      </div>
      <div className="relative min-h-0 flex-1">
        {img ? (
          <Image key={img.src} src={img.full ?? img.src} alt={img.alt} fill sizes="100vw" className="animate-fade-in object-contain" />
        ) : null}
        {count > 1 ? (
          <>
            <button
              type="button"
              onClick={() => go(-1)}
              aria-label={t('previous')}
              className="absolute top-1/2 left-3 flex size-12 -translate-y-1/2 items-center justify-center rounded-full bg-black/40 hover:bg-black/60 sm:left-6"
            >
              <Icon name="chevronLeft" size={24} />
            </button>
            <button
              type="button"
              onClick={() => go(1)}
              aria-label={t('next')}
              className="absolute top-1/2 right-3 flex size-12 -translate-y-1/2 items-center justify-center rounded-full bg-black/40 hover:bg-black/60 sm:right-6"
            >
              <Icon name="chevronRight" size={24} />
            </button>
          </>
        ) : null}
      </div>
      <div className="h-6 shrink-0" />
    </dialog>
  )
}

/** Grid of thumbnails that open the lightbox. */
export function GalleryGrid({ images, className }: { images: LightboxImage[]; className?: string }) {
  const t = useTranslations('gallery')
  const [index, setIndex] = useState<number | null>(null)
  return (
    <>
      <ul className={className ?? 'grid grid-cols-2 gap-3 md:grid-cols-3 lg:gap-4'}>
        {images.map((img, i) => (
          <li key={img.src + i}>
            <button
              type="button"
              onClick={() => setIndex(i)}
              aria-label={t('open', { n: i + 1 })}
              className="group relative block aspect-[4/3] w-full overflow-hidden rounded-md bg-sand"
            >
              <Image
                src={img.src}
                alt={img.alt}
                fill
                sizes="(min-width: 1024px) 400px, 50vw"
                className="object-cover transition-transform duration-700 ease-out-soft group-hover:scale-[1.04]"
              />
            </button>
          </li>
        ))}
      </ul>
      <Lightbox images={images} index={index} onClose={() => setIndex(null)} onIndex={setIndex} />
    </>
  )
}
