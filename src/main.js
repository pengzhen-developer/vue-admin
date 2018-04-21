// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import router from './router'
import axios from 'axios'

Vue.config.productionTip = false

// 初始化全局可访问对象
global.kindo = global.kindo || {}

// 获取 App 配置信息
const getAppSetting = () => {
  return axios.get('./../static/config/app.setting.json').then(config => {
    global.kindo = config.data
  })
}

// 挂载 App 组件
const initApp = () => {
  /* eslint-disable no-new */
  new Vue({
    el: '#app',
    router,
    components: { App: resolve => require([`@src/theme/${kindo.config.theme}/App.vue`], resolve) },
    template: '<App/>'
  })
}

getAppSetting().then(initApp())
