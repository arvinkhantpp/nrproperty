import { Cormorant_Garamond, Hind_Siliguri, Manrope } from 'next/font/google'

export const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['500'],
  style: ['normal', 'italic'],
  variable: '--font-cormorant',
  display: 'swap',
})

// Variable font: one file covers every weight.
export const manrope = Manrope({
  subsets: ['latin'],
  variable: '--font-manrope',
  display: 'swap',
})

// Only downloaded by the browser when Bengali characters are on the page (unicode-range).
// Two weights keep the Bangla download small: 500 renders as 400 and 700 as 600.
export const hind = Hind_Siliguri({
  subsets: ['bengali', 'latin'],
  weight: ['400', '600'],
  variable: '--font-hind',
  display: 'swap',
  preload: false,
})

export const fontVariables = `${cormorant.variable} ${manrope.variable} ${hind.variable}`
