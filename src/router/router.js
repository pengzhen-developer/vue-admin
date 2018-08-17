import Vue from 'vue'
import Router from 'vue-router'

// Progress
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

Vue.use(Router)

const router = new Router({
  // Control scroll behavior
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition && to.meta.keepAlive) {
      return savedPosition
    }
    return { x: 0, y: 0 }
  },

  routes: [
    {
      path: '/login',
      name: 'login',
      component: () => import('./../Login.vue')
    },

    {
      path: '/home',
      name: 'home',
      component: () => import('./../Home.vue')
    },

    {
      path: '/layout',
      name: 'layout',
      component: () => import('./../layout/default/Layout.vue')
    }
  ]
})

router.beforeEach((to, from, next) => {
  NProgress.start()

  if (to.meta.auth) {
    next()
  } else {
    next()
  }
})

router.afterEach(() => {
<<<<<<< HEAD
  // Wait transition
  setTimeout(() => {
    NProgress.done()
  }, 200)
=======
  NProgress.done()
>>>>>>> 380264d02b773308643e54b015ce2ffcfa696a6d
})

export default router
