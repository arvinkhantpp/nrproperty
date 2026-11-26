// Full-page screenshots at 375 / 768 / 1440 for design review.
// Usage: node scripts/screenshots.mjs [outDir] [path ...]   (dev server must be running)
import { mkdirSync } from 'node:fs'
import { join } from 'node:path'
import { chromium } from 'playwright'

const base = process.env.BASE_URL ?? 'http://localhost:3000'
const [outDir = 'docs/screenshots/_review', ...paths] = process.argv.slice(2)
const pages = paths.length ? paths : ['/', '/styleguide', '/bn/styleguide', '/not-a-page']
const widths = (process.env.WIDTHS ?? '375,768,1440').split(',').map(Number)
const scale = Number(process.env.SCALE ?? 1)

mkdirSync(outDir, { recursive: true })
const browser = await chromium.launch()
for (const width of widths) {
  const context = await browser.newContext({
    viewport: { width, height: width < 768 ? 812 : 900 },
    deviceScaleFactor: scale,
    reducedMotion: 'reduce',
  })
  const page = await context.newPage()
  for (const path of pages) {
    await page.goto(base + path, { waitUntil: 'networkidle' })
    await page.evaluate(() => document.fonts.ready)
    // Scroll through the page so lazy images and scroll reveals load before the full-page shot.
    await page.evaluate(async () => {
      for (let y = 0; y < document.body.scrollHeight; y += window.innerHeight / 2) {
        window.scrollTo(0, y)
        await new Promise((r) => setTimeout(r, 80))
      }
      window.scrollTo(0, 0)
    })
    await page.waitForLoadState('networkidle')
    const overflow = await page.evaluate(
      () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
    )
    const name = `${(path.replace(/\//g, '_') || '_').replace(/^_/, '') || 'home'}-${width}.png`
    await page.screenshot({ path: join(outDir, name), fullPage: true })
    console.log(`${name}${overflow > 0 ? `  ⚠ horizontal overflow ${overflow}px` : ''}`)
  }
  await context.close()
}
await browser.close()
