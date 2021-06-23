<template>
  <canvas ref="canvas" width="400" height="200" style="background-color: #333;" />
</template>
<script>
export default {
  mounted() {
    const canvas = this.$refs.canvas
    const ctx = canvas.getContext('2d')
    const drawDot = (x, y) => {
      ctx.beginPath()
      ctx.arc(x, y, 5, 0, 2 * Math.PI)
      ctx.closePath()
      ctx.fillStyle = 'white'
      ctx.fill()
    }

    const drawText = (x, y, text) => {
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
  }
}
</script>
<style lang="stylus" scoped>

</style>
