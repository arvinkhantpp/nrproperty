'use client'

import { useTranslations } from 'next-intl'
import { useState } from 'react'

import { Icon } from '@/components/ui'

/** WhatsApp, Facebook and copy-link for an article. `url` is absolute. */
export function ShareButtons({ url, title }: { url: string; title: string }) {
  const t = useTranslations('blog')
  const [copied, setCopied] = useState(false)
  const cls =
    'flex size-11 items-center justify-center rounded-full border border-line bg-white text-ink transition-colors hover:border-ink'
  return (
    <div className="flex items-center gap-2">
      <span className="mr-1 text-small font-semibold text-muted">{t('share')}</span>
      <a
        href={`https://wa.me/?text=${encodeURIComponent(`${title} ${url}`)}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={t('shareWhatsapp')}
        className={cls}
      >
        <Icon name="whatsapp" size={18} />
      </a>
      <a
        href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={t('shareFacebook')}
        className={cls}
      >
        <Icon name="facebook" size={18} />
      </a>
      <button
        type="button"
        className={cls}
        aria-label={copied ? t('copied') : t('copyLink')}
        onClick={() => {
          void navigator.clipboard?.writeText(url).then(() => {
            setCopied(true)
            setTimeout(() => setCopied(false), 2000)
          })
        }}
      >
        <Icon name={copied ? 'check' : 'link'} size={18} />
      </button>
      <span aria-live="polite" className="sr-only">
        {copied ? t('copied') : ''}
      </span>
    </div>
  )
}
