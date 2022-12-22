import Quasar from 'quasar'
import lang from 'quasar/lang/zh-hans'
import 'quasar/dist/quasar.styl'
import '@quasar/extras/material-icons/material-icons.css'

export default ({
  isServer,
  Vue,
}) => {
  if (!isServer) {
    Vue.use(Quasar, {
      lang,
      config: {}
    })
  }
}
