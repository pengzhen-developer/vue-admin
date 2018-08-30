import Vue from 'vue'

// Install root component
import App from './App.vue'

// Install vuex
import Vuex from 'vuex'
import store from './store/index'

// Install router
import router from './router/index'

// Install library
// Please check the usage './../library/README.md'
import library from './../library/index.js'

// Install axios
import axios from './axios/index'

// Install UI
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

// Install icon
import 'vue-awesome/icons'
import Icon from 'vue-awesome/components/Icon'
Vue.component('icon', Icon)

// Install global css
import './assets/css/global.scss'

Vue.use(Vuex)
Vue.use(library)
Vue.use(ElementUI)
Vue.prototype.$http = axios

Vue.config.productionTip = false

// Get the app's config
// Install app
axios
  .create()
  .get(`${process.env.BASE_URL}static/config/config.json`)
  .then(res => {
    kindo.config = res.data
  })
  .then(() => {
    new Vue({
      store,
      router,
      render: h => h(App)
    }).$mount('#app')
  })
