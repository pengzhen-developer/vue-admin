import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

let router = new VueRouter({
  routes: [
    {
      path: '/',
      name: 'app',
      component: resolve => require(['@/app.vue'], resolve)
    },
    {
      path: '/login',
      name: 'login',
      component: resolve => require([`@/login.vue`], resolve)
    },
    {
      path: '/home',
      name: 'home',
      component: resolve => require([`@/home.vue`], resolve)
    },
    {
      path: '/layout',
      name: 'layout',
      component: resolve => require([`@/layout/${kindo.config.theme}/index.vue`], resolve)
    }
  ]
})

router.beforeEach((to, from, next) => {
  // 每次重新跳转路由, 取消之前的 loading 状态
  // todo:
  // 状态置空后, 请求仍在等待中, 完成后, 导致状态异常了.
  // if (kindo.$bus) {
  //   kindo.$bus.loadingCount = 0
  //   kindo.$bus.loading = false
  // }

  if (to.meta.auth) {
    next()
  } else {
    // 不需要身份校验 直接通过
    next()
  }
})

export default router
