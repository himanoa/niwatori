import * as types from '../mutation-types'

const state = {
  input: ''
}

const getters = {
  input: state => state.input,
  input_length: state => 140 - state.input.length
}

const mutations = {
  [types.UPDATE_STATUS] (state) {
    state.input = ''
  },
  [types.UPDATE_INPUT] (state, { message }) {
    state.input = message
  }
}

const actions = {
  [types.UPDATE_STATUS] ({commit}, args) {
    args['account'].updateStatus({status: args['status']}).then(() => {
      commit(types.UPDATE_STATUS)
    }).catch(err => {
      console.error(err, err.stack)
    })
  },
  [types.UPDATE_INPUT] ({commit}, event) {
    commit(types.UPDATE_INPUT, {message: event})
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}