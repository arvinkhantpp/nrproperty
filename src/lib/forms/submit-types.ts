import type { FormType, Tracking } from './schemas'

export type SubmitInput = {
  type: FormType
  values: Record<string, unknown>
  tracking: Tracking & { eventId?: string; fbp?: string; fbc?: string }
  turnstileToken?: string
}

export type SubmitResult =
  | { ok: true; leadId: number; redirect: string }
  | { ok: false; error: string; fieldErrors?: Record<string, string> }
