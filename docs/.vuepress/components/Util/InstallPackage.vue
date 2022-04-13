<template>
  <code-tab default-active-code-type="npm" :code-types="types" use-vue-slot>
    <template v-for="t in types" #[t]>
      <div :key="t" class="language-sh line-numbers-mode">
        <pre class="language-sh"><code><span class="token function">{{ t }} </span><span class="token function">{{ installScriptMap[t] }}</span> {{ dev ? '-D ' : '' }}{{ packageName }}</code></pre> 
        <div class="line-numbers-wrapper">
          <span class="line-number">1</span>
          <br>
        </div>
      </div>
    </template>
  </code-tab>
</template>
<script>
import CodeTab from './CodeTab.vue'
export default {
  components: {
    CodeTab
  },
  props: {
    dev: {
      type: Boolean,
      default: false,
    },
    packageName: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      types: ['npm', 'yarn', 'pnpm'],
      installScriptMap: {
        npm: 'install',
        yarn: 'add',
        pnpm: 'add'
      }
    }
  }
}
</script>
<style lang="stylus" scoped>
  
</style>