<!-- Demo-PathProblem: right triangle A, B, C with the vertical leg z marked,
     drawn on a dark canvas (old Demo/PathProblem.vue). -->
<script lang="ts">
  import { onMount } from 'svelte'

  let canvas: HTMLCanvasElement

  onMount(() => {
    const ctx = canvas.getContext('2d')
    if (!ctx)
      return
    const drawDot = (x: number, y: number) => {
      ctx.beginPath()
      ctx.arc(x, y, 5, 0, 2 * Math.PI)
      ctx.closePath()
      ctx.fillStyle = 'white'
      ctx.fill()
    }

    const drawText = (x: number, y: number, text: string) => {
      ctx.font = '14px serif'
      ctx.fillText(text, x, y)
    }

    // C
    drawDot(75, 75)
    drawText(45, 65, 'C(x, y)')

    // B
    drawDot(320, 150)
    drawText(300, 175, 'B(x2, y2)')

    // C
    drawDot(75, 150)
    drawText(45, 175, 'A(x1, y1)')

    // AC距离Z
    ctx.beginPath()
    ctx.moveTo(75, 75)
    ctx.lineTo(75, 150)
    ctx.strokeStyle = 'cyan'
    ctx.stroke()
    ctx.fillStyle = 'cyan'
    ctx.font = '20px serif'
    ctx.fillText('z', 50, 112.5)

    // BC距离
    ctx.beginPath()
    ctx.moveTo(75, 150)
    ctx.setLineDash([5, 2])
    ctx.lineTo(320, 150)
    ctx.strokeStyle = 'white'
    ctx.stroke()

    // AB距离
    ctx.beginPath()
    ctx.moveTo(75, 75)
    ctx.lineTo(320, 150)
    ctx.stroke()

    // 直角标记
    ctx.beginPath()
    ctx.moveTo(75, 135)
    ctx.setLineDash([])
    ctx.lineTo(90, 135)
    ctx.lineTo(90, 150)
    ctx.strokeStyle = 'pink'
    ctx.stroke()
  })
</script>

<canvas bind:this={canvas} class="canvas" width="400" height="200"></canvas>

<style>
  .canvas {
    display: block;
    background-color: #333;
    /* 400x200 like the original; shrinks with the column on narrow screens */
    width: min(100%, 400px);
    height: auto;
    font-family: var(--sp-font-sans);
  }
</style>
