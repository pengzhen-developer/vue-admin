/*
 * @Author: PengZhen 
 * @Description: 程序入口文件 
 * @Date: 2018-07-05 15:48:20 
 * @Last Modified by: PengZhen
 * @Last Modified time: 2018-07-30 10:41:51
 */

import Vue from 'vue'
import router from './router'
import app from './app.vue'
import axios from 'axios'
import './axios'

// 加载 library
// 使用方法请查看 ./../library/README.md
import library from '../library'

// 加载 UI 库
import ElementUI from 'element-ui'
import ElementTreeGrid from 'element-tree-grid'

// 加载全局 css
import './assets/css/global.css'

Vue.config.productionTip = false

Vue.use(library)
Vue.use(ElementUI, { size: 'mini' })
Vue.component(ElementTreeGrid.name, ElementTreeGrid)

// 创建 axios 实例, 获取配置文件信息
// 挂载 vue 到根实例上
const axiosInstance = axios.create()
const configPath = `${process.env.BASE_URL}static/config/config.json`

axiosInstance
  .get(configPath)
  .then(config => {
    kindo.config = config.data
  })
  .then(() => {
    new Vue({
      router,
      render: h => h(app)
    }).$mount('#app')
  })
