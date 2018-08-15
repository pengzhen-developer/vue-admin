import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/home',
      name: 'home',
      component: () => import('./../components/Home.vue')
    },

    {
      path: '/layout',
      name: 'layout',
      component: () => import('./../components/Layout.vue')
    }
  ]
})

router.beforeEach((to, from, next) => {
  if (to.meta.auth) {
    next()
  } else {
    next()
  }
})

export default router
