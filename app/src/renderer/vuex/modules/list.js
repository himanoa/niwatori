import * as types from '../mutation-types'

const state = {
  idToName: {}
}

const getters = {
  idToName: state => state.idToName
}

const mutations = {
  [types.PUSH_LIST] (state, { list }) {
    state.idToName[list.id_str] = list.name
  }
}

const actions = {
  async [types.PUSH_LIST] ({ commit }, account) {
    try {
      for (let list of await account.getLists()) {
        commit(types.PUSH_LIST, {list: list})
      }
    } catch (e) {
      console.error(e, e.stack)
    }
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
