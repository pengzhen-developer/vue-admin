import Vue from 'vue'
import App from './App.vue'

import axios from './axios/index'
import router from './router/index'

import ElUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(ElUI)

// 挂载到 Vue 原型
Vue.prototype.$http = axios

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
