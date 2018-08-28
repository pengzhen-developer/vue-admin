import { user as USER } from '@/type'

// initial state
const state = {
  [USER.USER_INFO]: {}
}

// actions
const actions = {
  SET({ commit }, argument) {
    commit('SET', argument)
  },

  REMOVE({ commit }, argument) {
    commit('REMOVE', argument)
  }
}

// mutations
const mutations = {
  SET(state, argument) {
    state[USER.USER_INFO] = argument
  },

  REMOVE(state) {
    state[USER.USER_INFO] = {}
  }
}

export default {
  namespaced: true,

  state,
  actions,
  mutations
}
