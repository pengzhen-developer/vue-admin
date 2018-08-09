<template>
  <div>
    <kindo-card-search title="条件筛选" icon="fa-search">
      <el-form v-model.trim="dataSearch" label-position="right" label-width="100px" inline @submit.native.prevent @keyup.enter.native="getCate">
        <el-form-item label="字典类型：">
          <el-input v-model.trim="cateSearch.catalog" placeholder="请输入字典类型"></el-input>
        </el-form-item>
        <el-form-item label="备注：">
          <el-input v-model.trim="cateSearch.catalogDesc" placeholder="请输入字典类型"></el-input>
        </el-form-item>
        <el-form-item label=" ">
          <el-button type="primary" icon="el-icon-search" @click="getCate">查询</el-button>
        </el-form-item>
      </el-form>
    </kindo-card-search>

    <kindo-card title="基础字典" icon="fa-area-chart">
      <kindo-table ref="table" :url="url" :queryParam="cateSearch" @row-click="tableClick" :page-size="5">
        <el-table-column label="字典类型" prop="catalog" width="200" sortable='custom' show-overflow-tooltip></el-table-column>
        <el-table-column label="备注" prop="catalogDesc" min-width="240" show-overflow-tooltip></el-table-column>
        <el-table-column label="操作" width="100" align="center" fixed="right">
          <template slot-scope="scope">
            <el-button title="刷新" type="text" icon="fa-refresh" @click="reset(scope.$index, scope.row)">刷新</el-button>
          </template>
        </el-table-column>
      </kindo-table>

      <br>
      <br>

      <kindo-table ref="dataTable" :url="url2" :queryParam="dataSearch" :pagination="false" :page-size="5">
        <el-table-column label="key" prop="label" width="200" sortable show-overflow-tooltip></el-table-column>
        <el-table-column label="value" prop="value" min-width="240" sortable show-overflow-tooltip></el-table-column>
      </kindo-table>
    </kindo-card>
  </div>
</template>

<script>
import config from './config'

export default {
  data() {
    return {
      url: config.api.getCate,
      url2: config.api.getData,

      // 字典类型查询实体
      cateSearch: {
        catalog: '',
        catalogDesc: ''
      },

      // 字典数据查询实体
      dataSearch: {
        catalog: ''
      }
    }
  },

  mounted() {
    this.$nextTick(() => {
      this.getCate()
    })
  },

  methods: {
    // 查询动态数据字典类型
    getCate() {
      this.$refs.table.loadData().then(res => {
        this.$refs.table.setCurrentRowIndex(0)
        this.tableClick(res.data.rows[0])
      })
    },

    // 当点击选中动态数据字典类型某一行时
    tableClick(row) {
      this.dataSearch.catalog = row.catalog
      this.getData()
    },

    // 查询动态数据字典
    getData() {
      this.$refs.dataTable.loadData()
    },

    // 重新加载

    // 重新加载某字典类型数据字典缓存
    reset(index, row) {
      this.$http.get(config.api.reset, { params: { catalog: row.catalog } }).then(() => {
        kindo.util.alert('重新加载(' + row.catalog + ')动态字典缓存成功', '提示', 'success')
      })
    }
  }
}
</script>