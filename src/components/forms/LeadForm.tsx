'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useTranslations } from 'next-intl'
import { useRef, useState, useTransition } from 'react'
import { useForm, type Resolver } from 'react-hook-form'

import { Button, Input, Select, Textarea, type FieldTheme } from '@/components/ui'
import { useSite } from '@/components/site/SiteProvider'
import { Link, useRouter } from '@/i18n/navigation'
import { cn } from '@/lib/cn'
import { schemas, type FormType } from '@/lib/forms/schemas'
import { submitLead } from '@/lib/forms/submit'
import { getAttribution, newEventId } from '@/lib/tracking/attribution'

import { DocumentsField, uploadDocuments } from './DocumentsField'
import { Turnstile, type TurnstileHandle } from './Turnstile'

type Values = Record<string, string>

type Kind = 'text' | 'tel' | 'email' | 'date' | 'number' | 'textarea' | 'select' | 'radio' | 'files'
type FieldDef = {
  name: string
  kind: Kind
  required?: boolean
  half?: boolean
  options?: 'projects' | 'bedrooms' | 'timeSlots' | 'budgetRanges' | 'bestTimes' | 'subjects' | 'ownership'
  autoComplete?: string
  inputMode?: 'numeric' | 'decimal' | 'tel' | 'email'
}

const NAME: FieldDef = { name: 'name', kind: 'text', required: true, autoComplete: 'name' }
const PHONE: FieldDef = { name: 'phone', kind: 'tel', required: true, autoComplete: 'tel', inputMode: 'tel' }
const PROJECT: FieldDef = { name: 'project', kind: 'select', required: true, options: 'projects' }
const MESSAGE: FieldDef = { name: 'message', kind: 'textarea' }

/** Which fields each form shows, in order. `half` pairs fields side by side from sm up. */
const FIELDS: Record<FormType, FieldDef[]> = {
  enquiry: [NAME, PHONE, PROJECT, { name: 'bedrooms', kind: 'select', options: 'bedrooms' }, MESSAGE],
  brochure: [NAME, PHONE, PROJECT],
  siteVisit: [
    NAME,
    PHONE,
    PROJECT,
    { name: 'visitDate', kind: 'date', required: true, half: true },
    { name: 'timeSlot', kind: 'select', required: true, half: true, options: 'timeSlots' },
  ],
  landowner: [
    { ...NAME, half: true },
    { ...PHONE, half: true },
    { name: 'email', kind: 'email', autoComplete: 'email', inputMode: 'email' },
    { name: 'area', kind: 'text', required: true, half: true },
    { name: 'plotAddress', kind: 'text', half: true },
    { name: 'landSizeKatha', kind: 'number', required: true, half: true, inputMode: 'decimal' },
    { name: 'frontRoadFt', kind: 'number', half: true, inputMode: 'numeric' },
    { name: 'ownership', kind: 'radio', required: true, options: 'ownership' },
    { name: 'documents', kind: 'files' },
    MESSAGE,
  ],
  nrb: [
    { ...NAME, half: true },
    { name: 'country', kind: 'text', required: true, half: true, autoComplete: 'country-name' },
    { name: 'whatsapp', kind: 'tel', required: true, half: true, autoComplete: 'tel', inputMode: 'tel' },
    { name: 'email', kind: 'email', required: true, half: true, autoComplete: 'email', inputMode: 'email' },
    { name: 'project', kind: 'select', options: 'projects' },
    { name: 'budgetRange', kind: 'select', half: true, options: 'budgetRanges' },
    { name: 'bestTimeToCall', kind: 'select', half: true, options: 'bestTimes' },
    MESSAGE,
  ],
  contact: [
    { ...NAME, half: true },
    { ...PHONE, half: true },
    { name: 'email', kind: 'email', autoComplete: 'email', inputMode: 'email' },
    { name: 'subject', kind: 'select', required: true, options: 'subjects' },
    { ...MESSAGE, required: true },
  ],
}

const PLACEHOLDER_KEY: Record<string, string> = {
  project: 'projectPlaceholder',
  bedrooms: 'bedroomsPlaceholder',
  timeSlot: 'timeSlotPlaceholder',
  budgetRange: 'budgetPlaceholder',
  bestTimeToCall: 'bestTimePlaceholder',
  subject: 'subjectPlaceholder',
  name: 'namePlaceholder',
  phone: 'phonePlaceholder',
  email: 'emailPlaceholder',
  area: 'areaPlaceholder',
  plotAddress: 'plotAddressPlaceholder',
  country: 'countryPlaceholder',
  whatsapp: 'whatsappPlaceholder',
  message: 'messagePlaceholder',
}

export type LeadFormProps = {
  type: FormType
  theme?: FieldTheme
  /** Pre-selects a project. With `lockProject`, the project select is hidden (used on project pages). */
  projectId?: string
  lockProject?: boolean
  submitLabel?: string
  /** Called after a successful save, before navigating to the thank-you page. */
  onSuccess?: () => void
  className?: string
  /** Show the "advisor will call you" line under the button. */
  showPromise?: boolean
}

const todayISO = () => {
  const d = new Date()
  d.setMinutes(d.getMinutes() - d.getTimezoneOffset())
  return d.toISOString().slice(0, 10)
}

export function LeadForm({
  type,
  theme = 'light',
  projectId,
  lockProject,
  submitLabel,
  onSuccess,
  className,
  showPromise,
}: LeadFormProps) {
  const t = useTranslations('forms')
  const tv = useTranslations('validation')
  const site = useSite()
  const router = useRouter()
  const [pending, startTransition] = useTransition()
  const [formError, setFormError] = useState<string | null>(null)
  const [files, setFiles] = useState<File[]>([])
  const [fileError, setFileError] = useState<string | null>(null)
  const [uploading, setUploading] = useState(false)
  const [token, setToken] = useState('')
  const turnstile = useRef<TurnstileHandle>(null)
  const honeypot = useRef<HTMLInputElement>(null)
  const config = site.forms[type]

  const fields = FIELDS[type].filter(
    (f) => !config.hidden.includes(f.name) && !(lockProject && f.name === 'project'),
  )

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<Values>({
    resolver: zodResolver(schemas[type] as typeof schemas.brochure) as unknown as Resolver<Values>,
    defaultValues: { project: projectId ?? '' },
    mode: 'onTouched',
  })

  const label = (name: string) => config.labels[name]?.label || t(name as 'name')
  const placeholder = (name: string) => {
    const override = config.labels[name]?.placeholder
    if (override) return override
    const key = PLACEHOLDER_KEY[name]
    return key ? t(key as 'namePlaceholder') : undefined
  }
  const errorText = (name: string) => {
    const msg = errors[name]?.message
    if (!msg) return undefined
    return tv.has(msg as 'generic') ? tv(msg as 'generic') : tv('generic')
  }
  const optionList = (src: FieldDef['options']) => {
    switch (src) {
      case 'projects':
        return site.projects.map((p) => ({ value: p.value, label: p.label }))
      case 'ownership':
        return [
          { value: 'single', label: t('ownershipSingle') },
          { value: 'joint', label: t('ownershipJoint') },
        ]
      case undefined:
        return []
      default:
        return site.options[src]
    }
  }

  const onSubmit = handleSubmit((values) => {
    setFormError(null)
    const eventId = newEventId()
    const payloadValues = { ...values, ...(lockProject && projectId ? { project: projectId } : {}) }
    startTransition(async () => {
      let documents: string[] = []
      if (files.length) {
        setUploading(true)
        const up = await uploadDocuments(files).catch(() => ({ ok: false as const, error: 'uploadFailed' }))
        setUploading(false)
        if (!up.ok) {
          setFormError(tv.has(up.error as 'generic') ? tv(up.error as 'generic') : tv('generic'))
          return
        }
        documents = up.refs
      }
      const res = await submitLead({
        type,
        values: payloadValues,
        tracking: { ...getAttribution(), eventId },
        turnstileToken: token || undefined,
        documents,
        website: honeypot.current?.value || undefined,
      }).catch(() => ({ ok: false as const, error: 'generic' }))
      if (!res.ok) {
        turnstile.current?.reset()
        if ('fieldErrors' in res && res.fieldErrors) {
          for (const [name, message] of Object.entries(res.fieldErrors)) setError(name, { message })
        }
        setFormError(tv.has(res.error as 'generic') ? tv(res.error as 'generic') : tv('generic'))
        return
      }
      // Tracking (Phase 5) listens for this to fire Lead / Schedule events with the same event id.
      window.dispatchEvent(
        new CustomEvent('nr:lead', { detail: { type, eventId, projectId: payloadValues.project } }),
      )
      onSuccess?.()
      router.push(res.redirect)
    })
  })

  const dark = theme === 'dark'

  return (
    <form onSubmit={onSubmit} noValidate className={cn('relative grid grid-cols-1 gap-4 sm:grid-cols-2', className)}>
      {fields.map((f) => {
        const common = {
          label: label(f.name),
          error: errorText(f.name),
          theme,
          required: f.required,
          containerClassName: f.half ? 'sm:col-span-1' : 'sm:col-span-2',
        }
        if (f.kind === 'select') {
          return (
            <Select
              key={f.name}
              {...common}
              options={optionList(f.options)}
              placeholder={placeholder(f.name)}
              {...register(f.name)}
            />
          )
        }
        if (f.kind === 'textarea') {
          return (
            <Textarea
              key={f.name}
              {...common}
              rows={3}
              placeholder={placeholder(f.name)}
              {...register(f.name)}
            />
          )
        }
        if (f.kind === 'files') {
          return (
            <DocumentsField
              key={f.name}
              label={label(f.name)}
              files={files}
              onChange={setFiles}
              error={fileError ? tv(fileError as 'fileType') : undefined}
              onError={setFileError}
              dark={dark}
            />
          )
        }
        if (f.kind === 'radio') {
          const err = errorText(f.name)
          return (
            <fieldset key={f.name} className="sm:col-span-2" aria-invalid={err ? true : undefined}>
              <legend className={cn('mb-2 text-label', dark ? 'text-cream' : 'text-ink')}>
                {label(f.name)}
                {f.required ? <span className={dark ? 'text-gold-light' : 'text-gold-text'}> *</span> : null}
              </legend>
              <div className="flex flex-wrap gap-3">
                {optionList(f.options).map((o) => (
                  <label
                    key={o.value}
                    className={cn(
                      'flex min-h-12 cursor-pointer items-center gap-2.5 rounded-sm border px-4 text-body transition-colors has-[:checked]:border-gold',
                      dark
                        ? 'border-white/20 text-cream has-[:checked]:bg-white/10'
                        : 'border-line bg-white text-ink has-[:checked]:bg-gold-soft/40',
                    )}
                  >
                    <input type="radio" value={o.value} className="size-4 accent-[var(--nr-gold)]" {...register(f.name)} />
                    {o.label}
                  </label>
                ))}
              </div>
              {err ? (
                <p role="alert" className={cn('mt-1.5 text-small font-medium', dark ? 'text-[#F2A79D]' : 'text-danger')}>
                  {err}
                </p>
              ) : null}
            </fieldset>
          )
        }
        return (
          <Input
            key={f.name}
            {...common}
            type={f.kind}
            autoComplete={f.autoComplete}
            inputMode={f.inputMode}
            placeholder={f.kind === 'date' ? undefined : placeholder(f.name)}
            min={f.kind === 'date' ? todayISO() : f.kind === 'number' ? 0 : undefined}
            step={f.kind === 'number' ? 'any' : undefined}
            {...register(f.name)}
          />
        )
      })}

      {/* Honeypot: hidden from people and screen readers; bots that fill it are discarded. */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label>
          Website
          <input ref={honeypot} type="text" name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>
      <Turnstile ref={turnstile} onToken={setToken} />

      <div className="flex flex-col gap-3 sm:col-span-2">
        {formError ? (
          <p
            role="alert"
            className={cn(
              'rounded-sm px-4 py-3 text-small font-medium',
              dark ? 'bg-[#F2A79D]/15 text-[#F2A79D]' : 'bg-danger/10 text-danger',
            )}
          >
            {formError}
          </p>
        ) : null}
        <Button type="submit" size="lg" fullWidth loading={pending}>
          {uploading ? t('uploading') : pending ? t('submitting') : submitLabel || config.submitLabel || t(`${type}Submit` as 'enquirySubmit')}
        </Button>
        {showPromise ? (
          <p className={cn('text-center text-small', dark ? 'text-cream/70' : 'text-muted')}>{t('callbackPromise')}</p>
        ) : null}
        <p className={cn('text-small', dark ? 'text-cream/60' : 'text-muted')}>
          {t.rich('consent', {
            link: (chunks) => (
              <Link href="/privacy" className={cn('underline underline-offset-2', dark ? 'text-cream' : 'text-ink')}>
                {chunks}
              </Link>
            ),
          })}
        </p>
      </div>
    </form>
  )
}
