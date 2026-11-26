import { RichText as LexicalRichText } from '@payloadcms/richtext-lexical/react'
import type { ComponentProps } from 'react'

import { cn } from '@/lib/cn'

type Data = ComponentProps<typeof LexicalRichText>['data']

/** Lexical content with the site's reading styles (.nr-prose in globals.css). */
export function RichText({ data, dark, className }: { data: unknown; dark?: boolean; className?: string }) {
  if (!data || typeof data !== 'object' || !('root' in data)) return null
  return (
    <LexicalRichText
      data={data as Data}
      className={cn('nr-prose', dark && 'nr-prose--dark', className)}
      disableIndent
    />
  )
}
