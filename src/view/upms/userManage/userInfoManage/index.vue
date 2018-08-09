<template>
  <div>
    <kindo-card-search title="条件筛选" icon="fa-search">
      <el-form inline label-position="right" :model="form" @submit.native.prevent @keyup.enter.native="get" label-width="100px">
        <el-form-item label="用户名：">
          <el-input v-model.trim="form.loginNo"></el-input>
        </el-form-item>
        <el-form-item label="用户工号：">
          <el-input v-model.trim="form.emplNo"></el-input>
        </el-form-item>
        <el-form-item label=" ">
          <el-button type="primary" icon="el-icon-search" @click="get">查询</el-button>
        </el-form-item>
      </el-form>
    </kindo-card-search>

    <kindo-card>
      <kindo-table ref="table" :url="this.api.get" :queryParam="form" :height="null">
        <el-table-column type="expand">
          <template slot-scope="scope">
            <el-form label-position="right" label-width="110px">
              <el-form-item label="真实姓名：">
                <span v-text="scope.row.name || '--'"></span>
              </el-form-item>
              <el-form-item label="身份证：">
                <span v-text="scope.row.idCard || '--'"></span>
              </el-form-item>
              <el-form-item label="年龄：">
                <span v-text="scope.row.age || '--'"></span>
              </el-form-item>
              <el-form-item label="性别：">
                <span v-text="scope.row.sex === 'F' ? '女' : scope.row.sex === 'M' ? '男' : '--'"></span>
              </el-form-item>
              <el-form-item label="电话：">
                <span v-text="scope.row.phone || '--'"></span>
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>
        <el-table-column min-width="120" label="用户名" prop="loginNo" sortable='custom' show-overflow-tooltip></el-table-column>
        <el-table-column min-width="120" label="用户工号" prop="emplNo" align="left" sortable='custom' show-overflow-tooltip></el-table-column>
        <el-table-column min-width="120" label="用户昵称" prop="emplName" align="left" sortable='custom' show-overflow-tooltip></el-table-column>
        <el-table-column min-width="120" label="用户状态" prop="status" align="left" sortable='custom'>
          <template slot-scope="scope">
            <i class="el-icon-more" :style="{ color: scope.row.status === '01' ? '#67C23A' : '#878D99' }"></i>
          </template>
        </el-table-column>
        <el-table-column width="140" label="操作" align="center">
          <template slot-scope="scope">
            <el-button title="编辑" type="text" icon="el-icon-edit" @click="update(scope.$index, scope.row)">编辑</el-button>
            <el-button title="删除" type="text" icon="el-icon-delete" @click="del(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </kindo-table>

      <div slot="control">
        <el-button icon="el-icon-plus" @click="insert">
          新增
        </el-button>
      </div>
    </kindo-card>

    <el-dialog v-drag title="用户信息" :visible.sync="modelVisible">

      <el-steps :active="active" align-center>
        <el-step title="用户管理"></el-step>
        <el-step title="菜单权限"></el-step>
        <el-step title="数据权限"></el-step>
        <el-step title="按钮权限"></el-step>
      </el-steps>

      <br>

      <div>
        <el-form v-show="active === 0" ref="model" :model="model" :rules="rules" label-width="110px">
          <el-row>
            <el-col :span="11">
              <el-form-item label="用户名：" prop="loginNo">
                <el-input v-model="model.loginNo"></el-input>
              </el-form-item>
              <el-form-item label="用户工号：" prop="emplNo">
                <el-input v-model="model.emplNo"></el-input>
              </el-form-item>
              <el-form-item label="用户状态：" prop="status">
                <el-select v-model="model.status" placeholder="请选择状态">
                  <el-option v-for="item in STATUS" :key="item.value" :label="item.label" :value="item.value"> </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="用户昵称：" prop="emplName">
                <el-input v-model="model.emplName"></el-input>
              </el-form-item>
              <el-form-item label="真实姓名：" prop="name">
                <el-input v-model="model.name"></el-input>
              </el-form-item>
              <el-form-item label="身份证号码：" prop="idCard">
                <el-input v-model="model.idCard"></el-input>
              </el-form-item>
              <el-form-item label="性别：" prop="sex">
                <el-select v-model="model.sex" placeholder="" clearable>
                  <el-option v-for="item in source.sex" :key="item.value" :label="item.label" :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="年龄：" prop="age">
                <el-input type="number" v-model.number="model.age"></el-input>
              </el-form-item>
              <el-form-item label="电话号码：" prop="phone">
                <el-input v-model="model.phone"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="11" :offset="2">
              <el-tree default-expand-all style="height: 350px;" ref="orgTree" highlight-current :props="orgProp" :data="orgData" node-key="id" @current-change="nodeChange"></el-tree>
            </el-col>
          </el-row>
        </el-form>

        <el-form v-show="active === 1">
          <el-transfer style="height: 340px;" v-model="menuRoles" filterable :titles="['可选角色', '拥有角色']" :button-texts="['', '']" :data="source.menuRoles" :props="{ key: 'id', label: 'roleName' }">
          </el-transfer>
        </el-form>

        <el-form v-show="active === 2">
          <el-transfer style="height: 340px;" v-model="dataRoles" filterable :titles="['可选角色', '拥有角色']" :button-texts="['', '']" :data="source.dataRoles" :props="{ key: 'id', label: 'roleName' }">
          </el-transfer>
        </el-form>
      </div>

      <div slot="footer">
        <el-button :disabled="!(active > 0)" @click="prev"> 上一步 </el-button>
        <el-button @click="next" v-text="this.active === 3 ? '完成' : '下一步'"></el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import config from './config'

export default {
  data() {
    return {
      api: config.api,

      form: {
        loginNo: '',
        emplNo: ''
      },

      source: {
        sex: [{ label: '女', value: 'F' }, { label: '男', value: 'M' }],
        menuRoles: [],
        dataRoles: []
      },

      // 数据字典分类
      STATUS: [],

      // 组织机构
      orgProp: { children: 'children', label: 'orgaName' },
      orgData: [],

      modelVisible: false,
      active: 0,
      model: {
        id: '',
        loginNo: '',
        emplNo: '',
        emplName: '',
        orgaId: '',
        orgaName: '',
        name: '',
        idCard: '',
        sex: '',
        age: null,
        phone: '',
        status: '00'
      },
      rules: {
        loginNo: [{ required: true, message: '请输入用户名', trigger: 'change' }, { min: 0, max: 32, message: '请输入最多32个字', trigger: 'change' }],
        emplNo: [{ required: true, message: '请输入工号', trigger: 'change' }, { min: 0, max: 32, message: '请输入最多32个字', trigger: 'change' }],
        emplName: [{ required: true, message: '请输入用户昵称', trigger: 'change' }, { min: 0, max: 32, message: '请输入最多32个字', trigger: 'change' }],
        orgaName: [{ required: true, message: '请选择组织机构', trigger: 'change' }],
        age: [{ pattern: kindo.valid.pattern.pInteger, message: '年龄必须为正整数', trigger: 'change' }],
        status: [{ required: true, message: '请选择用户状态', trigger: 'change' }],
        name: [{ min: 0, max: 16, message: '请输入最多16个字', trigger: 'change' }],
        idCard: [{ pattern: kindo.valid.pattern.idCard, message: '请输入正确身份证号码格式', trigger: 'change' }],
        phone: [{ pattern: kindo.valid.pattern.telephone, message: '请输入正确电话号码格式', trigger: 'change' }]
      },
      menuRoles: [],
      dataRoles: []
    }
  },

  created() {
    this._model = Object.assign({}, this.model)
    this.$http.get(this.api.getOrg).then(res => {
      this.orgData = kindo.util.toTree(res.data, 'id', 'pid')
    })

    this.$http.get(this.api.getMenuRole).then(res => {
      this.source.menuRoles = res.data
    })

    this.$http.get(this.api.getDataRole).then(res => {
      this.source.dataRoles = res.data
    })

    this.$http.get(this.api.getStatus).then(res => {
      this.STATUS = res.data
    })
  },

  mounted() {
    this.$nextTick(function() {
      this.get()
    })
  },

  methods: {
    get() {
      this.$refs.table.loadData()
    },

    prev() {
      if (this.active !== 0) {
        this.active = this.active - 1
      } else {
        this.modelVisible = false
        this.active = 0
      }
    },

    next() {
      if (this.active === 0) {
        // 保存用户基础信息
        this.$refs.model.validate(valid => {
          if (valid) {
            if (this.model.id) {
              this.$http.post(this.api.update, this.model).then(() => {
                this.active = this.active + 1
              })
            } else {
              this.$http.post(this.api.insert, this.model).then(res => {
                this.model.id = res.data
                this.getUserRole(this.model.id).then(() => {
                  this.active = this.active + 1
                })
              })
            }
          }
        })
      } else if (this.active === 1) {
        // 保存用户菜单角色信息
        let param = { userId: this.model.id, menuRoleIds: this.menuRoles.toString() }
        this.$http.post(this.api.updateMenuRole, param).then(() => {
          this.active = this.active + 1
        })
      } else if (this.active === 2) {
        // 保存用户数据角色信息
        let param = { userId: this.model.id, dataRoleIds: this.dataRoles.toString() }
        this.$http.post(this.api.updateDataRole, param).then(() => {
          this.active = this.active + 1
        })
      } else if (this.active === 3) {
        // 保存用户按钮角色信息
        this.modelVisible = false
        this.get()
      }
    },

    update(index, row) {
      this.active = 0
      // 获取当前用户的权限信息
      this.getUserRole(row.id)
        .then(() => {
          this.modelVisible = true
        })
        .then(() => {
          this.$refs.model.resetFields()
          this.model = Object.assign({}, this._model, row)
          this.$refs.orgTree.setCurrentKey(row.orgaId)
          this.model.orgaId = row.orgaId
        })
    },

    insert() {
      this.active = 0
      this.modelVisible = true

      this.$nextTick(function() {
        this.$refs.model.resetFields()

        this.model = Object.assign({}, this._model)

        this.$refs.orgTree.setCurrentKey(this.orgData[0].orgaCode)
        this.model.orgaId = this.orgData[0].orgaCode
      })
    },

    getUserRole(userId) {
      return this.$http.all([this.$http.get(this.api.getMenuRoleById, { params: { userId } }), this.$http.get(this.api.getDataRoleById, { params: { userId } })]).then(
        this.$http.spread((menuRole, dataRole) => {
          this.menuRoles = menuRole.data
          this.dataRoles = dataRole.data
        })
      )
    },

    del(index, row) {
      kindo.util.confirm('确认删除该用户吗？', undefined, 'warning', () => {
        this.$http.post(config.api.delete, row).then(res => {
          kindo.util.alert(res.message, '提示', 'success')
          this.get()
        })
      })
    },

    nodeChange(data) {
      this.model.orgaName = data.orgaName
      this.model.orgaId = data.orgaCode
    }
  }
}
</script>

<style >
.el-transfer .el-transfer-panel {
  width: calc(50% - 50px);
}
</style>
