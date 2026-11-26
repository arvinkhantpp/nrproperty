import 'server-only'

import { cache } from 'react'

import type { Locale } from '@/i18n/routing'
import type { Branding, Contact, Footer, Form, Header, SiteSetting } from '@/payload-types'

import { getGlobal, getProjectOptions } from './cms'
import { imageOf } from './media'
import { SITE_DEFAULTS } from './site-defaults'

export type Option = { value: string; label: string }

/** Everything the layout and client components need from the CMS, read once per request. */
export const getSiteData = cache(async (locale: Locale) => {
  const [header, footer, contact, branding, settings, forms, announcement, popup, projects] =
    await Promise.all([
      getGlobal('header', locale),
      getGlobal('footer', locale),
      getGlobal('contact', locale),
      getGlobal('branding', locale),
      getGlobal('siteSettings', locale),
      getGlobal('forms', locale),
      getGlobal('announcement', locale),
      getGlobal('popup', locale),
      getProjectOptions(locale),
    ])
  return { header, footer, contact, branding, settings, forms, announcement, popup, projects }
})

export type SiteData = Awaited<ReturnType<typeof getSiteData>>

const opts = (list?: { value: string; label?: string | null }[] | null): Option[] =>
  (list ?? []).map((o) => ({ value: o.value, label: o.label || o.value }))

/** The serialisable slice of site data handed to client components through SiteProvider. */
export function clientSiteConfig(data: {
  contact: Contact
  forms: Form
  branding: Branding
  header: Header
  settings: SiteSetting
  footer: Footer
  projects: { value: string; label: string; slug: string }[]
}) {
  const { contact, forms, branding, projects } = data
  const formConfig = (key: 'enquiry' | 'brochure' | 'siteVisit' | 'landowner' | 'nrb' | 'contact') => {
    const f = forms[key]
    return {
      title: f?.title ?? null,
      submitLabel: f?.submitLabel ?? null,
      hidden: ('hiddenFields' in (f ?? {}) ? ((f as { hiddenFields?: string[] | null }).hiddenFields ?? []) : []) as string[],
      labels: Object.fromEntries(
        (f?.labels ?? []).map((l) => [l.field, { label: l.label ?? null, placeholder: l.placeholder ?? null }]),
      ) as Record<string, { label: string | null; placeholder: string | null }>,
    }
  }
  return {
    companyName: branding.companyName || SITE_DEFAULTS.companyName.en,
    logo: imageOf(branding.logoDark)?.src ?? null,
    logoLight: imageOf(branding.logoLight)?.src ?? null,
    logoSubline: branding.logoSubline ?? 'DEVELOPMENTS LTD.',
    hotline: contact.hotline || SITE_DEFAULTS.hotline,
    whatsapp: contact.whatsapp || SITE_DEFAULTS.whatsapp,
    whatsappMessage: contact.whatsappMessage ?? '',
    showWhatsappButton: contact.showWhatsappButton !== false,
    email: contact.emails?.[0]?.email || SITE_DEFAULTS.email,
    projects,
    options: {
      bedrooms: opts(forms.bedrooms),
      timeSlots: opts(forms.timeSlots),
      budgetRanges: opts(forms.budgetRanges),
      bestTimes: opts(forms.bestTimes),
      subjects: opts(forms.subjects),
    },
    forms: {
      enquiry: formConfig('enquiry'),
      brochure: formConfig('brochure'),
      siteVisit: formConfig('siteVisit'),
      landowner: formConfig('landowner'),
      nrb: formConfig('nrb'),
      contact: formConfig('contact'),
    },
  }
}

export type ClientSiteConfig = ReturnType<typeof clientSiteConfig>
