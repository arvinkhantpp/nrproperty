import { useTranslations } from 'next-intl'

import { Link } from '@/i18n/navigation'
import { cn } from '@/lib/cn'

import { isDarkTone, type Tone } from './SectionHeader'

export type Crumb = { label: string; href?: string }

export function Breadcrumbs({
  items,
  tone = 'light',
  className,
}: {
  items: Crumb[]
  tone?: Tone
  className?: string
}) {
  const t = useTranslations('common')
  const dark = isDarkTone(tone)
  return (
    <nav aria-label={t('breadcrumb')} className={className}>
      <ol className="flex flex-wrap items-center gap-x-2.5 gap-y-1 text-small font-medium">
        {items.map((item, i) => {
          const last = i === items.length - 1
          return (
            <li key={`${item.label}-${i}`} className="flex items-center gap-2.5">
              {item.href && !last ? (
                <Link
                  href={item.href}
                  className={cn(
                    'underline-offset-4 transition-colors hover:underline',
                    dark ? 'text-cream/70 hover:text-cream' : 'text-muted hover:text-ink',
                  )}
                >
                  {item.label}
                </Link>
              ) : (
                <span
                  aria-current={last ? 'page' : undefined}
                  className={dark ? 'text-cream' : 'text-ink'}
                >
                  {item.label}
                </span>
              )}
              {!last ? (
                <span aria-hidden="true" className={dark ? 'text-cream/40' : 'text-line'}>
                  /
                </span>
              ) : null}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}
