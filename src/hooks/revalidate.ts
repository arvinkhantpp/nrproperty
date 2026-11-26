import { revalidateTag } from 'next/cache'
import type {
  CollectionAfterChangeHook,
  CollectionAfterDeleteHook,
  GlobalAfterChangeHook,
} from 'payload'

/**
 * Cache tags. Pages read CMS data through `unstable_cache` with these tags, so a save in the admin
 * refreshes the site within seconds (on-demand ISR).
 */
export const tags = {
  global: (slug: string) => `global:${slug}`,
  collection: (slug: string) => `collection:${slug}`,
  doc: (slug: string, key: string) => `${slug}:${key}`,
}

function safeRevalidate(tag: string) {
  try {
    revalidateTag(tag)
  } catch {
    // Outside a Next.js request (seed script, CLI) there is no cache to clear.
  }
}

export const revalidateGlobal: GlobalAfterChangeHook = ({ global, doc }) => {
  safeRevalidate(tags.global(global.slug))
  return doc
}

export const revalidateCollection: CollectionAfterChangeHook = ({
  collection,
  doc,
  previousDoc,
}) => {
  safeRevalidate(tags.collection(collection.slug))
  if (doc?.slug) safeRevalidate(tags.doc(collection.slug, doc.slug))
  if (previousDoc?.slug && previousDoc.slug !== doc?.slug)
    safeRevalidate(tags.doc(collection.slug, previousDoc.slug))
  return doc
}

export const revalidateCollectionDelete: CollectionAfterDeleteHook = ({ collection, doc }) => {
  safeRevalidate(tags.collection(collection.slug))
  if (doc?.slug) safeRevalidate(tags.doc(collection.slug, doc.slug))
  return doc
}

export const revalidateHooks = {
  afterChange: [revalidateCollection],
  afterDelete: [revalidateCollectionDelete],
}
