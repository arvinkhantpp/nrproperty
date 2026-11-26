'use client'

import { useTranslations } from 'next-intl'

import { cn } from '@/lib/cn'

import { Icon } from './Icon'

type Props = {
  phoneHref: string
  whatsappHref: string
  /** Primary action: an anchor (e.g. "#enquire") or a callback that opens a modal. */
  primary: { label: string; href?: string; onClick?: () => void }
  /** "floating": rounded card with three equal actions (home). "bar": edge-to-edge bar with a wide primary (project). */
  variant?: 'floating' | 'bar'
  onContactClick?: (channel: 'call' | 'whatsapp') => void
  className?: string
}

/** Mobile-only quick actions (hidden from lg up, where the header and sidebar take over). */
export function StickyMobileCTA({
  phoneHref,
  whatsappHref,
  primary,
  variant = 'floating',
  onContactClick,
  className,
}: Props) {
  const t = useTranslations('common')

  const PrimaryTag = primary.href ? 'a' : 'button'
  const primaryProps = primary.href
    ? { href: primary.href }
    : { type: 'button' as const, onClick: primary.onClick }

  if (variant === 'bar') {
    return (
      <nav
        aria-label={t('quickActions')}
        className={cn(
          'fixed inset-x-0 bottom-0 z-40 flex gap-2.5 border-t border-line bg-white px-4 pt-3 pb-[calc(0.75rem+env(safe-area-inset-bottom))] shadow-bar lg:hidden',
          className,
        )}
      >
        <a
          href={phoneHref}
          aria-label={t('call')}
          onClick={() => onContactClick?.('call')}
          className="flex size-13 shrink-0 items-center justify-center rounded-md border border-line text-ink"
        >
          <Icon name="phone" size={20} />
        </a>
        <a
          href={whatsappHref}
          aria-label={t('whatsapp')}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => onContactClick?.('whatsapp')}
          className="flex size-13 shrink-0 items-center justify-center rounded-md bg-whatsapp text-white"
        >
          <Icon name="whatsapp" size={20} />
        </a>
        <PrimaryTag
          {...primaryProps}
          className="flex h-13 flex-1 items-center justify-center rounded-md bg-gold text-[0.9375rem] font-bold text-ink"
        >
          {primary.label}
        </PrimaryTag>
      </nav>
    )
  }

  const item =
    'flex min-h-14 flex-col items-center justify-center gap-1 rounded-md text-xs font-semibold'
  return (
    <nav
      aria-label={t('quickActions')}
      className={cn(
        'fixed inset-x-3 bottom-[calc(0.75rem+env(safe-area-inset-bottom))] z-40 grid grid-cols-3 gap-1.5 rounded-[18px] bg-white p-2 shadow-float lg:hidden',
        className,
      )}
    >
      <a href={phoneHref} onClick={() => onContactClick?.('call')} className={cn(item, 'text-ink')}>
        <Icon name="phone" size={20} />
        {t('call')}
      </a>
      <a
        href={whatsappHref}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => onContactClick?.('whatsapp')}
        className={cn(item, 'text-whatsapp')}
      >
        <Icon name="whatsapp" size={20} />
        {t('whatsapp')}
      </a>
      <PrimaryTag
        {...primaryProps}
        className={cn(item, 'bg-gold text-[0.8125rem] font-bold text-ink')}
      >
        {primary.label}
      </PrimaryTag>
    </nav>
  )
}
