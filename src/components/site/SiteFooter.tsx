import { getTranslations } from 'next-intl/server'

import { Icon, Logo } from '@/components/ui'
import { Link } from '@/i18n/navigation'
import { telHref, whatsappHref } from '@/lib/contact'
import type { SiteData } from '@/lib/site'

import { LanguageSwitch } from './SiteHeader'

const SOCIALS = ['facebook', 'instagram', 'youtube', 'linkedin', 'tiktok'] as const

function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  const cls = 'inline-flex min-h-9 items-center text-body text-cream/70 transition-colors hover:text-white'
  return href.startsWith('/') ? (
    <Link href={href} className={cls}>
      {children}
    </Link>
  ) : (
    <a href={href} className={cls}>
      {children}
    </a>
  )
}

export async function SiteFooter({ data }: { data: SiteData }) {
  const t = await getTranslations('footer')
  const { footer, contact, settings, branding } = data
  const year = new Date().getFullYear()
  const socials = SOCIALS.filter((s) => contact.socials?.[s])
  const company = branding.companyName || 'NR Property'

  const wide = (footer.columns?.length ?? 0) > 3
  return (
    <footer className="bg-ink pb-28 text-cream lg:pb-0">
      <div className="container-site grid gap-12 pt-16 pb-12 lg:grid-cols-[1.3fr_2fr] lg:gap-20 lg:pt-24">
        <div className="flex flex-col gap-6">
          <Link href="/" aria-label={company} className="self-start">
            <Logo tone="dark" subline={branding.logoSubline ?? 'DEVELOPMENTS LTD.'} />
          </Link>
          {footer.about ? <p className="max-w-sm text-body text-cream/70">{footer.about}</p> : null}
          <div className="flex flex-col gap-2">
            <a
              href={telHref(contact.hotline)}
              data-track="call"
              className="inline-flex items-center gap-2.5 font-display text-[1.75rem] leading-tight text-white"
            >
              <Icon name="phone" size={20} className="text-gold" />
              {contact.hotline}
            </a>
            <a
              href={whatsappHref(contact.whatsapp, contact.whatsappMessage ?? undefined)}
              target="_blank"
              rel="noopener noreferrer"
              data-track="whatsapp"
              className="inline-flex min-h-9 items-center gap-2.5 text-body text-cream/80 hover:text-white"
            >
              <Icon name="whatsapp" size={18} className="text-gold" />
              {t('whatsapp')}
            </a>
          </div>
          {socials.length ? (
            <ul className="flex gap-2.5" aria-label={t('follow')}>
              {socials.map((s) => (
                <li key={s}>
                  <a
                    href={contact.socials?.[s] ?? '#'}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-10 items-center rounded-full border border-white/15 px-4 text-small font-semibold text-cream/80 capitalize transition-colors hover:border-gold hover:text-white"
                  >
                    {s}
                  </a>
                </li>
              ))}
            </ul>
          ) : null}
        </div>

        <div className={wide ? 'grid grid-cols-2 gap-x-6 gap-y-10 md:grid-cols-4' : 'grid grid-cols-2 gap-x-6 gap-y-10 md:grid-cols-3'}>
          {(footer.columns ?? []).map((col) => (
            <div key={col.id ?? col.title}>
              <h2 className="text-eyebrow text-gold-light">{col.title}</h2>
              <ul className="mt-4 flex flex-col">
                {(col.links ?? []).map((l) => (
                  <li key={l.id ?? l.href}>
                    <FooterLink href={l.href}>{l.label}</FooterLink>
                  </li>
                ))}
              </ul>
            </div>
          ))}
          {/* With four link columns, "Visit us" becomes a full-width row underneath. */}
          <div className={wide ? 'col-span-2 border-t border-white/10 pt-8 md:col-span-4' : 'col-span-2 md:col-span-1'}>
            <h2 className="text-eyebrow text-gold-light">{t('visit')}</h2>
            <address className={wide ? 'mt-4 flex flex-col gap-3 text-body text-cream/70 not-italic md:flex-row md:flex-wrap md:gap-x-10' : 'mt-4 flex flex-col gap-3 text-body text-cream/70 not-italic'}>
              {contact.address ? <span className="whitespace-pre-line">{contact.address}</span> : null}
              {contact.officeHours ? <span>{contact.officeHours}</span> : null}
              {(contact.emails ?? []).slice(0, 2).map((e) => (
                <a key={e.email} href={`mailto:${e.email}`} className="break-all hover:text-white">
                  {e.email}
                </a>
              ))}
            </address>
          </div>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="container-site flex flex-col gap-3 py-6 text-small text-cream/55 md:flex-row md:items-center md:justify-between">
          <p>
            {(footer.copyright || `© {year} ${company}`).replace('{year}', String(year))}
            {settings.rehabNo ? ` · REHAB ${settings.rehabNo}` : ''}
            {settings.tradeLicence ? ` · ${t('tradeLicence')} ${settings.tradeLicence}` : ''}
          </p>
          <div className="flex items-center gap-5">
            <Link href="/privacy" className="hover:text-white">
              {t('privacy')}
            </Link>
            <LanguageSwitch className="text-cream/70 hover:text-white" />
          </div>
        </div>
      </div>
    </footer>
  )
}
