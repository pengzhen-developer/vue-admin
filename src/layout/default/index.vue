<template>
  <el-container class="layout">
    <!-- 伸缩栏 -->
    <el-aside class="aside" :width="asideWidth">
      <el-menu ref="subMenu" class="nav" :default-openeds="subMenusOpeneds" :collapse="collapse" unique-opened background-color="#2c2e3e" text-color="#868aa8" @select="subMenuSelect">

        <!--  logo 部分 -->
        <div class="logo">
          <img src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9Im5vIj8+Cjxzdmcgd2lkdGg9IjIwMHB4IiBoZWlnaHQ9IjIwMHB4IiB2aWV3Qm94PSIwIDAgMjAwIDIwMCIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIj4KICAgIDwhLS0gR2VuZXJhdG9yOiBTa2V0Y2ggNDcuMSAoNDU0MjIpIC0gaHR0cDovL3d3dy5ib2hlbWlhbmNvZGluZy5jb20vc2tldGNoIC0tPgogICAgPHRpdGxlPkdyb3VwIDI4IENvcHkgNTwvdGl0bGU+CiAgICA8ZGVzYz5DcmVhdGVkIHdpdGggU2tldGNoLjwvZGVzYz4KICAgIDxkZWZzPgogICAgICAgIDxsaW5lYXJHcmFkaWVudCB4MT0iNjIuMTAyMzI3MyUiIHkxPSIwJSIgeDI9IjEwOC4xOTcxOCUiIHkyPSIzNy44NjM1NzY0JSIgaWQ9ImxpbmVhckdyYWRpZW50LTEiPgogICAgICAgICAgICA8c3RvcCBzdG9wLWNvbG9yPSIjNDI4NUVCIiBvZmZzZXQ9IjAlIj48L3N0b3A+CiAgICAgICAgICAgIDxzdG9wIHN0b3AtY29sb3I9IiMyRUM3RkYiIG9mZnNldD0iMTAwJSI+PC9zdG9wPgogICAgICAgIDwvbGluZWFyR3JhZGllbnQ+CiAgICAgICAgPGxpbmVhckdyYWRpZW50IHgxPSI2OS42NDQxMTYlIiB5MT0iMCUiIHgyPSI1NC4wNDI4OTc1JSIgeTI9IjEwOC40NTY3MTQlIiBpZD0ibGluZWFyR3JhZGllbnQtMiI+CiAgICAgICAgICAgIDxzdG9wIHN0b3AtY29sb3I9IiMyOUNERkYiIG9mZnNldD0iMCUiPjwvc3RvcD4KICAgICAgICAgICAgPHN0b3Agc3RvcC1jb2xvcj0iIzE0OEVGRiIgb2Zmc2V0PSIzNy44NjAwNjg3JSI+PC9zdG9wPgogICAgICAgICAgICA8c3RvcCBzdG9wLWNvbG9yPSIjMEE2MEZGIiBvZmZzZXQ9IjEwMCUiPjwvc3RvcD4KICAgICAgICA8L2xpbmVhckdyYWRpZW50PgogICAgICAgIDxsaW5lYXJHcmFkaWVudCB4MT0iNjkuNjkwODE2NSUiIHkxPSItMTIuOTc0MzU4NyUiIHgyPSIxNi43MjI4OTgxJSIgeTI9IjExNy4zOTEyNDglIiBpZD0ibGluZWFyR3JhZGllbnQtMyI+CiAgICAgICAgICAgIDxzdG9wIHN0b3AtY29sb3I9IiNGQTgxNkUiIG9mZnNldD0iMCUiPjwvc3RvcD4KICAgICAgICAgICAgPHN0b3Agc3RvcC1jb2xvcj0iI0Y3NEE1QyIgb2Zmc2V0PSI0MS40NzI2MDYlIj48L3N0b3A+CiAgICAgICAgICAgIDxzdG9wIHN0b3AtY29sb3I9IiNGNTFEMkMiIG9mZnNldD0iMTAwJSI+PC9zdG9wPgogICAgICAgIDwvbGluZWFyR3JhZGllbnQ+CiAgICAgICAgPGxpbmVhckdyYWRpZW50IHgxPSI2OC4xMjc5ODcyJSIgeTE9Ii0zNS42OTA1NzM3JSIgeDI9IjMwLjQ0MDA5MTQlIiB5Mj0iMTE0Ljk0MjY3OSUiIGlkPSJsaW5lYXJHcmFkaWVudC00Ij4KICAgICAgICAgICAgPHN0b3Agc3RvcC1jb2xvcj0iI0ZBOEU3RCIgb2Zmc2V0PSIwJSI+PC9zdG9wPgogICAgICAgICAgICA8c3RvcCBzdG9wLWNvbG9yPSIjRjc0QTVDIiBvZmZzZXQ9IjUxLjI2MzUxOTElIj48L3N0b3A+CiAgICAgICAgICAgIDxzdG9wIHN0b3AtY29sb3I9IiNGNTFEMkMiIG9mZnNldD0iMTAwJSI+PC9zdG9wPgogICAgICAgIDwvbGluZWFyR3JhZGllbnQ+CiAgICA8L2RlZnM+CiAgICA8ZyBpZD0iUGFnZS0xIiBzdHJva2U9Im5vbmUiIHN0cm9rZS13aWR0aD0iMSIgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj4KICAgICAgICA8ZyBpZD0ibG9nbyIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTIwLjAwMDAwMCwgLTIwLjAwMDAwMCkiPgogICAgICAgICAgICA8ZyBpZD0iR3JvdXAtMjgtQ29weS01IiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgyMC4wMDAwMDAsIDIwLjAwMDAwMCkiPgogICAgICAgICAgICAgICAgPGcgaWQ9Ikdyb3VwLTI3LUNvcHktMyI+CiAgICAgICAgICAgICAgICAgICAgPGcgaWQ9Ikdyb3VwLTI1IiBmaWxsLXJ1bGU9Im5vbnplcm8iPgogICAgICAgICAgICAgICAgICAgICAgICA8ZyBpZD0iMiI+CiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8cGF0aCBkPSJNOTEuNTg4MDg2Myw0LjE3NjUyODIzIEw0LjE3OTk2NTQ0LDkxLjUxMjc3MjggQy0wLjUxOTI0MDYwNSw5Ni4yMDgxMTQ2IC0wLjUxOTI0MDYwNSwxMDMuNzkxODg1IDQuMTc5OTY1NDQsMTA4LjQ4NzIyNyBMOTEuNTg4MDg2MywxOTUuODIzNDcyIEM5Ni4yODcyOTIzLDIwMC41MTg4MTQgMTAzLjg3NzMwNCwyMDAuNTE4ODE0IDEwOC41NzY1MSwxOTUuODIzNDcyIEwxNDUuMjI1NDg3LDE1OS4yMDQ2MzIgQzE0OS40MzM5NjksMTU0Ljk5OTYxMSAxNDkuNDMzOTY5LDE0OC4xODE5MjQgMTQ1LjIyNTQ4NywxNDMuOTc2OTAzIEMxNDEuMDE3MDA1LDEzOS43NzE4ODEgMTM0LjE5MzcwNywxMzkuNzcxODgxIDEyOS45ODUyMjUsMTQzLjk3NjkwMyBMMTAyLjIwMTkzLDE3MS43MzczNTIgQzEwMS4wMzIzMDUsMTcyLjkwNjAxNSA5OS4yNTcxNjA5LDE3Mi45MDYwMTUgOTguMDg3NTM1OSwxNzEuNzM3MzUyIEwyOC4yODU5MDgsMTAxLjk5MzEyMiBDMjcuMTE2MjgzMSwxMDAuODI0NDU5IDI3LjExNjI4MzEsOTkuMDUwNzc1IDI4LjI4NTkwOCw5Ny44ODIxMTE4IEw5OC4wODc1MzU5LDI4LjEzNzg4MjMgQzk5LjI1NzE2MDksMjYuOTY5MjE5MSAxMDEuMDMyMzA1LDI2Ljk2OTIxOTEgMTAyLjIwMTkzLDI4LjEzNzg4MjMgTDEyOS45ODUyMjUsNTUuODk4MzMxNCBDMTM0LjE5MzcwNyw2MC4xMDMzNTI4IDE0MS4wMTcwMDUsNjAuMTAzMzUyOCAxNDUuMjI1NDg3LDU1Ljg5ODMzMTQgQzE0OS40MzM5NjksNTEuNjkzMzEgMTQ5LjQzMzk2OSw0NC44NzU2MjMyIDE0NS4yMjU0ODcsNDAuNjcwNjAxOCBMMTA4LjU4MDU1LDQuMDU1NzQ1OTIgQzEwMy44NjIwNDksLTAuNTM3OTg2ODQ2IDk2LjI2OTI2MTgsLTAuNTAwNzk3OTA2IDkxLjU4ODA4NjMsNC4xNzY1MjgyMyBaIiBpZD0iU2hhcGUiIGZpbGw9InVybCgjbGluZWFyR3JhZGllbnQtMSkiPjwvcGF0aD4KICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxwYXRoIGQ9Ik05MS41ODgwODYzLDQuMTc2NTI4MjMgTDQuMTc5OTY1NDQsOTEuNTEyNzcyOCBDLTAuNTE5MjQwNjA1LDk2LjIwODExNDYgLTAuNTE5MjQwNjA1LDEwMy43OTE4ODUgNC4xNzk5NjU0NCwxMDguNDg3MjI3IEw5MS41ODgwODYzLDE5NS44MjM0NzIgQzk2LjI4NzI5MjMsMjAwLjUxODgxNCAxMDMuODc3MzA0LDIwMC41MTg4MTQgMTA4LjU3NjUxLDE5NS44MjM0NzIgTDE0NS4yMjU0ODcsMTU5LjIwNDYzMiBDMTQ5LjQzMzk2OSwxNTQuOTk5NjExIDE0OS40MzM5NjksMTQ4LjE4MTkyNCAxNDUuMjI1NDg3LDE0My45NzY5MDMgQzE0MS4wMTcwMDUsMTM5Ljc3MTg4MSAxMzQuMTkzNzA3LDEzOS43NzE4ODEgMTI5Ljk4NTIyNSwxNDMuOTc2OTAzIEwxMDIuMjAxOTMsMTcxLjczNzM1MiBDMTAxLjAzMjMwNSwxNzIuOTA2MDE1IDk5LjI1NzE2MDksMTcyLjkwNjAxNSA5OC4wODc1MzU5LDE3MS43MzczNTIgTDI4LjI4NTkwOCwxMDEuOTkzMTIyIEMyNy4xMTYyODMxLDEwMC44MjQ0NTkgMjcuMTE2MjgzMSw5OS4wNTA3NzUgMjguMjg1OTA4LDk3Ljg4MjExMTggTDk4LjA4NzUzNTksMjguMTM3ODgyMyBDMTAwLjk5OTg2NCwyNS42MjcxODM2IDEwNS43NTE2NDIsMjAuNTQxODI0IDExMi43Mjk2NTIsMTkuMzUyNDQ4NyBDMTE3LjkxNTU4NSwxOC40Njg1MjYxIDEyMy41ODUyMTksMjAuNDE0MDIzOSAxMjkuNzM4NTU0LDI1LjE4ODk0MjQgQzEyNS42MjQ2NjMsMjEuMDc4NDI5MiAxMTguNTcxOTk1LDE0LjAzNDAzMDQgMTA4LjU4MDU1LDQuMDU1NzQ1OTIgQzEwMy44NjIwNDksLTAuNTM3OTg2ODQ2IDk2LjI2OTI2MTgsLTAuNTAwNzk3OTA2IDkxLjU4ODA4NjMsNC4xNzY1MjgyMyBaIiBpZD0iU2hhcGUiIGZpbGw9InVybCgjbGluZWFyR3JhZGllbnQtMikiPjwvcGF0aD4KICAgICAgICAgICAgICAgICAgICAgICAgPC9nPgogICAgICAgICAgICAgICAgICAgICAgICA8cGF0aCBkPSJNMTUzLjY4NTYzMywxMzUuODU0NTc5IEMxNTcuODk0MTE1LDE0MC4wNTk2IDE2NC43MTc0MTIsMTQwLjA1OTYgMTY4LjkyNTg5NCwxMzUuODU0NTc5IEwxOTUuOTU5OTc3LDEwOC44NDI3MjYgQzIwMC42NTkxODMsMTA0LjE0NzM4NCAyMDAuNjU5MTgzLDk2LjU2MzYxMzMgMTk1Ljk2MDUyNyw5MS44Njg4MTk0IEwxNjguNjkwNzc3LDY0LjcxODExNTkgQzE2NC40NzIzMzIsNjAuNTE4MDg1OCAxNTcuNjQ2ODY4LDYwLjUyNDE0MjUgMTUzLjQzNTg5NSw2NC43MzE2NTI2IEMxNDkuMjI3NDEzLDY4LjkzNjY3NCAxNDkuMjI3NDEzLDc1Ljc1NDM2MDcgMTUzLjQzNTg5NSw3OS45NTkzODIxIEwxNzEuODU0MDM1LDk4LjM2MjM3NjUgQzE3My4wMjM2Niw5OS41MzEwMzk2IDE3My4wMjM2NiwxMDEuMzA0NzI0IDE3MS44NTQwMzUsMTAyLjQ3MzM4NyBMMTUzLjY4NTYzMywxMjAuNjI2ODQ5IEMxNDkuNDc3MTUsMTI0LjgzMTg3IDE0OS40NzcxNSwxMzEuNjQ5NTU3IDE1My42ODU2MzMsMTM1Ljg1NDU3OSBaIiBpZD0iU2hhcGUiIGZpbGw9InVybCgjbGluZWFyR3JhZGllbnQtMykiPjwvcGF0aD4KICAgICAgICAgICAgICAgICAgICA8L2c+CiAgICAgICAgICAgICAgICAgICAgPGVsbGlwc2UgaWQ9IkNvbWJpbmVkLVNoYXBlIiBmaWxsPSJ1cmwoI2xpbmVhckdyYWRpZW50LTQpIiBjeD0iMTAwLjUxOTMzOSIgY3k9IjEwMC40MzY2ODEiIHJ4PSIyMy42MDAxOTI2IiByeT0iMjMuNTgwNzg2Ij48L2VsbGlwc2U+CiAgICAgICAgICAgICAgICA8L2c+CiAgICAgICAgICAgIDwvZz4KICAgICAgICA8L2c+CiAgICA8L2c+Cjwvc3ZnPg=="
            alt="logo">
          <transition name="el-zoom-in-center">
            <h1 v-show="!collapse" :title="kindo.config.subTitle">{{ kindo.config.subTitle }}</h1>
          </transition>
        </div>

        <!-- 菜单部分 -->
        <nav-item v-for="menu in subMenus" :key="menu.id" :menu="menu">

        </nav-item>
      </el-menu>
    </el-aside>
    <el-container>
      <!-- 顶部菜单部分 -->
      <el-header class="header" height="64px">
        <el-row type="flex" justify="center" align="middle">
          <el-col :span="18" style="display: flex;">
            <div class="control">
              <i class="action fa-list" @click="() => { collapse = !collapse }">
              </i>
            </div>
            <div class="nav">
              <el-menu mode="horizontal" active-text-color="#01bdd6" @select="rootMenuSelect">
                <el-menu-item v-for="menu in rootMenus" :key="menu.id" :index="menu.id" :router="menu.id">
                  <i :class="menu.iconUrl"></i>
                  {{ menu.name }}
                </el-menu-item>
              </el-menu>
            </div>
          </el-col>
          <el-col :span="6" style="min-width: 200px;">
            <div class="user">
              <i class="action el-icon-service"></i>
              <i class="action el-icon-view"></i>
              <el-dropdown>
                <el-button type="text" class="action" style="font-size: 12px">
                  {{ userInfo.name }}
                </el-button>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item>
                    <div @click="showUserCenter">
                      <i class="el-icon-arrow-down" style="margin-right: 10px;">
                      </i>
                      <span>个人中心</span>
                    </div>
                  </el-dropdown-item>
                  <el-dropdown-item>
                    <div @click="signOut">
                      <i class="el-icon-more-outline" style="margin-right: 10px;">
                      </i>
                      <span>安全退出</span>
                    </div>
                  </el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </div>
          </el-col>
        </el-row>
      </el-header>

      <!-- 组件部分 -->
      <el-main>
        <transition name="el-fade-in-linear" mode="out-in">
          <router-view></router-view>
        </transition>
      </el-main>
    </el-container>

    <kindo-side-panel v-model="userCenter" closeHtml="<i class='el-icon-close'></i>" :widths="['400px']" @close="hideUserCenter">
      个人中心
    </kindo-side-panel>
  </el-container>
</template>

<script>
// 引入不限层级菜单
import NavItem from './navItem'

import { user } from '@/type.js'

import elementResizeDetectorMaker from 'element-resize-detector'
import debounce from 'lodash/debounce'
const erd = elementResizeDetectorMaker({
  strategy: 'scroll' //<- For ultra performance.
})

export default {
  components: {
    NavItem
  },

  data() {
    return {
      userInfo: kindo.cache.get(user.USER_INFO),

      userCenter: false,

      collapse: false,

      rootMenus: [],
      subMenus: [],
      subMenusOpeneds: []
    }
  },

  computed: {
    asideWidth() {
      return this.collapse ? '64px' : '220px'
    }
  },

  watch: {
    $route: {
      handler: function() {
        // 设定展开菜单
        const subKey = this.$route.path.split('/')[2]

        if (!subKey) {
          return
        }

        const getDefaultOpeneds = (menus, id, array = []) => {
          const tempMenu = menus.find(menu => menu.id === id)

          if (tempMenu && tempMenu.pid) {
            array.push(tempMenu.pid)
            return getDefaultOpeneds(menus, tempMenu.pid, array)
          } else {
            return array
          }
        }

        const opends = getDefaultOpeneds(kindo.cache.get(user.USER_MENU), subKey)

        this.subMenusOpeneds = opends
      },
      immediate: true
    },

    collapse() {
      this.subMenusOpeneds = this.subMenusOpeneds.concat([])

      // 选中菜单
      setTimeout(() => {
        const subPath = this.$route.path.split('/')[2]
        this.menuClick(subPath)
      }, 500)
    }
  },

  created() {
    this.rootMenus = kindo.cache.get(user.USER_MENU_TREE)

    this.$nextTick(function() {
      const rootPath = this.$route.fullPath.split('/')[1]
      if (this.$el.querySelectorAll(`[router="${rootPath}"]`)[0]) {
        this.$el.querySelectorAll(`[router="${rootPath}"]`)[0].click()
      } else {
        this.$el.querySelectorAll('.header .el-menu-item')[0].click()
      }
    })
  },

  mounted() {
    this.$nextTick(function() {
      erd.listenTo(
        this.$el,
        debounce(() => {
          this.collapse = this.$el.clientWidth <= 1200
        }, 300)
      )
    })
  },

  methods: {
    rootMenuSelect(key) {
      const menus = this.rootMenus.find(item => item.id === key)

      if (menus && menus.children && menus.children.length > 0) {
        this.subMenus = menus.children
        this.rootPath = key

        this.$nextTick(function() {
          const subPath = this.$route.path.split('/')[2]
          if (this.$el.querySelector(`[router='${subPath}']`)) {
            this.$el.querySelector(`[router='${subPath}']`).click()
          } else {
            this.$el.querySelectorAll('.aside .el-menu-item')[0].click()
          }
        })
      } else {
        // 只有根菜单
      }
    },

    subMenuSelect(key) {
      this.subPath = key

      this.$router.push(`/${this.rootPath}/${this.subPath}`)
    },

    menuClick(key) {
      if (this.$el.querySelector(`[router='${key}']`)) {
        this.$el.querySelector(`[router='${key}']`).click()
      }
    },

    signOut() {
      kindo.cache.clear()
      this.$router.push('/login')
    },

    showUserCenter() {
      this.userCenter = true
    },

    hideUserCenter() {
      this.userCenter = false
    }
  }
}
</script>

<style lang="scss" scoped>
.layout {
  background: #f2f3f8;
  width: 100vw;
  height: 100vh;

  .aside {
    position: relative;
    transition: all 0.3s cubic-bezier(0.8, 0.1, 0.1, 0.8);
    overflow: hidden;

    .logo {
      background-color: #2b83f9;
      background-image: linear-gradient(143deg, #282a3c 30%, #282a3c 30%, #282a3c);
      padding-left: 15px;
      height: 64px;
      line-height: 64px;
      img,
      h1 {
        display: inline-block;
        vertical-align: middle;
      }
      img {
        height: 32px;
      }
      h1 {
        color: #fff;
        font-size: 20px;
        margin: 0 0 0 12px;
        font-weight: 600;
        width: 140px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }
    .nav {
      min-height: 100vh;
      &:not(.el-menu--collapse) {
        width: 220px;
      }
      &.el-menu--collapse {
        /deep/ .nav-icon {
          font-size: 20px;
        }
      }
    }
  }
  .header {
    height: 64px;
    padding: 0 10px 0 0;
    background: #fff;
    box-shadow: 0 2px 4px -1px rgba(0, 0, 0, 0.2), 0 4px 5px 0 rgba(0, 0, 0, 0.14), 0 1px 10px 0 rgba(0, 0, 0, 0.12);
    position: relative;
    .action {
      font-size: 16px;
      line-height: 64px;
      cursor: pointer;
      transition: all 0.3s, padding 0s;
      padding: 0 24px;
      &:hover {
        background: #e6f7ff;
      }
    }
    .nav,
    .control {
      display: flex;
      font-size: 20px;
      height: 62px;
      line-height: 62px;
      cursor: pointer;
      transition: all 0.3s, padding 0s;
    }
    .nav {
      .el-menu--horizontal > .el-menu-item {
        height: 62px;
        line-height: 62px;
      }
    }
    .user {
      text-align: right;
      .action {
        color: #01bdd6;
        padding: 0 12px;
      }
    }
  }
}
</style>
