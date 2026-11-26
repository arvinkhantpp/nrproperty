'use client'

import { useTranslations } from 'next-intl'
import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from 'react'

import { cn } from '@/lib/cn'

import { Icon, type IconName } from './Icon'

type ToastTone = 'success' | 'error' | 'info'
type ToastInput = { title: string; description?: string; tone?: ToastTone; durationMs?: number }
type ToastItem = ToastInput & { id: number }

const ToastContext = createContext<((t: ToastInput) => void) | null>(null)

const toneStyles: Record<ToastTone, { icon: IconName; color: string }> = {
  success: { icon: 'check', color: 'bg-success text-white' },
  error: { icon: 'alert', color: 'bg-danger text-white' },
  info: { icon: 'info', color: 'bg-info text-white' },
}

export function ToastProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<ToastItem[]>([])
  const nextId = useRef(1)
  const t = useTranslations('toast')

  const dismiss = useCallback((id: number) => setItems((cur) => cur.filter((x) => x.id !== id)), [])

  const toast = useCallback(
    (input: ToastInput) => {
      const id = nextId.current++
      setItems((cur) => [...cur.slice(-2), { ...input, id }])
      window.setTimeout(() => dismiss(id), input.durationMs ?? 5000)
    },
    [dismiss],
  )

  const value = useMemo(() => toast, [toast])

  return (
    <ToastContext.Provider value={value}>
      {children}
      <div
        aria-live="polite"
        aria-atomic="false"
        className="pointer-events-none fixed inset-x-4 bottom-[calc(6.5rem+env(safe-area-inset-bottom))] z-[60] flex flex-col items-center gap-2 lg:right-6 lg:bottom-6 lg:left-auto lg:items-end"
      >
        {items.map((item) => {
          const tone = toneStyles[item.tone ?? 'success']
          return (
            <div
              key={item.id}
              role={item.tone === 'error' ? 'alert' : 'status'}
              className="pointer-events-auto flex w-full max-w-sm animate-toast-in items-start gap-3 rounded-md bg-ink p-4 pr-3 text-cream shadow-float"
            >
              <span
                className={cn(
                  'mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full',
                  tone.color,
                )}
              >
                <Icon name={tone.icon} size={14} strokeWidth={2.2} />
              </span>
              <div className="flex flex-1 flex-col gap-0.5">
                <p className="text-label">{item.title}</p>
                {item.description ? (
                  <p className="text-small text-cream/70">{item.description}</p>
                ) : null}
              </div>
              <button
                type="button"
                onClick={() => dismiss(item.id)}
                aria-label={t('dismiss')}
                className="-my-1 flex size-9 shrink-0 items-center justify-center rounded-full text-cream/70 transition-colors hover:bg-white/10 hover:text-cream"
              >
                <Icon name="close" size={16} />
              </button>
            </div>
          )
        })}
      </div>
    </ToastContext.Provider>
  )
}

export function useToast() {
  const ctx = useContext(ToastContext)
  if (!ctx) throw new Error('useToast must be used inside <ToastProvider>')
  return ctx
}
