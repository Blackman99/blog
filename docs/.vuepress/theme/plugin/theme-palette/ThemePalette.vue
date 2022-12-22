<template>
  <div class="theme-palette">
    <span class="theme-palette__emoji"><Icon icon="palette" /></span>
    <div class="theme-palette__list">
      <div
        v-for="(item, i) in colors"
        :key="i"
        class="theme-item"
        :style="{color: `${item.btnColor}`}"
        :title="item.btnColor"
        @click.stop="setThemeColors(item)"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: 'ThemePalette',
  data() {
    return {
      themePaletteBox: null
    }
  },
  computed: {
    colors() {
      const colors = this.$themeConfig.palette.colors
      if (!Array.isArray(colors)) {
        return []
      }
      return colors
    }
  },
  mounted() {
    let ele = document.getElementById('js_themePalette')
    if (!ele) {
      ele = document.createElement('style')
    }
    ele.setAttribute('id', 'js_themePalette')
    this.themePaletteBox = ele
    ele.innerHTML = window.localStorage.getItem('__palette__')
    document.getElementsByTagName('head')[0].appendChild(ele)
  },
  methods: {
    setThemeColors(item) {
      this.themePaletteBox.innerHTML = `@media (prefers-color-scheme: dark) { html {${item.paletteVars.dark || ''}} } html,html.light {${item.paletteVars.light || ''}} html.dark {${item.paletteVars.dark || ''}}`
      window.localStorage.setItem('__palette__', this.themePaletteBox.innerHTML)
    }
  }
}
</script>

<style lang="stylus">
.theme-palette
  align-items center
  position: absolute;
  top: 100px;
  right: 0px;
  border-radius: 20px;
  display: flex
  flex-direction column
  width: 40px;
  height: 40px;
  line-height: 40px;
  cursor pointer
  text-align: center;
  z-index 3
  background-color: var(--theme-card-background);
  box-shadow: 0px 1px 5px var(--theme-border-color);
  &:hover
    min-height: 180px;
    .theme-palette__list 
        visibility visible
  .theme-item
    background currentColor
    height 12px
    width 12px
    box-sizing border-box
    &:hover
      opacity .9
      transform scale(1.4)
  &__emoji
    display flex
    align-items center
    justify-content center
    flex-shrink 0
    width 40px
    height 40px
    font-size: 26px
    color var(--theme-accent-color)
  &__list
    display flex
    flex-direction column
    align-items center
    width 100px
    visibility: hidden
</style>
