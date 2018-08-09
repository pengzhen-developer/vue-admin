import kindoChart from './src/kindoChart'

kindoChart.install = function(Vue) {
  Vue.component(kindoChart.name, kindoChart)
}

export default kindoChart
