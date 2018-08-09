<template>
  <div>
    <kindo-card-search title="条件筛选" icon="fa-search">
      <el-form v-model.trim="form" label-position="right" inline @submit.native.prevent @keyup.enter.native="get" label-width="100px">
        <el-form-item label="角色名称：">
          <el-input v-model.trim="form.roleName" placeholder="请输入菜单角色名称"></el-input>
        </el-form-item>
        <el-form-item label=" ">
          <el-button type="primary" icon="el-icon-search" @click="getData">查询</el-button>
        </el-form-item>
      </el-form>
    </kindo-card-search>

    <kindo-card title="菜单角色" icon="fa-area-chart">
      <kindo-table :url="url" :queryParam="form" ref="table">
        <el-table-column label="角色名称" prop="roleName" width="200px" sortable='custom'> </el-table-column>
        <el-table-column label="备注" prop="roleDesc" min-width="460px"> </el-table-column>
        <el-table-column label="操作" width="140" align="center" fixed="right">
          <template slot-scope="scope">
            <el-button title="编辑" type="text" icon="el-icon-edit" @click="editUser(scope.$index, scope.row)">编辑</el-button>
            <el-button title="删除" type="text" icon="el-icon-delete" @click="deleteUser(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </kindo-table>

      <div slot="control">
        <el-button icon="el-icon-plus" @click="openAddModel">新增</el-button>
      </div>
    </kindo-card>

    <el-dialog v-drag width="1000px" :title="'权限'+(model.id===''?'新增':'编辑')" @close="model.active = 0" :visible.sync="dialogVisible">
      <el-row>
        <el-steps :active="model.active" align-center finish-status="success">
          <el-step title="基础信息"></el-step>
          <el-step title="菜单权限"></el-step>
        </el-steps>
      </el-row>
      <br>
      <br>
      <div v-show="model.active === 0">
        <el-form :model="model" :rules="rules" ref="model" label-width="130px">
          <el-form-item label="菜单角色名称：" prop="roleName">
            <el-input v-model.trim="model.roleName"></el-input>
          </el-form-item>
          <el-form-item label="备注：" prop="roleDesc">
            <el-input type="textarea" :rows="2" v-model.trim="model.roleDesc"></el-input>
          </el-form-item>
        </el-form>
      </div>
      <div v-show="model.active === 1">
        <el-form>
          <el-form-item>
            <el-tree ref="menuTree" highlight-current node-key="id" show-checkbox @node-click="moreMenu" :data="menuTreeData" :props="menuTreeProps" :default-expanded-keys="defaultExpandedMenu" :current-node-key="menuCurrentNodeKey" :render-content="renderContent" style="max-height:500px;overflow-y:auto;"></el-tree>
          </el-form-item>
        </el-form>
        <el-checkbox v-model.trim="checked" @change="checkALL" style="float:right;"> 全 选 按 钮 </el-checkbox>
      </div>

      <div slot="footer" class="dialog-footer">
        <el-button @click="prev" v-if="model.active > 0">上一步</el-button>
        <el-button @click="next" v-if="model.active < 1">下一步</el-button>
        <el-button type="primary" @click="save" v-if="model.active === 1">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import config from './config'
export default {
  data() {
    return {
      // 是否编辑状态
      dialogVisible: false,

      // 角色信息表查询
      url: config.api.get,

      // 按钮全选勾选框
      checked: false,

      // 编辑实体
      model: {
        // 步骤条
        active: 0,
        id: '',
        roleName: '',
        roleDesc: '',
        menuIds: ''
      },

      // 实体验证
      rules: {
        roleName: [{ required: true, message: '请输入菜单角色名称', trigger: 'change' }, { min: 0, max: 32, message: '请输入最多32个字', trigger: 'change' }],
        roleDesc: [{ min: 0, max: 250, message: '请输入最多250个字', trigger: 'change' }]
      },

      source: {
        // 按钮权限类型
        buttonTypes: [],
        // 角色按钮权限
        buttonAuth: []
      },

      // 查询实体
      form: {
        roleName: ''
      },

      // 菜单树
      menus: [],

      // 存放树节点
      nodeKeys: [],

      // 树属性
      menuTreeProps: {
        children: 'children',
        label: 'name'
      },

      menuTreeData: [],

      defaultExpandedMenu: [],

      menuCurrentNodeKey: ''
    }
  },

  created() {
    // 保存查询条件或者任意model 的默认值
    this._form = Object.assign({}, this.form)
    this._model = Object.assign({}, this.model)

    kindo.dictionary.getDictionary('BUTTON_TYPE').then(res => {
      this.source.buttonTypes = res || []
    })
  },

  mounted() {
    this.$nextTick(() => {
      this.getData()
    })
  },

  methods: {
    prev() {
      this.model.active = this.model.active - 1
    },

    next() {
      if (this.model.active === 0) {
        this.$refs.model.validate(valid => {
          if (valid) {
            let param = {}
            let apiInfo = ''
            if (this.model.id) {
              apiInfo = config.api.update
              param = {
                id: this.model.id,
                roleName: this.model.roleName,
                roleDesc: this.model.roleDesc
              }
            } else {
              apiInfo = config.api.insert
              param = {
                roleName: this.model.roleName,
                roleDesc: this.model.roleDesc
              }
            }
            this.$http
              .all([this.$http.post(apiInfo, param), this.$http.get(config.api.getMenu)])
              .then(
                this.$http.spread((acct, perms) => {
                  if (acct.code === 200) {
                    this.model.active = this.model.active + 1
                    if (perms.data.length > 0) {
                      perms.data.sort((itema, itemb) => {
                        return itema.sort - itemb.sort
                      })
                      perms.data.map(item => {
                        this.menus.push(item.id)
                      })
                      let treeMenus = kindo.util.toTree(perms.data, 'id', 'pid')
                      this.menuTreeData = treeMenus
                      this.model.id = acct.data
                      this.getData()

                      let param = this.model.menuIds.split(',')
                      let checkKeys = []

                      let getLastChild = menus => {
                        menus.forEach(item => {
                          if (item.children && item.children.length > 0) {
                            getLastChild(item.children)
                          } else {
                            if (param.findIndex(menuId => menuId === item.id) > -1) {
                              checkKeys.push(item.id)
                            }
                          }
                        })
                      }
                      getLastChild(this.menuTreeData)

                      this.$refs.menuTree.setCheckedKeys(checkKeys)

                      // 默认展开选中权限的节点
                      // 否则展开第一层节点
                      if (checkKeys.length > 0) {
                        this.defaultExpandedMenu = checkKeys
                      } else {
                        this.defaultExpandedMenu = [this.menuTreeData[0].id]
                      }
                    }
                  }
                })
              )
              .then(() => {
                this.$http.get(config.api.queryButtonAuths, { params: { roleId: this.model.id } }).then(res => {
                  // 获取按钮权限
                  // 删除不存在菜单的按钮权限数据
                  for (let i in res.data) {
                    res.data[i] = res.data[i] ? res.data[i].split(',') : []
                    if (this.menus.filter(item => item === i).length === 0) {
                      delete res.data[i]
                    }
                  }
                  this.source.buttonAuth = res.data || []
                  // 如果此菜单为新创建菜单，初始化菜单权限,当没有
                  for (let i = 0, len = this.menus.length; i < len; i++) {
                    if (this.source.buttonAuth[this.menus[i]] === undefined) {
                      this.source.buttonAuth[this.menus[i]] = []
                    }
                  }
                })
              })
          }
        })
      }
    },

    // 查询角色信息
    getData() {
      this.$refs.table.loadData()
    },

    // 树节点被点击时的回调
    moreMenu(data) {
      this.defaultExpandedMenu = [data.id]
    },

    // 打开新增窗口
    openAddModel() {
      this.dialogVisible = true
      this.$nextTick(function() {
        this.$refs.model.resetFields()
        this.model = Object.assign(this.model, this._model)
      })
    },

    // 打开编辑窗口
    editUser(index, row) {
      this.dialogVisible = true
      this.$nextTick(function() {
        this.$refs.model.resetFields()
        this.$http.all([this.$http.get(config.api.getRoleUser, { params: { id: row.id } }), this.$http.get(config.api.getMenuRole, { params: { roleId: row.id } })]).then(
          this.$http.spread((acct, perms) => {
            let param = {}
            param = {
              id: row.id,
              menuIds: perms.data.toString()
            }
            this.model = Object.assign(this.model, this._model, acct.data, param)
          })
        )
      })
    },

    // 删除数据
    deleteUser(index, row) {
      this.model = Object.assign({}, row)
      kindo.util.confirm('确定删除吗?', undefined, undefined, () => {
        this.$http.post(config.api.delete, { id: this.model.id }).then(() => {
          kindo.util.alert('删除成功', '提示', 'success')
          this.getData()
        })
      })
    },

    // 保存
    save() {
      let halfCheck = this.getIndeterminate()
      let menuButtons = []
      let checked = this.$refs.menuTree.getCheckedKeys().concat(halfCheck)
      for (var k in this.source.buttonAuth) {
        if (this.source.buttonAuth[k].length > 0) {
          menuButtons.push({ menuId: k, buttonTypes: this.source.buttonAuth[k].toString() })
        }
      }
      this.$http
        .all([
          this.$http.post(config.api.updateMenuRole, {
            roleId: this.model.id,
            menuIds: checked.toString()
          }),
          this.$http.post(config.api.setupButtonAuths, {
            roleId: this.model.id,
            menuButtons: menuButtons
          })
        ])
        .then(
          this.$http.spread(() => {
            kindo.util.alert('保存成功', '提示', 'success')
            this.dialogVisible = false
            this.model.active = 0
            this.getData()
          })
        )
    },

    // 获取半选中节点
    getIndeterminate() {
      let res = []
      let nodesDOM = this.$refs.menuTree.$el.querySelectorAll('.el-tree-node')
      let nodesVue = [].map.call(nodesDOM, node => node.__vue__)
      let node = nodesVue.filter(item => item.node.indeterminate === true)
      node.map(item => {
        res.push(item.$vnode.key)
      })

      return res
    },

    // 菜单树自定义节点
    renderContent(h, { node, data }) {
      if (!data.children) {
        if (this.source.buttonTypes.length > 0) {
          var list = buttons => {
            var res = []
            for (var i = 0; i < buttons.length; i++) {
              res.push(
                <el-button
                  onClick={this.buttonAuthClick.bind(this, data.id, buttons[i].value)}
                  type={this.hasAuth(data.id, buttons[i].value) ? 'success' : ''}
                  key={i}
                  size="mini"
                  style="padding: 5px 15px;"
                >
                  {buttons[i].label}
                </el-button>
              )
            }
            return res
          }
          return (
            <span style="flex: 1; display: flex; align-items: center; justify-content: space-between; font-size: 14px; padding-right: 8px;">
              <span>
                <span>{node.label}</span>
              </span>
              <span>{list(this.source.buttonTypes)}</span>
            </span>
          )
        }
      } else {
        delete this.source.buttonAuth[data.id]
      }
      return (
        <span>
          <span>
            <span>{node.label}</span>
          </span>
        </span>
      )
    },

    // 获取指定菜单下的按钮权限
    hasAuth(id, i) {
      if (this.source.buttonAuth[id]) {
        if (this.source.buttonAuth[id].filter(item => item === i).length > 0) {
          return true
        } else {
          return false
        }
      } else {
        return false
      }
    },

    // 设置按钮权限
    buttonAuthClick(menuId, buttonValue) {
      let hasIndex = ''
      if (this.source.buttonAuth[menuId]) {
        for (let i = 0, length = this.source.buttonAuth[menuId].length; i < length; i++) {
          if (this.source.buttonAuth[menuId][i] === buttonValue) {
            hasIndex = i
            break
          }
        }
      }
      if (hasIndex !== '') {
        this.source.buttonAuth[menuId].splice(hasIndex, 1)
      } else {
        this.source.buttonAuth[menuId].push(buttonValue)
        this.source.buttonAuth = Object.assign({}, this.source.buttonAuth)
      }
    },

    checkALL() {
      if (this.checked) {
        for (let k in this.source.buttonAuth) {
          this.source.buttonTypes.forEach(v => {
            if (this.source.buttonAuth[k].indexOf(v.value) < 0) {
              this.source.buttonAuth[k].push(v.value)
              this.source.buttonAuth = Object.assign({}, this.source.buttonAuth)
            }
          })
        }
      } else {
        for (let k in this.source.buttonAuth) {
          this.source.buttonAuth[k] = []
        }
      }
    }
  }
}
</script>

<style scoped>
</style>