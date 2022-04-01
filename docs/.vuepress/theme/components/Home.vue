<template>
  <div class="theme-main__inner home">
    <div class="article-list">
      <div v-for="(item, i) in $pagination.pages" :key="i" class="article-item">
        <div v-if="item.frontmatter.cover" class="article-cover">
          <router-link :to="item.path">
            <img :src="item.frontmatter.cover" alt="cover">
            <ThemePalette v-if="$themeConfig.palette" />
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
    </div>
    <Pagination v-if="$pagination.length > 1" />
  </div>
</template>
<script>
import { Pagination } from '@vuepress/plugin-blog/lib/client/components'
import dayjs from 'dayjs'
import dayjsPluginUTC from 'dayjs/plugin/utc'

dayjs.extend(dayjsPluginUTC)
export default {
  name: 'Home',
  components: {
    Pagination
  },
  methods: {
    formateDate(val) {
      return dayjs
        .utc(val)
        .format(this.$themeConfig.dateFormat)
    }
  }
}
</script>
<style lang="stylus">
.article-item
  display: block;
  overflow: hidden;
  border-radius: 6px;
  background var(--theme-card-background)
.article-title
  margin 0
  a
    display: block;
    padding: 1.5rem 1.5rem 0;
    transition: color .15s;
.article-desc
  padding: 0 1.5rem;
  opacity: .8;
  a
    border-bottom: 1px dotted;
    transition: color .15s,border-color .15s,opacity .15s;
.article-meta
  margin: 0 1.5rem;
  padding-bottom: 1.5rem;
  display flex
  align-items items-center
  opacity: .63;
  [class^="icon-"]
    margin-left 0.4rem
  .q-chip
    background-color var(--theme-accent-color-04)
    color #fff
    &:hover
      background-color var(--theme-accent-color-08)
</style>
