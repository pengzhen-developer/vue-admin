export default {
  api: {
    get: kindo.config.api.upms + 'system/user/query',
    insert: kindo.config.api.upms + 'system/user/insert',
    update: kindo.config.api.upms + 'system/user/update',
    delete: kindo.config.api.upms + 'system/user/delete',

    getOrg: kindo.config.api.upms + 'system/orga/tree',
    getMenuRole: kindo.config.api.upms + 'system/menuRole/queryAll',
    getDataRole: kindo.config.api.upms + 'system/dataRole/queryAll',

    getMenuRoleById: kindo.config.api.upms + 'system/user/queryMenuRoles',
    getDataRoleById: kindo.config.api.upms + 'system/user/queryDataRoles',

    updateMenuRole: kindo.config.api.upms + 'system/user/setupMenuRoles',
    updateDataRole: kindo.config.api.upms + 'system/user/setupDataRoles',
    // 获取数据字典分类
    getStatus: kindo.config.api.upms + 'system/dict/get?catalog=USER_STATUS'
  }
}
