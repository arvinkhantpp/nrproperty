'use client'

import { useTranslations } from 'next-intl'

import { LeadForm } from '@/components/forms/LeadForm'
import { Modal } from '@/components/ui'

import { useSite } from './SiteProvider'

const DESCRIPTION = { siteVisit: 'siteVisitDescription', enquiry: 'callbackPromise', brochure: 'brochureDescription' } as const

/** One shared modal for "Book a Visit", quick enquiries and brochure requests. */
export function FormModal() {
  const t = useTranslations('forms')
  const site = useSite()
  const { open, type, projectId } = site.modal
  const cfg = site.forms[type]
  return (
    <Modal
      open={open}
      onClose={site.closeModal}
      title={cfg.title || t(`${type}Title`)}
      description={t(DESCRIPTION[type])}
    >
      {open ? (
        <LeadForm key={`${type}-${projectId ?? ''}`} type={type} projectId={projectId} onSuccess={site.closeModal} />
      ) : null}
    </Modal>
  )
}
