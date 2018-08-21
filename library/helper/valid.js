/*
 * @Author: PengZhen 
 * @Description: 验证 
 * @Date: 2018-07-06 11:25:09 
 * @Last Modified by:   PengZhen 
 * @Last Modified time: 2018-07-06 11:25:09 
 */

// 声明可用 pattern
export const pattern = {
  // url 验证
  url: /^((https|http|ftp|rtsp|mms)?:\/\/)[^\s]+/,

  // number 验证, 包括正负整数
  number: /^[-+]?[0-9]*$/,

  // numerical 验证, 包括整数、浮点数、正、负数
  numerical: /^[-+]?[0-9]+(\.[0-9]+)?$/,

  // numerical 验证, 包括整数、浮点数、正、负数
  pNumerical: /^[0-9]+(\.[0-9]+)?$/,

  // integer 验证, 验证整数
  integer: /^[0-9]*$/,

  // pInteger 验证, 验证正整数
  pInteger: /^\d+$/,

  // nInterger 验证, 验证负整数及0
  nInterger: /^((-\d+)|(0+))$/,

  // mobile 验证, 验证手机号码
  mobile: /^1[34578]\d{9}$/,

  // telephone 验证,验证电话号码
  telephone: /^(\(\d{3,4}\)|\d{3,4}-|\s)?\d{7,14}$/,

  // idCard 验证,验证身份证号
  idCard: /^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/,

  // email 验证,验证邮箱
  email: /\w[-\w.+]*@([A-Za-z0-9][-A-Za-z0-9]+\.)+[A-Za-z]{2,14}$/,

  // 百分数验证，数字在1-99之间，保留一位小数
  percente: /^(((\d|[1-9]\d)(\.\d{1,2})?)|100|100.0|100.00)$/
}

/**
 * 非空验证 正则验证
 * ex: kindo.valid.isEmpty('http://192.168.0.254/1.json') => false
 * @export
 * @param {*} param
 * @returns
 */
export function isEmpty(param) {
  return param === null || param === undefined || param === ''
}

/**
 * 长度 正则验证
 * ex: kindo.valid.length('http://192.168.0.254/1.json', 30) => true
 * @export
 * @param {*} param
 * @param {*} length
 * @returns
 */
export function length(param, length) {
  return param.toString().length() <= length
}

/**
 * 长度 正则验证（1个双字节=3个单字节）
 * ex: kindo.valid.lengthForByte('你好1',4) => false
 * @export
 * @param {*} param
 * @param {*} length
 * @returns
 */
export function lengthForByte(param, length) {
  // 1个中文字符占3个字节，其他字符占1个字节
  /* eslint-disable no-control-regex */
  let len = param.toString().replace(/[^\x00-\xff]/g, 'aaa').length

  if (len > length) {
    return false
  } else {
    return true
  }
}

/**
 * 区间 正则验证
 * ex: kindo.valid.range('36.5', 1, 100) => false
 * @export
 * @param {*} param
 * @param {*} iMin
 * @param {*} iMax
 * @returns
 */
export function range(param, iMin, iMax) {
  let re = /(\d+)/g

  while (re.exec(param)) {
    let int = parseInt(RegExp.$1)
    if (int < iMin || int > iMax) {
      return false
    }

    return true
  }
}

/**
 * url 正则验证
 * ex: kindo.valid.url('http://192.168.0.254/1.json') => true
 * @export
 * @param {*} param
 * @returns
 */
export function url(param) {
  return pattern.url.test(param)
}

/**
 * 数字 正则验证（正负整数）
 * ex: kindo.valid.number(123) => true
 * @export
 * @param {*} param
 * @returns
 */
export function number(param) {
  return pattern.number.test(param)
}

/**
 * 数值 正则验证（包括整数、浮点数、正、负数）
 * ex: kindo.valid.number(123) => true
 * @export
 * @param {*} param
 * @returns
 */
export function numerical(param) {
  return pattern.numerical.test(param)
}

/**
 * 数值 正则验证（包括整数、浮点数、正数）
 * ex: kindo.valid.number(123) => true
 * @export
 * @param {*} param
 * @returns
 */
export function pNumerical(param) {
  return pattern.pNumerical.test(param)
}

/**
 * 整数 正则验证
 * ex: kindo.valid.integer(-123) => true
 * @export
 * @param {*} param
 * @returns
 */
export function interger(param) {
  return pattern.integer.test(param)
}

/**
 * 正整数及0 正则验证
 * ex: kindo.valid.pInterger(123) => true
 * @export
 * @param {*} param
 * @returns
 */
export function pInterger(param) {
  return pattern.pInteger.test(param)
}

/**
 * 负整数及0 正则验证
 * ex: kindo.valid.nInterger(-123) => true
 * @export
 * @param {*} param
 * @returns
 */
export function nInterger(param) {
  return pattern.nInterger.test(param)
}

/**
 * 手机号码 正则验证
 * ex: kindo.valid.mobile('13011111111') => true
 * @export
 * @param {*} param
 * @returns
 */
export function mobile(param) {
  return pattern.mobile.test(param)
}

/**
 * 电话号码 正则验证
 * ex: kindo.valid.mobile('13011111111') => true
 * @export
 * @param {*} param
 * @returns
 */
export function telephone(param) {
  return pattern.telephone.test(param)
}

/**
 * 身份证 正则验证
 * ex: kindo.valid.idCard('400210188801011010') => true
 * @export
 * @param {*} param
 * @returns
 */
export function idCard(param) {
  return pattern.idCard.test(param)
}

/**
 * 邮箱 正则验证
 * ex: kindo.valid.email('aa@qq.com') => true
 * @export
 * @param {*} param
 * @returns
 */
export function email(param) {
  return pattern.email.test(param)
}

export default {
  pattern,
  isEmpty,
  length,
  lengthForByte,
  range,
  url,
  number,
  numerical,
  pNumerical,
  interger,
  pInterger,
  nInterger,
  mobile,
  telephone,
  idCard,
  email
}
