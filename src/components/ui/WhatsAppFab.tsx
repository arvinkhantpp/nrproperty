'use client'

import { useTranslations } from 'next-intl'

import { cn } from '@/lib/cn'

import { Icon } from './Icon'

type Props = {
  href: string
  onClick?: () => void
  /** Hide below lg when the sticky mobile bar already offers WhatsApp. */
  desktopOnly?: boolean
  className?: string
}

export function WhatsAppFab({ href, onClick, desktopOnly = true, className }: Props) {
  const t = useTranslations('common')
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onClick={onClick}
      aria-label={t('chatOnWhatsapp')}
      className={cn(
        'group fixed right-6 bottom-6 z-40 flex size-16 items-center justify-center rounded-full bg-whatsapp text-white shadow-float transition-transform duration-200 ease-out-soft hover:-translate-y-0.5',
        desktopOnly && 'hidden lg:flex',
        className,
      )}
    >
      <Icon name="whatsapp" size={28} />
      <span
        aria-hidden="true"
        className="pointer-events-none absolute right-[calc(100%+0.75rem)] rounded-full bg-ink px-4 py-2 text-sm font-semibold whitespace-nowrap text-cream opacity-0 shadow-card transition-opacity duration-200 group-hover:opacity-100 group-focus-visible:opacity-100"
      >
        {t('chatOnWhatsapp')}
      </span>
    </a>
  )
}
