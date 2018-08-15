<template>
  <div>
    <el-button type="primary" @click="testAxios">测试请求</el-button>
  </div>
</template>

<script>
export default {
  methods: {
    testAxios() {
      this.$http.get('https://router.vuejs.org/zh/guide/advanced/scroll-behavior.html')

      setTimeout(() => {
        this.$http.get('https://router.vuejs.org/zh/guide/advanced/scroll-behavior.html')
      }, 200)
      setTimeout(() => {
        this.$http.get('https://router.vuejs.org/zh/guide/advanced/scroll-behavior.html')
      }, 300)
      setTimeout(() => {
        this.$http.get('https://router.vuejs.org/zh/guide/advanced/scroll-behavior.html')
      }, 400)
    }
  }
}
</script>

<style>
</style>
