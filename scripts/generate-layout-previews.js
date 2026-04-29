import { mkdir } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { chromium } from 'playwright'
import { createServer } from 'vite'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.resolve(__dirname, '..')
const outputDir = path.join(root, 'public', 'previews')
const layouts = Array.from({ length: 20 }, (_, index) => `layout-${String(index + 1).padStart(2, '0')}.html`)

const previewCss = `
  html { scroll-behavior: auto !important; }
  *, *::before, *::after {
    animation: none !important;
    transition: none !important;
    caret-color: transparent !important;
  }
  #chr-customizer-mount,
  #chr-customizer-panel,
  #chr-customizer-toggle,
  .chr-toast {
    display: none !important;
  }
`

async function main() {
  await mkdir(outputDir, { recursive: true })

  const server = await createServer({
    root,
    server: {
      host: '127.0.0.1',
      port: 0,
      strictPort: false,
    },
    logLevel: 'error',
  })

  let browser

  try {
    await server.listen()
    const baseUrl = server.resolvedUrls?.local?.[0]
    if (!baseUrl) throw new Error('Vite did not expose a local preview URL.')

    browser = await chromium.launch({ headless: true })
    const page = await browser.newPage({
      viewport: { width: 1440, height: 900 },
      deviceScaleFactor: 1,
    })

    await page.addInitScript(() => {
      localStorage.clear()
      sessionStorage.clear()
    })

    for (const layout of layouts) {
      const url = new URL(layout, baseUrl)
      url.searchParams.set('preview-thumb', '1')

      await page.goto(url.href, { waitUntil: 'domcontentloaded' })
      await page.addStyleTag({ content: previewCss })
      await page.evaluate(() => window.scrollTo(0, 0))
      await page.waitForTimeout(250)

      const fileName = layout.replace('.html', '.jpg')
      await page.screenshot({
        path: path.join(outputDir, fileName),
        type: 'jpeg',
        quality: 82,
        fullPage: false,
      })

      console.log(`Generated public/previews/${fileName}`)
    }
  } finally {
    await browser?.close()
    await server.close()
  }
}

main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
