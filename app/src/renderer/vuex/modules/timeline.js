import * as types from '../mutation-types'
import urlRegex from 'url-regex'
import * as xssFilters from 'xss-filters'
const state = {
  timeline: {},
  selectedTweet: {},
  idStrTweetsIndex: {}
}

const getters = {
  tweets: (state, getters, rootState) => {
    console.dir(rootState.route.params)
    return state.timeline[rootState.route.params.id_str].slice(0, 50).sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
  },
  mentions: (state, getters, rootState) => state.timeline[rootState.route.params.id_str].filter(val => val.in_reply_to_screen_name === val.who),
  selectedTweet: (state, getters, rootState) => (idStr) => {
    return state.selectedTweet[idStr]
  },
  idStrTweetsIndex: (state, getters, rootState) => state.idStrTweetsIndex[rootState.route.params.id_str]
}

const mutations = {
  [types.PUSH_TIMELINE] (state, { tweet, who }) {
    state.timeline[who].unshift(tweet)
    state.timeline = {...state.timeline}
    if (state.selectedTweet[who] !== undefined) {
      state.selectedTweet[who]++
    }
    state.idStrTweetsIndex[who][tweet['id_str']] = state.timeline[who].length
  },
  [types.CLICKED_TWEET] (state, { num, route }) {
    state.selectedTweet[route.params.id_str] = num
    state.selectedTweet = {...state.selectedTweet}
  },
  [types.DELETE_TWEET] (state, { idStr, who }) {
    console.log('dispatched!')
    console.log(who)
    const index = state.idStrTweetsIndex[who][idStr['idStr']]
    if (index === undefined) {
      return
    }
    state.timeline[who].splice(state.timeline[who].length - index, 1)
    state.timelime = {...state.timeline}
  },
  [types.INIT_ACCOUNT] (state, idStr) {
    state.timeline[idStr] = []
    state.selectedTweet[idStr] = undefined
    state.idStrTweetsIndex[idStr] = {}
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
    let tweet = args.tweet
    tweet['who'] = args['screenName']
    if (tweet['retweeted_status']) {
      tweet['retweeted_status'] = expandEntities(tweet['retweeted_status'])
      tweet['media_urls'] = tweet['retweeted_status']['media_urls']
    } else {
      tweet = expandEntities(tweet)
    }
    tweet['retweeted_status'] = tweet['retweeted_status'] || { user: {} }
    console.dir(tweet)
    commit(types.PUSH_TIMELINE, { tweet: tweet, who: args.who })
  },
  [types.DELETE_TWEET] ({ commit }, args) {
    console.log('commited!')
    commit(types.DELETE_TWEET, { idStr: args.idStr, who: args.who })
  },
  [types.INIT_ACCOUNT] ({ commit }, idStr) {
    commit(types.INIT_ACCOUNT, idStr)
  },
  [types.CLICKED_TWEET] ({ commit }, args) {
    commit(types.CLICKED_TWEET, { num: args.index, route: args.route })
  }
}

export default {
  state,
  mutations,
  actions,
  getters
}
