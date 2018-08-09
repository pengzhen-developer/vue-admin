<template>
  <div>
    <kindo-card-search title="条件筛选" icon="fa-search">
      <el-form v-model.trim="form" label-position="right" inline @submit.native.prevent @keyup.enter.native="get" label-width="100px">
        <el-form-item label="角色名称：">
          <el-input v-model.trim="form.roleName" placeholder="请输入数据角色名称"></el-input>
        </el-form-item>
        <el-form-item label=" ">
          <el-button type="primary" icon="el-icon-search" @click="getData">查询</el-button>
        </el-form-item>
      </el-form>
    </kindo-card-search>

    <kindo-card title="数据角色" icon="fa-area-chart">
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
          <el-step title="数据权限"></el-step>
        </el-steps>
      </el-row>
      <br>
      <br>
      <div v-show="model.active === 0">
        <el-form :model="model" :rules="rules" ref="model" label-width="140px">
          <el-form-item label="数据角色名称：" prop="roleName">
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
            <el-input placeholder="请输入关键字进行过滤" v-model.trim.trim="filterText">
            </el-input>
          </el-form-item>
          <el-form-item>
            <el-tree ref="menuTree" :filter-node-method="filterNode" highlight-current node-key="id" show-checkbox @node-click="moreMenu" :data="menuTreeData" :props="menuTreeProps" :default-expanded-keys="defaultExpandedMenu" :current-node-key="menuCurrentNodeKey" check-strictly style="max-height:500px;overflow-y:auto;" :render-content="renderContent"></el-tree>
          </el-form-item>
        </el-form>
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
import debounce from 'lodash/debounce'

export default {
  data() {
    return {
      // 是否编辑状态
      dialogVisible: false,

      // 角色信息表查询
      url: config.api.get,

      // 编辑实体
      model: {
        // 步骤条
        active: 0,
        id: '',
        roleName: '',
        roleDesc: '',
        orgaIds: ''
      },

      // 实体验证
      rules: {
        roleName: [{ required: true, message: '请输入数据角色名称', trigger: 'change' }, { min: 0, max: 32, message: '请输入最多32个字', trigger: 'change' }],
        roleDesc: [{ min: 0, max: 250, message: '请输入最多250个字', trigger: 'change' }]
      },

      // 查询实体
      form: {
        roleName: ''
      },

      // 存放树节点
      nodeKeys: [],

      // 树属性
      menuTreeProps: {
        children: 'children',
        label: 'orgaName'
      },
      // 菜单树数据
      menuTreeData: [],
      // 默认展开树节点id
      defaultExpandedMenu: [],
      // 当前选中树节点id
      menuCurrentNodeKey: '',
      filterText: ''
    }
  },

  created() {
    // 保存查询条件或者任意model 的默认值
    this._form = Object.assign({}, this.form)
    this._model = Object.assign({}, this.model)
  },

  mounted() {
    this.$nextTick(() => {
      this.getData()
    })
  },

  watch: {
    filterText: debounce(function(val) {
      this.$refs.menuTree.filter(val)
    }, 300)
  },

  methods: {
    filterNode(value, data) {
      if (!value) return true
      return data.orgaName.indexOf(value) !== -1
    },

    append(store, data) {
      // 获取当前选中的节点
      const checkKeys = this.$refs.menuTree.getCheckedKeys()

      // 递归所有子节点
      let getChild = item => {
        checkKeys.push(item.id)

        if (item.children) {
          item.children.forEach(item => {
            getChild(item)
          })
        }
      }
      getChild(data)

      this.$refs.menuTree.setCheckedKeys(checkKeys)
    },

    remove(store, data) {
      // 获取当前选中的节点
      const checkKeys = this.$refs.menuTree.getCheckedKeys()

      // 递归所有子节点
      let getChild = item => {
        const inChecKeys = checkKeys.findIndex(temp => temp === item.id)
        if (inChecKeys !== -1) {
          checkKeys.splice(inChecKeys, 1)
        }

        if (item.children) {
          item.children.forEach(temp => {
            getChild(temp)
          })
        }
      }
      getChild(data)

      this.$refs.menuTree.setCheckedKeys(checkKeys)
    },

    renderContent(h, { node, data, store }) {
      return (
        <span>
          <span>
            <span>{node.label}</span>
          </span>
          <span style="margin-left: 20px">
            <el-button type="text" on-click={() => this.append(store, data)}>
              {' '}
              +{' '}
            </el-button>
            <el-button type="text" on-click={() => this.remove(store, data)}>
              {' '}
              -{' '}
            </el-button>
          </span>
        </span>
      )
    },

    prev() {
      this.model.active = this.model.active - 1
    },

    next() {
      if (this.model.active === 0) {
        // 数据校验
        this.$refs.model.validate(valid => {
          // 通过
          if (valid) {
            let param = {}
            // 如果有用户id, 则为新增菜单角色操作，否则为修改操作，发送请求保存上一步操作信息，并获取菜单树
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
            this.$http.all([this.$http.post(apiInfo, param), this.$http.get(config.api.getTree)]).then(
              this.$http.spread((acct, perms) => {
                // 步骤条+1
                this.model.active = this.model.active + 1
                // acct为发送第一个请求返回信息，perms为发送第二个请求返回信息
                if (perms.data.length > 0) {
                  perms.data.sort((itema, itemb) => {
                    return itema.sort - itemb.sort
                  })
                  let treeMenus = kindo.util.toTree(perms.data, 'id', 'pid')
                  this.menuTreeData = treeMenus
                  this.model.id = acct.data
                  this.getData()

                  let param = this.model.orgaIds.split(',')
                  let checkKeys = []

                  let getLastChild = menus => {
                    menus.forEach(item => {
                      if (item.children && item.children.length > 0) {
                        getLastChild(item.children)
                        if (param.findIndex(menuId => menuId === item.id) > -1) {
                          checkKeys.push(item.id)
                        }
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
              })
            )
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
        this.$http.all([this.$http.get(config.api.getRoleUser, { params: { id: row.id } }), this.$http.get(config.api.getDataRole, { params: { roleId: row.id } })]).then(
          this.$http.spread((acct, perms) => {
            let param = {}
            param = {
              id: row.id,
              orgaIds: perms.data.toString()
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
      let checked = this.$refs.menuTree.getCheckedKeys()
      let params = {
        roleId: this.model.id,
        orgaIds: checked.toString()
      }
      this.$http.post(config.api.updateDataRole, params).then(() => {
        kindo.util.alert('保存成功', '提示', 'success')
        this.dialogVisible = false
        this.model.active = 0
        this.getData()
      })
    }
  }
}
</script>

<style scoped>
</style>