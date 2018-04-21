import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/Login',
      name: 'Login',
      component: resolve => require([`@src/theme/${kindo.config.theme}/App.vue`], resolve)
    },
    {
      path: '/Layout',
      name: 'Layout',
      component: resolve => require([`@src/theme/${kindo.config.theme}/Layout.vue`], resolve)
    }
  ]
})
