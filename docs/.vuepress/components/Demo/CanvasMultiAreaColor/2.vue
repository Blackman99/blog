<template>
  <div class="canvas-container">
    <canvas ref="canvas" class="canvas" width="400" height="200" />
    <canvas ref="canvas2" class="canvas" width="400" height="200" />
  </div>
</template>
<script>
export default {
  mounted() {
    const { canvas, canvas2 } = this.$refs
    const ctx = canvas.getContext('2d')
    ctx.beginPath()
    ctx.moveTo(20, 20)
    ctx.lineTo(150, 20)
    ctx.lineTo(150, 100)
    ctx.lineTo(20, 100)
    ctx.closePath()
    ctx.fillStyle = 'purple'
    ctx.fill()

    const ctx2 = canvas2.getContext('2d')
    ctx2.drawImage(canvas, 0, 0)
    ctx2.beginPath()
    ctx2.moveTo(60, 10)
    ctx2.lineTo(180, 10)
    ctx2.lineTo(180, 120)
    ctx2.lineTo(60, 120)
    ctx2.closePath()
    ctx2.globalCompositeOperation = 'source-in'
    ctx2.fillStyle = '#E91E63'
    ctx2.fill()

    ctx.beginPath()
    ctx.moveTo(60, 10)
    ctx.lineTo(180, 10)
    ctx.lineTo(180, 120)
    ctx.lineTo(60, 120)
    ctx.closePath()
    ctx.fillStyle = 'purple'
    ctx.fill()
  }
}
</script>
<style lang="stylus" scoped>
.canvas-container {
  background-color #444
  position relative
  width 400px
  height 200px
  .canvas {
    background-color transparent
    position absolute
    top 0
    left 0
  }
}
</style>
