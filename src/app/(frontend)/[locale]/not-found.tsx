import { useTranslations } from 'next-intl'

import { Accent, Button, Logo } from '@/components/ui'
import { Link } from '@/i18n/navigation'

export default function NotFound() {
  const t = useTranslations('notFound')
  return (
    <main className="flex min-h-dvh flex-col bg-ink text-cream">
      <div className="container-site py-6">
        <Link href="/" aria-label="NR Property home">
          <Logo tone="dark" />
        </Link>
      </div>
      <div className="container-site flex flex-1 flex-col justify-center gap-6 py-16">
        <p className="text-eyebrow text-gold">404 · {t('eyebrow')}</p>
        <h1 className="max-w-3xl text-display-l text-balance">
          <Accent tone="dark">{t('title')}</Accent>
        </h1>
        <p className="max-w-lg text-body-l text-cream/75">{t('body')}</p>
        <div className="pt-2">
          <Button href="/projects" iconRight="arrowRight">
            {t('cta')}
          </Button>
        </div>
      </div>
    </main>
  )
}
