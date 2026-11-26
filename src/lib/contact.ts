/** "01816-917164" → "+8801816917164". Accepts local (01…), 8801… or +8801… forms. */
export function toE164BD(phone: string): string {
  const digits = phone.replace(/\D/g, '')
  if (digits.startsWith('880')) return `+${digits}`
  if (digits.startsWith('0')) return `+88${digits}`
  return `+${digits}`
}

export const telHref = (phone: string) => `tel:${toE164BD(phone)}`

export function whatsappHref(phone: string, message?: string) {
  const number = toE164BD(phone).replace('+', '')
  return `https://wa.me/${number}${message ? `?text=${encodeURIComponent(message)}` : ''}`
}
