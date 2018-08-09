<template>
  <div>
    这里是首页, 没有首页, 可以直接跳转到 layout
  </div>
</template>

<script>
export default {
  name: 'home',

  created() {
    this.$router.push('/layout')
  }
}
</script>

<style>
</style>
