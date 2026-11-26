import { useTranslations } from 'next-intl'

import { Accent, Button } from '@/components/ui'

export default function NotFound() {
  const t = useTranslations('notFound')
  return (
    <section className="bg-ink text-cream">
      <div className="container-site flex min-h-[70dvh] flex-col justify-center gap-6 py-20 lg:py-32">
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
    </section>
  )
}
