const fs = require('node:fs')
const path = require('node:path')
const process = require('node:process')
const { chromium } = require('playwright')

async function capture(pageSpec, outDir) {
  const browser = await chromium.launch({ args: ['--no-sandbox'] })
  const context = await browser.newContext({ viewport: { width: 1200, height: 800 } })
  const page = await context.newPage()
  try {
    await page.goto(pageSpec.url, { waitUntil: 'networkidle' })
    const opts = pageSpec.captureOptions || {}
    const type = opts.type || 'jpeg'
    const quality = typeof opts.quality === 'number' ? opts.quality : 80
    const safeName = pageSpec.name.replace(/[^\w.\-]/g, '_')
    const ext = type === 'jpeg' ? 'jpg' : 'png'
    const filename = `${safeName}.${ext}`
    const outPath = path.join(outDir, filename)
    const screenshotOptions = { path: outPath }
    if (type === 'jpeg') {
      screenshotOptions.type = 'jpeg'
    }
    if (type === 'jpeg' && quality) {
      screenshotOptions.quality = quality
    }
    // limit fullPage to false to keep capture size small by default
    screenshotOptions.fullPage = !!opts.fullPage
    await page.screenshot(screenshotOptions)
    return { name: pageSpec.name, file: outPath }
  }
  finally {
    await browser.close()
  }
}

async function main() {
  const pagesFile = process.argv[2] || 'pages.json'
  const outDir = process.argv[3] || 'out-screenshots'
  if (!fs.existsSync(pagesFile)) {
    console.error('Missing pages file:', pagesFile)
    process.exit(1)
  }
  const pages = JSON.parse(fs.readFileSync(pagesFile, 'utf8'))
  if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir, { recursive: true })
  }
  const results = []
  for (const p of pages) {
    try {
      const r = await capture(p, outDir)
      // generate a small thumbnail (use smaller viewport)
      const safeName = p.name.replace(/[^\w.\-]/g, '_')
      const thumbName = `${safeName}-thumb.jpg`
      const thumbPath = path.join(outDir, thumbName)
      // capture thumbnail by opening a new small context
      const browser = await chromium.launch({ args: ['--no-sandbox'] })
      const contextThumb = await browser.newContext({ viewport: { width: 360, height: 240 } })
      const pageThumb = await contextThumb.newPage()
      try {
        await pageThumb.goto(p.url, { waitUntil: 'networkidle' })
        const buf = await pageThumb.screenshot({ type: 'jpeg', quality: 50, fullPage: false })
        fs.writeFileSync(thumbPath, buf)
      }
      finally {
        await contextThumb.close()
        await browser.close()
      }
      results.push({ ...r, thumb: thumbPath })
      process.stdout.write(`Captured ${r.file} thumb ${thumbPath}\n`)
    }
    catch (err) {
      console.error('Failed capture for', p.name, err && err.message)
    }
  }
  const meta = {
    capturedAt: new Date().toISOString(),
    commit: process.env.GITHUB_SHA || null,
    branch: process.env.GITHUB_REF || null,
    results,
  }
  fs.writeFileSync(path.join(outDir, 'metadata.json'), JSON.stringify(meta, null, 2))
  process.stdout.write(`Done. screenshots saved to ${outDir}\n`)
}

if (require.main === module) {
  main().catch((e) => {
    console.error(e)
    process.exit(1)
  })
}
