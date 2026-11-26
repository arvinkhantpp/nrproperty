'use client'

import { useId, useState, type ReactNode } from 'react'

import { cn } from '@/lib/cn'

import { Icon } from './Icon'
import { isDarkTone, type Tone } from './SectionHeader'

export type AccordionItem = { id: string; question: ReactNode; answer: ReactNode }

type Props = {
  items: AccordionItem[]
  /** Allow several panels open at once (default: one at a time). */
  multiple?: boolean
  defaultOpen?: string[]
  tone?: Tone
  className?: string
}

export function Accordion({ items, multiple, defaultOpen = [], tone = 'light', className }: Props) {
  const [open, setOpen] = useState<string[]>(defaultOpen)
  const baseId = useId()
  const dark = isDarkTone(tone)

  const toggle = (id: string) =>
    setOpen((cur) =>
      cur.includes(id) ? cur.filter((x) => x !== id) : multiple ? [...cur, id] : [id],
    )

  return (
    <div className={cn('border-t', dark ? 'border-white/15' : 'border-line', className)}>
      {items.map((item) => {
        const isOpen = open.includes(item.id)
        const btnId = `${baseId}-${item.id}-btn`
        const panelId = `${baseId}-${item.id}-panel`
        return (
          <div key={item.id} className={cn('border-b', dark ? 'border-white/15' : 'border-line')}>
            <h3>
              <button
                id={btnId}
                type="button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => toggle(item.id)}
                className={cn(
                  'flex min-h-11 w-full items-center justify-between gap-6 py-5 text-left text-[1.0625rem] font-semibold transition-colors',
                  dark ? 'text-cream hover:text-gold-soft' : 'text-ink hover:text-gold-text',
                )}
              >
                <span>{item.question}</span>
                <span
                  aria-hidden="true"
                  className={cn(
                    'flex size-9 shrink-0 items-center justify-center rounded-full border transition-[transform,background-color] duration-300 ease-out-soft',
                    dark ? 'border-white/25' : 'border-line',
                    isOpen && 'rotate-45',
                    isOpen && (dark ? 'bg-white/10' : 'bg-sand'),
                  )}
                >
                  <Icon name="plus" size={16} />
                </span>
              </button>
            </h3>
            <div
              id={panelId}
              role="region"
              aria-labelledby={btnId}
              className={cn(
                'grid transition-[grid-template-rows,opacity] duration-300 ease-out-soft',
                isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0',
              )}
              inert={!isOpen}
            >
              <div className="overflow-hidden">
                <div
                  className={cn(
                    'max-w-[46rem] pb-6 text-body',
                    dark ? 'text-cream/75' : 'text-muted',
                  )}
                >
                  {item.answer}
                </div>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
