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
}
