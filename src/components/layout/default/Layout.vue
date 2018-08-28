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
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import LayoutAside from './LayoutAside'
import LayoutHeader from './LayoutHeader'
import { mapState } from 'vuex'

export default {
  components: {
    LayoutAside,
    LayoutHeader
  },

  computed: {
    ...mapState(['LAYOUT']),

    asideWidth: function() {
      return this.LAYOUT.COLLAPSE ? '64px' : '240px'
    }
  },

  data() {
    return {
      routers: this.$router.options.routes
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
}
</style>
