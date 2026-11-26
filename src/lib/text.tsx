import { Fragment, type ReactNode } from 'react'

import { Accent, type Tone } from '@/components/ui/SectionHeader'

/** "Homes crafted with patience, *built on trust.*" → the starred phrase becomes the gold italic accent. */
export function withAccent(text: string | null | undefined, tone: Tone = 'light'): ReactNode {
  if (!text) return null
  const parts = text.split(/\*([^*]+)\*/g)
  return parts.map((part, i) =>
    i % 2 === 1 ? (
      <Accent key={i} tone={tone}>
        {part}
      </Accent>
    ) : (
      <Fragment key={i}>{part}</Fragment>
    ),
  )
}

export const plain = (text: string | null | undefined) => (text ?? '').replace(/\*/g, '')
