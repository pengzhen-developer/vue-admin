<template>
  <div class="kindo-card" :class="{ fullPage: internalFullPage }">

    <!-- header -->
    <div v-if="title || $slots.header || $slots.control || fullPage || collapse">
      <div class="header">
        <div class="wrapper">
          <!-- 卡片标题 -->
          <div class="title">
            <div v-if="title">
              <i :class="icon"></i>
              <span v-html="title"></span>
            </div>

            <slot v-else name="header"></slot>
          </div>

          <!-- 卡片功能控制区域 -->
          <div class="control">
            <slot name="control"></slot>
            <el-button v-if="$listeners.reload" circle icon="el-icon-refresh" title="重新加载" @click="handleReload"></el-button>
            <el-button v-if="fullPage" icon="el-icon-rank" circle title="全屏展示" @click="toggleFullPage"></el-button>
            <el-button v-if="collapse" circle title="收缩展开" :icon="internalIsCollapse ? 'el-icon-arrow-up' : 'el-icon-arrow-down'" @click="toggleCollapse"></el-button>
          </div>
        </div>
      </div>
    </div>

    <!-- body -->
    <el-collapse-transition>
      <div v-show="internalIsCollapse" class="body">
        <hr class="hr">

        <div class="content">
          <slot></slot>
        </div>

        <div v-if="$slots.footer" class="footer">
          <slot name="footer"></slot>
        </div>
      </div>
    </el-collapse-transition>
  </div>
</template>

<script>
export default {
  name: 'kindo-card',

  props: {
    // 标题
    title: {
      type: String,
      default() {
        return ''
      }
    },

    // 图标
    icon: {
      type: String,
      default() {
        return 'el-icon-tickets'
      }
    },

    // 是否显示全屏操作按钮
    fullPage: {
      type: Boolean,
      default() {
        return false
      }
    },

    // 是否显示展开操作按钮
    collapse: {
      type: Boolean,
      default() {
        return false
      }
    }
  },

  data() {
    return {
      internalFullPage: this.fullPage,
      internalCollapse: this.collapse,

      // 是否展开状态
      internalIsCollapse: true
    }
  },

  created() {},

  methods: {
    toggleCollapse() {
      this.internalIsCollapse = !this.internalIsCollapse
    },

    toggleFullPage() {
      if (this.internalFullPage) {
        document.body.style.overflow = 'auto'
      } else {
        document.body.style.overflow = 'hidden'
      }

      this.internalFullPage = !this.internalFullPage
    },

    handleReload(e) {
      this.$emit('reload', e)
    }
  }
}
</script>

<style lang="scss" scoped>
.kindo-card {
  line-height: 1.5;
  color: rgba(0, 0, 0, 0.65);
  box-sizing: border-box;
  margin: 0 0 10px 0;
  padding: 0;
  list-style: none;
  background: #fff;
  border-radius: 2px;
  position: relative;
  border-radius: 3px;
  box-shadow: 0 0 8px 0 rgba(232, 237, 250, 0.5), 0 2px 4px 0 rgba(232, 237, 250, 0.4);

  &:hover {
  }

  &.fullPage {
    position: fixed;
    left: 0;
    top: 0;
    z-index: 2 !important;
    width: 100%;
    height: 100%;
  }

  .header {
    background: #fff;
    padding: 10px 20px;
    border-radius: 2px 2px 0 0;
    zoom: 1;

    .wrapper {
      min-height: 32px;
      display: flex;
      justify-content: center;
      align-items: center;

      .title {
        font-size: 16px;
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
        color: rgba(0, 0, 0, 0.95);
        font-weight: 500;
        display: inline-block;
        -ms-flex: 1 1;
        flex: 1 1;

        i {
          display: inline-block;
          width: 20px;
          font-size: 20px;
          margin-right: 12px;
          vertical-align: text-bottom;
        }
      }

      .control {
        display: inline-flex;

        .el-button.is-circle {
          margin-left: 10px;
          padding: 6px;
        }
      }
    }
  }

  .hr {
    background-color: #ebebeb;
    height: 1px;
    margin: 0 0 15px 0;
    border: none;
  }

  .body {
    padding: 0 0 10px;
    zoom: 1;

    .content {
      padding: 0 20px;

      /deep/ .el-form-item--mini.el-form-item {
        margin-bottom: 15px;
      }
    }
  }

  .footer {
    padding: 10px 20px;
    zoom: 1;
    border-top: 1px solid #ebebeb70;
  }
}
</style>
