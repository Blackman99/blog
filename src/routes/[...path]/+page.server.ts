import { redirect } from '@sveltejs/kit'
import redirects from '$lib/redirects.json'

const map = new Map(redirects.map(r => [r.from.replace(/\/$/, ''), r.to]))

export const prerender = false

export function load({ params }) {
  const key = `/${params.path}`.replace(/\/$/, '')
  const target = map.get(key)
  if (target) redirect(301, target)
  redirect(307, '/')
}
