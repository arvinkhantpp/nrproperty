'use client'

import Form from 'next/form'
import { useTranslations } from 'next-intl'
import { useRef } from 'react'

import { Icon } from '@/components/ui'
import { cn } from '@/lib/cn'

type Option = { value: string; label: string }
type Props = {
  action: string
  values: { status?: string; type?: string; area?: string; size?: string; beds?: string }
  areas: Option[]
  types: Option[]
  sizes: Option[]
  beds: Option[]
}

function FilterSelect({
  name,
  label,
  anyLabel,
  options,
  value,
  onChange,
}: {
  name: string
  label: string
  anyLabel: string
  options: Option[]
  value?: string
  onChange: () => void
}) {
  return (
    <label className="relative flex min-w-0 flex-col gap-1 rounded-md border border-line bg-white px-4 py-2.5 focus-within:border-gold">
      <span className="text-[0.6875rem] font-semibold tracking-[1.6px] text-muted uppercase">{label}</span>
      <select
        name={name}
        defaultValue={value ?? ''}
        onChange={onChange}
        className={cn('w-full appearance-none bg-transparent pr-6 text-body font-semibold text-ink outline-none')}
      >
        <option value="">{anyLabel}</option>
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
      <Icon name="chevronDown" size={16} className="pointer-events-none absolute right-3 bottom-3.5 text-muted" />
    </label>
  )
}

/** GET form (works without JS); with JS each change navigates client-side via next/form. */
export function ProjectFilters({ action, values, areas, types, sizes, beds }: Props) {
  const t = useTranslations('filters')
  const ref = useRef<HTMLFormElement>(null)
  const submit = () => ref.current?.requestSubmit()
  return (
    <Form ref={ref} action={action} scroll={false} className="grid grid-cols-2 gap-3 lg:grid-cols-4">
      {values.status ? <input type="hidden" name="status" value={values.status} /> : null}
      <FilterSelect name="area" label={t('area')} anyLabel={t('anyArea')} options={areas} value={values.area} onChange={submit} />
      <FilterSelect name="type" label={t('type')} anyLabel={t('anyType')} options={types} value={values.type} onChange={submit} />
      <FilterSelect name="size" label={t('size')} anyLabel={t('anySize')} options={sizes} value={values.size} onChange={submit} />
      <FilterSelect name="beds" label={t('beds')} anyLabel={t('anyBeds')} options={beds} value={values.beds} onChange={submit} />
      <noscript>
        <button type="submit" className="col-span-2 h-12 rounded-md bg-ink font-semibold text-cream lg:col-span-4">
          {t('apply')}
        </button>
      </noscript>
    </Form>
  )
}
