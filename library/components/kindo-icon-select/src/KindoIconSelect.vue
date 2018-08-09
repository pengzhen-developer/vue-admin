<template>
  <div>
    <el-popover placement="bottom" width="300" trigger="click">
      <el-tabs>
        <el-tab-pane v-for="group in icon" :key="group.title" :label="group.title">
          <el-collapse class="group">
            <el-collapse-item class="item" v-for="list in group.icon" :key="list.title" :title="list.title" :name="list.title">
              <el-row class="item-row">
                <el-col class="item-col" :span="6" v-for="item in list.icon" :key="item" @click.native="selectIcon(group.suffix + item)">
                  <i :class="group.suffix + item"></i>
                </el-col>
              </el-row>
            </el-collapse-item>
          </el-collapse>
        </el-tab-pane>
      </el-tabs>

      <el-input slot="reference" v-model="intternalValue" placeholder="">
        <i slot="suffix" class="el-input__icon" :class="intternalValue"></i>
      </el-input>
    </el-popover>
  </div>
</template>

<script>
import 'font-awesome/css/font-awesome.css'
import icon from './icon'

export default {
  name: 'kindo-icon-select',

  props: {
    value: String
  },

  data() {
    return {
      icon,

      view: {
        model: {
          filter: ''
        }
      }
    }
  },

  computed: {
    intternalValue: {
      get() {
        return this.value
      },
      set(value) {
        this.$emit('input', value)
      }
    }
  },

  methods: {
    selectIcon(icon) {
      this.$emit('input', icon)
    }
  }
}
</script>


<style>
[class^='fa'],
[class*=' fa'] {
  display: inline-block;
  font-family: FontAwesome !important;
  font-size: inherit;
  font-weight: 400;
  font-style: normal;
  font-variant: normal;
  text-rendering: auto;

  speak: none;
  font-style: normal;
  font-weight: normal;
  font-variant: normal;
  text-transform: none;
  line-height: 1;
  vertical-align: baseline;
  display: inline-block;
}

.el-button [class*='fa-'] + span {
  margin-left: 5px;
}
</style>

<style lang="scss" scoped>
$color-primary: #409eff;
$color-bg: #f8f8f9;
$color-text-main: #303133;
$color-text-sub: #909399;
$color-border-1: #dcdfe6;

.group {
  max-height: 400px;
  overflow-x: hidden;
  overflow-y: scroll;
  border-top: none;
  border-bottom: none;
  .item {
    .item-title {
      line-height: 30px;
      text-align: center;
      background-color: $color-bg;
      border-radius: 4px;
      margin: 10px 0px;
    }
    .item-row {
      .item-col {
        cursor: pointer;
        line-height: 40px;
        text-align: center;
        color: $color-text-sub;
        &:hover {
          color: $color-text-main;
          background-color: $color-bg;
          border-radius: 4px;
          font-size: 26px;
          box-shadow: inset 0px 0px 0px 1px $color-border-1;
        }
      }
    }
  }
}
</style>
