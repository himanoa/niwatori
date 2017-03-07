import * as types from '../mutation-types'

const state = {
  idToName: {},
  lists: {}
}

const getters = {
  idToName: state => state.idToName,
  lists: state => (accountId) => {
    console.dir(accountId)
    console.dir(state.lists)
    console.dir(state.lists[accountId])
    return state.lists[accountId]
  }
}

const mutations = {
  [types.PUSH_LIST] (state, { list, accountId }) {
    if (state.lists[accountId] === undefined) {
      state.lists[accountId] = []
    }
    state.idToName[list.id_str] = list.name
    state.lists[accountId].push(list)
    state.lists = {...state.lists}
  }
}

const actions = {
  async [types.FETCH_LIST] ({ commit }, {account}) {
    try {
      const lists = await account.getLists()
      for (let list of lists) {
        commit(types.PUSH_LIST, {list: list, accountId: account.profile.id_str})
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
