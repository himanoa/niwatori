import { expandEntities } from '../../utils/expandEntities'
import * as types from '../mutation-types'
const state = {
  timeline: {},
  selectedTweet: {},
  idStrTweetsIndex: {}
}

const getters = {
  tweets: (state, getters, rootState) => {
    return state.timeline[rootState.route.params.accountIdStr].slice(0, 50).sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
  },
  mentions: (state, getters, rootState) => state.timeline[rootState.route.params.accountIdStr].filter(val => val.text.match(new RegExp(`@${val.who}`))),
  selectedTweet: (state, getters, rootState) => (idStr) => {
    return state.selectedTweet[idStr]
  },
  idStrTweetsIndex: (state, getters, rootState) => state.idStrTweetsIndex[rootState.route.params.accountIdStr]
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
    state.selectedTweet[route.params.accountIdStr] = num
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
