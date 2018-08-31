<template>
  <div id="app">
    <transition name="el-fade-in" mode="out-in">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
import { user } from '@/type'
import { mapActions } from 'vuex'

export default {
  name: 'app',

  data() {
    return {}
  },

  created() {
    // Change app title
    document.title = kindo.config.theme.title

    // If logged in, Get user info from cookie or storage, set to vuex
    // Not ? push to login
    if (kindo.cache.get(user.USER_INFO)) {
      this.setUserInfo(kindo.cache.get(user.USER_INFO))
      this.$router.push('/layout')
    } else {
      this.$router.push('/login')
    }
  },

  methods: {
    ...mapActions('user', ['setUserInfo'])
  }
}
</script>

<style>
</style>
