import KindoTable from './src/kindoTable'
import kindoTableColumn from './src/kindoTableColumn'

KindoTable.install = function(Vue) {
  Vue.component(KindoTable.name, KindoTable)
  Vue.component(kindoTableColumn.name, kindoTableColumn)
}

export default KindoTable
