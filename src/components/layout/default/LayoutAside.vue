<template>
  <el-menu class="aside-menu" :collapse="LAYOUT.COLLAPSE" default-active="1-1-1" background-color="#2c2e3e" text-color="#dadada" active-text-color="#716aca">

    <div class="logo">
      <div v-if="!LAYOUT.COLLAPSE" class="title">METRONIC</div>
      <div class="conotrol">
        <i class="el-icon-menu" @click="COLLAPSE"></i>
      </div>
    </div>

    <el-submenu index="1">
      <template slot="title">
        <i class="el-icon-location"></i>
        <span>自定义页面</span>
      </template>
      <el-menu-item index="1-1-1">登录页</el-menu-item>
      <el-menu-item index="1-1-2">错误页</el-menu-item>
    </el-submenu>
    <el-menu-item index="2">
      <i class="el-icon-menu"></i>
      <span slot="title">导航二</span>
    </el-menu-item>
    <el-menu-item index="3" disabled>
      <i class="el-icon-document"></i>
      <span slot="title">导航三</span>
    </el-menu-item>
    <el-menu-item index="4">
      <i class="el-icon-setting"></i>
      <span slot="title">导航四</span>
    </el-menu-item>
  </el-menu>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  name: 'LayoutAside',

  computed: {
    ...mapState(['LAYOUT'])
  },

  methods: {
    ...mapActions('LAYOUT', ['COLLAPSE'])
  }
}
</script>

<style lang="scss" scoped>
$--aside-width: 240px;
$--aside-height: 100vh;
$--aside-header-height: 70px;

.aside-menu {
  height: $--aside-height;
  border-right: 0;

  .el-submenu .el-menu-item {
    margin-left: 8px;
  }

  &.el-menu--collapse {
    .logo {
      justify-content: center;

      .conotrol {
        color: #716aca;
        font-size: 20px;
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

    .conotrol {
      color: #aeafc2;
      cursor: pointer;
    }
  }
}

.aside-menu:not(.el-menu--collapse) {
  width: $--aside-width;
}
</style>
