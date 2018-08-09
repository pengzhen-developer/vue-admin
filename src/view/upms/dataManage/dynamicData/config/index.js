export default {
  api: {
    // 查询动态数据字典分类列表
    getCate: kindo.config.api.upms + 'system/dict/queryDynCatalogs',

    // 查询动态数据字典分类下字典数据
    getData: kindo.config.api.upms + 'system/dict/queryDynDetails',

    // 重新加载数据字典某分类数据字典缓存
    reset: kindo.config.api.upms + 'system/dict/reload'
  },
  mock: {}
}
