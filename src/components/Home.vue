<template>
  <div>
    <el-button type="primary" @click="testAxios">测试请求</el-button>
  </div>
</template>

<script>
export default {
  methods: {
    testAxios() {
      this.$http.get('123')

      setTimeout(() => {
        this.$http.get('456')

        setTimeout(() => {
          this.$http.get('789')

          setTimeout(() => {
            this.$http.get('10')
          }, 3000)
        }, 1500)
      }, 2200)
    }
  }
}
</script>

<style>
</style>
