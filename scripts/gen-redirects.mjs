// Builds the old-URL → new-URL table from the routes the live VuePress site
// actually serves (pairs "source path → permalink" pulled from its app bundle),
// instead of guessing from file names.
// Usage: node scripts/gen-redirects.mjs . scripts/old-site-routes.txt scripts/old-site-pages.txt
import { existsSync, readdirSync, readFileSync, statSync, writeFileSync } from 'node:fs'
import { basename, join, relative } from 'node:path'

const [ROOT, pairsFile, pathsFile] = process.argv.slice(2)

// Same walk + slug rules as scripts/migrate.mjs, so file → slug matches.
const SOURCES = ['docs/_posts', 'docs/_projects', 'docs/_fitness']
function walk(dir, out = []) {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name)
    if (statSync(p).isDirectory()) walk(p, out)
    else if (name.toLowerCase().endsWith('.md')) out.push(p)
  }
  return out
}
const usedSlugs = new Map()
const slugOfFile = new Map()
for (const dir of SOURCES) {
  for (const file of walk(join(ROOT, dir))) {
    const rel = relative(join(ROOT, dir), file)
    const parts = rel.split('/')
    const baseName = basename(file, '.md') === 'README' ? parts.at(-2) : basename(file, '.md')
    let slug = baseName
    if (usedSlugs.has(slug)) slug = `${baseName}-${usedSlugs.get(slug) + 1}`
    usedSlugs.set(slug.startsWith(baseName) ? baseName : slug, (usedSlugs.get(baseName) ?? 0) + 1)
    slugOfFile.set(relative(ROOT, file), slug)
  }
}

const posts = new Set(readdirSync(join(ROOT, 'src/posts')).filter(f => f.endsWith('.md')).map(f => f.slice(0, -3)))

const pairs = readFileSync(pairsFile, 'utf8').trim().split('\n').map(l => l.split(' '))
const oldPathOfSlug = {}
const rules = []
const problems = []
for (const [source, permalink] of pairs) {
  const candidates = source.endsWith('.html')
    ? [`docs${source.replace(/\.html$/, '.md')}`]
    : [`docs${source}README.md`, `docs${source}index.md`]
  const file = candidates.find(f => existsSync(join(ROOT, f)))
  const slug = file && slugOfFile.get(file)
  if (!slug || !posts.has(slug)) { problems.push({ source, permalink, file, slug }); continue }
  // Two identical copies of publish-casual-ui share one permalink; the
  // first one (the blog post) keeps it, as on the old site.
  if (Object.values(oldPathOfSlug).includes(permalink)) continue
  oldPathOfSlug[slug] = permalink
  const to = `/posts/${slug}/`
  rules.push([permalink, to])
  rules.push([permalink.replace(/\/$/, '.html'), to])
  rules.push([`${permalink}index.html`, to])
  rules.push([source, to])
}

const unmapped = [...posts].filter(s => !oldPathOfSlug[s] && !s.endsWith('-2'))
const livePaths = readFileSync(pathsFile, 'utf8').trim().split('\n')
const postPermalinks = new Set(Object.values(oldPathOfSlug))
const otherLive = livePaths.filter(p => !postPermalinks.has(p) && !/^\/(tags|categories)\//.test(p))

// Old non-post pages. Netlify only applies a non-forced rule when no file
// exists at that path, so the splat fallbacks never shadow real new pages.
const extra = [
  ['/archives/', '/timeline/'],
  ['/projects/', '/categories/project/'],
  ['/projects/*', '/categories/project/'],
  ['/fitness/', '/categories/fitness/'],
  ['/fitness/*', '/categories/fitness/'],
  ['/songs/', '/listen/'],
  ['/page/*', '/'],
  ['/tags/*', '/tags/'],
  ['/categories/', '/'],
  ['/categories/*', '/'],
]

const lines = [
  '# Old VuePress URLs → new Sveltepress URLs. Generated from the routes the',
  '# old site served; see scripts/gen-redirects.mjs.',
  ...[...rules, ...extra].map(([from, to]) => `${from}  ${to}  301`),
]
writeFileSync(join(ROOT, 'static/_redirects'), `${lines.join('\n')}\n`)
writeFileSync(join(ROOT, 'src/lib/redirects.json'), `${JSON.stringify([...rules, ...extra.filter(([f]) => !f.includes('*'))].map(([from, to]) => ({ from, to })), null, 2)}\n`)
writeFileSync(join(ROOT, 'src/lib/old-paths.json'), `${JSON.stringify(oldPathOfSlug, null, 2)}\n`)

console.log(JSON.stringify({ mapped: Object.keys(oldPathOfSlug).length, rules: rules.length + extra.length, problems, unmapped, otherLive }, null, 2))
