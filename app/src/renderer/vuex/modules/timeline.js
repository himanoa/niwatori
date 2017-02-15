import * as types from '../mutation-types'

const state = {
  timeline: [],
  selectedTweet: null
}

const getters = {
  tweets: state => state.timeline,
  selectedTweet: state => state.selectedTweet
}

const mutations = {
  [types.PUSH_TIMELINE] (state, { tweet }) {
    state.timeline.unshift(tweet)
  },
  [types.CLICKED_TWEET] (state, { num }) {
    state.selectedTweet = num
  }
}
const actions = {
  add ({ commit }, tweet) {
    commit(types.PUSH_TIMELINE, { tweet: tweet })
  }
}

export default {
  state,
  mutations,
  actions,
  getters
}
