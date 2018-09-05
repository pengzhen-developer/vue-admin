/*
 * @Author: PengZhen 
 * @Description: 缓存 
 * @Date: 2018-07-06 11:23:58 
 * @Last Modified by: PengZhen
 * @Last Modified time: 2018-09-05 11:25:44
 */

import { encode, decode } from './util'

/**
 * set cache
 *
 * @export
 * @param {string} [key='']
 * @param {*} value
 */
export function set(key = '', value) {
  const encodeKey = encode(key)

  if (!kindo.valid.isEmpty(value)) {
    const encodeValue = encode(window.unescape(window.encodeURIComponent(JSON.stringify(value))))

    window.sessionStorage.setItem(encodeKey, encodeValue)
  }
}

/**
 * get cache
 *
 * @export
 * @param {string} [key='']
 * @returns
 */
export function get(key = '') {
  const encodeKey = encode(key)

  const value = window.sessionStorage.getItem(encodeKey)

  if (!kindo.valid.isEmpty(value)) {
    return JSON.parse(window.decodeURIComponent(window.escape(decode(value))))
  }
}

/**
 * remove cache
 *
 * @export
 * @param {string} [key='']
 */
export function remove(key = '') {
  window.sessionStorage.removeItem(decode(key))
}

/**
 * clear cache
 *
 * @export
 */
export function clear() {
  window.sessionStorage.clear()
}

export default {
  set,
  get,
  remove,
  clear
}
