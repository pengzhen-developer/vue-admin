<template>
  <div class="container">

    <div class="row pad-top text-center">
      <div class="col-md-6 col-md-offset-3 text-center">
        <h1>! 错误检测 !</h1>
        <h2>你好像没有任何权限，联系管理员试试看</h2>
        <span id="error-link">401</span>
      </div>
    </div>

    <div class="row text-center">
      <div class="col-md-8 col-md-offset-2">
        <br>
        <br>
        <el-button type="success" @click="reLogin">
          重 新 登 录
        </el-button>
      </div>
    </div>

  </div>
</template>

<script>
export default {
  methods: {
    reLogin() {
      window.location.hash = '/login'
      window.location.reload()
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
