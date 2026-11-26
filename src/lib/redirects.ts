import 'server-only'

import { notFound, permanentRedirect, redirect } from 'next/navigation'

import { routing, type Locale } from '@/i18n/routing'

import { getGlobal } from './cms'

const norm = (p: string) => {
  const path = p.split('#')[0]!.split('?')[0]!.trim()
  const withSlash = path.startsWith('/') ? path : `/${path}`
  return withSlash.length > 1 ? withSlash.replace(/\/+$/, '') : withSlash
}

/**
 * Admin → Settings → SEO & redirects. Called just before a page would 404, so a redirect never hides
 * a live page. `path` is the locale-free path (e.g. /old-project); a /bn visitor stays on /bn.
 */
export async function redirectIfConfigured(path: string, locale: Locale) {
  const seo = await getGlobal('seo', routing.defaultLocale)
  const target = norm(path)
  const rule = (seo.redirects ?? []).find((r) => r.from && norm(r.from) === target)
  if (!rule?.to) return
  const external = /^https?:\/\//.test(rule.to)
  const dest = external || locale === routing.defaultLocale ? rule.to : `/${locale}${rule.to.startsWith('/') ? '' : '/'}${rule.to}`
  if (rule.permanent === false) redirect(dest)
  permanentRedirect(dest)
}

/** Use in place of notFound() on dynamic routes. */
export async function redirectOrNotFound(path: string, locale: Locale): Promise<never> {
  await redirectIfConfigured(path, locale)
  notFound()
}
