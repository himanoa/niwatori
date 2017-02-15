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
    if (state.selectedTweet !== null) {
      state.selectedTweet++
    }
    state.timeline.unshift(tweet)
    if (state.timeline.length > 100) {
      state.timeline.pop()
    }
  },
  [types.CLICKED_TWEET] (state, { num }) {
    state.selectedTweet = num
  },
  [types.INCREMENTS_TIMELINE_CURRENT_INDEX] (state) {
    if (state.selectedTweet !== null) {
      state.selectedTweet++
    }
  }
}
const actions = {
  [types.PUSH_TIMELINE] ({ commit, state }, tweet) {
    if (state.selectedTweet !== null) {
      state.dispatch(types.INCREMENTS_TIMELINE_CURRENT_INDEX)
        .then(() => {
          commit(types.PUSH_TIMELINE, { tweet: tweet })
        }).catch(err => {
          console.error(err, err.stack)
        })
    }
    commit(types.PUSH_TIMELINE, { tweet: tweet })
  },
  [types.CLICKED_TWEET] ({ commit }, num) {
    commit(types.CLICKED_TWEET, { num })
  }
}

export default {
  state,
  mutations,
  actions,
  getters
}
