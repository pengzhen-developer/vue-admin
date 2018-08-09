<template>
  <div id="app">
    <div class="spinner" v-show="loading">
      <div class="bounce1"></div>
      <div class="bounce2"></div>
      <div class="bounce3"></div>
    </div>

    <router-view></router-view>
  </div>
</template>

<script>
import { user } from './type.js'

export default {
  name: 'app',

  data() {
    return {
      loading: false,

      loadingCount: 0,

      config: {
        api: {
          queryUserMenus: kindo.config.api.upms + 'user/queryUserMenus'
        }
      }
    }
  },

  beforeCreate() {
    kindo.$bus = kindo.$bus || this
  },

  async created() {
    // 引入主题样式
    require(`@/layout/${kindo.config.theme}/css/index.scss`)

    document.title = kindo.config.title

    // 初始化 app, 添加 global bus
    this.createGlobalBus()

    // 验证登录状态
    const userInfo = kindo.cache.get(user.USER_INFO, 'local')

    if (userInfo) {
      const menuTree = await this.getMenuTree()

      this.createAuthRouter(menuTree)

      if (this.$route.path === '/') {
        this.$router.push('/home')
      }
    } else {
      this.$router.push('/login')
    }
  },

  methods: {
    async getMenuTree() {
      const menus = await this.$http.get(this.config.api.queryUserMenus).then(res => res.data)

      const menuList = menus.filter(menu => menu.id !== '0').sort((a, b) => a.menuSort - b.menuSort)
      const menuTree = kindo.util.toTree(menuList, 'id', 'pid')

      kindo.cache.set(user.USER_MENU, menuList)
      kindo.cache.set(user.USER_MENU_TREE, menuTree)

      return menuTree
    },

    createAuthRouter(menuTree) {
      const authRouter = []

      // 根据权限菜单树, 递归生成权限路由
      menuTree.forEach(menu => {
        authRouter.push({
          name: menu.id,
          path: `/${menu.id}`,
          component: resolve => require([`@/layout/${kindo.config.theme}/index.vue`], resolve),
          children: this.createChildrenAuthRouter(menu.children)
        })
      })

      authRouter.push({
        path: '*',
        name: 'notFound',
        component: resolve => require(['./components/notFound.vue'], resolve)
      })

      this.$router.addRoutes(authRouter)
    },

    createChildrenAuthRouter(menus, authRouterChildren = []) {
      // 根据权限菜单树, 递归生成权限路由
      if (menus && menus.length > 0) {
        menus.forEach(menu => {
          if (menu.children && menu.children.length > 0) {
            this.createChildrenAuthRouter(menu.children, authRouterChildren)
          } else {
            authRouterChildren.push({
              name: `${menu.id}`,
              path: `${menu.id}`,
              component: resolve =>
                require([`@/${menu.routerPath}/index.vue`], resolve, reject => {
                  console.error(reject)
                  return require('./components/notFound.vue')
                })
            })
          }
        })
      }

      return authRouterChildren
    },

    createGlobalBus() {
      this.$on('loading', loadingStatus => {
        if (loadingStatus) {
          this.loadingCount = this.loadingCount + 1

          this.loading = true
        } else {
          this.loadingCount = this.loadingCount - 1

          if (this.loadingCount === 0) {
            this.loading = false
          }
        }
      })

      kindo.$bus.$on('notify', (message = '提示', title = '提示', type = 'info') => {
        kindo.$bus.$notify({
          showClose: true,
          title: title,
          message: message,
          type: type
        })
      })

      kindo.$bus.$on('message', (message = '提示', title = '提示', type = 'info') => {
        kindo.$bus.$message({
          showClose: true,
          title: title,
          message: message,
          type: type
        })
      })

      kindo.$bus.$on('confirm', (message = '提示', title = '提示', type = 'info', successCallBack, errorCallBack) => {
        kindo.$bus
          .$confirm(message, title, {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: type
          })
          .then(successCallBack)
          .catch(errorCallBack)
      })
    }
  }
}
</script>

<style>
.spinner {
  position: absolute;
  z-index: 99999;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  margin: 35px auto;
  width: 70px;
  text-align: center;
}

.spinner > div {
  width: 18px;
  height: 18px;
  background-color: #01cfeb;

  border-radius: 100%;
  display: inline-block;
  -webkit-animation: sk-bouncedelay 1.4s infinite ease-in-out both;
  animation: sk-bouncedelay 1.4s infinite ease-in-out both;
}

.spinner .bounce1 {
  -webkit-animation-delay: -0.32s;
  animation-delay: -0.32s;
}

.spinner .bounce2 {
  -webkit-animation-delay: -0.16s;
  animation-delay: -0.16s;
}

@-webkit-keyframes sk-bouncedelay {
  0%,
  80%,
  100% {
    -webkit-transform: scale(0);
  }
  40% {
    -webkit-transform: scale(1);
  }
}

@keyframes sk-bouncedelay {
  0%,
  80%,
  100% {
    -webkit-transform: scale(0);
    transform: scale(0);
  }
  40% {
    -webkit-transform: scale(1);
    transform: scale(1);
  }
}
</style>
