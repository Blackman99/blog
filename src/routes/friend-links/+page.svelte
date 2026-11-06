<script lang="ts">
  import ValineComments from '$lib/ValineComments.svelte'

  // Same list as docs/friend-links/README.md on the old site.
  const links = [
    { title: '链滴', logo: 'https://ld246.com/images/faviconH.png', url: 'https://ld246.com/', desc: '记录生活，连接点滴' },
    { title: 'ANSI Common LISP', logo: 'https://common-lisp.net/static/imgs/favicon.ico', url: 'https://acl-chinese.donsen.site', desc: 'ANSI Common LISP 中文版 - 为了更友好的阅读体验' },
    { title: 'Casual UI - Svelte', logo: 'https://svelte.casual-ui.site/logo.png', url: 'https://svelte.casual-ui.site', desc: '一个基于 Svelte3 的随意的组件库' },
    { title: 'Sveltepress', logo: 'https://sveltepress.site/android-chrome-192x192.png', url: 'https://sveltepress.site', desc: '一个以内容为中心的站点构建工具，基于 Sveltekit 构建' },
    { title: 'Toryz 的个人博客', logo: 'https://toryz-me.netlify.app/logo.svg', url: 'https://toryz-me.netlify.app/', desc: '' },
  ]
</script>

<svelte:head>
  <title>友情链接 | Dongsheng 的个人博客</title>
  <meta name="description" content="友情链接" />
</svelte:head>

<div class="friend-links">
  <header class="friend-links__header">
    <h1>友情链接</h1>
  </header>

  <ul class="friend-links__list">
    {#each links as link (link.url)}
      <li>
        <a class="friend-links__item" href={link.url} target="_blank" rel="external noopener">
          <div class="friend-links__details">
            <h2>{link.title}</h2>
            {#if link.desc}<p>{link.desc}</p>{/if}
          </div>
          <img class="friend-links__logo" src={link.logo} alt="" loading="lazy" />
        </a>
      </li>
    {/each}
  </ul>

  <ValineComments path="/friend-links/" />
</div>

<style>
  .friend-links {
    max-width: 52rem;
    margin: 0 auto;
    padding-top: 1rem;
  }
  .friend-links__header {
    margin-bottom: 2rem;
    padding-bottom: 1.5rem;
    border-bottom: 1px solid var(--sp-blog-border);
  }
  .friend-links__header h1 {
    font-family: var(--sp-font-serif);
    font-size: 2rem;
    font-weight: 900;
    color: var(--sp-blog-primary);
    letter-spacing: -0.02em;
    margin: 0;
  }
  .friend-links__list {
    list-style: none;
    margin: 0;
    padding: 0;
    border: 1px solid var(--sp-blog-border);
    border-radius: 8px;
    overflow: hidden;
    background: var(--sp-blog-surface);
  }
  .friend-links__list li + li {
    border-top: 1px dotted var(--sp-blog-border);
  }
  .friend-links__item {
    display: flex;
    align-items: center;
    gap: 1rem;
    padding: 1rem 1.5rem;
    color: inherit;
    text-decoration: none;
    transition: background-color 0.2s;
  }
  .friend-links__item:hover {
    background: color-mix(in srgb, var(--sp-blog-primary) 8%, transparent);
  }
  .friend-links__details {
    flex: auto;
    min-width: 0;
  }
  .friend-links__details h2 {
    font-family: var(--sp-font-serif);
    font-size: 1.35rem;
    color: var(--sp-blog-text);
    margin: 0;
  }
  .friend-links__item:hover h2 {
    color: var(--sp-blog-primary);
  }
  .friend-links__details p {
    margin: 0.25rem 0 0;
    font-size: 0.95rem;
    color: var(--sp-blog-muted);
  }
  .friend-links__logo {
    flex: none;
    width: 56px;
    height: 56px;
    border-radius: 50%;
    object-fit: contain;
    background: #fff;
    padding: 4px;
  }
</style>
