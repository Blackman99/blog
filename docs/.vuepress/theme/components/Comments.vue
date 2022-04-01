<template>
  <Comment v-if="['disqus', 'vssue'].includes(commentService)" />
  <Valine :is="Valine" v-else-if="commentService === 'valine'" />
</template>

<script>
import { Comment } from '@vuepress/plugin-blog/lib/client/components'
export default {
  components: {
    Comment
  },
  data() {
    return {
      Valine: null
    }
  },
  computed: {
    commentService() {
      if (!this.$themeConfig.blog.comment) {
        return false
      }
      return this.$themeConfig.blog.comment.service
    }
  },
  mounted() {
    import('./Valine.vue').then(module => {
      this.Valine = module.default
    })
  }
}
</script>
