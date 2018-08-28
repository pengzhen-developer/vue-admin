import { layout as LAYOUT } from '@/type'

// initial state
const state = {
  [LAYOUT.COLLAPSE]: false
}

// actions
const actions = {
  [LAYOUT.COLLAPSE]({ commit }, argument) {
    commit(LAYOUT.COLLAPSE, argument)
  }
}

// mutations
const mutations = {
  [LAYOUT.COLLAPSE](state) {
    state[LAYOUT.COLLAPSE] = !state[LAYOUT.COLLAPSE]
  }
}

export default {
  namespaced: true,

  state,
  actions,
  mutations
}
