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
function expandEntities (tweet) {
  const autolinker = new Autolinker({ mention: 'twitter', hashtag: 'twitter' })
  for (const entity of tweet.entities.urls) {
    tweet['text'] = tweet['text'].replace(entity.url, entity.expanded_url)
  }
  if (tweet.entities.media) {
    tweet['media_urls'] = tweet.entities.media.map(val => {
      return val.media_url_https
    })
  }
  tweet['text'] = autolinker.link(escape(tweet['text']))
  return tweet
}
const actions = {
  [types.PUSH_TIMELINE] ({ state, commit }, tweet) {
    if (tweet['retweeted_status']) {
      tweet = expandEntities(tweet['retweeted_status'])
    } else {
      tweet = expandEntities(tweet)
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
