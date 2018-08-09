/*
 * @Author: PengZhen 
 * @Description: 字典帮助类
 * @Date: 2018-07-09 10:05:18 
 * @Last Modified by: PengZhen
 * @Last Modified time: 2018-07-30 15:28:21
 */

/**
 * 获取数据字典
 *
 * @export
 * @param {*} catalog
 * @returns
 */
export function getDictionary(catalog) {
  if (!catalog) {
    console.error('catalog 为空, 无法获取字典值', '提示', 'warning')
  }

  return kindo.$bus.$http
    .get(kindo.config.api.upms + 'nologin/dict/get', {
      params: {
        catalog
      }
    })
    .then(res => res.data)
}

/**
 * 获取字典 label
 *
 * @export
 * @param {*} [source=[]]
 * @param {string} [value='']
 * @returns
 */
export function getLabel(source = [], value = '') {
  if (value === null) {
    return '-'
  } else if (value === '') {
    return ''
  }
  const item = source.filter(item => item.value === value)
  if (item.length > 0) {
    return item[0].label
  }
  if (value === '0' || value === 0) {
    return ''
  }
}

/**
 * 获取字典 value
 *
 * @export
 * @param {*} [source=[]]
 * @param {string} [label='']
 * @returns
 */
export function getValue(source = [], label = '') {
  const item = source.filter(item => item.label === label)
  if (item.length > 0) {
    return item[0].value
  }

  return ''
}

const get = getDictionary
const label = getLabel
const value = getValue

export default {
  getDictionary,
  get,
  getLabel,
  label,
  getValue,
  value
}
