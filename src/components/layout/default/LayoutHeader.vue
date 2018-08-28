<template>
  <div class="header">
    <div class="control">1</div>
    <div class="control">
      <el-dropdown trigger="click">
        <div class="drop-link">
          <i class="el-icon-sold-out"></i>
        </div>
        <el-dropdown-menu class="drop-content" slot="dropdown">
          123
        </el-dropdown-menu>
      </el-dropdown>

      <el-dropdown trigger="click">
        <div class="drop-link">
          <i class="el-icon-question"></i>
          {{ USER['USER_INFO'].userName }}
        </div>
        <el-dropdown-menu class="drop-content" slot="dropdown">
          <el-dropdown-item>
            <el-button disabled="" type="text">个人中心</el-button>
          </el-dropdown-item>
          <el-dropdown-item>
            <el-button type="text" icon="el-icon-edit" @click="signOut">安全退出</el-button>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  name: 'LayoutHeader',

  computed: {
    ...mapState(['USER'])
  },

  methods: {
    ...mapActions('USER', ['REMOVE']),

    signOut() {
      kindo.cache.clear()
      this.REMOVE()

      this.$router.push('/login')
    }
  }
}
</script>

<style lang="scss" scoped>
$--header-height: 70px;

.header {
  display: flex;
  align-items: center;
  justify-content: space-between;

  height: $--header-height;
  padding: 0 16px;
  box-shadow: 0px 1px 15px 1px rgba(69, 65, 78, 0.1);

  .control {
    display: flex;
    align-items: center;
    height: $--header-height;
  }
}

.drop-content {
  min-width: 140px;

  .el-button--text {
    &:not(.is-disabled) {
      color: #000;
    }
  }
}

.drop-link {
  display: flex;
  align-items: center;
  height: $--header-height;

  cursor: pointer;
  padding: 0 12px;
  transition: all 0.3s;

  i {
    font-size: 22px;
  }

  &:hover {
    background: #e6f7ff;
  }
}
</style>
