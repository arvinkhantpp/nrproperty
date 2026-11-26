'use client'

import { useLocale } from 'next-intl'
import { useEffect, useImperativeHandle, useRef, type Ref } from 'react'

type TurnstileApi = {
  render: (el: HTMLElement, opts: Record<string, unknown>) => string
  reset: (id: string) => void
  remove: (id: string) => void
}
declare global {
  interface Window {
    turnstile?: TurnstileApi
    __nrTurnstile?: Promise<void>
  }
}

const SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY

function loadScript() {
  if (window.turnstile) return Promise.resolve()
  window.__nrTurnstile ??= new Promise<void>((resolve, reject) => {
    const s = document.createElement('script')
    s.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit'
    s.async = true
    s.onload = () => resolve()
    s.onerror = () => reject(new Error('turnstile'))
    document.head.appendChild(s)
  })
  return window.__nrTurnstile
}

export type TurnstileHandle = { reset: () => void }

/**
 * Cloudflare Turnstile in "interaction-only" mode: invisible for almost everyone, a checkbox
 * only when Cloudflare is unsure. Renders nothing when no site key is configured.
 */
export function Turnstile({ onToken, ref }: { onToken: (token: string) => void; ref?: Ref<TurnstileHandle> }) {
  const el = useRef<HTMLDivElement>(null)
  const widget = useRef<string | null>(null)
  const locale = useLocale()

  useImperativeHandle(ref, () => ({
    reset: () => {
      if (widget.current && window.turnstile) window.turnstile.reset(widget.current)
    },
  }))

  useEffect(() => {
    if (!SITE_KEY || !el.current) return
    let cancelled = false
    loadScript()
      .then(() => {
        if (cancelled || !el.current || !window.turnstile) return
        widget.current = window.turnstile.render(el.current, {
          sitekey: SITE_KEY,
          appearance: 'interaction-only',
          language: locale === 'bn' ? 'bn' : 'en',
          callback: onToken,
          'expired-callback': () => onToken(''),
        })
      })
      .catch(() => onToken(''))
    return () => {
      cancelled = true
      if (widget.current && window.turnstile) window.turnstile.remove(widget.current)
      widget.current = null
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [locale])

  if (!SITE_KEY) return null
  return <div ref={el} className="sm:col-span-2 empty:hidden" />
}
