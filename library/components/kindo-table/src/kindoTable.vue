<template>
  <div class="kindo-table">
    <el-popover class="filterColumn" v-if="filtersColumn && filtersColumn.length > 0" placement="top-start">
      <div>
        <p>请选择需要屏蔽的列:</p>
        <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>
        <el-checkbox-group class="checkbox-group-inTable" v-model="checkList" @change="handleCheckedCitiesChange">
          <div v-for="item in filtersColumn" :key="item.value">
            <el-checkbox :label="item.value">{{ item.text }}</el-checkbox>
          </div>
        </el-checkbox-group>
      </div>

      <i v-show="filtersColumn && filtersColumn.length > 0" class="el-icon-arrow-down" slot="reference"></i>
    </el-popover>

    <el-table ref="table" v-bind="$attrs" v-on="$listeners" v-loading="loading" element-loading-background="rgba(255, 255, 255, 0.5)" :height="internalHeight" :data="internalData" :border="internalBorder" :highlight-current-row="internalHighlightCurrentRow" :stripe="internalStripe" @sort-change="internalSortChange">
      <!-- 行号 -->
      <el-table-column v-if="pageIndex" label=" " type="index" align="center" width="60px" class-name="rowNumber" :fixed="pageIndexFixed">
        <template slot-scope="scope">
          <span v-text="(internalCurrentPage - 1) * internalPageSize + scope.$index + 1"></span>
        </template>
      </el-table-column>

      <slot></slot>
    </el-table>

    <template v-if="pagination">
      <el-pagination class="pagination" v-bind="$attrs" v-on="$listeners" :layout="internalLayout" :total="internalTotal" :current-page.sync="internalCurrentPage" :page-sizes="internalPageSizes" :page-size="internalPageSize" @size-change="_internalSizeChange" @current-change="_internalCurrentChange">
      </el-pagination>
    </template>
  </div>
</template>

<script>
export default {
  name: 'kindo-table',

  mixins: [
    {
      watch: {
        internalData(val) {
          if (val.length === 0) {
            this.internalTotal = 0
          }
        }
      },
      methods: {
        trigger(method, ...args) {
          const { $refs: { table } } = this
          if (table && table[method]) {
            table[method](...args)
          }
        },

        toggleRowSelection(...args) {
          this.trigger('toggleRowSelection', ...args)
        },

        toggleRowExpansion(...args) {
          this.trigger('toggleRowExpansion', ...args)
        },

        setCurrentRow(...args) {
          this.trigger('setCurrentRow', ...args)
        },

        clearSort() {
          this.trigger('clearSort')
        },

        sort(...args) {
          this.trigger('sort', ...args)
        },

        clearFilter() {
          this.trigger('clearFilter')
        },

        clearSelection(...args) {
          this.trigger('clearSelection', ...args)
        },

        setCurrentRowIndex(rowIndex) {
          this.setCurrentRow(this.internalData[rowIndex])
        },

        // 清空表格的数据
        clearTable() {
          this.internalData = []
        },
        // 对 Table 进行重新布局
        doLayout(table) {
          if (this.$refs[table] !== undefined) {
            this.$refs[table].doLayout()
          }
        }
      }
    }
  ],

  props: {
    // 属性扩展,
    extendOption: {
      type: Object,
      default: () => {
        return {
          serialNumber: false, // serialNumber主要是为了控制序号列是否是fixed的状态
          selectedFirst: false // selectedFirst主要是为了在翻页的时候表格一直可以选中第一行
        }
      }
    },
    // 属性扩展, 是否分页
    pagination: { type: Boolean, default: true },
    // 属性扩展, 是否启用行号
    pageIndex: { type: Boolean, default: true },
    // 属性扩展, 行号情况下, 确定fixed模式
    pageIndexFixed: { type: String, default: 'left' },
    // 属性扩展, 从远程站点请求数据的 URL
    url: String,
    // 属性扩展, 当请求远程数据时，发送的额外参数
    queryParam: Object,
    // 属性扩展, 定义表格距离底部位置,
    bottom: { type: [String, Number], default: 30 },
    // step 1, 属性扩展, 当获取远程数据后, 返回要显示的过滤数据
    loadFilter: Function,
    // step 2, 属性扩展, 当获取远程数据后, 并且进行了 step 1, 定义如何加载数据
    loader: Function,
    // step 3, 属性扩展, 当获取远程数据后, 并且进行了 step 2, 定义加载完毕后如何操作
    loaded: Function
  },

  data() {
    return {
      checkList: [],
      checkAll: false,
      isIndeterminate: false,

      // 自定义筛选列
      filtersColumn: [],

      // el-table 的 loading 展示
      loading: false,
      // 重载 el-table的 props : data
      internalData: this.$attrs.data || [],
      // 重载 el-table的 props : border
      internalBorder: this.$attrs.border || false,
      // 重载 el-table的 props : highLightCurrentRow
      internalHighlightCurrentRow: this.$attrs.highLightCurrentRow || true,
      // 重载 el-table的 props : stripe
      internalStripe: this.$attrs.stripe || true,
      // 重载 el-table的 props : height
      internalHeight: this.$attrs.height,
      // 重载 el-table的 event : sortChange
      internalSortChange: this._internalSortChange || this.$listeners.sortChange,

      // 重载 el-pagination props : total, 组件内部或外部可能会使用
      internalTotal: this.$attrs.total || 0,
      // 重载 el-pagination props : currentPage, 组件内部或外部可能会使用
      internalCurrentPage: this.$attrs.currentPage || 1,
      // 重载 el-pagination props : pageSizes, 组件内部或外部可能会使用
      internalPageSizes: this.$attrs.pageSizes || [5, 10, 15, 20, 30, 50, 100],
      // 重载 el-pagination props : pageSize, 组件内部或外部可能会使用
      internalPageSize: this.$attrs.pageSize || 10,
      // 重载 el-pagination props : pageSize, 组件内部或外部可能会使用
      internalLayout: this.$attrs.layout || 'prev, pager, next, jumper, sizes, ->, total',

      // 自定义表格数据筛选方法
      internalLoadFilter: this.loadFilter || this._loadFilterFunc,
      // 高级用法, 自定义表格数据加载及展示方法(非特殊要求, 不做更改)
      internalLoader: this.loader || this._loaderFunc,
      // 高级用法, 定义加载完毕后如何操作(非特殊要求, 不做更改)
      internalLoaded: this.loaded || this._loadedFunc
    }
  },

  watch: {
    checkList() {
      // 增加 loading , 提升操作交互性
      this.loading = true

      setTimeout(() => {
        this.$slots.default.forEach(componet => {
          componet.componentInstance.internalVisible = true

          this.checkList.forEach(item => {
            if (item === componet.componentInstance.$attrs.prop) {
              componet.componentInstance.internalVisible = false
            }
          })
        })

        this.loading = false
      }, 200)
    }
  },

  created() {
    // 获取所有列
    this.$slots.default.forEach(column => {
      if (column.data.attrs.label && column.data.attrs.prop) {
        this.filtersColumn.push({
          text: column.data.attrs.label,
          value: column.data.attrs.prop
        })
      }
    })
  },

  mounted() {
    this.$nextTick(function() {
      if (!this.$attrs.height) {
        // this.initTableHeight()
      }
    })
  },

  methods: {
    handleCheckAllChange(val) {
      this.checkList = val ? this.filtersColumn.map(item => item.value) : []
      this.isIndeterminate = false
    },

    handleCheckedCitiesChange(val) {
      let checkedCount = val.length
      this.checkAll = checkedCount === this.checkList.length
      this.isIndeterminate = checkedCount > 0 && checkedCount < this.filtersColumn.length
    },

    initTableHeight() {
      // 计算表格默认高度
      const headerHeight = this.$el.querySelector('.el-table__header-wrapper').clientHeight
      const rowHeight = 34 * this.internalPageSize
      const scrollHeight = 20

      this.internalHeight = headerHeight + rowHeight + scrollHeight
    },

    _loadFilterFunc(res) {
      return res
    },

    _loaderFunc(res) {
      if (res.data) {
        this.internalData = res.data.rows || res.data
        this.internalTotal = res.data.total || 0
      }

      return res
    },

    _loadedFunc(res) {
      this.loading = false

      return res
    },

    _internalSizeChange(pageSize) {
      this.internalCurrentPage = 1
      this.internalPageSize = pageSize
      this.loadData()
    },

    _internalCurrentChange(currentPage) {
      this.internalCurrentPage = currentPage
      this.loadData()
    },

    _internalSortChange(obj) {
      const sort = obj.prop || undefined
      const order = obj.order === 'ascending' ? 'asc' : obj.order === 'descending' ? 'desc' : undefined

      this.loadData({
        queryParam: Object.assign(
          {},
          {
            sort,
            order
          },
          this.queryParam
        )
      })

      if (this.sortChange) {
        this.sortChange.apply(this, arguments)
      }
    },

    /**
     * 向远程服务器请求数据
     */
    async load(url, queryParam, type) {
      if (!url) {
        throw new Error('尚未配置url, 无法获取远程服务器数据')
      }

      // 显示 loading
      // this.loading = true

      // 组织请求参数
      const param = type === 'post' ? queryParam : { params: queryParam }

      // 返回请求结果
      return await this.$http[type](url, param)
        .then(res => res)
        .then(this.internalLoadFilter)
        .then(this.internalLoader)
        .then(this.internalLoaded)
        .catch(error => {
          console.error(error)
          this.internalData = []
          this.internalTotal = 0
          this.internalCurrentPage = 0
          this.loading = false
        })
    },

    /**
     * 重新加载数据, 保持在当前页
     */
    async loadData(config = {}) {
      const defultSort = this.$attrs['default-sort']
      const sort = (config.queryParam && config.queryParam.sort) || (defultSort && defultSort.prop)
      const order = (config.queryParam && config.queryParam.order) || (defultSort && defultSort.order && defultSort.order.replace('ending', ''))

      const type = (this.type || 'get').toLocaleLowerCase()
      const url = config.url || this.url
      const queryParam = Object.assign(
        {},
        {
          sort,
          order,
          page: this.pagination && this.internalCurrentPage,
          rows: this.pagination && this.internalPageSize
        },
        config.queryParam || this.queryParam
      )
      if (!this.pagination) {
        queryParam.page = 1
        queryParam.rows = this.internalPageSize
      }

      return await this.load(url, queryParam, type)
    },

    /**
     * 重新加载数据, 保持在第一页
     */
    async reloadData(config = {}) {
      this.internalCurrentPage = 1
      return await this.loadData(config)
    }
  }
}
</script>

<style lang="scss">
.checkbox-group-inTable {
  /deep/ .el-checkbox + .el-checkbox {
    margin: 0;
  }
}
</style>


<style lang="scss" scoped>
.kindo-table {
  /deep/ .filterColumn {
    position: absolute;
    z-index: 10;
    top: 50px;
    left: 25px;

    i {
      color: #0a7ec6;
      cursor: pointer;
    }
  }

  .pagination {
    margin: 0;
    padding: 4px 8px 2px;
    border: 1px solid #f4f4f4;
    border-top: none;
  }

  .el-table--border {
    .rowNumber {
      .cell {
        padding: 0 2px;
      }
    }
  }
}
</style>
