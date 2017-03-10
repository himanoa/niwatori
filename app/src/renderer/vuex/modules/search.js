import * as types from '../mutation-types'

const state = {
  searchs: [],
  isVisiableDialog: false
}

const mutations = {
  [types.ADD_SEARCH] (state, {name, query}) {
    state.searchs.push({name: name, query: query})
  },
  [types.CHANGE_VISIABLE_DIALOG] (state) {
    console.log(state.isVisiableDialog)
    state.isVisiableDialog = !state.isVisiableDialog
  }
}

const getters = {
  searchs: state => state.searchs,
  isVisiableDialog: state => state.isVisiableDialog
}
const actions = {
  [types.ADD_SEARCH] ({ commit }, args) {
    commit(types.ADD_SEARCH, { name: args['name'], query: args['query'] })
  },
  [types.CHANGE_VISIABLE_DIALOG] ({ commit }) {
    commit(types.CHANGE_VISIABLE_DIALOG)
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
