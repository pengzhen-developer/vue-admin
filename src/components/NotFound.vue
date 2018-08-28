<template>
  <div class="container">

    <div class="row pad-top text-center">
      <div class="col-md-6 col-md-offset-3 text-center">
        <span id="error-link">404</span>
        <h1> 您好像操作了什么？ </h1>
        <h2> 抱歉，我们找不到您想要的页面 </h2>
      </div>
    </div>

    <div class="row text-center">
      <div class="col-md-8 col-md-offset-2">
        <br>
        <el-button type="" @click="goHome">
          返 回 首 页
        </el-button>
      </div>
    </div>

  </div>
</template>

<script>
export default {
  methods: {
    goHome() {
      this.$router.push('/')
    }
  }
}
</script>

<style scoped>
h1 {
  display: block;
  font-size: 2em;
  -webkit-margin-before: 0.67em;
  -webkit-margin-after: 0.67em;
  -webkit-margin-start: 0px;
  -webkit-margin-end: 0px;
  font-weight: bold;
}

h3 {
  display: block;
  font-size: 1.17em;
  -webkit-margin-before: 1em;
  -webkit-margin-after: 1em;
  -webkit-margin-start: 0px;
  -webkit-margin-end: 0px;
  font-weight: bold;
}

.pad-top {
  padding-top: 60px;
}

.text-center {
  text-align: center;
}

#error-link {
  font-size: 150px;
  padding: 10px;
}
</style>
