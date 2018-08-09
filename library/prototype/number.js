/*
 * @Author: PengZhen 
 * @Description: 扩展 number 原型常用方法 
 * @Date: 2018-07-06 11:24:25 
 * @Last Modified by:   PengZhen 
 * @Last Modified time: 2018-07-06 11:24:25 
 */

/* eslint-disable no-extend-native */

/**
 * 毫秒数转日期
 * @formatStr: 格式化参数, 默认yyyy-MM-dd HH:mm
 * ex:         1483943989639.toDate()  =>  Mon Jan 09 2017 14:39:49 GMT+0800 (中国标准时间)
 */

/**
 * 毫秒数转日期
 *
 * @returns
 */
Number.prototype.toDate = function() {
  return new Date(this)
}

/**
 * 数值格式化
 * ex: const number = 10000
 *     number.formatNum(10000) => "10, 000"
 *     number.formatNum(10000, 2) => "10,000.00"
 *     number.formatNum(10000, 2, -) => "10-000.00"
 * @param {number} [precision=2] 精确小数位数
 * @param {*} separator 分隔符
 * @returns
 */
Number.prototype.formatNum = function(precision = 2, separator) {
  let num = this
  if (!isNaN(parseFloat(num)) && isFinite(num)) {
    let parts
    num = Number(num)
    num = (typeof precision !== 'undefined' ? num.toFixed(precision) : num).toString()
    parts = num.split('.')
    parts[0] = parts[0].toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1' + (separator || ', '))
    return parts.join('.')
  } else {
    return '-'
  }
}
