'use client'

import { useTranslations } from 'next-intl'
import { useEffect, useId, useRef, type ReactNode } from 'react'

import { cn } from '@/lib/cn'

import { Icon } from './Icon'

type Props = {
  open: boolean
  onClose: () => void
  title: ReactNode
  description?: ReactNode
  children: ReactNode
  /** "modal": centred card. "drawer": slides in from the right (bottom sheet on phones). */
  variant?: 'modal' | 'drawer'
  className?: string
}

/**
 * Built on the native <dialog>: focus trapping, Esc to close, inert background and top-layer
 * stacking come from the browser. Animations are CSS (see .nr-dialog in globals.css).
 */
export function Modal({
  open,
  onClose,
  title,
  description,
  children,
  variant = 'modal',
  className,
}: Props) {
  const ref = useRef<HTMLDialogElement>(null)
  const t = useTranslations('common')
  const titleId = useId()
  const descId = useId()

  useEffect(() => {
    const dialog = ref.current
    if (!dialog) return
    if (open && !dialog.open) dialog.showModal()
    if (!open && dialog.open) dialog.close()
  }, [open])

  // Lock page scroll behind the dialog.
  useEffect(() => {
    if (!open) return
    const prev = document.documentElement.style.overflow
    document.documentElement.style.overflow = 'hidden'
    return () => {
      document.documentElement.style.overflow = prev
    }
  }, [open])

  return (
    <dialog
      ref={ref}
      aria-labelledby={titleId}
      aria-describedby={description ? descId : undefined}
      onClose={onClose}
      onCancel={(e) => {
        e.preventDefault()
        onClose()
      }}
      // Click on the backdrop (the dialog element itself, outside the panel) closes it.
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose()
      }}
      className={cn(
        'nr-dialog m-0 max-h-none max-w-none bg-transparent p-0 text-text backdrop:bg-ink/55',
        variant === 'modal' ? 'nr-dialog--modal' : 'nr-dialog--drawer',
      )}
    >
      <div
        className={cn(
          'nr-dialog__panel flex flex-col overflow-hidden bg-cream shadow-float',
          variant === 'modal'
            ? 'max-h-[calc(100dvh-2rem)] w-[min(36rem,calc(100vw-2rem))] rounded-xl'
            : 'max-h-[92dvh] w-screen rounded-t-xl sm:h-dvh sm:max-h-none sm:w-[min(30rem,100vw)] sm:rounded-none',
          className,
        )}
      >
        <div className="flex items-start justify-between gap-6 border-b border-line px-6 pt-6 pb-5 sm:px-8">
          <div className="flex flex-col gap-1.5">
            <h2 id={titleId} className="text-display-s text-ink">
              {title}
            </h2>
            {description ? (
              <p id={descId} className="text-body text-muted">
                {description}
              </p>
            ) : null}
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label={t('close')}
            className="-mt-1 -mr-2 flex size-11 shrink-0 items-center justify-center rounded-full text-ink transition-colors hover:bg-sand"
          >
            <Icon name="close" size={20} />
          </button>
        </div>
        <div className="overflow-y-auto px-6 py-6 sm:px-8">{children}</div>
      </div>
    </dialog>
  )
}
