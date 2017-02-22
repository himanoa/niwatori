import * as types from '../mutation-types'
import urlRegex from 'url-regex'
import escape from 'escape-html'
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
  tweet['media_urls'] = []
  for (const entity of tweet.entities.urls) {
    tweet['text'] = tweet['text'].replace(entity.url, entity.expanded_url)
  }
  if (tweet.entities.media) {
    tweet['media_urls'] = tweet.entities.media.map(val => {
      return val.media_url_https
    })
  }
  tweet['text'] = escape(tweet['text'])
    .replace(urlRegex(), "<a href='$&' target='_blank'>$&</a>")
    .replace(/@([a-zA-Z0-9_]{1,15})/, "<a href='https://twitter.com/$1' target='_blank'>$&</a>")
    .replace(/#([^!"$#%&'()*+\-.,/:;<=>?@[\\\]^`{|}~]+)/, "<a href='https://twitter.com/hashtag/$1' target='_blank'>$&</a>")
  console.dir(tweet['media_urls'])
  return tweet
}
const actions = {
  [types.PUSH_TIMELINE] ({ state, commit }, tweet) {
    if (tweet['retweeted_status']) {
      tweet['retweeted_status'] = expandEntities(tweet['retweeted_status'])
      tweet['media_urls'] = tweet['retweeted_status']['media_urls']
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
