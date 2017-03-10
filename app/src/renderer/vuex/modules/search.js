import * as types from '../mutation-types'

const state = {
  searchs: {},
  isVisiableDialog: false,
  accountIdStr: ''
}

const mutations = {
  [types.ADD_SEARCH] (state, {name, query}) {
    state.searchs[state.accountIdStr] = state.searchs[state.accountIdStr] || []
    state.searchs[state.accountIdStr].push({name: name, query: query})
    state.searchs = {...state.searchs}
  },
  [types.CHANGE_VISIABLE_DIALOG] (state, { accountIdStr }) {
    state.accountIdStr = accountIdStr
    state.isVisiableDialog = !state.isVisiableDialog
  }
}

const getters = {
  searchs: state => id => {
    console.log('ア')
    console.dir(state.searchs)
    return state.searchs[id]
  },
  isVisiableDialog: state => state.isVisiableDialog
}
const actions = {
  [types.ADD_SEARCH] ({ commit }, args) {
    commit(types.ADD_SEARCH, { name: args['name'], query: args['query'] })
  },
  [types.CHANGE_VISIABLE_DIALOG] ({ commit }, accountIdStr) {
    commit(types.CHANGE_VISIABLE_DIALOG, { accountIdStr: accountIdStr })
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
