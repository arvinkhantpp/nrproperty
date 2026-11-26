'use client'

import { useLocale, useTranslations } from 'next-intl'
import { useEffect, useState } from 'react'

import { Button, Icon, Logo } from '@/components/ui'
import { Link, usePathname } from '@/i18n/navigation'
import { cn } from '@/lib/cn'

import { useSite } from './SiteProvider'

export type NavItem = { label: string; href: string }

type Props = {
  menu: NavItem[]
  cta: { label: string; href?: string | null; opensSiteVisit: boolean }
  showHotline: boolean
  showLanguageSwitch: boolean
}

const isInternal = (href: string) => href.startsWith('/')

function NavLink({ item, className, onClick }: { item: NavItem; className?: string; onClick?: () => void }) {
  const pathname = usePathname()
  const path = item.href.split('#')[0] || '/'
  const active = path === '/' ? pathname === '/' : pathname === path || pathname.startsWith(`${path}/`)
  if (!isInternal(item.href)) {
    return (
      <a href={item.href} className={className} onClick={onClick}>
        {item.label}
      </a>
    )
  }
  return (
    <Link href={item.href} className={className} aria-current={active ? 'page' : undefined} onClick={onClick}>
      {item.label}
    </Link>
  )
}

export function LanguageSwitch({ className }: { className?: string }) {
  const locale = useLocale()
  const pathname = usePathname()
  const t = useTranslations('common')
  const other = locale === 'en' ? 'bn' : 'en'
  return (
    <Link
      href={pathname}
      locale={other}
      hrefLang={other}
      lang={other}
      aria-label={t('languageSwitchLabel')}
      className={cn('inline-flex min-h-11 items-center gap-1.5 text-sm font-semibold', className)}
    >
      <Icon name="globe" size={16} />
      {t('languageSwitch')}
    </Link>
  )
}

export function SiteHeader({ menu, cta, showHotline, showLanguageSwitch }: Props) {
  const t = useTranslations('common')
  const site = useSite()
  const pathname = usePathname()
  const overlay = pathname === '/'
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Close the mobile menu on navigation and lock the page behind it while open.
  useEffect(() => setOpen(false), [pathname])
  useEffect(() => {
    if (!open) return
    const prev = document.documentElement.style.overflow
    document.documentElement.style.overflow = 'hidden'
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => {
      document.documentElement.style.overflow = prev
      window.removeEventListener('keydown', onKey)
    }
  }, [open])

  const transparent = overlay && !scrolled && !open
  const ctaButton = cta.opensSiteVisit || !cta.href ? (
    <Button size="sm" onClick={() => site.openSiteVisit()} className="rounded-full">
      {cta.label}
    </Button>
  ) : (
    <Button size="sm" href={cta.href} className="rounded-full">
      {cta.label}
    </Button>
  )

  return (
    <>
      <header
        className={cn(
          'sticky top-0 z-50 text-white transition-[background-color,box-shadow,height] duration-300',
          overlay && '-mb-16 lg:-mb-22',
          transparent ? 'bg-transparent' : 'bg-ink shadow-[0_1px_0_rgb(255_255_255/0.06)]',
        )}
      >
        <div
          className={cn(
            'container-site flex items-center justify-between gap-6 transition-[height] duration-300',
            scrolled ? 'h-16 lg:h-18' : 'h-16 lg:h-22',
          )}
        >
          <Link href="/" aria-label={`${site.companyName}, ${t('home')}`} className="shrink-0">
            <Logo tone="dark" src={site.logo} name={site.companyName.toUpperCase()} subline={site.logoSubline} />
          </Link>

          <nav aria-label="Main" className="hidden lg:block">
            <ul className="flex items-center gap-7 xl:gap-9">
              {menu.map((item) => (
                <li key={item.href + item.label}>
                  <NavLink
                    item={item}
                    className="relative py-2 text-sm font-medium text-white/80 transition-colors hover:text-white aria-[current=page]:text-white aria-[current=page]:after:absolute aria-[current=page]:after:inset-x-0 aria-[current=page]:after:-bottom-0.5 aria-[current=page]:after:h-px aria-[current=page]:after:bg-gold"
                  />
                </li>
              ))}
            </ul>
          </nav>

          <div className="hidden items-center gap-5 lg:flex">
            {showLanguageSwitch ? <LanguageSwitch className="text-white/80 hover:text-white" /> : null}
            {showHotline ? (
              <a
                href={site.phoneHref}
                className="hidden items-center gap-2 text-sm font-semibold text-white xl:inline-flex"
                data-track="call"
              >
                <Icon name="phone" size={16} className="text-gold" />
                {site.hotline}
              </a>
            ) : null}
            {ctaButton}
          </div>

          <div className="flex items-center gap-1 lg:hidden">
            {showLanguageSwitch ? <LanguageSwitch className="px-2 text-white/85" /> : null}
            <button
              type="button"
              onClick={() => setOpen((o) => !o)}
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? t('closeMenu') : t('openMenu')}
              className="-mr-2 flex size-11 items-center justify-center rounded-full text-white"
            >
              <Icon name={open ? 'close' : 'menu'} size={24} />
            </button>
          </div>
        </div>
      </header>

      <div
        id="mobile-menu"
        hidden={!open}
        className="fixed inset-x-0 top-16 bottom-0 z-40 flex flex-col overflow-y-auto bg-ink px-5 pt-6 pb-[calc(2rem+env(safe-area-inset-bottom))] text-white lg:hidden"
      >
        <nav aria-label="Mobile">
          <ul className="flex flex-col">
            {menu.map((item) => (
              <li key={item.href + item.label} className="border-b border-white/10">
                <NavLink
                  item={item}
                  onClick={() => setOpen(false)}
                  className="flex min-h-15 items-center justify-between font-display text-[1.75rem] text-white aria-[current=page]:text-gold"
                />
              </li>
            ))}
          </ul>
        </nav>
        <div className="mt-auto flex flex-col gap-3 pt-8">
          <Button
            variant="primary"
            size="lg"
            fullWidth
            onClick={() => {
              setOpen(false)
              site.openSiteVisit()
            }}
          >
            {cta.label}
          </Button>
          <div className="grid grid-cols-2 gap-3">
            <Button href={site.phoneHref} variant="onDark" iconLeft="phone" data-track="call">
              {t('call')}
            </Button>
            <Button href={site.whatsappLink} variant="onDark" iconLeft="whatsapp" data-track="whatsapp">
              {t('whatsapp')}
            </Button>
          </div>
          <p className="pt-2 text-center text-small text-white/60">{site.hotline} · {site.email}</p>
        </div>
      </div>
    </>
  )
}
