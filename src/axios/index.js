import Vue from 'vue'
import Axios from 'axios'
import { user } from '../type.js'

// http request 拦截器
Axios.interceptors.request.use(
  function(request) {
    kindo.$bus.$emit('loading', true)

    // 基于 mock , 直接发送请求
    if (request.url.indexOf('http://mock.eolinker.com/') !== -1) {
      return request
    }
    // 验证 token
    else {
      // 配置 timeout 超时时间
      request.timeout = request.timeout || kindo.config.axios['timeout']
      // 配置 content-type 为 application/json;charset=UTF-8
      request.headers['Content-Type'] = request.headers['Content-Type'] || kindo.config.axios['Content-Type']

      // 添加 token
      const userInfo = kindo.cache.get(user.USER_INFO, 'local')
      if (userInfo && userInfo.token) {
        if (userInfo.token) {
          request.headers.Token = userInfo.token
        }

        // - fix 1
        // 屏蔽非 upms 的 token
        if (userInfo.LONG_TOKEN && request.url.indexOf(kindo.api.upms) !== -1) {
          request.headers['Long-Token'] = kindo.cache.get(kindo.constant.LONG_TOKEN)
        }
      }

      return request
    }
  },
  function(error) {
    kindo.$bus.$emit('loading', false)
    return Promise.reject(error)
  }
)

Axios.interceptors.response.use(
  function(response) {
    kindo.$bus.$emit('loading', false)

    // 基于 mock , 直接发送请求
    if (response.config.url.indexOf('http://mock.eolinker.com/') !== -1) {
      return response.data
    }
    // 成功数据
    else if (response.data.code === 200) {
      return response.data
    }
    // 超时
    else if (response.data.code === 762) {
      if (response.headers['new-token']) {
        // 存在新 token , 自动刷新该页面
        setTimeout(() => {
          window.location.reload()
        }, 2000)

        kindo.util.alert('登陆超时，即将重新验证, 请稍后。')
        const userInfo = kindo.cache.get(user.USER_INFO, 'local')
        userInfo.token = response.headers['new-token']
        kindo.cache.set(user.USER_INFO, userInfo, 'local')
        return Promise.reject(response.data)
      } else {
        kindo.util.alert('登陆超时，即将退出登录, 请稍后。')
        kindo.cache.remove(user.USER_INFO)
        kindo.$bus.$router.push('/login')
        return Promise.reject(response.data)
      }
    } else {
      kindo.util.alert(response.data.message)
      return Promise.reject(response.data)
    }
  },
  function(error) {
    kindo.$bus.$emit('loading', false)

    if (error && error.response && error.response.status) {
      switch (error.response.status) {
        case 401:
          kindo.util.alert('登陆超时，请重新登陆。')
          kindo.cache.remove(user.USER_INFO)
          kindo.$bus.$router.push('/login')
          break
        case 404:
          kindo.util.alert('Web 服务器找不到您所请求的文件或脚本。请检查URL 以确保路径正确', '404 未找到', 'warning')
          break
        case 405:
          kindo.util.alert('对于请求所标识的资源，不允许使用请求行中所指定的方法。请确保为所请求的资源设置了正确的 MIME 类型', '405 不允许此方法', 'warning')
          break
        case 406:
          kindo.util.alert('根据此请求中所发送的“接受”标题，此请求所标识的资源只能生成内容特征为“不可接受”的响应实体', '406 不可接受', 'warning')
          break
        case 500:
          kindo.util.alert('Web 服务器不能执行此请求，请稍后重试此请求', '500 服务器的内部错误', 'warning')
          break
        case 501:
          kindo.util.alert('Web 服务器不支持实现此请求所需的功能。请检查URL 中的错误，如果问题依然存在，请与 Web服务器的管理员联系', '501 未实现', 'warning')
          break
      }
    }

    return Promise.reject(error)
  }
)

Vue.prototype.$http = Axios

export default Axios
