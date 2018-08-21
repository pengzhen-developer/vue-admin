<template>
  <div>
    <el-alert type="success" title="当前的布局风格是 default "></el-alert>

    <el-container>
      <el-aside :width="asideWidth">
        menu
      </el-aside>
      <el-container>
        <el-header>
          <el-row>
            <el-col :span="12">
              header
            </el-col>
            <el-col class="text-right" :span="12">
              <el-button type="text" @click="$router.push('/login')">返回登录</el-button>
            </el-col>
          </el-row>
        </el-header>

        <el-main>
          main
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  computed: {
    ...mapState(['USER'])
  },

  data() {
    return {
      routers: this.$router.options.routes,

      asideWidth: '240px'
    }
  }
}
</script>

<style>
.el-main {
  padding: 20px;
}
</style>
