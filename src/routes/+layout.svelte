<script>
  const { children } = $props()
</script>
{@render children?.()}

<style>
  /* Seven nav items don't fit one row on phones; the theme keeps them on
     one row and the labels break character by character. Let them wrap. */
  @media (max-width: 1023px) {
    :global(.sp-blog-root nav.sp-sidebar__nav) {
      flex-wrap: wrap;
      row-gap: 0.25rem;
    }
    :global(.sp-blog-root nav.sp-sidebar__nav a) {
      white-space: nowrap;
    }
  }

  /* The post hero keeps 16:7 with a 200px minimum height, which on phones
     makes it wider than the column (457px at 390px): every post scrolled
     sideways and the full-screen image zoom landed off-centre. */
  :global(.sp-blog-root header.sp-post-hero) {
    max-width: 100%;
  }
  /* Long URLs and slash-joined words in posts wrap instead of widening the
     page. */
  :global(.sp-blog-root .sp-post-content :is(p, li, blockquote, h2, h3, h4, h5, h6)) {
    overflow-wrap: break-word;
  }
</style>
