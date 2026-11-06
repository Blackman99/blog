<!-- Demo-CanvasCompositionMode-Start: two overlapping squares drawn with the
     default composition mode (old Demo/CanvasCompositionMode/Start.vue). -->
<script lang="ts">
  import { onMount } from 'svelte'

  let canvas: HTMLCanvasElement

  onMount(() => {
    const ctx = canvas.getContext('2d')
    if (!ctx)
      return
    ctx.fillStyle = 'pink'
    ctx.fillRect(0, 0, 100, 100)
    // ctx.globalCompositeOperation = 'source-over'
    ctx.fillStyle = 'purple'
    ctx.fillRect(50, 50, 100, 100)
  })
</script>

<div class="row">
  <canvas bind:this={canvas} width="200" height="200"></canvas>
</div>

<style>
  .row {
    display: flex;
    justify-content: center;
    font-family: var(--sp-font-sans);
  }
</style>
