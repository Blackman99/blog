<template>
  <div v-show="isShow" class="theme-search">
    <div class="theme-search__inner">
      <SearchBox />
      <a class="icon-exit" @click="handleExit" />
    </div>
  </div>
</template>
<script>
import SearchBox from '@SearchBox'
export default {
  components: {
    SearchBox
  },
  data() {
    return {
      isShow: false
    }
  },
  mounted() {
    this.$eventBus.$on('EV_TOGGLE_SEARCH', (flag) => {
      if (flag === false) {
        this.isShow = false
        return
      }
      this.isShow = !this.isShow
    })
    window.addEventListener('keydown', (ev) => {
      if (ev.key === 'k' && (ev.metaKey || ev.ctrlKey)) {
        ev.preventDefault()
        this.isShow = true
        return
      }
      if (ev.keyCode === 27) {
        this.isShow = false
      }
    }, false)
  },
  methods: {
    handleExit() {
      this.isShow = false
    }
  }
}
</script>
<style lang="stylus">
.theme-search
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  z-index: 99;
  overflow-y: auto;
  height: 100%;
  background-color: rgba(0,0,0,.2);
  &__inner
    position relative
    display: flex;
    align-items center
    margin: 3rem auto 2rem;
    background: var(--theme-card-background);
    border-radius: 6px;
    padding: .25rem .5rem;
    > a
      cursor pointer
      padding: 1rem;
      line-height 1.5rem
      font-size: 1.5rem;
      opacity: .5;
      transition: opacity .15s;
  .search-box
    display flex
    flex auto
    white-space: nowrap;
    position static
    input
      display block
      flex auto
      font-size: 1.2rem;
      border: 0;
      line-height: 1.4;
      height 3.7rem
      background-position 1rem 50%
      background-size 1.5rem
      padding-left 3.5rem
      background-color var(--theme-card-background)
    .suggestions
      width 100%
      top 3.5rem
      margin 0
      left 0
      right 0
      border none
      border-top solid 1px var(--theme-border-color)
      border-radius 0 0 6px 6px
      background-color var(--theme-card-background)
      a.focused
        background-color var(--theme-accent-color-005)
        color var(--theme-accent-color)
      .suggestion.focused a
        background-color var(--theme-accent-color-005)
        color var(--theme-accent-color)
</style>
