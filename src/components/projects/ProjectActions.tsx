'use client'

import Image from 'next/image'
import { useTranslations } from 'next-intl'

import { LeadForm } from '@/components/forms/LeadForm'
import { useSite } from '@/components/site/SiteProvider'
import { Button, Icon, StickyMobileCTA } from '@/components/ui'
import { telHref, whatsappHref } from '@/lib/contact'

export type Advisor = { name: string; role?: string | null; phone?: string | null; whatsapp?: string | null; photo?: string | null }

/** Desktop sidebar: enquiry form, brochure + site-visit buttons, call / WhatsApp, advisor. */
export function ProjectSidebar({ projectId, projectName, hasBrochure, advisor }: { projectId: string; projectName: string; hasBrochure: boolean; advisor?: Advisor | null }) {
  const t = useTranslations('project')
  const tc = useTranslations('common')
  const site = useSite()
  const phone = advisor?.phone || site.hotline
  const wa = advisor?.whatsapp || site.whatsapp
  const waMsg = t('whatsappMessage', { project: projectName })
  return (
    <div className="flex flex-col gap-4">
      <div id="enquire" className="scroll-mt-28 rounded-lg bg-white p-6 shadow-card lg:p-7">
        <h2 className="font-display text-[1.75rem] leading-tight text-ink">{t('enquireTitle')}</h2>
        <p className="mt-1 mb-5 text-small text-muted">{t('enquireBody')}</p>
        <LeadForm type="enquiry" projectId={projectId} lockProject showPromise />
      </div>
      <div className="grid grid-cols-2 gap-3">
        {hasBrochure ? (
          <Button variant="outline" iconLeft="download" onClick={() => site.openForm('brochure', projectId)} className="bg-white">
            {t('brochure')}
          </Button>
        ) : null}
        <Button variant="dark" iconLeft="calendar" onClick={() => site.openSiteVisit(projectId)} className={hasBrochure ? '' : 'col-span-2'}>
          {tc('bookVisit')}
        </Button>
        <Button href={telHref(phone)} variant="outline" iconLeft="phone" className="bg-white" data-track="call">
          {tc('call')}
        </Button>
        <Button href={whatsappHref(wa, waMsg)} variant="outline" iconLeft="whatsapp" className="bg-white" data-track="whatsapp">
          {tc('whatsapp')}
        </Button>
      </div>
      {advisor ? (
        <div className="flex items-center gap-4 rounded-lg bg-white p-5">
          {advisor.photo ? (
            <Image src={advisor.photo} alt="" width={56} height={56} className="size-14 rounded-full object-cover" />
          ) : (
            <span className="flex size-14 items-center justify-center rounded-full bg-gold-soft font-display text-2xl text-forest">{advisor.name.charAt(0)}</span>
          )}
          <div className="min-w-0 flex-1">
            <p className="text-[0.6875rem] font-semibold tracking-[1.6px] text-muted uppercase">{t('advisor')}</p>
            <p className="font-semibold text-ink">{advisor.name}</p>
            {advisor.role ? <p className="text-small text-muted">{advisor.role}</p> : null}
          </div>
          <a href={telHref(phone)} aria-label={`${tc('call')} ${advisor.name}`} data-track="call" className="flex size-11 items-center justify-center rounded-full bg-ink text-gold">
            <Icon name="phone" size={18} />
          </a>
        </div>
      ) : null}
    </div>
  )
}

export function ProjectMobileBar({ projectId, projectName }: { projectId: string; projectName: string }) {
  const t = useTranslations('project')
  const site = useSite()
  return (
    <StickyMobileCTA
      variant="bar"
      phoneHref={site.phoneHref}
      whatsappHref={whatsappHref(site.whatsapp, t('whatsappMessage', { project: projectName }))}
      primary={{ label: t('bookSiteVisit'), onClick: () => site.openSiteVisit(projectId) }}
    />
  )
}

export function BrochureButton({ projectId, className }: { projectId: string; className?: string }) {
  const t = useTranslations('project')
  const site = useSite()
  return (
    <Button variant="outline" iconLeft="download" onClick={() => site.openForm('brochure', projectId)} className={className} fullWidth>
      {t('brochure')}
    </Button>
  )
}
