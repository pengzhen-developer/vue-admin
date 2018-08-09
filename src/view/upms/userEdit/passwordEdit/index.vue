<template>
  <div>
    <kindo-card title="密码修改" icon="fa-area-chart">
      <el-form :model="model1" :rules="rules" ref="form" label-width="110px">
        <el-form-item label="旧密码：" prop="oldPwd">
          <el-input type="password" v-model.trim="model1.oldPwd" style="width:200px"></el-input>
        </el-form-item>
        <el-form-item label="设置新密码：" prop="newPwd">
          <el-input type="password" v-model.trim="model1.newPwd" style="width:200px"></el-input>
        </el-form-item>
        <el-form-item label="确认新密码：" prop="checkPwd">
          <el-input type="password" v-model.trim="model1.checkPwd" style="width:200px"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" icon="edit" @click="save">保存</el-button>
        </el-form-item>
      </el-form>
    </kindo-card>
  </div>
</template>

<script>
import config from './config'
export default {
  data() {
    let validatePass = (rule, value, callback) => {
      if (this.model1.checkPwd !== '') {
        this.$refs.form.validateField('checkPwd')
      }
      callback()
    }
    let validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次请输入密码'))
      } else if (value !== this.model1.newPwd) {
        callback(new Error('两次请输入密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      // 编辑实体
      model1: {
        oldPwd: '',
        checkPwd: '',
        newPwd: ''
      },

      // 修改新增项验证
      rules: {
        oldPwd: [{ required: true, message: '请输入旧密码', trigger: 'change' }, { min: 6, max: 16, message: '请输入6~16位码', trigger: 'change' }],
        newPwd: [
          { required: true, message: '请输入新密码', trigger: 'change' },
          { min: 6, max: 16, message: '请输入6~16位密码', trigger: 'change' },
          { validator: validatePass, trigger: 'change' }
        ],
        checkPwd: [
          { required: true, message: '请输入新密码', trigger: 'change' },
          { min: 6, max: 16, message: '请输入6~16位密码', trigger: 'change' },
          { validator: validatePass2, trigger: 'change' }
        ]
      }
    }
  },

  methods: {
    // 保存
    save() {
      this.$refs.form.validate(valid => {
        if (valid) {
          let params = {}
          params = {
            oldPwd: kindo.util.md5(this.model1.oldPwd),
            newPwd: kindo.util.md5(this.model1.newPwd)
          }
          this.$http.post(config.api.update, params).then(() => {
            kindo.util.alert('修改用户个人密码成功', '提示', 'success')
            this.$refs.form.resetFields()
          })
        }
      })
    }
  }
}
</script>
