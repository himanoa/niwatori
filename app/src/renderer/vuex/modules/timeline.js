import * as types from '../mutation-types'
import escape from 'escape-html'
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
  [types.PUSH_TIMELINE] ({ dispatch, state, commit }, tweet) {
    const autolinker = new Autolinker({ mention: 'twitter', hashtag: 'twitter' })
    if (tweet['retweeted_status']) {
      for (const entity of tweet.retweeted_status.entities.urls) {
        tweet['retweeted_status']['text'] = tweet['retweeted_status']['text'].replace(entity.url, entity.expanded_url)
      }
      tweet['retweeted_status']['text'] = autolinker.link(escape(tweet['retweeted_status']['text']))
    } else {
      for (const entity of tweet.entities.urls) {
        tweet['text'] = tweet['text'].replace(entity.url, entity.expanded_url)
      }
      tweet['text'] = autolinker.link(escape(tweet['text']))
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
