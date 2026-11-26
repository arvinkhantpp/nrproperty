/** Minimal Lexical JSON builders for seed content. */
type Node = { [k: string]: unknown; type: string; version: number }

const text = (t: string, format = 0): Node => ({
  type: 'text',
  text: t,
  format,
  detail: 0,
  mode: 'normal',
  style: '',
  version: 1,
})

const paragraph = (t: string): Node => ({
  type: 'paragraph',
  children: [text(t)],
  direction: 'ltr',
  format: '',
  indent: 0,
  textFormat: 0,
  version: 1,
})

const heading = (t: string, tag: 'h2' | 'h3' = 'h2'): Node => ({
  type: 'heading',
  tag,
  children: [text(t)],
  direction: 'ltr',
  format: '',
  indent: 0,
  version: 1,
})

/** Lines starting with "## " become h2, "### " h3, the rest paragraphs. */
export function richText(...lines: string[]) {
  return {
    root: {
      type: 'root',
      children: lines.map((l) =>
        l.startsWith('### ')
          ? heading(l.slice(4), 'h3')
          : l.startsWith('## ')
            ? heading(l.slice(3))
            : paragraph(l),
      ),
      direction: 'ltr' as const,
      format: '' as const,
      indent: 0,
      version: 1,
    },
  }
}
