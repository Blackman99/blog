<template>
  <svg class="theme-icon" :class="`theme-icon-${icon}`"><use :xlink:href="`#theme-icon-${icon}`" /></svg>
</template>
<script>
export default {
  name: 'Icon',
  props: {
    icon: {
      type: String,
      required: true
    }
  }
}
</script>
<style lang="stylus">
.theme-icon {
  display: inline-block;
  width: 1em;
  height: 1em;
  stroke-width: 0;
  stroke: currentColor;
  fill: currentColor;
}
</style>
