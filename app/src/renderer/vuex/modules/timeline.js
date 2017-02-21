import * as types from '../mutation-types'
import Autolinker from 'autolinker'
const state = {
  timeline: [],
  selectedTweet: null
}

const getters = {
  tweets: state => state.timeline.slice().reverse().slice(0, 100),
  selectedTweet: state => state.selectedTweet
}

const mutations = {
  [types.PUSH_TIMELINE] (state, { tweet }) {
    if (state.selectedTweet !== null) {
      state.selectedTweet++
    }
    state.timeline.push(tweet)
  },
  [types.CLICKED_TWEET] (state, { num }) {
    state.selectedTweet = num
  },
  [types.INCREMENTS_TIMELINE_CURRENT_INDEX] (state) {
    if (state.selectedTweet !== null) {
      state.selectedTweet++
    }
  },
  [types.RETWEET] (state, {index}) {
    if (state.timeline[index + 1]['retweeted_status']) {
      state.timeline[index + 1]['retweeted_status']['retweeted'] = true
    } else {
      state.timeline[index + 1]['retweeted'] = true
    }
  },
  [types.FAVORITE] (state, {index}) {
    if (state.timeline[index + 1]['retweeted_status']) {
      state.timeline[index + 1]['retweeted_status']['favorited'] = true
    } else {
      state.timeline[index + 1]['favorited'] = true
    }
  }
}
const actions = {
  [types.PUSH_TIMELINE] ({ commit, state }, tweet) {
    const autolinker = new Autolinker({ mention: 'twitter', hashtag: 'twitter' })
    if (tweet['retweeted_status']) {
      tweet['retweeted_status']['text'] = autolinker.link(tweet['retweeted_status']['text'])
    } else {
      tweet['text'] = autolinker.link(tweet['text'])
    }
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
