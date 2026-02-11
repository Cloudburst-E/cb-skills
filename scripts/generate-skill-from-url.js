#!/usr/bin/env node
const fs = require('node:fs').promises
const path = require('node:path')

const process = require('node:process')

const url = process.argv[2] || 'https://vuetifyjs.com/en/'

const outDir = path.join(__dirname, '..', 'skills', 'vuetify')

async function fetchHtml(u) {
  const res = await fetch(u)
  if (!res.ok)
    throw new Error(`Fetch failed: ${res.status}`)
  return await res.text()
}

function sanitize(name) {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '').slice(0, 60)
}

function extractHeadings(html) {
  // Very small/robust heuristic: find h2 and h3 text
  const re = /<(h[23])[^>]*>([\s\S]*?)<\/\1>/gi
  const items = []
  let m
  while (true) {
    m = re.exec(html)
    if (!m)
      break
    const tag = m[1]
    const text = m[2].replace(/<[^>]+>/g, '').trim()
    if (text)
      items.push({ tag, text })
  }
  return items
}

async function ensureDir(dir) {
  await fs.mkdir(dir, { recursive: true })
}

async function writeSkillFiles(srcUrl, headings) {
  await ensureDir(path.join(outDir, 'references'))
  // Update SKILL.md header (leave file intact if exists)
  const skillMdPath = path.join(outDir, 'SKILL.md')
  try {
    await fs.readFile(skillMdPath, 'utf8')
    // keep existing
  }
  catch {
    // create a minimal SKILL.md if missing
    const content = `---\nname: vuetify\ndescription: Generated Vuetify skill\nmetadata:\n  source: ${srcUrl}\n---\n\n# Vuetify Skill\n\nGenerated skill from ${srcUrl}\.\n`
    await fs.writeFile(skillMdPath, content, 'utf8')
  }

  // Group headings by h2 as files
  const groups = {}
  let current = 'overview'
  groups[current] = []
  for (const h of headings) {
    if (h.tag.toLowerCase() === 'h2') {
      current = sanitize(h.text) || 'section'
      groups[current] = []
    }
    groups[current].push(h)
  }

  for (const [key, items] of Object.entries(groups)) {
    const lines = ['---', `name: ${key}`, '---', '', `# ${key.replace(/-/g, ' ')}`, '']
    for (const it of items) {
      lines.push(`- ${it.tag}: ${it.text}`)
    }
    lines.push('', `<!-- Source: ${srcUrl} -->`)
    await fs.writeFile(path.join(outDir, 'references', `${key}.md`), lines.join('\n'), 'utf8')
  }

  // Update GENERATION.md
  const genPath = path.join(outDir, 'GENERATION.md')
  const gen = `# Generation Info\n\n- **Source:** ${srcUrl}\n- **Generated:** ${new Date().toISOString()}\n`
  await fs.writeFile(genPath, gen, 'utf8')
}

async function run() {
  console.log('Fetching', url)
  const html = await fetchHtml(url)
  const headings = extractHeadings(html)
  await writeSkillFiles(url, headings)
  console.log('Skill generation complete. Files written to', outDir)
}

run().catch((err) => {
  console.error(err)
  process.exit(1)
})
