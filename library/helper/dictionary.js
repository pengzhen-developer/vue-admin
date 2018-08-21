/*
 * @Author: PengZhen 
 * @Description: 字典帮助 
 * @Date: 2018-07-09 10:05:18 
 * @Last Modified by: PengZhen
 * @Last Modified time: 2018-07-09 11:31:14
 */

let dictionary = {
  getDictionary: function(catalog) {
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
  },

  getLabel: function(source, value) {
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
  },

  getValue: function(source, label) {
    const item = source.filter(item => item.label === label)
    if (item.length > 0) {
      return item[0].value
    }

    return ''
  }
}

dictionary.get = dictionary.getDictionary

export default dictionary
