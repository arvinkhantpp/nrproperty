'use client'

import { useTranslations } from 'next-intl'
import { useEffect, useState } from 'react'

import { Button } from '@/components/ui'
import { Link } from '@/i18n/navigation'
import { setConsent, storedConsent } from '@/lib/tracking/client'

/** Small cookie notice (only when Admin → Tracking → "Ask for consent" is on and nothing is stored yet). */
export function ConsentBanner({ required }: { required: boolean }) {
  const t = useTranslations('consent')
  const [open, setOpen] = useState(false)

  useEffect(() => {
    if (required && !storedConsent()) setOpen(true)
  }, [required])

  if (!open) return null
  const choose = (v: 'granted' | 'denied') => {
    setConsent(v)
    setOpen(false)
  }
  return (
    <div
      role="region"
      aria-label={t('label')}
      className="fixed inset-x-3 bottom-[calc(6rem+env(safe-area-inset-bottom))] z-[45] animate-fade-in rounded-lg bg-ink p-5 text-cream shadow-float sm:inset-x-auto sm:right-6 sm:bottom-6 sm:max-w-sm lg:left-6 lg:right-auto"
    >
      <p className="text-small text-cream/85">
        {t.rich('body', {
          link: (chunks) => (
            <Link href="/privacy" className="text-cream underline underline-offset-2">
              {chunks}
            </Link>
          ),
        })}
      </p>
      <div className="mt-4 grid grid-cols-2 gap-2">
        <Button size="sm" variant="onDark" onClick={() => choose('denied')}>
          {t('decline')}
        </Button>
        <Button size="sm" onClick={() => choose('granted')}>
          {t('accept')}
        </Button>
      </div>
    </div>
  )
}
