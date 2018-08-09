/*
 * @Author: PengZhen 
 * @Description: 查询框 
                 基于 kindo-card 组件重写的, 适用于查询的 card
 * @Date: 2018-07-02 18:22:13 
 * @Last Modified by: PengZhen
 * @Last Modified time: 2018-07-26 15:31:59
 */

<template>
  <div class="kindo-card-search">
    <!-- main -->
    <div class="main">
      <div class="wrapper">
        <div class="content">
          <slot></slot>
        </div>

        <div class="control">
          <el-button v-if="internalCollapse && $slots.more" circle :icon="internalIsCollapse ? 'el-icon-arrow-up' : 'el-icon-arrow-down'" @click="toggleCollapse"></el-button>
        </div>
      </div>
    </div>

    <!-- more -->
    <el-collapse-transition>
      <div v-show="internalIsCollapse" class="more">

        <hr class="hr">

        <div class="content">
          <slot name="more"></slot>
        </div>

      </div>
    </el-collapse-transition>
  </div>
</template>

<script>
export default {
  name: 'kindo-card-search',

  props: {
    collapse: {
      type: Boolean,
      default() {
        return true
      }
    },
    isCollapse: Boolean
  },

  data() {
    return {
      // 内部使用, 是否显示展开按钮
      internalCollapse: this.collapse,

      // 内部使用, 是否显示展开内容
      internalIsCollapse: this.isCollapse
    }
  },

  methods: {
    toggleCollapse() {
      this.internalIsCollapse = !this.internalIsCollapse
    }
  }
}
</script>

<style lang="scss" scoped>
$--control-width: 220px;
$--control-half-width: 102px;

.kindo-card-search {
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

  .main {
    background: #fff;
    padding: 10px 20px;
    border-radius: 2px 2px 0 0;
    zoom: 1;

    .wrapper {
      min-height: 32px;
      display: flex;
      justify-content: center;
      align-items: center;

      .content {
        font-size: 14px;
        text-overflow: ellipsis;
        overflow: hidden;
        // white-space: nowrap;
        color: rgba(0, 0, 0, 0.85);
        font-weight: 500;
        display: inline-block;
        flex: 1 1 0%;

        /deep/ .el-form-item--mini.el-form-item {
          margin-bottom: 0;
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

  .more {
    padding: 0 0 10px;
    zoom: 1;

    .content {
      padding: 0 20px;

      /deep/ .el-form-item--mini.el-form-item {
        margin-bottom: 5px;
      }
    }
  }

  /deep/ .el-form {
    .el-input {
      width: $--control-width;
    }

    .el-select {
      width: $--control-width;

      .el-input {
        width: 100%;
      }
    }

    .half {
      &.el-input {
        width: $--control-half-width;
      }

      &.el-date-editor {
        .el-input__inner {
          // padding: 0 16px;
          padding-left: 16px;
          padding-right: 0;
        }

        .el-input__icon.el-icon-date {
          display: none;
        }

        .el-input__suffix {
          right: 0;
          width: 22px;
        }
      }

      &.line {
        display: inline-block;
        text-align: center;
        width: 16px;
      }
    }
  }
}
</style>
