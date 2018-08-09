<template>
  <!-- 如果当前 menu 中有子节点 -->
  <el-submenu v-if="menu.children" :index="menu.id" :show-timeout="100" :hide-timeout="100" :router="menu.id" :path="menu.routerPath">
    <template slot="title">
      <i class="nav-icon" :class="menu.iconUrl"></i>
      <span>{{ menu.name }}</span>
    </template>

    <!-- 递归调用自身，直到 subMenu 不含有子节点 -->
    <nav-item v-for="subMenu in menu.children" :key="subMenu.id" :menu="subMenu">
    </nav-item>
  </el-submenu>

  <!-- 如果当前 menu 不含有子节点 -->
  <el-menu-item v-else :index="menu.id" :router="menu.id" :path="menu.routerPath">
    <i class="nav-icon" :class="menu.iconUrl"></i>
    <span slot="title">{{ menu.name }}</span>
  </el-menu-item>
</template>

<script>
export default {
  name: 'NavItem',
  props: {
    menu: Object
  }
}
</script>

<style lang="scss" scoped>
.nav-icon {
  width: 20px;
  margin-right: 5px;
}
</style>
