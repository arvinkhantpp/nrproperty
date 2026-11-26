import { notFound } from 'next/navigation'

import type { Locale } from '@/i18n/routing'
import { redirectIfConfigured } from '@/lib/redirects'

type Props = { params: Promise<{ locale: string; rest: string[] }> }

// Any unknown nested path under a locale: follow an admin redirect if one matches, else the localized 404.
export default async function CatchAll({ params }: Props) {
  const { locale, rest } = await params
  await redirectIfConfigured(`/${rest.map(decodeURIComponent).join('/')}`, locale as Locale)
  notFound()
}
