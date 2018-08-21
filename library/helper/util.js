/*
 * @Author: PengZhen
 * @Description: 常用方法
 * @Date: 2018-07-06 11:24:59
 * @Last Modified by: PengZhen
 * @Last Modified time: 2018-07-19 11:06:48
 */

const _PADCHAR = '='
const _ALPHA = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'

function _getbyte64(s, i) {
  // This is oddly fast, except on Chrome/V8.
  // Minimal or no improvement in performance by using a
  // object with properties mapping chars to value (eg. 'A': 0)

  const idx = _ALPHA.indexOf(s.charAt(i))

  if (idx === -1) {
    return 'Cannot decode base64'
  }

  return idx
}

function _getbyte(s, i) {
  const x = s.charCodeAt(i)

  if (x > 255) {
    return 'INVALID_CHARACTER_ERR: DOM Exception 5'
  }

  return x
}

/**
 * 获取 url 参数
 *
 * @export
 * @param {any} name 需要解析参数的 key
 * @param {any} url 需要解析参数的 url
 * @returns 需要解析参数的参数值
 */
export function queryUrlParam(name, url) {
  if (!url) url = window.location.href
  name = name.replace(/[[\]]/g, '\\$&')
  let regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)')
  let results = regex.exec(url)
  if (!results) return null
  if (!results[2]) return ''
  return decodeURIComponent(results[2].replace(/\+/g, ' '))
}

/**
 * 统一请求资源
 * 给请求资源加上配置的动态资源, 以形成完整的 api
 *
 * @export
 * @param {any} uri
 * @param {any} type
 * @returns
 */
export function setUri(uri, type) {
  if (uri.substr(uri.indexOf('.')) === '.json') {
    return uri
  }

  let uriType = type || uri.split('/')[0]
  let uriPath = uriType ? 'config' : ''
  return uriPath + uri
}

/**
 * 数组对象转化 tree 结构
 *
 * @export
 * @param {any} nodes
 * @param {string} [idKey='id']
 * @param {string} [pIdKey='pId']
 * @param {string} [childrenKey='children']
 * @returns
 */
export function toTree(nodes, idKey = 'id', pIdKey = 'pId', childrenKey = 'children') {
  let map = {}
  let node
  let roots = []

  nodes.forEach((item, index) => {
    map[item[idKey]] = index
  })
  for (let i = 0; i < nodes.length; i += 1) {
    node = nodes[i]
    if (node[pIdKey] !== '-1' && node[pIdKey] !== '' && nodes[map[node[pIdKey]]]) {
      if (!nodes[map[node[pIdKey]]][childrenKey]) {
        nodes[map[node[pIdKey]]][childrenKey] = []
        nodes[map[node[pIdKey]]][childrenKey].push(node)
      } else {
        nodes[map[node[pIdKey]]][childrenKey].push(node)
      }
    } else {
      roots.push(node)
    }
  }

  return roots
}

/**
 * 格式化时间对象
 *
 * @export
 * @param {*} date
 * @param {string} [format='yyyy-MM-dd']
 * @returns
 */
export function formatDate(date, format = 'yyyy-MM-dd') {
  // 兼容 element-table 的 formatter
  if (arguments.length === 4 && arguments[0][arguments[1].property] === arguments[2]) {
    date = arguments[2]
    format = 'yyyy-MM-dd'
  }
  if (kindo.valid.isEmpty(date)) {
    return '-'
  }
  if (typeof format !== 'string') {
    format = 'yyyy-MM-dd'
  }

  if (date instanceof Date) {
    return date.formatDate(format)
  } else {
    return date.toDate().formatDate(format)
  }
}

/**
 * 格式化时间对象
 *
 * @param {*} date
 * @param {string} [format='yyyy-MM-dd HH:mm:ss']
 * @returns
 */
export function formatTime(date, format = 'yyyy-MM-dd HH:mm:ss') {
  // 兼容 element-table 的 formatter
  if (arguments.length === 4 && arguments[0][arguments[1].property] === arguments[2]) {
    date = arguments[2]
    format = 'yyyy-MM-dd HH:mm:ss'
  }
  if (kindo.valid.isEmpty(date)) {
    return '-'
  }
  if (typeof format !== 'string') {
    format = 'yyyy-MM-dd HH:mm:ss'
  }

  if (date instanceof Date) {
    return date.formatDate(format)
  } else {
    return date.toDate().formatDate(format)
  }
}

/**
 *
 *
 * @export
 * @param {*} num 待转换的数值
 * @param {number} [precision=2] 小数位数
 * @param {string} [separator=','] 分隔符
 * @returns
 */
export function formatNum(num, precision = 2, separator = ',') {
  // 兼容 element-table 的 formatter
  if (arguments.length === 4 && arguments[0][arguments[1].property] === arguments[2]) {
    num = arguments[2]
    precision = 2
    separator = ','
  }
  if (!isNaN(parseFloat(num)) && isFinite(num)) {
    let parts
    num = Number(num)
    num = (typeof precision !== 'undefined' ? num.toFixed(precision) : num).toString()
    parts = num.split('.')
    parts[0] = parts[0].toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1' + separator)
    return parts.join('.')
  }
  return num
}

/**
 * message 弹出提示
 *
 * @param {string} [msg='提示']
 * @param {string} [title='提示']
 * @param {string} [type='success']
 */
export function alert(msg = '提示', title = '提示', type = 'success') {
  kindo.$bus.$emit('message', msg, title, type)
}

/**
 * confirm 弹出提示
 *
 * @param {string} [msg='提示']
 * @param {string} [title='提示']
 * @param {string} [type='info']
 * @param {*} [successCallBack=() => {}]
 * @param {*} [errorCallBack=() => {}]
 */
export function confirm(msg = '提示', title = '提示', type = 'info', successCallBack = () => {}, errorCallBack = () => {}) {
  kindo.$bus.$emit('confirm', msg, title, type, successCallBack, errorCallBack)
}

/**
 * notify 弹出提示
 *
 * @param {string} [msg='提示']
 * @param {string} [title='提示']
 * @param {string} [type='success']
 */
export function notify(msg = '提示', title = '提示', type = 'success') {
  kindo.$bus.$emit('notify', msg, title, type)
}

/**
 * 下载文件
 *
 * @export
 * @param {string} [url='']
 * @param {*} [param={}]
 * @param {string} [methods='get']
 */
export function downloadFile(url = '', param = {}, methods = 'get') {
  const axios = kindo.$bus.$http.create({
    responseType: 'blob',
    headers: {
      Token: kindo.cache.get('USER_INFO', 'local').token,
      'Content-Type': 'application/json'
    }
  })

  const download = response => {
    const blob = new Blob([response.data])
    const fileName = decodeURIComponent(response.headers['content-disposition'].split('fileName=')[1])

    if (typeof window.navigator.msSaveBlob !== 'undefined') {
      // IE workaround for "HTML7007: One or more blob URLs were
      // revoked by closing the blob for which they were created.
      // These URLs will no longer resolve as the data backing
      // the URL has been freed."
      window.navigator.msSaveBlob(blob, fileName)
    } else {
      var blobURL = window.URL.createObjectURL(blob)
      var tempLink = document.createElement('a')
      tempLink.style.display = 'none'
      tempLink.href = blobURL
      tempLink.setAttribute('download', fileName)

      // Safari thinks _blank anchor are pop ups. We only want to set _blank
      // target if the browser does not support the HTML5 download attribute.
      // This allows you to download files in desktop safari if pop up blocking
      // is enabled.
      if (typeof tempLink.download === 'undefined') {
        tempLink.setAttribute('target', '_blank')
      }

      document.body.appendChild(tempLink)
      tempLink.click()
      document.body.removeChild(tempLink)
      window.URL.revokeObjectURL(blobURL)
    }

    kindo.$bus.$emit('loading', false)
  }

  if (methods.toLowerCase() === 'get') {
    kindo.$bus.$emit('loading', true)

    const qs = require('qs')
    const downloadPath = `${url}?${qs.stringify(param, { arrayFormat: 'repeat' })}`
    axios({
      method: 'get',
      url: downloadPath
    })
      .then(response => {
        download(response)
      })
      .catch(error => {
        if (error && error.response && error.response.status) {
          switch (error.response.status) {
            case 760:
               kindo.util.alert('不是有效的医院用户')
              break
            case 759:
              kindo.util.alert('服务端excel模板有错误')
              break
            case 758:
              kindo.util.alert('客户端 excel模板有错误')
              break
            default:
              kindo.util.alert(error.message, '提示', 'error')
          }
        }
        kindo.$bus.$emit('loading', false)
      })
  } else if (methods.toLowerCase() === 'post') {
    axios({
      method: 'post',
      url: url,
      data: param
    })
      .then(response => {
        download(response)
      })
      .catch(error => {
        console.error(error)
        kindo.util.alert(error.message, '提示', 'error')
        kindo.$bus.$emit('loading', false)
      })
  }
}

/**
 * md5
 *
 * @param {*} string
 * @returns
 */
export function md5(string) {
  function RotateLeft(lValue, iShiftBits) {
    return (lValue << iShiftBits) | (lValue >>> (32 - iShiftBits))
  }

  function AddUnsigned(lX, lY) {
    let lX4, lY4, lX8, lY8, lResult
    lX8 = lX & 0x80000000
    lY8 = lY & 0x80000000
    lX4 = lX & 0x40000000
    lY4 = lY & 0x40000000
    lResult = (lX & 0x3fffffff) + (lY & 0x3fffffff)
    if (lX4 & lY4) {
      return lResult ^ 0x80000000 ^ lX8 ^ lY8
    }
    if (lX4 | lY4) {
      if (lResult & 0x40000000) {
        return lResult ^ 0xc0000000 ^ lX8 ^ lY8
      } else {
        return lResult ^ 0x40000000 ^ lX8 ^ lY8
      }
    } else {
      return lResult ^ lX8 ^ lY8
    }
  }

  function F(x, y, z) {
    return (x & y) | (~x & z)
  }

  function G(x, y, z) {
    return (x & z) | (y & ~z)
  }

  function H(x, y, z) {
    return x ^ y ^ z
  }

  function I(x, y, z) {
    return y ^ (x | ~z)
  }

  function FF(a, b, c, d, x, s, ac) {
    a = AddUnsigned(a, AddUnsigned(AddUnsigned(F(b, c, d), x), ac))
    return AddUnsigned(RotateLeft(a, s), b)
  }

  function GG(a, b, c, d, x, s, ac) {
    a = AddUnsigned(a, AddUnsigned(AddUnsigned(G(b, c, d), x), ac))
    return AddUnsigned(RotateLeft(a, s), b)
  }

  function HH(a, b, c, d, x, s, ac) {
    a = AddUnsigned(a, AddUnsigned(AddUnsigned(H(b, c, d), x), ac))
    return AddUnsigned(RotateLeft(a, s), b)
  }

  function II(a, b, c, d, x, s, ac) {
    a = AddUnsigned(a, AddUnsigned(AddUnsigned(I(b, c, d), x), ac))
    return AddUnsigned(RotateLeft(a, s), b)
  }

  function ConvertToWordArray(string) {
    let lWordCount
    let lMessageLength = string.length
    let lNumberOfWordsTemp1 = lMessageLength + 8
    let lNumberOfWordsTemp2 = (lNumberOfWordsTemp1 - (lNumberOfWordsTemp1 % 64)) / 64
    let lNumberOfWords = (lNumberOfWordsTemp2 + 1) * 16
    let lWordArray = Array(lNumberOfWords - 1)
    let lBytePosition = 0
    let lByteCount = 0
    while (lByteCount < lMessageLength) {
      lWordCount = (lByteCount - (lByteCount % 4)) / 4
      lBytePosition = (lByteCount % 4) * 8
      lWordArray[lWordCount] = lWordArray[lWordCount] | (string.charCodeAt(lByteCount) << lBytePosition)
      lByteCount++
    }
    lWordCount = (lByteCount - (lByteCount % 4)) / 4
    lBytePosition = (lByteCount % 4) * 8
    lWordArray[lWordCount] = lWordArray[lWordCount] | (0x80 << lBytePosition)
    lWordArray[lNumberOfWords - 2] = lMessageLength << 3
    lWordArray[lNumberOfWords - 1] = lMessageLength >>> 29
    return lWordArray
  }

  function WordToHex(lValue) {
    let WordToHexValue = ''
    let WordToHexValueTemp = ''
    let lByte
    let lCount
    for (lCount = 0; lCount <= 3; lCount++) {
      lByte = (lValue >>> (lCount * 8)) & 255
      WordToHexValueTemp = '0' + lByte.toString(16)
      WordToHexValue = WordToHexValue + WordToHexValueTemp.substr(WordToHexValueTemp.length - 2, 2)
    }
    return WordToHexValue
  }

  function Utf8Encode(string) {
    string = string.replace(/\r\n/g, '\n')
    let utftext = ''

    for (let n = 0; n < string.length; n++) {
      let c = string.charCodeAt(n)

      if (c < 128) {
        utftext += String.fromCharCode(c)
      } else if (c > 127 && c < 2048) {
        utftext += String.fromCharCode((c >> 6) | 192)
        utftext += String.fromCharCode((c & 63) | 128)
      } else {
        utftext += String.fromCharCode((c >> 12) | 224)
        utftext += String.fromCharCode(((c >> 6) & 63) | 128)
        utftext += String.fromCharCode((c & 63) | 128)
      }
    }

    return utftext
  }

  let x = []
  let k, AA, BB, CC, DD, a, b, c, d
  let S11 = 7
  let S12 = 12
  let S13 = 17
  let S14 = 22
  let S21 = 5
  let S22 = 9
  let S23 = 14
  let S24 = 20
  let S31 = 4
  let S32 = 11
  let S33 = 16
  let S34 = 23
  let S41 = 6
  let S42 = 10
  let S43 = 15
  let S44 = 21

  string = Utf8Encode(string)

  x = ConvertToWordArray(string)

  a = 0x67452301
  b = 0xefcdab89
  c = 0x98badcfe
  d = 0x10325476

  for (k = 0; k < x.length; k += 16) {
    AA = a
    BB = b
    CC = c
    DD = d
    a = FF(a, b, c, d, x[k + 0], S11, 0xd76aa478)
    d = FF(d, a, b, c, x[k + 1], S12, 0xe8c7b756)
    c = FF(c, d, a, b, x[k + 2], S13, 0x242070db)
    b = FF(b, c, d, a, x[k + 3], S14, 0xc1bdceee)
    a = FF(a, b, c, d, x[k + 4], S11, 0xf57c0faf)
    d = FF(d, a, b, c, x[k + 5], S12, 0x4787c62a)
    c = FF(c, d, a, b, x[k + 6], S13, 0xa8304613)
    b = FF(b, c, d, a, x[k + 7], S14, 0xfd469501)
    a = FF(a, b, c, d, x[k + 8], S11, 0x698098d8)
    d = FF(d, a, b, c, x[k + 9], S12, 0x8b44f7af)
    c = FF(c, d, a, b, x[k + 10], S13, 0xffff5bb1)
    b = FF(b, c, d, a, x[k + 11], S14, 0x895cd7be)
    a = FF(a, b, c, d, x[k + 12], S11, 0x6b901122)
    d = FF(d, a, b, c, x[k + 13], S12, 0xfd987193)
    c = FF(c, d, a, b, x[k + 14], S13, 0xa679438e)
    b = FF(b, c, d, a, x[k + 15], S14, 0x49b40821)
    a = GG(a, b, c, d, x[k + 1], S21, 0xf61e2562)
    d = GG(d, a, b, c, x[k + 6], S22, 0xc040b340)
    c = GG(c, d, a, b, x[k + 11], S23, 0x265e5a51)
    b = GG(b, c, d, a, x[k + 0], S24, 0xe9b6c7aa)
    a = GG(a, b, c, d, x[k + 5], S21, 0xd62f105d)
    d = GG(d, a, b, c, x[k + 10], S22, 0x2441453)
    c = GG(c, d, a, b, x[k + 15], S23, 0xd8a1e681)
    b = GG(b, c, d, a, x[k + 4], S24, 0xe7d3fbc8)
    a = GG(a, b, c, d, x[k + 9], S21, 0x21e1cde6)
    d = GG(d, a, b, c, x[k + 14], S22, 0xc33707d6)
    c = GG(c, d, a, b, x[k + 3], S23, 0xf4d50d87)
    b = GG(b, c, d, a, x[k + 8], S24, 0x455a14ed)
    a = GG(a, b, c, d, x[k + 13], S21, 0xa9e3e905)
    d = GG(d, a, b, c, x[k + 2], S22, 0xfcefa3f8)
    c = GG(c, d, a, b, x[k + 7], S23, 0x676f02d9)
    b = GG(b, c, d, a, x[k + 12], S24, 0x8d2a4c8a)
    a = HH(a, b, c, d, x[k + 5], S31, 0xfffa3942)
    d = HH(d, a, b, c, x[k + 8], S32, 0x8771f681)
    c = HH(c, d, a, b, x[k + 11], S33, 0x6d9d6122)
    b = HH(b, c, d, a, x[k + 14], S34, 0xfde5380c)
    a = HH(a, b, c, d, x[k + 1], S31, 0xa4beea44)
    d = HH(d, a, b, c, x[k + 4], S32, 0x4bdecfa9)
    c = HH(c, d, a, b, x[k + 7], S33, 0xf6bb4b60)
    b = HH(b, c, d, a, x[k + 10], S34, 0xbebfbc70)
    a = HH(a, b, c, d, x[k + 13], S31, 0x289b7ec6)
    d = HH(d, a, b, c, x[k + 0], S32, 0xeaa127fa)
    c = HH(c, d, a, b, x[k + 3], S33, 0xd4ef3085)
    b = HH(b, c, d, a, x[k + 6], S34, 0x4881d05)
    a = HH(a, b, c, d, x[k + 9], S31, 0xd9d4d039)
    d = HH(d, a, b, c, x[k + 12], S32, 0xe6db99e5)
    c = HH(c, d, a, b, x[k + 15], S33, 0x1fa27cf8)
    b = HH(b, c, d, a, x[k + 2], S34, 0xc4ac5665)
    a = II(a, b, c, d, x[k + 0], S41, 0xf4292244)
    d = II(d, a, b, c, x[k + 7], S42, 0x432aff97)
    c = II(c, d, a, b, x[k + 14], S43, 0xab9423a7)
    b = II(b, c, d, a, x[k + 5], S44, 0xfc93a039)
    a = II(a, b, c, d, x[k + 12], S41, 0x655b59c3)
    d = II(d, a, b, c, x[k + 3], S42, 0x8f0ccc92)
    c = II(c, d, a, b, x[k + 10], S43, 0xffeff47d)
    b = II(b, c, d, a, x[k + 1], S44, 0x85845dd1)
    a = II(a, b, c, d, x[k + 8], S41, 0x6fa87e4f)
    d = II(d, a, b, c, x[k + 15], S42, 0xfe2ce6e0)
    c = II(c, d, a, b, x[k + 6], S43, 0xa3014314)
    b = II(b, c, d, a, x[k + 13], S44, 0x4e0811a1)
    a = II(a, b, c, d, x[k + 4], S41, 0xf7537e82)
    d = II(d, a, b, c, x[k + 11], S42, 0xbd3af235)
    c = II(c, d, a, b, x[k + 2], S43, 0x2ad7d2bb)
    b = II(b, c, d, a, x[k + 9], S44, 0xeb86d391)
    a = AddUnsigned(a, AA)
    b = AddUnsigned(b, BB)
    c = AddUnsigned(c, CC)
    d = AddUnsigned(d, DD)
  }

  let temp = WordToHex(a) + WordToHex(b) + WordToHex(c) + WordToHex(d)

  return temp.toLowerCase()
}

/**
 * base64 加密
 *
 * @param {*} s
 * @returns
 */
export function encode(s) {
  if (arguments.length !== 1) {
    return 'SyntaxError: exactly one argument required'
  }

  s = String(s)

  let i
  let b10
  let x = []
  let imax = s.length - (s.length % 3)

  if (s.length === 0) {
    return s
  }

  for (i = 0; i < imax; i += 3) {
    b10 = (_getbyte(s, i) << 16) | (_getbyte(s, i + 1) << 8) | _getbyte(s, i + 2)
    x.push(_ALPHA.charAt(b10 >> 18))
    x.push(_ALPHA.charAt((b10 >> 12) & 0x3f))
    x.push(_ALPHA.charAt((b10 >> 6) & 0x3f))
    x.push(_ALPHA.charAt(b10 & 0x3f))
  }

  switch (s.length - imax) {
    case 1:
      b10 = _getbyte(s, i) << 16
      x.push(_ALPHA.charAt(b10 >> 18) + _ALPHA.charAt((b10 >> 12) & 0x3f) + _PADCHAR + _PADCHAR)
      break

    case 2:
      b10 = (_getbyte(s, i) << 16) | (_getbyte(s, i + 1) << 8)
      x.push(_ALPHA.charAt(b10 >> 18) + _ALPHA.charAt((b10 >> 12) & 0x3f) + _ALPHA.charAt((b10 >> 6) & 0x3f) + _PADCHAR)
      break
  }

  return x.join('')
}

/**
 * base64 解密
 *
 * @param {*} s
 * @returns
 */
export function decode(s) {
  let pads = 0
  let i
  let b10
  let imax = s.length
  let x = []

  s = String(s)

  if (imax === 0) {
    return s
  }

  if (imax % 4 !== 0) {
    return 'Cannot decode base64'
  }

  if (s.charAt(imax - 1) === _PADCHAR) {
    pads = 1

    if (s.charAt(imax - 2) === _PADCHAR) {
      pads = 2
    }

    // either way, we want to ignore this last block
    imax -= 4
  }

  for (i = 0; i < imax; i += 4) {
    b10 = (_getbyte64(s, i) << 18) | (_getbyte64(s, i + 1) << 12) | (_getbyte64(s, i + 2) << 6) | _getbyte64(s, i + 3)
    x.push(String.fromCharCode(b10 >> 16, (b10 >> 8) & 0xff, b10 & 0xff))
  }

  switch (pads) {
    case 1:
      b10 = (_getbyte64(s, i) << 18) | (_getbyte64(s, i + 1) << 12) | (_getbyte64(s, i + 2) << 6)
      x.push(String.fromCharCode(b10 >> 16, (b10 >> 8) & 0xff))
      break

    case 2:
      b10 = (_getbyte64(s, i) << 18) | (_getbyte64(s, i + 1) << 12)
      x.push(String.fromCharCode(b10 >> 16))
      break
  }

  return x.join('')
}

export default {
  queryUrlParam,
  setUri,
  toTree,
  formatDate,
  formatTime,
  formatNum,
  alert,
  confirm,
  notify,
  downloadFile,
  md5,
  encode,
  decode
}
