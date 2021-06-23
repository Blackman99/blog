<template>
  <div class="row justify-center q-gutter-md">
     <!-- eslint-disable-next-line vue/html-self-closing -->
    <canvas ref="canvas" width="200" height="200"></canvas>
  </div>
</template>
<script>
export default {
  mounted() {
    const canvas = this.$refs.canvas
    const ctx = canvas.getContext('2d')
    ctx.fillStyle = 'pink'
    ctx.fillRect(0, 0, 100, 100)
    // ctx.globalCompositeOperation = 'source-over'
    ctx.fillStyle = 'purple'
    ctx.fillRect(50, 50, 100, 100)
  }
}
</script>
