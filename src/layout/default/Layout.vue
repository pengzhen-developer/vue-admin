<template>
  <div>
    <el-container>
      <el-aside :width="asideWidth">
        <el-menu router :default-active="$route.fullPath">
          <el-menu-item v-for="router in routers" :key="router.name" :index="router.path">
            {{ router.name }}
          </el-menu-item>
        </el-menu>
      </el-aside>
      <el-container>
        <el-header>2</el-header>
        <el-main>3</el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
export default {
  data() {
    return {
      routers: this.$router.options.routes,

      asideWidth: '240px'
    }
  }
}
</script>

<style>
</style>
