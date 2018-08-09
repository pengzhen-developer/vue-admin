<template>
  <div>
    <kindo-card-search title="条件筛选" icon="el-icon-search">
      <el-form :model="form" inline label-position="right" @submit.native.prevent @keyup.enter.native="get" label-width="100px">
        <el-form-item label="机构名称：">
          <el-input v-model.trim="form.orgaName" placeholder=""></el-input>
        </el-form-item>
        <el-form-item label=" ">
          <el-button type="primary" icon="el-icon-search" @click="get">查询</el-button>
        </el-form-item>
      </el-form>
    </kindo-card-search>

    <kindo-card icon="el-icon-document" title="机构列表">
      <kindo-table v-if="v" ref="tree" :url="this.api.get" :queryParam="form" :loadFilter="loadFilter" :height="null" :pagination="false">
        <el-table-tree-column expandAll fileIcon="icon-file fa-file" folderIcon="icon-folder fa-folder" :remote="remoteData" :indent-size="20" parentKey="pid" prop="orgaName" label="机构名称" width="240" :show-overflow-tooltip="true"></el-table-tree-column>
        <el-table-column prop="orgaCode" label="组织机构编码" min-width="150" :show-overflow-tooltip="true"></el-table-column>
        <el-table-column prop="orgaType" label="机构类型" min-width="240" :show-overflow-tooltip="true" :formatter="(row, column, cellValue) => kindo.dictionary.getLabel(source.orgaType, cellValue)"></el-table-column>
        <el-table-column label="排序" prop="sort" width="60" align="center" :show-overflow-tooltip="true"></el-table-column>
        <el-table-column label="操作" width="200" align="center" fixed="right">
          <template slot-scope="scope">
            <el-button title="新增" type="text" icon="el-icon-plus" @click="add(scope.$index, scope.row)">新增</el-button>
            <el-button v-if="scope.row.pid" title="编辑" type="text" icon="el-icon-edit" @click="edit(scope.$index, scope.row)">编辑</el-button>
            <el-button v-if="scope.row.pid" title="删除" type="text" icon="el-icon-delete" @click="del(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </kindo-table>
    </kindo-card>

    <el-dialog v-drag title="机构信息" :visible.sync="visible" width="400px">
      <el-form ref="model" :model="model" :rules="rules" label-width="110px" label-position="right">
        <el-form-item label="组织机构编码:" prop="orgaCode">
          <el-input v-model="model.orgaCode"></el-input>
        </el-form-item>
        <el-form-item label="机构名称：" prop="orgaName">
          <el-input v-model="model.orgaName"></el-input>
        </el-form-item>
        <el-form-item label="机构类型：" prop="routerPath">
          <el-select v-model="model.orgaType">
            <el-option v-for="item in source.orgaType" :key="item.value" :label="item.label" :value="item.value"> </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="排序标识:" prop="sort">
          <el-input type="number" v-model.number="model.sort"></el-input>
        </el-form-item>
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
        orgaName: ''
      },

      source: {
        orgaType: []
      },

      visible: false,

      model: {
        id: '',
        orgaName: '',
        orgaCode: '',
        orgaType: '',
        sort: 0,
        pid: '',
        depth: ''
      },

      rules: {
        orgaName: [{ required: true, message: '请输入组织机构名称', trigger: 'change' }, { min: 0, max: 32, message: '请输入最多32个字', trigger: 'change' }],
        orgaType: [{ required: true, message: '请选择组织机构类型', trigger: 'change' }]
      },

      loadFilter(res) {
        res.data.sort((a, b) => {
          return a.sort - b.sort
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

    kindo.dictionary.getDictionary('ORGA_TYPE').then(res => {
      this.source.orgaType = res
    })
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

        this.model.sort = row.children ? row.children.length : 0
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
