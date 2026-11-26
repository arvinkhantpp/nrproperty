import { draftMode } from 'next/headers'

/** Shown only to editors who opened a draft from the admin "Preview" button. */
export async function DraftBar() {
  let on = false
  try {
    on = (await draftMode()).isEnabled
  } catch {
    on = false
  }
  if (!on) return null
  return (
    <div className="fixed bottom-4 left-1/2 z-[70] flex -translate-x-1/2 items-center gap-3 rounded-full bg-ink px-4 py-2 text-sm text-white shadow-lg">
      <span className="size-2 rounded-full bg-gold" aria-hidden="true" />
      Previewing unpublished changes
      {/* A form, not a link: a prefetched link would switch preview off by itself. */}
      <form action="/api/exit-preview" method="get">
        <button type="submit" className="cursor-pointer font-semibold text-gold underline underline-offset-2">
          Exit preview
        </button>
      </form>
    </div>
  )
}
