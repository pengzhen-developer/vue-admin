import Axios from 'axios'

// Notification
import { Notification } from 'element-ui'

// Progress
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

// Axios request interceptors
Axios.interceptors.request.use(
  function(request) {
    // Start loading
    NProgress.start()

    // if it's a mock request, direct request
    if (request.url.indexOf('http://mock.eolinker.com/') !== -1) {
      return request
    }
    // if it's a server request, send it with the user token
    else {
      request.headers.Token = 'User Token'

      return request
    }
  },

  function(error) {
    // Stop loading
    NProgress.done(false)

    // Notification
    Notification.warning({
      title: '提示',
      message: error.message
    })

    return Promise.reject(error)
  }
)

// Axios response interceptors
Axios.interceptors.response.use(
  function(response) {
    return response
  },

  function(error) {
    // Stop loading
    NProgress.done(false)

    // Notification
    let message = undefined
    switch (error.response && error.response.status) {
      case 401:
        message = '鉴权失败，请重新登录或联系管理员'
        break

      case 404:
        message = 'Web 服务器找不到您所请求的文件或脚本。请检查 URL 以确保路径正确'
        break

      case 405:
        message = '请求类型不允许，请确保为所请求的资源设置了正确的 MIME 类型'
        break

      case 500:
        message = '服务器的内部错误，Web 服务器不能执行此请求，请稍后重试此请求'
        break
    }

    Notification.warning({
      title: '提示',
      message: message || error.message
    })

    return Promise.reject(error)
  }
)

export default Axios
