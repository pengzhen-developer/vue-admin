// initial state
const state = {
  userInfo: {}
}

// actions
const actions = {
  setUserInfo({ commit }, argument) {
    commit('setUserInfo', argument)
  },

  remove({ commit }, argument) {
    commit('remove', argument)
  }
}

// mutations
const mutations = {
  setUserInfo(state, argument) {
    state.userInfo = argument
  },

  remove(state) {
    state.userInfo = {}
  }
}

export default {
  namespaced: true,

  state,
  actions,
  mutations
}
