<template>
  <div>
    <kindo-card-search title="条件筛选" icon="fa-search">
      <el-form v-model="form" inline label-position="right" @submit.native.prevent @keyup.enter.native="get" label-width="100px">
        <el-form-item label="登录帐号：">
          <el-input v-model="form.loginNo" placeholder="请输入登录账号"></el-input>
        </el-form-item>
        <el-form-item label="用户工号：">
          <el-input v-model="form.emplNo" placeholder="请输入用户工号"></el-input>
        </el-form-item>
        <el-form-item label="用户名：">
          <el-input v-model="form.emplName" placeholder="请输入用户名"></el-input>
        </el-form-item>
        <el-form-item label=" ">
          <el-button icon="el-icon-search" @click="get" type="primary">查询</el-button>
        </el-form-item>
      </el-form>
    </kindo-card-search>

    <kindo-card collapse>
      <template slot="header"> 密码管理 </template>

      <kindo-table ref="table" :url="url" :queryParam="form">
        <el-table-column label="登录账号" prop="loginNo" min-width="140" sortable='custom' show-overflow-tooltip></el-table-column>
        <el-table-column label="用户工号" prop="emplNo" min-width="140" sortable='custom' show-overflow-tooltip></el-table-column>
        <el-table-column label="用户名" prop="emplName" min-width="150" sortable='custom' show-overflow-tooltip></el-table-column>
        <el-table-column label="操作" width="140" align="center">
          <template slot-scope="scope">
            <el-button title="编辑" type="text" icon="el-icon-edit" @click="update(scope.$index, scope.row)">编辑</el-button>
            <el-button title="重置" type="text" icon="el-icon-refresh" @click="reset(scope.$index, scope.row)">重置</el-button>
          </template>
        </el-table-column>
      </kindo-table>
    </kindo-card>

    <el-dialog v-drag :visible.sync="visible1" width="400px" top="5%" title="修改用户密码">
      <el-form :model="model1" :rules="rules" ref="model1" label-width="130px">
        <el-form-item label="授权码：" prop="varifyCode">
          <el-input v-model="model1.varifyCode"></el-input>
        </el-form-item>
        <el-form-item label="请设置新密码：" prop="pwd">
          <el-input type="password" v-model="model1.pwd"></el-input>
        </el-form-item>
        <el-form-item label="请确认新密码：" prop="checkPwd">
          <el-input type="password" v-model="model1.checkPwd"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="visible1 = false">取 消</el-button>
        <el-button type="primary" @click="save">确 定</el-button>
      </div>
    </el-dialog>

    <el-dialog v-drag :visible.sync="visible2" width="400px" top="5%" title="重置用户密码">
      <el-form :model="model2" :rules="rules" ref="model2" label-width="110px">
        <el-form-item label="授权码：" prop="varifyCode">
          <el-input v-model="model2.varifyCode"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="visible2 = false">取 消</el-button>
        <el-button type="primary" @click="resetPut">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import config from './config'
export default {
  data() {
    let validatePass = (rule, value, callback) => {
      if (this.model1.checkPwd !== '') {
        this.$refs.model1.validateField('checkPwd')
      }
      callback()
    }
    let validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次请输入密码'))
      } else if (value !== this.model1.pwd) {
        callback(new Error('两次请输入密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      // 用户表查询
      url: config.api.get,

      // 是否修改密码状态
      visible1: false,
      // 是否重置密码状态
      visible2: false,

      // 查询实体
      form: {
        loginNo: '',
        emplNo: '',
        emplName: ''
      },

      // 编辑实体
      model1: {
        id: '',
        pwd: '',
        checkPwd: '',
        varifyCode: ''
      },

      // 重置实体
      model2: {
        id: '',
        varifyCode: ''
      },

      rules: {
        varifyCode: [{ required: true, message: '请输入授权码', trigger: 'change' }, { min: 6, max: 20, message: '请输入6~20位码', trigger: 'change' }],
        pwd: [{ required: true, message: '请输入新密码', trigger: 'change' }, { min: 6, max: 16, message: '请输入6~16位密码', trigger: 'change' }, { validator: validatePass, trigger: 'change' }],
        checkPwd: [{ required: true, message: '请输入新密码', trigger: 'change' }, { min: 6, max: 16, message: '请输入6~16位密码', trigger: 'change' }, { validator: validatePass2, trigger: 'change' }]
      }
    }
  },

  mounted() {
    this.$nextTick(() => {
      this.get()
    })
  },

  methods: {
    // 查询用户
    get() {
      this.$refs.table.loadData()
    },

    // 修改用户密码
    update(index, row) {
      this.visible1 = true
      this.$nextTick(function() {
        this.$refs.model1.resetFields()
        this.model1 = Object.assign({}, row)
      })
    },

    // 重置用户密码
    reset(index, row) {
      this.visible2 = true

      this.$nextTick(function() {
        this.$refs.model2.resetFields()
        this.model2 = Object.assign({}, row)
      })
    },

    // 重置用户密码确认
    resetPut() {
      this.$refs.model2.validate(valid => {
        if (valid) {
          this.$http.post(config.api.reset, { varifyCode: this.model2.varifyCode, userId: this.model2.id }).then(() => {
            kindo.util.alert('重置密码成功', '提示', 'success')
            this.visible2 = false
            this.get()
          })
        }
      })
    },

    // 修改用户密码保存
    save() {
      this.$refs.model1.validate(valid => {
        if (valid) {
          let params = {}
          params = {
            varifyCode: this.model1.varifyCode,
            pwd: kindo.util.md5(this.model1.pwd),
            userId: this.model1.id
          }
          this.$http.post(config.api.update, params).then(() => {
            kindo.util.alert('编辑用户成功', '提示', 'success')
            this.visible1 = false
            this.get()
          })
        }
      })
    }
  }
}
</script>
