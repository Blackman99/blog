import { copyToClipboard } from 'quasar'
export default {
  props: {
    keyPrefix: {
      type: String,
      default: ''
    },
    defaultActiveCodeType: {
      type: String,
      default: 'template'
    },
    codeTypes: {
      type: Array,
      default: () => ['template', 'script', 'style']
    },
    defaultExpand: {
      type: Boolean,
      default: true
    },
    hideCopy: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      codeType: 'template',
    }
  },
  mounted() {
    this.codeType = this.defaultActiveCodeType
    this.expanded = this.defaultExpand
  },
  methods: {
    copyCode() {
      copyToClipboard(this.$refs.codeContent[0].querySelector('code').textContent)
        .then(() => {
          this.$q.notify({
            message: '代码复制成功！',
            color: 'primary',
            icon: 'content_copy',
            actions: [
              { label: '关闭', color: 'white', handler: () => { /* ... */ } }
            ]
          })
        }).catch(() => {
          this.$q.notify({
            message: '代码复制失败！',
            color: 'red-7',
            icon: 'error',
            actions: [
              { label: '关闭', color: 'white', handler: () => { /* ... */ } }
            ]
          })
        })
    }
  }
}
