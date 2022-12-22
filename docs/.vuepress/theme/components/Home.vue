<template>
  <div class="theme-main__inner home">
    <div class="article-list">
      <Article v-for="(item, i) in $pagination.pages" :key="i"  :item="item" />
    </div>
    <Pagination v-if="$pagination.length > 1" />
  </div>
</template>
<script>
import { Pagination } from '@vuepress/plugin-blog/lib/client/components'
import Article from './Article.vue'

export default {
  name: 'Home',
  components: {
    Article,
    Pagination
  },
}
</script>


