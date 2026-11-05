// One-shot migration of the VuePress 1 blog into a Sveltepress theme-blog site.
// Reads docs/_posts, docs/_projects, docs/_fitness and writes src/posts/*.md,
// copies assets into static/, and writes redirects.json. Re-running overwrites.
import { mkdirSync, readFileSync, writeFileSync, cpSync, readdirSync, statSync, rmSync } from 'node:fs'
import { dirname, join, relative, extname, basename } from 'node:path'

const ROOT = new URL('..', import.meta.url).pathname
const SOURCES = [
  ['docs/_posts', ''],
  ['docs/_projects', 'project'],
  ['docs/_fitness', 'fitness'],
]

function walk(dir, out = []) {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name)
    if (statSync(p).isDirectory()) walk(p, out)
    else if (name.toLowerCase().endsWith('.md')) out.push(p)
  }
  return out
}

function parseFrontmatter(text) {
  const m = text.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?/)
  if (!m) return { data: {}, body: text }
  const data = {}
  let current = null
  for (const line of m[1].split(/\r?\n/)) {
    const item = line.match(/^\s*-\s+(.*)$/)
    if (item && current) { (data[current] ??= []).push(unquote(item[1])); continue }
    const kv = line.match(/^([A-Za-z0-9_-]+):\s*(.*)$/)
    if (kv) {
      current = kv[1]
      data[current] = kv[2] === '' ? null : unquote(kv[2])
    }
  }
  return { data, body: text.slice(m[0].length) }
}

function unquote(s) {
  s = s.trim()
  if ((s.startsWith('"') && s.endsWith('"')) || (s.startsWith("'") && s.endsWith("'")))
    return s.slice(1, -1)
  return s
}

function yamlScalar(s) {
  return /[:#&*!|>%@`'"[\]{},]|\s|^$/.test(s) ? JSON.stringify(s) : s
}

// VuePress container / slot / component syntax the theme cannot render.
function convertBody(body) {
  const notes = []
  body = body.replace(/<!--\s*more\s*-->/g, '')
  // <Util-CodeTab .../> and <Util-InstallPackage .../> carry no content;
  // the ::: slot blocks below them hold the actual code.
  body = body.replace(/<Util-[A-Za-z]+[\s\S]*?\/>/g, '')
  body = body.replace(/^::+[ \t]*slot[ \t]+(.+)$/gm, (_, name) => `\n### ${name.trim()}\n`)
  body = body.replace(/^:::([ \t]*)(tip|warning|danger|info)[ \t]*(.*)$/gim, (_, _sp, kind, title) => {
    const label = { tip: '提示', warning: '注意', danger: '警告', info: '说明' }[kind]
    const extra = title.trim()
    return `\n> **${label}${extra && extra !== label ? `：${extra}` : ''}**\n>`
  })
  body = body.replace(/^::+[ \t]*$/gm, '')
  body = body.replace(/^(>.*)\n(?!>|\n)(.*)$/gm, '$1\n> $2')
  // co-located images move to static/posts/
  body = body.replace(/(!\[[^\]]*\]\()\.\//g, '$1/posts/')
  const components = new Set()
  body = body.replace(/<\/?([A-Z][A-Za-z0-9]*)\b[^>]*\/?>/g, (full, name) => {
    components.add(name)
    return ''
  })
  if (components.size) notes.push(`removed Vue components: ${[...components].join(', ')}`)
  body = body.replace(/\n{3,}/g, '\n\n')
  return { body: body.trim() + '\n', notes }
}

const usedSlugs = new Map()
const posts = []
const assetCopies = []
const report = []

rmSync(join(ROOT, 'src/posts'), { recursive: true, force: true })
mkdirSync(join(ROOT, 'src/posts'), { recursive: true })

for (const [dir, forcedCategory] of SOURCES) {
  for (const file of walk(join(ROOT, dir))) {
    const raw = readFileSync(file, 'utf8')
    const { data, body } = parseFrontmatter(raw)
    const rel = relative(join(ROOT, dir), file)
    const parts = rel.split('/')
    const baseName = basename(file, '.md') === 'README' ? parts.at(-2) : basename(file, '.md')
    let slug = baseName
    if (usedSlugs.has(slug)) slug = `${baseName}-${usedSlugs.get(slug) + 1}`
    usedSlugs.set(slug.startsWith(baseName) ? baseName : slug, (usedSlugs.get(baseName) ?? 0) + 1)
    const date = String(data.date ?? '').slice(0, 10)
    const tags = Array.isArray(data.tags) ? data.tags : []
    const categories = Array.isArray(data.categories) ? data.categories : []
    const category = forcedCategory || categories[0] || ''
    const { body: out, notes } = convertBody(body)
    const fm = [
      '---',
      `title: ${yamlScalar(String(data.title ?? baseName))}`,
      `date: ${date || '1970-01-01'}`,
      data.description ? `excerpt: ${yamlScalar(String(data.description))}` : null,
      data.author ? `author: ${yamlScalar(String(data.author))}` : null,
      data.cover ? `cover: ${String(data.cover).startsWith('/') ? data.cover : `/posts/${data.cover}`}` : null,
      category ? `category: ${yamlScalar(category)}` : null,
      tags.length ? `tags:\n${tags.map(t => `  - ${yamlScalar(t)}`).join('\n')}` : 'tags: []',
      '---',
      '',
    ].filter(l => l !== null).join('\n')
    writeFileSync(join(ROOT, 'src/posts', `${slug}.md`), fm + out)
    posts.push(slug)

    const dated = parts.length >= 4 && /^\d{4}$/.test(parts[0])
    const oldPath = dated
      ? `/${parts[0]}/${parts[1].padStart(2, '0')}/${parts[2].padStart(2, '0')}/${basename(file, '.md') === 'README' ? parts.at(-2) : basename(file, '.md')}.html`
      : `/${parts.slice(0, -1).join('/')}.html`
    report.push({ slug, old: oldPath, notes })

    for (const name of readdirSync(dirname(file))) {
      const src = join(dirname(file), name)
      if (statSync(src).isDirectory() || extname(name).toLowerCase() === '.md') continue
      assetCopies.push([src, join(ROOT, 'static/posts', name)])
    }
  }
}

mkdirSync(join(ROOT, 'static/posts'), { recursive: true })
const seen = new Set()
for (const [from, to] of assetCopies) {
  if (seen.has(to)) continue
  seen.add(to)
  cpSync(from, to)
}
cpSync(join(ROOT, 'docs/.vuepress/public'), join(ROOT, 'static'), { recursive: true })

const redirects = report.map(r => ({ from: r.old, to: `/posts/${r.slug}` }))
redirects.push(
  { from: '/projects/', to: '/categories/project' },
  { from: '/fitness/', to: '/categories/fitness' },
)
writeFileSync(join(ROOT, 'redirects.json'), JSON.stringify(redirects, null, 2))
const problems = report.filter(r => r.notes.length)
writeFileSync(join(ROOT, 'migration-report.json'), JSON.stringify({
  posts: posts.length, assets: seen.size, flagged: problems.length, problems,
}, null, 2))
console.log(`posts ${posts.length}, assets ${seen.size}, flagged ${problems.length}`)
