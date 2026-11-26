type LexicalNode = { text?: string; children?: LexicalNode[] }

/** Plain text of a Lexical rich-text value, for reading time and descriptions. */
export function lexicalText(value: unknown): string {
  const root = (value as { root?: LexicalNode } | null)?.root
  if (!root) return ''
  const out: string[] = []
  const walk = (n: LexicalNode) => {
    if (n.text) out.push(n.text)
    n.children?.forEach(walk)
    if (n.children) out.push(' ')
  }
  walk(root)
  return out.join('').replace(/\s+/g, ' ').trim()
}

/** Minutes to read at ~200 words a minute, at least 1. */
export const readingMinutes = (text: string) => Math.max(1, Math.round(text.split(' ').filter(Boolean).length / 200))
