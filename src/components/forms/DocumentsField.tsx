'use client'

import { useTranslations } from 'next-intl'
import { useId, useRef } from 'react'

import { Icon } from '@/components/ui'
import { cn } from '@/lib/cn'
import { prepareDocumentUploads, uploadDocument } from '@/lib/forms/uploads'

export const DOC_ACCEPT = ['image/jpeg', 'image/png', 'application/pdf']
export const DOC_MAX_BYTES = 10 * 1024 * 1024
export const DOC_MAX_FILES = 5

const sizeLabel = (b: number) => (b > 1024 * 1024 ? `${(b / 1024 / 1024).toFixed(1)} MB` : `${Math.max(1, Math.round(b / 1024))} KB`)

/** Uploads the chosen files and returns references for submitLead (R2 keys or signed tokens). */
export async function uploadDocuments(files: File[]): Promise<{ ok: true; refs: string[] } | { ok: false; error: string }> {
  if (!files.length) return { ok: true, refs: [] }
  const prep = await prepareDocumentUploads(files.map((f) => ({ name: f.name, type: f.type, size: f.size })))
  if (!prep.ok) return { ok: false, error: prep.error }
  if (prep.mode === 'direct') {
    const results = await Promise.all(
      prep.uploads.map((u, i) =>
        fetch(u.url, { method: 'PUT', body: files[i], headers: { 'Content-Type': files[i]!.type } }).then((r) => r.ok),
      ),
    )
    if (results.some((r) => !r)) return { ok: false, error: 'uploadFailed' }
    return { ok: true, refs: prep.uploads.map((u) => u.key) }
  }
  const refs: string[] = []
  for (const file of files) {
    const fd = new FormData()
    fd.set('file', file)
    const res = await uploadDocument(fd)
    if (!res.ok) return { ok: false, error: res.error }
    refs.push(res.token)
  }
  return { ok: true, refs }
}

type Props = {
  label: string
  files: File[]
  onChange: (files: File[]) => void
  error?: string
  onError: (key: string | null) => void
  dark?: boolean
}

export function DocumentsField({ label, files, onChange, error, onError, dark }: Props) {
  const t = useTranslations('forms')
  const id = useId()
  const input = useRef<HTMLInputElement>(null)

  const add = (list: FileList | null) => {
    if (!list) return
    const next = [...files]
    for (const f of Array.from(list)) {
      if (!DOC_ACCEPT.includes(f.type)) return onError('fileType')
      if (f.size > DOC_MAX_BYTES) return onError('fileSize')
      if (next.length >= DOC_MAX_FILES) return onError('fileCount')
      next.push(f)
    }
    onError(null)
    onChange(next)
    if (input.current) input.current.value = ''
  }

  return (
    <div className="sm:col-span-2">
      <p id={`${id}-label`} className={cn('mb-2 text-label', dark ? 'text-cream' : 'text-ink')}>
        {label}
      </p>
      <label
        htmlFor={id}
        className={cn(
          'flex min-h-14 cursor-pointer items-center justify-center gap-2.5 rounded-sm border border-dashed px-4 py-3 text-body font-semibold transition-colors',
          dark ? 'border-white/25 text-cream hover:border-gold' : 'border-line bg-white text-ink hover:border-gold',
          error && 'border-danger',
        )}
      >
        <Icon name="plus" size={18} />
        {t('documentsChoose')}
      </label>
      <input
        ref={input}
        id={id}
        type="file"
        multiple
        accept=".jpg,.jpeg,.png,.pdf,image/jpeg,image/png,application/pdf"
        aria-labelledby={`${id}-label`}
        aria-describedby={`${id}-hint`}
        className="sr-only"
        onChange={(e) => add(e.target.files)}
      />
      <p id={`${id}-hint`} className={cn('mt-1.5 text-small', dark ? 'text-cream/60' : 'text-muted')}>
        {t('documentsHint')}
      </p>
      {error ? (
        <p role="alert" className={cn('mt-1.5 text-small font-medium', dark ? 'text-[#F2A79D]' : 'text-danger')}>
          {error}
        </p>
      ) : null}
      {files.length ? (
        <ul className="mt-3 flex flex-col gap-2">
          {files.map((f, i) => (
            <li
              key={`${f.name}-${i}`}
              className={cn('flex items-center gap-3 rounded-sm px-3 py-2 text-small', dark ? 'bg-white/[0.06] text-cream' : 'bg-cream text-ink')}
            >
              <Icon name={f.type === 'application/pdf' ? 'layers' : 'grid'} size={16} className="shrink-0 opacity-70" />
              <span className="min-w-0 flex-1 truncate">{f.name}</span>
              <span className="shrink-0 opacity-60">{sizeLabel(f.size)}</span>
              <button
                type="button"
                onClick={() => onChange(files.filter((_, j) => j !== i))}
                aria-label={`${t('documentsRemove')} ${f.name}`}
                className="-mr-1 flex size-9 shrink-0 items-center justify-center rounded-full hover:bg-black/10"
              >
                <Icon name="close" size={16} />
              </button>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  )
}
