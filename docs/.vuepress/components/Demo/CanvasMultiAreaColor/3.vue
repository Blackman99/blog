<template>
  <div class="canvas-container">
    <canvas ref="canvas" class="canvas" width="400" height="200" />
    <canvas ref="canvas2" class="canvas" width="400" height="200" />
    <canvas ref="canvas3" class="canvas" width="400" height="200" />
  </div>
</template>
<script>
export default {
  mounted() {
    // 第一个矩形
    const canvas = this.$refs.canvas
    const ctx = canvas.getContext('2d')
    ctx.beginPath()
    ctx.moveTo(20, 20)
    ctx.lineTo(150, 20)
    ctx.lineTo(150, 100)
    ctx.lineTo(20, 100)
    ctx.closePath()
    ctx.fillStyle = 'purple'
    ctx.fill()

    // 第二个矩形
    const canvas2 = this.$refs.canvas2
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

    // 第三个矩形
    const canvas3 = this.$refs.canvas3
    const ctx3 = canvas3.getContext('2d')

    ctx3.drawImage(canvas2, 0, 0)
    ctx3.globalCompositeOperation = 'source-in'
    ctx3.beginPath()
    ctx3.moveTo(40, 40)
    ctx3.lineTo(170, 40)
    ctx3.lineTo(170, 120)
    ctx3.lineTo(40, 120)
    ctx3.closePath()
    ctx3.fillStyle = 'cyan'
    ctx3.fill()

    const tempCanvas = document.createElement('canvas')
    tempCanvas.height = 200
    tempCanvas.width = 400
    const tempCtx = tempCanvas.getContext('2d')
    tempCtx.drawImage(canvas, 0, 0)
    tempCtx.globalCompositeOperation = 'source-in'
    tempCtx.beginPath()
    tempCtx.moveTo(40, 40)
    tempCtx.lineTo(170, 40)
    tempCtx.lineTo(170, 120)
    tempCtx.lineTo(40, 120)
    tempCtx.closePath()
    tempCtx.fillStyle = '#E91E63'
    tempCtx.fill()
    ctx2.globalCompositeOperation = 'source-over'
    ctx2.drawImage(tempCanvas, 0, 0)

    ctx.beginPath()
    ctx.moveTo(40, 40)
    ctx.lineTo(170, 40)
    ctx.lineTo(170, 120)
    ctx.lineTo(40, 120)
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
