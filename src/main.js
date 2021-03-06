import Vue from 'vue'

import 'normalize.css/normalize.css' // A modern alternative to CSS resets
import G6 from '@antv/g6'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import locale from 'element-ui/lib/locale/lang/en' // lang i18n

import '@/styles/index.scss' // global css

import App from './App'
import router from './router'

import '@/icons' // icon
import axios from 'axios'

import VueQuillEditor from 'vue-quill-editor'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
Vue.use(VueQuillEditor)
Vue.prototype.$reqs = axios
Vue.config.productionTip = false
/**
 * If you don't want to use mock-server
 * you want to use MockJs for mock api
 * you can execute: mockXHR()
 *
 * Currently MockJs will be used in the production environment,
 * please remove it before going online! ! !
 */

// set ElementUI lang to EN
Vue.use(ElementUI, { locale })
Vue.use(G6, { locale })
Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  render: h => h(App)
})

import globalVariable from '@/api/globalVariable'
Vue.prototype.GLOBAL = globalVariable
