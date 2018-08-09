export default {
  api: {
    // 获取登录用户扩展信息
    get: kindo.config.api.upms + 'user/queryLoginUserExt',
    // 修改登录用户扩展信息
    update: kindo.config.api.upms + 'user/updateLoginUserExt'
  },
  mock: {}
}
