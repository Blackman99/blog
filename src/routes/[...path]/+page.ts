import { redirect } from '@sveltejs/kit'
import redirects from '$lib/redirects.json'

// Old VuePress URLs. On Netlify static/_redirects answers them before this
// runs; this covers `vite dev` and anything that lands on the 404.html
// fallback, where the load runs in the browser.
const map = new Map(redirects.map(r => [r.from.replace(/\/$/, ''), r.to]))

export const prerender = false

export function load({ params }) {
  const key = `/${params.path}`.replace(/\/$/, '')
  const target = map.get(key)
  if (target) redirect(301, target)
  redirect(307, '/')
}
