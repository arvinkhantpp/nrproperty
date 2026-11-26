'use client'

import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from 'react'

import { telHref, whatsappHref } from '@/lib/contact'
import type { ClientSiteConfig } from '@/lib/site'

type Ctx = ClientSiteConfig & {
  phoneHref: string
  whatsappLink: string
  /** Opens a form in the shared modal, optionally with a project pre-selected. */
  openForm: (type: ModalForm, projectId?: string) => void
  openSiteVisit: (projectId?: string) => void
  modal: ModalState
  closeModal: () => void
}

export type ModalForm = 'siteVisit' | 'enquiry' | 'brochure'
type ModalState = { open: boolean; type: ModalForm; projectId?: string }

const SiteContext = createContext<Ctx | null>(null)

export function SiteProvider({ config, children }: { config: ClientSiteConfig; children: ReactNode }) {
  const [modal, setModal] = useState<ModalState>({ open: false, type: 'siteVisit' })
  const openForm = useCallback(
    (type: ModalForm, projectId?: string) => setModal({ open: true, type, projectId }),
    [],
  )
  const openSiteVisit = useCallback((projectId?: string) => openForm('siteVisit', projectId), [openForm])
  const closeModal = useCallback(() => setModal((s) => ({ ...s, open: false })), [])

  const value = useMemo<Ctx>(
    () => ({
      ...config,
      phoneHref: telHref(config.hotline),
      whatsappLink: whatsappHref(config.whatsapp, config.whatsappMessage || undefined),
      openForm,
      openSiteVisit,
      closeModal,
      modal,
    }),
    [config, openForm, openSiteVisit, closeModal, modal],
  )
  return <SiteContext.Provider value={value}>{children}</SiteContext.Provider>
}

export function useSite() {
  const ctx = useContext(SiteContext)
  if (!ctx) throw new Error('useSite must be used inside <SiteProvider>')
  return ctx
}
