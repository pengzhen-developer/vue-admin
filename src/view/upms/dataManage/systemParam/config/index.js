export default {
  api: {
    // 获取系统参数列表
    get: kindo.config.api.upms + 'system/param/queryList',

    // 管理员重置密码
    revert: kindo.config.api.upms + 'system/param/revert',

    // 管理员修改密码
    update: kindo.config.api.upms + 'system/param/update',

    // 系统参数刷新缓存
    refresh: kindo.config.api.upms + 'system/param/reload'
  },
  mock: {}
}
