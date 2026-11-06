<!-- Valine comments, same LeanCloud app as the old VuePress site. `path` is
     the key the comments are stored under: posts pass their old permalink so
     existing comments still show up. The script is vendored in
     static/js/Valine.min.js and loaded on demand. -->
<script lang="ts">
  import { onMount } from 'svelte'

  interface Props {
    path: string
  }

  const { path }: Props = $props()

  const APP_ID = '9KduIFr1tWHr5dgODcRkhh4J-gzGzoHsz'
  const APP_KEY = 'bR1t4d1c4CDKp71JMjwqbm0C'
  const SERVER_URL = 'https://9kduifr1.lc-cn-n1-shared.com'

  let el: HTMLElement | undefined = $state()

  let loading: Promise<void> | undefined
  function loadValine(): Promise<void> {
    const w = window as unknown as { Valine?: unknown }
    if (w.Valine) return Promise.resolve()
    loading ??= new Promise((resolve, reject) => {
      const s = document.createElement('script')
      s.src = '/js/Valine.min.js'
      s.onload = () => resolve()
      s.onerror = () => reject(new Error('Valine failed to load'))
      document.head.appendChild(s)
    })
    return loading
  }

  onMount(() => {
    let cancelled = false
    loadValine().then(() => {
      if (cancelled || !el) return
      const Valine = (window as unknown as { Valine: new (o: object) => unknown }).Valine
      // eslint-disable-next-line no-new
      new Valine({
        el,
        appId: APP_ID,
        appKey: APP_KEY,
        serverURLs: SERVER_URL,
        path,
      })
    }).catch(() => {})
    return () => { cancelled = true }
  })
</script>

<section class="blog-comments">
  <h2 class="blog-comments__title">评论</h2>
  <div bind:this={el}></div>
</section>

<style>
  .blog-comments {
    margin-top: 3rem;
    padding-top: 2rem;
    border-top: 1px solid var(--sp-blog-border);
  }
  .blog-comments__title {
    font-family: var(--sp-font-serif);
    font-size: 1.5rem;
    color: var(--sp-blog-text);
    margin: 0 0 1rem;
  }
  /* Valine ships light-only colours; map them onto the theme. */
  .blog-comments :global(.v[data-class='v']) {
    color: var(--sp-blog-content);
    font-size: 0.95rem;
  }
  .blog-comments :global(.v[data-class='v'] .vwrap) {
    border-color: var(--sp-blog-border);
    background: transparent;
  }
  .blog-comments :global(.v[data-class='v'] .vwrap .vheader .vinput) {
    border-bottom-color: var(--sp-blog-border);
  }
  .blog-comments :global(.v[data-class='v'] .vwrap .vheader .vinput:focus) {
    border-bottom-color: var(--sp-blog-primary);
  }
  .blog-comments :global(.v[data-class='v'] .vinput),
  .blog-comments :global(.v[data-class='v'] .veditor),
  .blog-comments :global(.v[data-class='v'] .vpreview) {
    color: var(--sp-blog-text);
    background: transparent;
  }
  .blog-comments :global(.v[data-class='v'] .vbtn) {
    color: var(--sp-blog-content);
    background: transparent;
    border-color: var(--sp-blog-border);
  }
  .blog-comments :global(.v[data-class='v'] .vbtn:hover) {
    color: var(--sp-blog-primary);
    border-color: var(--sp-blog-primary);
  }
  .blog-comments :global(.v[data-class='v'] a) {
    color: var(--sp-blog-content);
  }
  .blog-comments :global(.v[data-class='v'] a:hover),
  .blog-comments :global(.v[data-class='v'] .vcards .vcard .vhead .vnick:hover),
  .blog-comments :global(.v[data-class='v'] .vcards .vcard .vh .vmeta .vat:hover) {
    color: var(--sp-blog-primary);
  }
  .blog-comments :global(.v[data-class='v'] .vcards .vcard .vhead .vnick),
  .blog-comments :global(.v[data-class='v'] .vcards .vcard .vh .vmeta .vat) {
    color: var(--sp-blog-primary);
  }
  .blog-comments :global(.v[data-class='v'] .vcards .vcard .vh) {
    border-bottom-color: var(--sp-blog-border);
  }
  .blog-comments :global(.v[data-class='v'] .vcards .vcard .vh .vtime),
  .blog-comments :global(.v[data-class='v'] .vcount),
  .blog-comments :global(.v[data-class='v'] .vcards .vcard .vhead .vsys),
  .blog-comments :global(.v[data-class='v'] .vpower),
  .blog-comments :global(.v[data-class='v'] .vempty) {
    color: var(--sp-blog-muted);
  }
  .blog-comments :global(.v[data-class='v'] .vcards .vcard .vcontent),
  .blog-comments :global(.v[data-class='v'] .vcards .vcard .vcontent p) {
    color: var(--sp-blog-content);
  }
  .blog-comments :global(.v[data-class='v'] .vcards .vcard .vhead .vsys) {
    background: var(--sp-blog-surface);
  }
  .blog-comments :global(.v[data-class='v'] code),
  .blog-comments :global(.v[data-class='v'] pre) {
    background: var(--sp-blog-surface);
    color: var(--sp-blog-text);
  }
</style>
