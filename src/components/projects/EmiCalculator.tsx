'use client'

import { useTranslations } from 'next-intl'
import { useId, useState } from 'react'

import { formatBDT, formatPriceShort, monthlyEmi } from '@/lib/format'

function Slider({
  label,
  value,
  display,
  min,
  max,
  step,
  onChange,
}: {
  label: string
  value: number
  display: string
  min: number
  max: number
  step: number
  onChange: (v: number) => void
}) {
  const id = useId()
  const pct = ((value - min) / (max - min)) * 100
  return (
    <div className="flex flex-col gap-2.5">
      <div className="flex items-baseline justify-between gap-4">
        <label htmlFor={id} className="text-small font-semibold text-cream/75">
          {label}
        </label>
        <output htmlFor={id} className="font-semibold text-white">
          {display}
        </output>
      </div>
      <input
        id={id}
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="h-2 w-full cursor-pointer appearance-none rounded-full accent-[var(--nr-gold)]"
        style={{ background: `linear-gradient(90deg, var(--nr-gold) ${pct}%, rgb(255 255 255 / 0.15) ${pct}%)` }}
      />
    </div>
  )
}

/** Rough monthly instalment for a bank loan; the result is indicative and says so. */
export function EmiCalculator({ price }: { price: number }) {
  const t = useTranslations('emi')
  const base = price > 0 ? price : 15_000_000
  const [amount, setAmount] = useState(base)
  const [down, setDown] = useState(30)
  const [rate, setRate] = useState(9)
  const [years, setYears] = useState(15)
  const loan = amount * (1 - down / 100)
  const emi = monthlyEmi(loan, rate, years)

  return (
    <div className="grid gap-8 rounded-lg bg-ink p-6 text-cream sm:p-8 md:grid-cols-[1.2fr_1fr] md:gap-10">
      <div className="flex flex-col gap-6">
        <Slider
          label={t('price')}
          value={amount}
          display={formatPriceShort(amount) ?? ''}
          min={Math.round(base * 0.5)}
          max={Math.round(base * 2)}
          step={100_000}
          onChange={setAmount}
        />
        <Slider label={t('downPayment')} value={down} display={`${down}%`} min={10} max={80} step={5} onChange={setDown} />
        <Slider label={t('rate')} value={rate} display={`${rate}%`} min={6} max={16} step={0.25} onChange={setRate} />
        <Slider label={t('tenure')} value={years} display={t('years', { n: years })} min={5} max={25} step={1} onChange={setYears} />
      </div>
      <div className="flex flex-col justify-center gap-2 rounded-md bg-white/[0.06] p-6">
        <p className="text-eyebrow text-gold-light">{t('monthly')}</p>
        <p className="font-display text-[2.5rem] leading-tight text-white" aria-live="polite">
          {formatBDT(emi)}
        </p>
        <p className="text-small text-cream/65">{t('loanAmount', { amount: formatBDT(loan) })}</p>
        <p className="mt-3 text-small text-cream/55">{t('disclaimer')}</p>
      </div>
    </div>
  )
}
