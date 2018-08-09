<template>
  <div>
    <kindo-card-search title="条件筛选" icon="fa-search">
      <el-form :model="form" inline label-position="right" @submit.native.prevent @keyup.enter.native="get" label-width="100px">
        <el-form-item label="菜单名称：">
          <el-input v-model.trim="form.name" placeholder=""></el-input>
        </el-form-item>
        <el-form-item label=" ">
          <el-button type="primary" icon="el-icon-search" @click="get">查询</el-button>
        </el-form-item>
      </el-form>
    </kindo-card-search>

    <kindo-card collapse>
      <template slot="header"> 菜单信息 </template>

      <kindo-table v-if="v" ref="tree" :url="this.api.get" :queryParam="form" :loadFilter="loadFilter" :height="null" :pagination="false">
        <el-table-column width="40" label="-" align="center">
          <template slot-scope="scope">
            <i :class="scope.row.iconUrl"></i>
          </template>
        </el-table-column>
        <el-table-tree-column file-icon="icon-file fa-file-code-o" expandAll folder-icon="icon-folder fa-folder" :remote="remoteData" parentKey="pid" child-key="children" :indent-size="20" prop="name" label="菜单名称" width="380" :show-overflow-tooltip="true">
          <template slot-scope="scope">
            <span>{{ scope.row.name }}</span>
          </template>
        </el-table-tree-column>
        <el-table-column min-width="380" label="路由路径" prop="routerPath" :show-overflow-tooltip="true"></el-table-column>
        <el-table-column min-width="60" label="排序" prop="menuSort" align="center" :show-overflow-tooltip="true"></el-table-column>
        <el-table-column min-width="200" label="操作" align="center">
          <template slot-scope="scope">
            <el-button title="新增" type="text" icon="el-icon-plus" @click="add(scope.$index, scope.row)">新增</el-button>
            <el-button v-if="scope.row.pid" title="编辑" type="text" icon="el-icon-edit" @click="edit(scope.$index, scope.row)">编辑</el-button>
            <el-button v-if="scope.row.pid" title="删除" type="text" icon="el-icon-delete" @click="del(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </kindo-table>
    </kindo-card>

    <el-dialog v-drag title="菜单信息" :visible.sync="visible">
      <el-form ref="model" :model="model" :rules="rules" label-width="110px" label-position="right">
        <el-row>
          <el-col :span="11">
            <el-form-item label="菜单名称：" prop="name">
              <el-input v-model="model.name"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="11" :offset="2">
            <el-form-item label="菜单路径：" prop="routerPath">
              <el-input v-model="model.routerPath"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="11">
            <el-form-item label="图标字体：" prop="iconUrl">
              <kindo-icon-select v-model="model.iconUrl"></kindo-icon-select>
            </el-form-item>
          </el-col>
          <el-col :span="11" :offset="2">
            <el-form-item label="外链链接：" prop="href">
              <el-input v-model="model.href"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="11">
            <el-form-item label="排序标识：" prop="menuSort">
              <el-input v-model.number="model.menuSort" type="number"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-form-item label="备注：" prop="remark">
            <el-input :autosize="{ minRows: 4, maxRows: 8}" type="textarea" :rows="1" v-model="model.remark"></el-input>
          </el-form-item>
        </el-row>
      </el-form>

      <div slot="footer">
        <el-button @click="visible = false">取消</el-button>
        <el-button type="primary" icon="check" @click="save">确定</el-button>
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
        name: ''
      },

      visible: false,

      model: {
        id: '',
        name: '',
        routerPath: '',
        iconUrl: '',
        menuSort: 0,
        pid: '',
        href: '',
        show: 1,
        remark: '',
        depth: ''
      },

      rules: {
        name: [{ min: 0, max: 32, message: '请输入最多32个字', trigger: 'change' }],
        routerPath: [{ min: 0, max: 120, message: '请输入最多120个字', trigger: 'change' }],
        iconUrl: [{ min: 0, max: 64, message: '请输入最多32个字', trigger: 'change' }],
        href: [{ min: 0, max: 32, message: '请输入最多32个字', trigger: 'change' }],
        remark: [{ min: 0, max: 250, message: '请输入最多250个字', trigger: 'change' }]
      },

      loadFilter(res) {
        res.data.sort((a, b) => {
          return a.menuSort - b.menuSort
        })

        res.data = kindo.util.toTree(res.data, 'id', 'pid')

        res.data.forEach(item => {
          item.expanded = true
        })

        return res
      },

      v: true
    }
  },

  created() {
    this._model = Object.assign({}, this.model)
  },

  mounted() {
    this.$nextTick(function() {
      this.get()
    })
  },

  methods: {
    remoteData(r, c) {
      setTimeout(function() {
        c(r.children)
      }, 10)
    },

    get() {
      this.v = false

      this.$nextTick(function() {
        this.v = true

        this.$nextTick(function() {
          this.$refs.tree.loadData()
        })
      })
    },

    add(index, row) {
      this.visible = true

      this.$nextTick(function() {
        this.$refs.model.resetFields()
        this.model = Object.assign({}, this._model)

        this.model.menuSort = row.children ? row.children.length : 0
        this.model.pid = row.id
        this.model.depth = row.depth
      })
    },

    edit(index, row) {
      this.visible = true

      this.$nextTick(function() {
        this.$refs.model.resetFields()
        this.model = Object.assign({}, this._model, row)
      })
    },

    save() {
      this.$refs.model.validate(valid => {
        if (valid) {
          if (this.model.id) {
            this.$http.post(this.api.update, this.model).then(res => {
              kindo.util.alert(res.message, '提示', 'success')
              this.visible = false
              this.get()
            })
          } else {
            this.$http.post(this.api.insert, this.model).then(res => {
              kindo.util.alert(res.message, '提示', 'success')
              this.visible = false
              this.get()
            })
          }
        }
      })
    },

    del(index, row) {
      kindo.util.confirm('确定删除吗？', undefined, undefined, () => {
        this.$http.post(this.api.delete, { id: row.id }).then(res => {
          kindo.util.alert(res.message, '提示', 'success')
          this.get()
        })
      })
    }
  }
}
</script>

<style >
.el-transfer .el-transfer-panel {
  width: calc(50% - 50px);
}
</style>


<style type="text/css">
.icon-file {
  padding-right: 7px;
  padding-left: 20px;
}

.icon-folder,
.icon-folder-open {
  padding-left: 7px;
  padding-right: 7px;
}
</style>