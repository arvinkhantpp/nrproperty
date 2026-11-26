import Image from 'next/image'

import { cn } from '@/lib/cn'

type Props = {
  tone?: 'light' | 'dark'
  /** When the Branding global has a logo, pass its URL and size here; the placeholder wordmark is used otherwise. */
  src?: string | null
  width?: number
  height?: number
  name?: string
  subline?: string | null
  compact?: boolean
  className?: string
}

/**
 * Placeholder wordmark until the client's logo is ready: an "NR" monogram in a thin gold square
 * plus letter-spaced caps. Replaced from the admin (Branding → logo) without code changes.
 */
export function Logo({
  tone = 'dark',
  src,
  width = 180,
  height = 44,
  name = 'NR PROPERTY',
  subline = 'DEVELOPMENTS LTD.',
  compact,
  className,
}: Props) {
  const onDark = tone === 'dark'
  if (src) {
    return (
      <Image
        src={src}
        alt={name}
        width={width}
        height={height}
        priority
        className={cn('h-10 w-auto', className)}
      />
    )
  }
  return (
    <span className={cn('inline-flex items-center gap-3', className)}>
      <span
        aria-hidden="true"
        className={cn(
          'flex size-10 shrink-0 items-center justify-center border-[1.2px] border-gold font-display text-[1.3rem] leading-none',
          onDark ? 'text-gold' : 'text-gold-text',
        )}
      >
        NR
      </span>
      <span className="flex flex-col">
        <span
          className={cn(
            'text-[0.8125rem] leading-tight font-semibold tracking-[3px] lg:text-sm',
            onDark ? 'text-white' : 'text-ink',
          )}
        >
          {name}
        </span>
        {subline && !compact ? (
          <span
            className={cn(
              'mt-0.5 text-[0.5625rem] leading-tight font-semibold tracking-[2.4px]',
              onDark ? 'text-gold' : 'text-gold-text',
            )}
          >
            {subline}
          </span>
        ) : null}
      </span>
    </span>
  )
}
