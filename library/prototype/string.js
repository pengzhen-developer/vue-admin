/*
 * @Author: PengZhen 
 * @Description: 扩展 string 原型常用方法  
 * @Date: 2018-07-06 11:24:37 
 * @Last Modified by:   PengZhen 
 * @Last Modified time: 2018-07-06 11:24:37 
 */

/* eslint-disable no-extend-native */

/**
 * uri 格式化 RESTful 风格
 * e.g.  '192.168.0.1/{id}'.restfulFormat({ id: 'helloworld' }) => 192.168.0.1/helloworld
 * @param {*} replacements
 * @returns
 */
String.prototype.restfulFormat = function(replacements) {
  var format = function(str, replacements) {
    replacements = typeof replacements === 'object' ? replacements : Array.prototype.slice.call(arguments, 1)
    return str.replace(/\{\{|\}\}|\{(\w+)\}/g, function(m, n) {
      if (m === '{{') {
        return '{'
      }
      if (m === '}}') {
        return '}'
      }
      return replacements[n]
    })
  }
  replacements = typeof replacements === 'object' ? replacements : Array.prototype.slice.call(arguments, 0)
  return format(this, replacements)
}

/**
 * 字符串格式化
 * e.g.  '{0} world {1}'.format('hello','!!!!') => hello world !!!!
 * @returns
 */
String.prototype.format = function() {
  let str = this
  for (let i = 0; i < arguments.length; i++) {
    let exp = new RegExp('\\{' + i + '\\}', 'gm')

    str = str.replace(exp, arguments[i])
  }
  return str
}

/**
 * 获取字节长度
 * e.g. '你好,world'.byteLength() => 10
 * @returns
 */
String.prototype.byteLength = function() {
  let byteLength = 0
  let l = this.length
  if (l) {
    for (let i = 0; i < l; i++) {
      if (this.charCodeAt(i) > 255) {
        byteLength += 2
      } else {
        byteLength++
      }
    }
    return byteLength
  } else {
    return 0
  }
}

/**
 * 字符串格式日期转 Date
 * e.g. '2016-01-01 02:00'.toDate().formatDate() =>  "2016-01-01"
 * @returns
 */
String.prototype.toDate = function() {
  if (this instanceof Date) {
    return this
  }

  var date = this.toString()

  var a = date.split(' ')
  var b = a[0].split('-') || a[0].split('/')
  var c = a.length > 1 ? a[1].split(':') : ''

  return new Date(Date.UTC(b[0] || 0, (b[1] || 1) - 1, b[2] || 1, (c[0] || 8) - 8, c[1] || 0, c[2] || 0))
}

/**
 * 字符串格式转化为制定格式的数字
 * e.g. '211'.toFixed(2)转化为211.00
 * @param {*} parse
 * @returns
 */
String.prototype.toFixed = function(parse) {
  if (parseFloat(this)) {
    return parseFloat(this).toFixed(parse)
  } else {
    let start = '0.'
    let qq = 0
    while (qq < parse) {
      start += '0'
      qq++
    }
    return start
  }
}

/**
 * 格式化日期对象
 * e.g. const date = '2012-01-10'
 *      date.formatDate('yyyy') => 2012
 *
 * @param {*} format
 * @returns
 */
String.prototype.formatDate = function(format) {
  let date = this
  // 兼容 element-table 的 formatter
  if (arguments.length === 3 && arguments[0][arguments[1].property] === arguments[2]) {
    date = arguments[2]
  }
  if (kindo.valid.isEmpty(date)) throw Error('日期不能为空')
  if (typeof format !== 'string') format = 'yyyy-MM-dd'

  if (date instanceof Date) {
    return date.formatDate(format)
  } else {
    return date.toDate().formatDate(format)
  }
}
