<template>
  <el-menu class="aside-menu" :collapse="layout.collapse" :default-active="defaultActive" background-color="#2c2e3e" text-color="#dadada" active-text-color="#716aca" @select="menuSelect">

    <div class="logo">
      <div v-if="!layout.collapse" class="title">METRONIC</div>
      <div class="control">
        <icon name="bars" @click.native="collapse"></icon>
      </div>
    </div>

    <el-submenu index="deshboard">
      <template slot="title">
        <i class="el-icon-location"></i>
        <span>Deshboard</span>
      </template>
      <el-menu-item index="deshboard/workplace" routeId="deshboard/workplace">工作台</el-menu-item>
      <el-menu-item index="deshboard/analysis" routeId="deshboard/analysis">分析页</el-menu-item>
      <el-menu-item index="deshboard/monitor" routeId="deshboard/monitor">监控页</el-menu-item>
    </el-submenu>
  </el-menu>
</template>

<script>
import { mapState, mapActions } from 'vuex'

const router = [{ label: '工作台', index: 'deshboard/workplace' }, { label: '分析页', index: 'deshboard/analysis' }, { label: '监控页', index: 'deshboard/monitor' }]

export default {
  name: 'LayoutAside',

  computed: {
    ...mapState(['layout'])
  },

  data() {
    return {
      defaultOpeneds: ['deshboard'],
      defaultActive: 'deshboard/workplace'
    }
  },

  watch: {
    $route() {
      this.$el.querySelectorAll(`[routeId="${this.$route.name}"]`).forEach(element => {
        element.click()
      })
    }
  },

  mounted() {
    this.$nextTick(function() {
      this.$el.querySelectorAll(`[routeId="${this.$route.name}"]`).forEach(element => {
        element.click()
      })
    })
  },

  methods: {
    ...mapActions('layout', ['collapse', 'selectTab', 'pushTab']),

    menuSelect(index) {
      const label = router.find(item => item.index === index).label

      this.pushTab({ label, index })
      this.selectTab(index)
    }
  }
}
</script>

<style lang="scss" scoped>
$--aside-width: 240px;
$--aside-height: 100vh;
$--aside-header-height: 60px;

.aside-menu {
  height: $--aside-height;
  border-right: 0;

  .el-submenu .el-menu-item {
    margin-left: 8px;
  }

  &.el-menu--collapse {
    .logo {
      justify-content: center;

      .control {
        color: #716aca;

        svg {
          width: 20px;
          height: 20px;
        }
      }
    }
  }

  .logo {
    display: flex;
    align-items: center;
    justify-content: space-between;

    height: $--aside-header-height;
    padding: 0 16px;
    background: #282a3c;

    .title {
      color: #fff;
      font-size: 18px;
    }

    .control {
      color: #aeafc2;
      cursor: pointer;
    }
  }
}

.aside-menu:not(.el-menu--collapse) {
  width: $--aside-width;
}
</style>
