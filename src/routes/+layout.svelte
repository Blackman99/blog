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
</style>
