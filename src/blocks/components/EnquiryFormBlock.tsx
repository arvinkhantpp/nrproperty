import { getTranslations } from 'next-intl/server'

import { LeadForm } from '@/components/forms/LeadForm'
import { Eyebrow, Icon, type IconName } from '@/components/ui'
import type { Locale } from '@/i18n/routing'
import { cn } from '@/lib/cn'
import { telHref, whatsappHref } from '@/lib/contact'
import type { FormType } from '@/lib/forms/schemas'
import { getSiteData } from '@/lib/site'
import { withAccent } from '@/lib/text'

import { Section, toneOf } from './Section'
import type { BlockOf } from './types'

export async function EnquiryFormBlock({ data, locale }: { data: BlockOf<'enquiryForm'>; locale: Locale }) {
  const t = await getTranslations('contact')
  const { contact } = await getSiteData(locale)
  const tone = toneOf(data.background)
  const dark = tone !== 'light'
  const type = (data.form ?? 'enquiry') as FormType

  const rows: { icon: IconName; label: string; value: string; href?: string; external?: boolean }[] = []
  if (data.showContacts !== false) {
    rows.push({ icon: 'phone', label: t('hotline'), value: contact.hotline, href: telHref(contact.hotline) })
    rows.push({
      icon: 'whatsapp',
      label: t('whatsapp'),
      value: contact.whatsapp,
      href: whatsappHref(contact.whatsapp, contact.whatsappMessage ?? undefined),
      external: true,
    })
    const email = contact.emails?.[0]?.email
    if (email) rows.push({ icon: 'mail', label: t('email'), value: email, href: `mailto:${email}` })
    if (contact.address) rows.push({ icon: 'pin', label: t('office'), value: contact.address })
  }

  return (
    <Section background={data.background} anchorId={data.anchorId}>
      <div className="grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:gap-20">
        <div className="flex flex-col gap-6">
          {data.eyebrow ? <Eyebrow tone={tone}>{data.eyebrow}</Eyebrow> : null}
          <h2 className={cn('text-display-l text-balance', dark ? 'text-cream' : 'text-ink')}>{withAccent(data.title, tone)}</h2>
          {data.description ? (
            <p className={cn('max-w-[30rem] text-body-l', dark ? 'text-cream/75' : 'text-muted')}>{data.description}</p>
          ) : null}
          {rows.length ? (
            <ul className={cn('mt-4 flex flex-col border-t', dark ? 'border-white/10' : 'border-line')}>
              {rows.map((r) => {
                const inner = (
                  <>
                    <span
                      aria-hidden="true"
                      className={cn(
                        'flex size-11 shrink-0 items-center justify-center rounded-full',
                        dark ? 'bg-white/10 text-gold-light' : 'bg-gold-soft text-forest',
                      )}
                    >
                      <Icon name={r.icon} size={20} />
                    </span>
                    <span className="flex min-w-0 flex-col">
                      <span className={cn('text-[0.6875rem] font-semibold tracking-[1.6px] uppercase', dark ? 'text-cream/60' : 'text-muted')}>
                        {r.label}
                      </span>
                      <span className={cn('text-body-l font-semibold break-words whitespace-pre-line', dark ? 'text-cream' : 'text-ink')}>
                        {r.value}
                      </span>
                    </span>
                  </>
                )
                const cls = cn('flex items-center gap-4 border-b py-4', dark ? 'border-white/10' : 'border-line')
                return (
                  <li key={r.label}>
                    {r.href ? (
                      <a
                        href={r.href}
                        className={cn(cls, 'transition-opacity hover:opacity-80')}
                        data-track={r.icon === 'phone' ? 'call' : r.icon === 'whatsapp' ? 'whatsapp' : undefined}
                        {...(r.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                      >
                        {inner}
                      </a>
                    ) : (
                      <div className={cls}>{inner}</div>
                    )}
                  </li>
                )
              })}
            </ul>
          ) : null}
        </div>
        <div className={cn('rounded-lg p-6 sm:p-8 lg:p-10', dark ? 'bg-white/[0.05] ring-1 ring-white/10' : 'bg-white shadow-card')}>
          {data.formTitle ? (
            <h3 className={cn('mb-6 font-display text-[1.75rem] leading-tight', dark ? 'text-cream' : 'text-ink')}>{data.formTitle}</h3>
          ) : null}
          <LeadForm type={type} theme={dark ? 'dark' : 'light'} showPromise={type === 'enquiry'} />
        </div>
      </div>
    </Section>
  )
}
