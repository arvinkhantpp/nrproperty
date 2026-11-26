'use client'

import { useTranslations } from 'next-intl'
import { useState } from 'react'

import { Icon } from '@/components/ui'

function youtubeId(url: string) {
  const m = url.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|shorts\/))([\w-]{11})/)
  return m?.[1] ?? null
}

/** Click-to-load video: no third-party iframe (or cookies) until the visitor presses play. */
export function VideoEmbed({ url, title }: { url: string; title: string }) {
  const t = useTranslations('project')
  const [playing, setPlaying] = useState(false)
  const id = youtubeId(url)
  if (!id) {
    return (
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="flex aspect-video items-center justify-center gap-3 rounded-lg bg-ink font-semibold text-cream"
      >
        <Icon name="play" size={22} className="text-gold" />
        {title || t('watchVideo')}
      </a>
    )
  }
  return (
    <div className="relative aspect-video overflow-hidden rounded-lg bg-ink">
      {playing ? (
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0`}
          title={title || t('watchVideo')}
          allow="autoplay; encrypted-media; picture-in-picture"
          allowFullScreen
          className="absolute inset-0 size-full"
        />
      ) : (
        <button type="button" onClick={() => setPlaying(true)} className="group absolute inset-0" aria-label={`${t('watchVideo')}: ${title}`}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={`https://i.ytimg.com/vi/${id}/hqdefault.jpg`} alt="" loading="lazy" className="size-full object-cover opacity-80" />
          <span className="absolute inset-0 m-auto flex size-16 items-center justify-center rounded-full bg-gold text-ink transition-transform group-hover:scale-105">
            <Icon name="play" size={26} />
          </span>
          {title ? <span className="absolute bottom-4 left-4 rounded-full bg-black/50 px-3 py-1 text-small text-white">{title}</span> : null}
        </button>
      )}
    </div>
  )
}
