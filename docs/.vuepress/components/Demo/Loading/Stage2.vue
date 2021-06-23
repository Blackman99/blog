<template lang="html">
  <div class="example-box">
    <div class="loading-box">
      <div class="bar-box">
        <div
          v-for="n in 8"
          :key="n"
          class="bar"
          :style="{
            transform: `rotate(${n * 360 / 8}deg)`
          }"
        />
      </div>
    </div>
  </div>
</template>
<script>
export default {

}
</script>
<style lang="stylus" scoped>
.example-box
  width 200px
  height 200px
  background-color blue
  position relative
  .loading-box
    position absolute
    top 0
    left 0
    right 0
    bottom 0
    background-color rgba(0, 0, 0, .7)
    .bar-box
      position: absolute
      top 50%
      left 50%
      .bar
        position absolute
        left 0
        top 0
        background-color rgba(255, 255, 255, 1)
        height 4px
        width 20px
        border-top-right-radius 2px
        border-bottom-right-radius 2px
        transform-origin: left
</style>
