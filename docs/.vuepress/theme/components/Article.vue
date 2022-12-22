<template>
  <div 
    ref="article"
    class="article-item" 
    :style="{
      '--article-rot-x': xDeg,
      '--article-rot-y': yDeg
    }"
  >
    <div v-if="item.frontmatter.cover" class="article-cover">
      <router-link :to="item.path">
        <img :src="item.frontmatter.cover" alt="cover">
      </router-link>
    </div>
    <h3 class="article-title">
      <router-link :to="item.path">{{ item.title }}</router-link>
    </h3>
    <div class="article-desc" v-html="item.excerpt" />
    <footer class="article-meta">
      <div>{{ formateDate(item.frontmatter.date) }}<i class="icon-calendar" /></div>
      <div class="article-tags">
        <q-icon name="bookmarks" />
        <router-link v-for="(t, j) in item.frontmatter.tags || []" :key="j" :to="`/tags/${t}`">
          <q-chip dense clickable>
            {{ t }}
          </q-chip>
        </router-link>
      </div>
    </footer>
  </div>
</template>
<script>
import dayjs from 'dayjs'
import dayjsPluginUTC from 'dayjs/plugin/utc'

dayjs.extend(dayjsPluginUTC)

export default {
  props: {
    item: {
      type: Object,
      required: true
    }
  }, 
  data() {
    return {
      left: 0,
      right: 0,
      top: 0,
      bottom: 0,
      w: 0,
      h: 0,
      xDeg: '0',
      yDeg: '0'
    }
  }, 
  mounted() {
    if (!this.$refs.article) {
      return
    }
    window.addEventListener('mousemove', this.handleArticleMouseMove)
  },
  beforeDestroy() {
    window.removeEventListener('mousemove', this.handleArticleMouseMove)
  },
  methods: {
    formateDate(val) {
      return dayjs
        .utc(val)
        .format(this.$themeConfig.dateFormat)
    },
    isInRange(x, y, container) {
      return x >= container.left && x <= container.right && y >= container.top && y <= container.bottom
    }, 
    handleArticleMouseMove(e) {
      if (!this.$refs.article) return
      const x = e.clientX
      const y = e.clientY
      const container = this.$refs.article.getBoundingClientRect()
      if(!this.isInRange(x, y, container)){
        this.xDeg = '0'
        this.yDeg = '0'
        return
      }
      const multiple = 18
      const calcY = (x - container.left - (container.width / 2)) / multiple
      const calcX = (y - container.top - (container.height / 2)) / multiple;

      this.xDeg = `${calcX}deg`
      this.yDeg = `${calcY}deg`
    }
  }
}
</script>
<style lang="stylus" scoped>
.article-item
  display: block;
  overflow: hidden;
  border-radius: 6px;
  background var(--theme-card-background)
  transform-style: preserve-3d;
  transform: rotateX(var(--article-rot-x)) rotateY(var(--article-rot-y))
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  position relative
.article-cover {
  position: absolute;
  top: 0;
  right: 0;
  width: 50px;
  height: 50px;
  z-index: 2;
  transition: all ease-in-out .1s;
  img[alt=cover] {
    height: 100%;
    width: 100%;
    object-fit: cover;
  }
}
.article-title
  position inherit
  margin 0
  z-index 4
  a
    display: block;
    padding: 1.5rem 1.5rem 0;
    transition: color .15s;
.article-desc
  padding: 0 1.5rem;
  position inherit
  opacity: .8;
  z-index 5
  a
    border-bottom: 1px dotted;
    transition: color .15s,border-color .15s,opacity .15s;
.article-meta
  margin: 0 1.5rem;
  padding-bottom: 1.5rem;
  display flex
  align-items items-center
  opacity: .63;
  position inherit
  z-index: 6
  [class^="icon-"]
    margin-left 0.4rem
  .q-chip
    z-index: 7
    background-color var(--theme-accent-color-04)
    color #fff
    &:hover
      background-color var(--theme-accent-color-08)
</style>