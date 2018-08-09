<template>
  <div>
    <kindo-card title="用户修改" icon="fa-area-chart">
      <el-form :model="model" :rules="rules" ref="form" label-width="110px" style="width: 275px;">
        <el-form-item label="真实姓名：" prop="name">
          <el-input v-model.trim="model.name"></el-input>
        </el-form-item>
        <el-form-item label="性别：" prop="sex">
          <el-select v-model.trim="model.sex" placeholder="请选择性别">
            <el-option v-for="item in SEX" :key="item.value" :label="item.label" :value="item.value"> </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="年龄：" prop="age">
          <el-input type="number" v-model.trim.number="model.age"></el-input>
        </el-form-item>
        <el-form-item label="身份证号码：" prop="idCard">
          <el-input v-model.trim="model.idCard"></el-input>
        </el-form-item>
        <el-form-item label="电话号码：" prop="phone">
          <el-input v-model.trim="model.phone"></el-input>
        </el-form-item>
        <el-form-item label="">
          <el-button icon="edit" type="primary" @click="save">保存</el-button>
        </el-form-item>
      </el-form>
    </kindo-card>
  </div>
</template>

<script>
import config from './config'
export default {
  data() {
    return {
      // 编辑实体
      model: {
        id: '',
        name: '',
        age: 0,
        sex: '',
        idCard: '',
        phone: ''
      },

      // 性别
      SEX: [{ label: '女', value: 'F' }, { label: '男', value: 'M' }],

      // 修改新增项验证
      rules: {
        name: [{ min: 0, max: 16, message: '请输入最多16个字', trigger: 'change' }],
        age: [{ pattern: kindo.valid.pattern.number, message: '年龄必须为数字值', trigger: 'change' }],
        idCard: [{ pattern: kindo.valid.pattern.idCard, message: '请输入正确身份证号码格式', trigger: 'change' }],
        phone: [{ pattern: kindo.valid.pattern.telephone, message: '请输入正确电话号码格式', trigger: 'change' }]
      }
    }
  },

  created() {
    this._model = Object.assign({}, this.model)
  },

  mounted() {
    this.$nextTick(() => {
      this.get()
    })
  },

  methods: {
    // 查询菜单树
    get() {
      this.$http.get(config.api.get).then(res => {
        this.model = Object.assign(this.model, this._model, res.data)
      })
    },

    // 保存（新增，修改）
    save() {
      this.$refs.form.validate(valid => {
        if (valid) {
          let params = {}
          params = this.model
          this.$http.post(config.api.update, params).then(() => {
            kindo.util.alert('修改用户扩展信息成功', '提示', 'success')
            this.get()
          })
        }
      })
    }
  }
}
</script>