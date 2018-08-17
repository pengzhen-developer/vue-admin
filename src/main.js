import Vue from 'vue'
import App from './App.vue'

import axios from './axios/index'
import router from './router/index'

import ElUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(ElUI)

import './assets/css/global.css'

global.kindo = global.kindo || {}
window.kindo = window.kindo || {}

// 挂载到 Vue 原型
Vue.prototype.$http = axios
Vue.prototype.kindo = global.kindo || window.kindo

Vue.config.productionTip = false

Vue.prototype.$http
  .create()
  .get(`${process.env.BASE_URL}static/config/config.json`)
  .then(res => {
    kindo.config = res.data
    // document title
    document.title = kindo.config.theme.title
  })
  .then(() => {
    new Vue({
      router,
      render: h => h(App)
    }).$mount('#app')
  })
