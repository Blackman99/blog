import Quasar from 'quasar'
import lang from 'quasar/lang/zh-hans'
import 'quasar/dist/quasar.styl'
import '@quasar/extras/material-icons/material-icons.css'

export default ({
  isServer,
  Vue, // VuePress 正在使用的 Vue 构造函数
}) => {
  if (!isServer) {
    Vue.use(Quasar, {
      lang,
      config: {}
    })
  }
  let quasarInited = false
  Vue.mixin({
    mounted() {
      if (!quasarInited) {
        quasarInited = true
        const { mobile, desktop, ios, andriod } = this.$q.platform.is
        document.body.className = `
					${desktop ? 'desktop no-touch' : ''} 
					${mobile ? 'mobile touch' : ''} 
					${(ios || andriod) ? `platform-${ios ? 'ios' : 'andriod'}` : ''}
					body--light
					`
        if (desktop) {
          return
        }
        if (mobile) {
          document.body.className = 'mobile touch platform-ios body--light'
        }
      }
    },
  })
}
