import * as types from '../mutation-types'

const state = {
  timeline: []
}

const getters = {
  tweets: state => state.timeline
}

const mutations = {
  [types.PUSH_TIMELINE] (state, { tweet }) {
    state.timeline.push(tweet)
  }
}
const actions = {
  add ({ dispatch }, tweet) {
    dispatch(types.PUSH_TIMELINE, { tweet: tweet })
  }
}

export default {
  state,
  mutations,
  actions,
  getters
}
