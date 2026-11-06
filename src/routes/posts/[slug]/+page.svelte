<script lang="ts">
  import PostLayout from '@sveltepress/theme-blog/PostLayout.svelte'
  import oldPaths from '$lib/old-paths.json'
  import ValineComments from '$lib/ValineComments.svelte'

  const { data } = $props()
  const post = $derived(data.post)
  const prev = $derived(data.prev)
  const next = $derived(data.next)
  // Comments are keyed by the URL the post had on the old site.
  const commentPath = $derived(
    (oldPaths as Record<string, string>)[post.slug] ?? `/posts/${post.slug}/`,
  )
</script>

<PostLayout {post} {prev} {next} />

<div class="post-comments">
  {#key post.slug}
    <ValineComments path={commentPath} />
  {/key}
</div>

<style>
  /* Line up with the article column, which sits left of the 220px TOC. */
  @media (min-width: 1024px) {
    .post-comments {
      padding-right: calc(220px + 2rem);
    }
  }
</style>
