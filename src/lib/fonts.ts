import { Cormorant_Garamond, Hind_Siliguri, Manrope } from 'next/font/google'

export const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['500'],
  style: ['normal', 'italic'],
  variable: '--font-cormorant',
  display: 'swap',
})

export const manrope = Manrope({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-manrope',
  display: 'swap',
})

// Only downloaded by the browser when Bengali characters are on the page (unicode-range).
export const hind = Hind_Siliguri({
  subsets: ['bengali', 'latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-hind',
  display: 'swap',
  preload: false,
})

export const fontVariables = `${cormorant.variable} ${manrope.variable} ${hind.variable}`
