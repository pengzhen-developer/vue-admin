<template>
  <div>
    <el-container>
      <el-aside class="aside-menu" :width="asideWidth">
        <layout-aside></layout-aside>
      </el-aside>
      <el-container class="main">
        <el-header class="main-header">
          <layout-header></layout-header>
        </el-header>

        <el-main>

          <div class="site-map">
            <el-tabs class="tabs" v-model="layout.tabSelect" closable @tab-click="tabClick" @tab-remove="tabRemove">
              <el-tab-pane v-for="tab in layout.tabList" :key="tab.label" :label="tab.label" :name="tab.index"> </el-tab-pane>
            </el-tabs>
          </div>

          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import LayoutAside from './LayoutAside'
import LayoutHeader from './LayoutHeader'
import { mapState, mapActions } from 'vuex'

export default {
  components: {
    LayoutAside,
    LayoutHeader
  },

  data() {
    return {
      routers: this.$router.options.routes
    }
  },

  computed: {
    ...mapState(['layout']),

    asideWidth: function() {
      return this.layout.collapse ? '64px' : '240px'
    }
  },

  methods: {
    ...mapActions('layout', ['collapse', 'selectTab', 'pushTab', 'removeTab']),

    tabClick(tab) {
      this.selectTab(tab.name)
    },

    tabRemove(tabName) {
      this.removeTab(tabName)
    }
  }
}
</script>

<style lang="scss" scoped>
.aside-menu {
  padding: 0;

  background-color: rgb(44, 46, 62);
  transition: width 0.3s ease-out;
}

.main-header {
  padding: 0;
  box-shadow: 0px 1px 15px 1px rgba(69, 65, 78, 0.1);
}

.site-map {
  .tabs {
    margin: -20px -20px 10px -20px;

    /deep/ .el-tabs__active-bar {
      display: none;
    }

    /deep/ .el-tabs__item {
      margin: 0;
      padding: 10px 20px;
      height: 56px;

      &:hover,
      &.is-active {
        background: #0061da;
        color: #fff;
      }
    }
  }
}
</style>
