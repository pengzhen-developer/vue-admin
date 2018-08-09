export default {
  api: {
    // 菜单树查询
    getMenu: kindo.config.api.upms + 'system/menu/tree',

    // 菜单角色表信息获取
    get: kindo.config.api.upms + 'system/menuRole/query',

    // 通过ID获取用户信息
    getRoleUser: kindo.config.api.upms + 'system/menuRole/querySingle',

    // 新增角色
    insert: kindo.config.api.upms + 'system/menuRole/insert',

    // 编辑角色
    update: kindo.config.api.upms + 'system/menuRole/update',

    // 删除角色
    delete: kindo.config.api.upms + 'system/menuRole/delete',

    // 查询菜单角色的菜单权限
    getMenuRole: kindo.config.api.upms + 'system/menuRole/queryAuths',

    // 修改菜单角色的菜单权限
    updateMenuRole: kindo.config.api.upms + 'system/menuRole/setupAuths',

    // 获取角色按钮权限
    queryButtonAuths: kindo.config.api.upms + 'system/menuRole/queryButtonAuths',

    // 设置角色按钮权限
    setupButtonAuths: kindo.config.api.upms + 'system/menuRole/setupButtonAuths'
  },
  mock: {}
}
