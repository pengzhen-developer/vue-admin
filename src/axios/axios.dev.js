import Axios from 'axios'

// Axios request interceptors
Axios.interceptors.request.use(
  function(request) {
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
    return Promise.reject(error)
  }
)

// Axios response interceptors
Axios.interceptors.response.use(
  function(response) {
    return response
  },
  function(error) {
    return Promise.reject(error)
  }
)

export default Axios
