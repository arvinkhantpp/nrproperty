'use client'

import { FieldDescription, FieldLabel, useField } from '@payloadcms/ui'
import type { TextFieldClientComponent } from 'payload'

/** Colour picker + hex input + "Reset" for the Branding colour tokens. */
export const ColorField: TextFieldClientComponent = ({ field, path }) => {
  const { value, setValue } = useField<string>({ path })
  const placeholder = (field.admin?.placeholder as string | undefined) ?? '#000000'
  const current = value || placeholder

  return (
    <div className="field-type text" style={{ marginBottom: 16 }}>
      <FieldLabel label={field.label ?? field.name} path={path} />
      <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
        <input
          type="color"
          aria-label="Pick colour"
          value={current}
          onChange={(e) => setValue(e.target.value.toUpperCase())}
          style={{
            width: 44,
            height: 40,
            padding: 0,
            border: '1px solid var(--theme-elevation-150)',
            borderRadius: 6,
            background: 'none',
          }}
        />
        <input
          type="text"
          value={value ?? ''}
          placeholder={placeholder}
          onChange={(e) => setValue(e.target.value)}
          style={{
            flex: 1,
            height: 40,
            padding: '0 12px',
            borderRadius: 6,
            border: '1px solid var(--theme-elevation-150)',
            fontFamily: 'monospace',
          }}
        />
        <button
          type="button"
          onClick={() => setValue('')}
          disabled={!value}
          className="btn btn--style-secondary btn--size-small"
          style={{ margin: 0 }}
        >
          Reset
        </button>
      </div>
      <FieldDescription description={field.admin?.description} path={path} />
    </div>
  )
}
