<template>
  <div id="app">
    <transition name="el-fade-in" mode="out-in">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'app',

  data() {
    return {}
  },

  created() {
    // Change app title
    document.title = kindo.config.theme.title

    // If Not logged in, push to login
    // this.$router.push('/login')

    // Logged in ? Get user info from cookie or storage, set to vuex
    this.SET({
      userName: '这是 app 处得到的用户信息'
    })
  },

  methods: {
    ...mapActions('USER', ['SET'])
  }
}
</script>

<style>
</style>
