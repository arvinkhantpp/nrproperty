'use client'

import Image from 'next/image'
import { useTranslations } from 'next-intl'
import { useState } from 'react'

import { Lightbox } from '@/components/site/Lightbox'
import { Button, Tabs } from '@/components/ui'
import { formatNumber } from '@/lib/format'

export type Plan = {
  id: string
  name: string
  sizeSft?: number | null
  beds?: number | null
  baths?: number | null
  balconies?: number | null
  facing?: string | null
  image?: { src: string; alt: string } | null
  pdf?: string | null
}

function PlanCard({ plan }: { plan: Plan }) {
  const t = useTranslations('project')
  const [zoom, setZoom] = useState<number | null>(null)
  const stats = [
    plan.sizeSft ? { label: t('size'), value: `${formatNumber(plan.sizeSft)} sft` } : null,
    plan.beds != null ? { label: t('bedrooms'), value: String(plan.beds) } : null,
    plan.baths != null ? { label: t('bathrooms'), value: String(plan.baths) } : null,
    plan.balconies != null ? { label: t('balconies'), value: String(plan.balconies) } : null,
    plan.facing ? { label: t('facing'), value: plan.facing } : null,
  ].filter((s): s is { label: string; value: string } => Boolean(s))

  return (
    <div className="grid gap-6 rounded-lg bg-white p-5 sm:p-7 md:grid-cols-[1.3fr_1fr] md:items-center">
      <button
        type="button"
        onClick={() => plan.image && setZoom(0)}
        disabled={!plan.image}
        aria-label={plan.image ? t('zoomPlan', { name: plan.name }) : undefined}
        className="relative aspect-[4/3] overflow-hidden rounded-md bg-cream disabled:cursor-default"
      >
        {plan.image ? (
          <Image src={plan.image.src} alt={plan.image.alt || plan.name} fill sizes="(min-width: 768px) 420px, 100vw" className="object-contain p-3" />
        ) : (
          <span className="absolute inset-0 flex items-center justify-center text-small text-muted">{t('planComing')}</span>
        )}
      </button>
      <div className="flex flex-col gap-5">
        <h3 className="font-display text-[1.75rem] leading-tight text-ink">{plan.name}</h3>
        <dl className="grid grid-cols-2 gap-x-6 gap-y-4">
          {stats.map((s) => (
            <div key={s.label} className="flex flex-col border-b border-line pb-3">
              <dt className="text-[0.6875rem] font-semibold tracking-[1.6px] text-muted uppercase">{s.label}</dt>
              <dd className="text-body-l font-semibold text-ink">{s.value}</dd>
            </div>
          ))}
        </dl>
        {plan.pdf ? (
          <Button href={plan.pdf} variant="outline" iconLeft="download" target="_blank" rel="noopener" data-track="floorplan-download">
            {t('downloadPlan')}
          </Button>
        ) : null}
      </div>
      {plan.image ? <Lightbox images={[plan.image]} index={zoom} onClose={() => setZoom(null)} onIndex={setZoom} /> : null}
    </div>
  )
}

export function FloorPlans({ plans }: { plans: Plan[] }) {
  const t = useTranslations('project')
  if (plans.length === 1 && plans[0]) return <PlanCard plan={plans[0]} />
  return (
    <Tabs
      variant="chips"
      label={t('floorPlans')}
      panelClassName="mt-5"
      items={plans.map((p) => ({ id: p.id, label: p.name, content: <PlanCard plan={p} /> }))}
    />
  )
}
