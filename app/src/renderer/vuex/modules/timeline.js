import * as types from '../mutation-types'
import urlRegex from 'url-regex'
import * as xssFilters from 'xss-filters'
const state = {
  timeline: [],
  selectedTweet: null,
  idStrTweetsIndex: {}
}

const getters = {
  tweets: state => state.timeline.slice(0, 50).sort((a, b) => new Date(b.created_at) - new Date(a.created_at)),
  mentions: state => state.timeline.filter(val => val.in_reply_to_screen_name === val.who),
  selectedTweet: state => state.selectedTweet,
  idStrTweetsIndex: state => state.idStrTweetsIndex
}

const mutations = {
  [types.PUSH_TIMELINE] (state, { tweet }) {
    if (state.selectedTweet !== null) {
      state.selectedTweet++
    }
    state.timeline.unshift(tweet)
    state.idStrTweetsIndex[tweet['id_str']] = state.timeline.length
  },
  [types.CLICKED_TWEET] (state, { num }) {
    state.selectedTweet = num
  },
  [types.DELETE_TWEET] (state, { idStr }) {
    console.log('dispatched!')
    console.log(state.idStrTweetsIndex[idStr['idStr']])
    const index = state.idStrTweetsIndex[idStr['idStr']]
    if (index === undefined) {
      return
    }
    state.timeline.splice(state.timeline.length - index, 1)
  }
}
function expandEntities (tweet) {
  tweet['media_urls'] = []
  for (let entity of tweet.entities.urls) {
    tweet['text'] = tweet['text'].replace(entity.url, entity.expanded_url)
  }
  if (tweet.entities.media) {
    tweet['media_urls'] = tweet.entities.media.map(val => {
      return val.media_url_https
    })
  }
  tweet['text'] = xssFilters.inHTMLData(tweet['text'])
     .replace(urlRegex(), "<a href='$&' target='_blank'>$&</a>")
     .replace(/@([a-zA-Z0-9_]{1,15})/, "<a href='https://twitter.com/$1' target='_blank'>$&</a>")
     .replace(/#([^!"$#%&'()*+\-.,/:;<=>?@[\\\]^`{|}~]+)/, "<a href='https://twitter.com/hashtag/$1' target='_blank'>$&</a>")
  return tweet
}
const actions = {
  [types.PUSH_TIMELINE] ({ state, commit }, args) {
    console.log(args['screenName'])
    let tweet = args.tweet
    tweet['who'] = args['screenName']
    if (tweet['retweeted_status']) {
      tweet['retweeted_status'] = expandEntities(tweet['retweeted_status'])
      tweet['media_urls'] = tweet['retweeted_status']['media_urls']
    } else {
      tweet = expandEntities(tweet)
    }
    tweet['retweeted_status'] = tweet['retweeted_status'] || { user: {} }
    commit(types.PUSH_TIMELINE, { tweet: tweet })
  },
  [types.CLICKED_TWEET] ({ commit }, num) {
    commit(types.CLICKED_TWEET, { num })
  },
  [types.DELETE_TWEET] ({ commit }, idStr) {
    console.log('commited!')
    commit(types.DELETE_TWEET, { idStr: idStr })
  }
}

export default {
  state,
  mutations,
  actions,
  getters
}
