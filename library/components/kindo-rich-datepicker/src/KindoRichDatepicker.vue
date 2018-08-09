<template>
  <div class="kindo-rich-date-picker">
    <!-- 日期类型 -->
    <el-select v-model="dateType" placeholder="请选择" style="width:60px">
      <el-option label="年" value="year"></el-option>
      <el-option label="季" value="quarter"></el-option>
      <el-option label="月" value="month"></el-option>
    </el-select>

    <!-- 年份 -->
    <el-date-picker v-model="year" type="year" placeholder="请选择年份" :style="{ width: dateType === 'year' ? '160px' : '80px' }" :editable="false" :clearable="false"></el-date-picker>

    <!-- 季度 -->
    <el-select v-show="dateType === 'quarter'" v-model="time" style="width: 80px;">
      <el-option label="一季度" value="1"></el-option>
      <el-option label="二季度" value="2"></el-option>
      <el-option label="三季度" value="3"></el-option>
      <el-option label="四季度" value="4"></el-option>
    </el-select>
    <!-- 月份 -->
    <el-select v-show="dateType === 'month'" v-model="time" style="width: 80px">
      <el-option label="1月" value="01"></el-option>
      <el-option label="2月" value="02"></el-option>
      <el-option label="3月" value="03"></el-option>
      <el-option label="4月" value="04"></el-option>
      <el-option label="5月" value="05"></el-option>
      <el-option label="6月" value="06"></el-option>
      <el-option label="7月" value="07"></el-option>
      <el-option label="8月" value="08"></el-option>
      <el-option label="9月" value="09"></el-option>
      <el-option label="10月" value="10"></el-option>
      <el-option label="11月" value="11"></el-option>
      <el-option label="12月" value="12"></el-option>
    </el-select>
  </div>
</template>
<script>
// import Vue from 'vue'

export default {
  name: 'kindo-rich-datepicker',
  props: {
    /**
     * [年、月、季] 时间选择器
     *
     * @param [] value
     *        value[0] => 日期类型, 可选month、quarter、year, 默认month
     *        value[1] => 年, 默认当年
     *        value[2] => 月,旬, 默认当月或当旬
     *
     */
    value: {
      type: Array,
      default: () => {
        let nowMonth = new Date().getMonth()
        let year = ''
        let month = ''
        if (nowMonth === 0) {
          // 如果是1月
          year = new Date().getFullYear() - 1
          month = '12'
        } else {
          // 如果不是1月
          year = new Date().getFullYear().toString()
          month = nowMonth < 10 ? '0' + nowMonth : nowMonth
        }
        return ['month', year, month]
        // return ['month', new Date().formatDate('yyyy'), new Date().formatDate('MM')]
      }
    }
  },
  created() {
    this.$emit('update:month', this.year + this.time)
  },
  computed: {
    dateType: {
      get: function() {
        return this.value[0]
      },
      set: function(newValue) {
        // 更换了日期类型, 自动计算该日期类型下的当前时间
        switch (newValue) {
          case 'month':
            this.time = new Date().formatDate('MM')
            this.$emit('update:month', this.year + this.time)
            this.$emit('update:year', '')
            this.$emit('update:quarter', '')
            break
          case 'quarter':
            this.time = Math.ceil(parseInt(new Date().formatDate('MM')) / 4).toString()
            this.$emit('update:year', '')
            this.$emit('update:month', '')
            this.$emit('update:quarter', this.year + this.time)
            break
          default:
            this.time = null
            this.$emit('update:year', this.year)
            this.$emit('update:month', '')
            this.$emit('update:quarter', '')
            break
        }

        this.$set(this.value, 0, newValue)
      }
    },

    year: {
      get: function() {
        return this.value[1]
      },
      set: function(newValue) {
        if (this.value[0] === 'month') {
          this.$emit('update:month', newValue.formatDate('yyyy') + this.time)
        } else if (this.value[0] === 'quarter') {
          this.$emit('update:quarter', newValue.formatDate('yyyy') + this.time)
        } else {
          this.$emit('update:month', '')
          this.$emit('update:quarter', '')
          this.$emit('update:year', newValue.formatDate('yyyy'))
        }
        this.$set(this.value, 1, newValue.formatDate('yyyy'))
      }
    },

    time: {
      get: function() {
        return this.value[2]
      },
      set: function(newValue) {
        if (this.value[0] === 'month') {
          this.$emit('update:month', this.year + newValue)
        } else if (this.value[0] === 'quarter') {
          this.$emit('update:quarter', this.year + newValue)
        }
        this.$set(this.value, 2, newValue)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.kindo-rich-date-picker {
  /deep/ .el-input--suffix .el-input__inner {
    padding-right: 8px;
  }

  /deep/ .el-date-editor {
    /deep/ .el-input--suffix .el-input__inner {
      padding-left: 30px;
    }
  }
}
</style>