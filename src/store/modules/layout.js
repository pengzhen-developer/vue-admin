import router from './../../router/index'

// initial state
const state = {
  collapse: false,

  // tab 相关
  tabList: [],
  tabSelect: ''
}

// actions
const actions = {
  collapse({ commit }, argument) {
    commit('collapse', argument)
  },

  selectTab({ commit }, argument) {
    commit('selectTab', argument)
  },
  pushTab({ commit }, argument) {
    commit('pushTab', argument)
  },
  removeTab({ commit }, argument) {
    commit('removeTab', argument)

    if (state.tabList.length > 0) {
      const prevTab = state.tabList[state.tabList.length - 1]

      commit('selectTab', prevTab.index)
    } else {
      router.push('/layout')
    }
  },
  clearTab({ commit }, argument) {
    commit('clearTab', argument)
  }
}

// mutations
const mutations = {
  collapse(state) {
    state.collapse = !state.collapse
  },

  selectTab(state, argument) {
    state.tabSelect = argument

    router.push(`/layout/${state.tabSelect}`)
  },
  pushTab(state, argument) {
    if (!state.tabList.find(item => item.index === argument.index)) {
      state.tabList.push(argument)
    }
  },
  removeTab(state, argument) {
    state.tabList.splice(state.tabList.findIndex(item => item.index === argument), 1)
  },
  clearTab() {}
}

export default {
  namespaced: true,

  state,
  actions,
  mutations
}
