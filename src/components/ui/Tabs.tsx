'use client'

import { useId, useRef, useState, type KeyboardEvent, type ReactNode } from 'react'

import { cn } from '@/lib/cn'

export type TabItem = { id: string; label: ReactNode; content?: ReactNode }

type Props = {
  items: TabItem[]
  /** "segmented": white pill track (home). "chips": separate bordered pills (floor plans). */
  variant?: 'segmented' | 'chips'
  value?: string
  defaultValue?: string
  onChange?: (id: string) => void
  label: string
  className?: string
  panelClassName?: string
}

export function Tabs({
  items,
  variant = 'segmented',
  value,
  defaultValue,
  onChange,
  label,
  className,
  panelClassName,
}: Props) {
  const [inner, setInner] = useState(defaultValue ?? items[0]?.id)
  const active = value ?? inner
  const baseId = useId()
  const refs = useRef<(HTMLButtonElement | null)[]>([])

  const select = (id: string) => {
    if (value === undefined) setInner(id)
    onChange?.(id)
  }

  const onKeyDown = (e: KeyboardEvent<HTMLButtonElement>, index: number) => {
    const last = items.length - 1
    let next: number | null = null
    if (e.key === 'ArrowRight') next = index === last ? 0 : index + 1
    if (e.key === 'ArrowLeft') next = index === 0 ? last : index - 1
    if (e.key === 'Home') next = 0
    if (e.key === 'End') next = last
    if (next === null) return
    e.preventDefault()
    const item = items[next]
    if (!item) return
    select(item.id)
    refs.current[next]?.focus()
  }

  const hasPanels = items.some((i) => i.content !== undefined)

  return (
    <div className={className}>
      <div
        role="tablist"
        aria-label={label}
        className={cn(
          'flex max-w-full overflow-x-auto [scrollbar-width:none]',
          variant === 'segmented'
            ? 'inline-flex gap-1 rounded-full bg-white p-1.5 shadow-[inset_0_0_0_1px_var(--nr-line)]'
            : 'gap-2',
        )}
      >
        {items.map((item, i) => {
          const selected = item.id === active
          return (
            <button
              key={item.id}
              ref={(el) => {
                refs.current[i] = el
              }}
              id={`${baseId}-tab-${item.id}`}
              type="button"
              role="tab"
              aria-selected={selected}
              aria-controls={hasPanels ? `${baseId}-panel-${item.id}` : undefined}
              tabIndex={selected ? 0 : -1}
              onClick={() => select(item.id)}
              onKeyDown={(e) => onKeyDown(e, i)}
              className={cn(
                'min-h-10 shrink-0 rounded-full px-5 text-sm font-semibold whitespace-nowrap transition-[background-color,color,border-color] duration-200',
                variant === 'segmented'
                  ? selected
                    ? 'bg-ink text-cream'
                    : 'text-muted hover:text-ink'
                  : selected
                    ? 'border border-ink bg-ink text-cream'
                    : 'border border-line text-[#4C5853] hover:border-ink hover:text-ink',
              )}
            >
              {item.label}
            </button>
          )
        })}
      </div>
      {hasPanels
        ? items.map((item) => (
            <div
              key={item.id}
              id={`${baseId}-panel-${item.id}`}
              role="tabpanel"
              aria-labelledby={`${baseId}-tab-${item.id}`}
              hidden={item.id !== active}
              tabIndex={0}
              className={cn('animate-fade-in focus-visible:outline-none', panelClassName)}
            >
              {item.content}
            </div>
          ))
        : null}
    </div>
  )
}
