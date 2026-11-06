<script lang="ts">
  import SongPlayer from '$lib/SongPlayer.svelte'
  import ValineComments from '$lib/ValineComments.svelte'
</script>

<svelte:head>
  <meta name="description" content="在这里放松心情，听听歌吧" />
</svelte:head>

<div class="listen">
  <header class="listen__header">
    <h1>听听歌吧</h1>
    <blockquote>在这里放松心情，听听歌吧</blockquote>
  </header>

  <SongPlayer />

  <ValineComments path="/listen/" />
</div>

<style>
  .listen {
    max-width: 52rem;
    margin: 0 auto;
    padding-top: 1rem;
  }
  .listen__header {
    margin-bottom: 2rem;
    padding-bottom: 1.5rem;
    border-bottom: 1px solid var(--sp-blog-border);
  }
  .listen__header h1 {
    font-family: var(--sp-font-serif);
    font-size: 2rem;
    font-weight: 900;
    color: var(--sp-blog-primary);
    letter-spacing: -0.02em;
    margin: 0;
  }
  .listen__header blockquote {
    margin: 0.75rem 0 0;
    padding-left: 1rem;
    border-left: 3px solid var(--sp-blog-primary);
    color: var(--sp-blog-muted);
  }
</style>
