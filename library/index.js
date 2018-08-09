/*
 * @Author: PengZhen 
 * @Description: 插件入口 
 * @Date: 2018-07-05 16:07:33 
 * @Last Modified by: PengZhen
 * @Last Modified time: 2018-07-30 15:37:23
 */

// 帮助类
// 原型扩展、缓存、验证、常用方法集合
import './prototype/date'
import './prototype/number'
import './prototype/string'

import cache from './helper/cache'
import dictionary from './helper/dictionary'
import valid from './helper/valid'
import util from './helper/util'

// directive
import drag from './directive/drag'
import focus from './directive/focus'

// UI 库
import KindoCard from './components/kindo-card'
import kindoCardSearch from './components/kindo-card-search'
import KindoChart from './components/kindo-chart'
import KindoRichDatepicker from './components/kindo-rich-datepicker'
import KindoSidePanel from './components/kindo-side-panel'
import KindoTable from './components/kindo-table'
import KindoIconSelect from './components/kindo-icon-select'

// 暴露全局可访问变量
global.kindo = { cache, dictionary, valid, util }

const install = function(Vue) {
  const directive = [drag, focus]
  const components = [KindoCard, kindoCardSearch, KindoChart, KindoRichDatepicker, KindoSidePanel, KindoTable, KindoIconSelect]

  // 注册实例属性
  Vue.prototype.kindo = kindo

  // 注册 directive
  directive.map(directive => {
    Vue.directive(directive.name, directive)
  })

  // 注册 component
  components.map(component => {
    Vue.use(component)
  })
}

export default { install }
