export default {
  api: {
    // 数据树查询
    getTree: kindo.config.api.upms + 'system/orga/tree',

    // 数据角色表信息获取
    get: kindo.config.api.upms + 'system/dataRole/query',

    // 通过ID获取用户信息
    getRoleUser: kindo.config.api.upms + 'system/dataRole/queryById',

    // 新增角色
    insert: kindo.config.api.upms + 'system/dataRole/insert',

    // 编辑角色
    update: kindo.config.api.upms + 'system/dataRole/update',

    // 删除角色
    delete: kindo.config.api.upms + 'system/dataRole/delete',

    // 查询数据角色的数据权限
    getDataRole: kindo.config.api.upms + 'system/dataRole/queryAuths',

    // 修改数据角色的数据权限
    updateDataRole: kindo.config.api.upms + 'system/dataRole/setupAuths'
  },
  mock: {}
}
