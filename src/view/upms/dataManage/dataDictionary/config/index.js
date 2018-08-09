export default {
  api: {
    // 查询数据字典分类列表
    getCate: kindo.config.api.upms + 'system/dict/queryCatalogs',

    // 根据id查询数据字典分类详情
    getDetail: kindo.config.api.upms + 'system/dict/queryCatalogSingle',

    // 新增数据字典分类
    addCate: kindo.config.api.upms + 'system/dict/insertCatalog',

    // 修改数据字典分类
    editCate: kindo.config.api.upms + 'system/dict/updateCatalog',

    // 删除数据字典分类
    deleteCate: kindo.config.api.upms + 'system/dict/deleteCatalog',

    // 查询数据字典分类下字典数据
    getData: kindo.config.api.upms + 'system/dict/queryDetails',

    // 新增数据字典分类下字典数据
    insertData: kindo.config.api.upms + 'system/dict/insertDetail',

    // 删除字典数据
    deleteData: kindo.config.api.upms + 'system/dict/deleteDetail',

    // 重新加载数据字典某分类数据字典缓存
    reset: kindo.config.api.upms + 'system/dict/reload'
  },
  mock: {}
}
