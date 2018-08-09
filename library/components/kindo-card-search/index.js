import kindoCardSearch from './src/kindoCardSearch'

kindoCardSearch.install = function(Vue) {
  Vue.component(kindoCardSearch.name, kindoCardSearch)
}

export default kindoCardSearch
