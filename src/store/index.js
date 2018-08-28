import Vue from 'vue'
import Vuex from 'vuex'
import USER from './modules/user'
import LAYOUT from './modules/layout'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    USER,
    LAYOUT
  }
})
