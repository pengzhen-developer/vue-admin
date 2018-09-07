<template>
  <div class="header">
    <div class="control">
      这里可以放一些东西
    </div>

    <div class="control">

      <el-dropdown trigger="click">
        <div class="drop-link">
          <el-badge :value="9">
            <icon name="comment"></icon>
          </el-badge>
        </div>
        <el-dropdown-menu class="drop-content commet" slot="dropdown">
          <el-tabs>
            <el-tab-pane label="通知（3）"></el-tab-pane>
            <el-tab-pane label="消息（5）"></el-tab-pane>
            <el-tab-pane label="待办（1）"></el-tab-pane>
          </el-tabs>
        </el-dropdown-menu>
      </el-dropdown>

      <el-dropdown trigger="click">
        <div class="drop-link">
          <icon name="globe"></icon>
        </div>
        <el-dropdown-menu class="drop-content language" slot="dropdown">
          <div class="title"> 选择你的语言 </div>
          <div class="content">
            <ul class="el-scrollbar__view el-select-dropdown__list">
              <el-dropdown-item class="el-select-dropdown__item">
                <span>
                  <icon name="globe"></icon> 中国
                </span>
              </el-dropdown-item>
              <el-dropdown-item class="el-select-dropdown__item">
                <span>
                  <icon name="euro-sign"></icon> 美国
                </span>
              </el-dropdown-item>
              <el-dropdown-item class="el-select-dropdown__item">
                <span>
                  <icon name="neuter"></icon> 日本
                </span>
              </el-dropdown-item>
            </ul>
          </div>
        </el-dropdown-menu>
      </el-dropdown>

      <el-dropdown trigger="click">
        <div class="drop-link">
          <icon name="user-tie"></icon>
          {{ user.userInfo.userName }}
        </div>
        <el-dropdown-menu class="drop-content" slot="dropdown">
          <el-dropdown-item @click.native="userCenter">
            <el-button disabled type="text">
              <icon class="el-icon--left" name="users-cog"></icon>个人中心
            </el-button>
          </el-dropdown-item>
          <el-dropdown-item @click.native="signOut">
            <el-button type="text">
              <icon class="el-icon--left" name="sign-out-alt"></icon>安全退出
            </el-button>
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
    ...mapState(['user'])
  },

  methods: {
    ...mapActions('user', ['remove']),

    signOut() {
      kindo.cache.clear()
      this.remomve()

      this.$router.push('/login')
    }
  }
}
</script>

<style lang="scss" scoped>
$--header-height: 60px;

.header {
  display: flex;
  align-items: center;
  justify-content: space-between;

  height: $--header-height;
  padding: 0 16px;
  margin-bottom: 5px;
  box-shadow: 0px 1px 15px 1px rgba(69, 65, 78, 0.1);

  .control {
    display: flex;
    align-items: center;
    height: $--header-height;
  }
}

.drop-content {
  min-width: 140px;

  &.language {
    .title {
      font-size: 14px;
      text-align: center;
      padding: 10px 20px;
    }
  }

  &.commet {
    width: 400px;

    /deep/ .el-tabs__nav.is-top {
      margin: 0 20px;
    }
  }

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

  svg {
    color: #716aca;
    width: 14px;
    height: 24px;
    margin-right: 5px;
    font-size: 22px;
  }

  &:hover {
    background: #e6f7ff;
  }
}
</style>
