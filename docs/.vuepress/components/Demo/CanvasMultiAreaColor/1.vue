<template>
  <canvas ref="canvas" class="canvas" width="400" height="200" />
</template>
<script>
export default {
  mounted() {
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
  }
}
</script>
<style lang="stylus" scoped>
.canvas {
  background-color #444
}
</style>
