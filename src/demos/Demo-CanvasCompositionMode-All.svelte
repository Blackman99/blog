<!-- Demo-CanvasCompositionMode-All: the same two squares drawn once per
     globalCompositeOperation value, one card each
     (old Demo/CanvasCompositionMode/All.vue). -->
<script lang="ts">
  const TYPES: GlobalCompositeOperation[] = [
    'source-over',
    'source-in',
    'source-out',
    'source-atop',
    'destination-over',
    'destination-in',
    'destination-out',
    'destination-atop',
    'lighter',
    'copy',
    'xor',
    'multiply',
    'screen',
    'overlay',
    'darken',
    'lighten',
    'color-dodge',
    'color-burn',
    'hard-light',
    'soft-light',
    'difference',
    'exclusion',
    'hue',
    'saturation',
    'color',
    'luminosity',
  ]

  // Draws one card: pink square, then the purple one with mode TYPES[i].
  function draw(ele: HTMLCanvasElement, i: number) {
    const ctx = ele.getContext('2d')
    if (!ctx)
      return
    ctx.fillStyle = 'pink'
    ctx.fillRect(0, 0, 100, 100)
    ctx.globalCompositeOperation = TYPES[i]
    ctx.fillStyle = 'purple'
    ctx.fillRect(50, 50, 100, 100)
  }
</script>

<div class="cards">
  {#each TYPES as t, i (t)}
    <div class="card">
      <p><strong>{t}</strong></p>
      <canvas use:draw={i} width="150" height="150"></canvas>
    </div>
  {/each}
</div>

<style>
  .cards {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    font-family: var(--sp-font-sans);
  }
  .card {
    border: 1px solid var(--sp-blog-border);
    border-radius: 4px;
  }
  .card p {
    margin: 0 0 16px;
    text-align: center;
    color: var(--sp-blog-primary);
  }
  .card canvas {
    display: block;
  }
</style>
