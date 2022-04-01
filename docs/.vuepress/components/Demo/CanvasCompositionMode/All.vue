<template>
  <div class="row flex-warp q-gutter-sm">
    <q-card
      v-for="(t, i) in [
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
        'luminosity'
      ]"
      :key="i"
      flat
      bordered
    >
      <p class="text-center text-primary">
        <strong>
          {{ t }}
        </strong>
      </p>
      <canvas :id="`canvas-${i}`" :data-type="t" width="150" height="150" />
    </q-card>
  </div>
</template>
<script>
export default {
  mounted() {
    document.querySelectorAll('canvas').forEach(ele => {
      const ctx = ele.getContext('2d')
      const type = ele.dataset.type
      ctx.fillStyle = 'pink'
      ctx.fillRect(0, 0, 100, 100)
      ctx.globalCompositeOperation = type
      ctx.fillStyle = 'purple'
      ctx.fillRect(50, 50, 100, 100)
    })
  }
}
</script>
<style lang="stylus" scoped>

</style>
