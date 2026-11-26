import { useLocale, useTranslations } from 'next-intl'

import { JsonLd } from '@/components/site/JsonLd'

import { getPathname, Link } from '@/i18n/navigation'
import type { Locale } from '@/i18n/routing'
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
  const locale = useLocale() as Locale
  const site = (process.env.NEXT_PUBLIC_SITE_URL || '').replace(/\/$/, '')
  const ld = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.label,
      ...(item.href && !item.href.startsWith('#') ? { item: `${site}${getPathname({ href: item.href, locale })}` } : {}),
    })),
  }
  return (
    <nav aria-label={t('breadcrumb')} className={className}>
      <JsonLd data={ld} />
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
