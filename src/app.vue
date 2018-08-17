<template>
  <div id="app">
    <transition name="el-fade-in" mode="out-in">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'app',

  data() {
    return {}
  },

  created() {
    // Not logged in, push to login
    this.$router.push('/login')
  }
}
</script>

<style>
</style>
