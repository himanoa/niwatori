import TwitterApi from '../../api/twitter'
import * as types from '../mutation-types'

const state = {
  clients: []
}

const getters = {
  accounts: state => state.clients,
  current: state => state.clients[0]
}

const mutations = {
  [types.ADD_ACCOUNT] (state, { client }) {
    state.clients.push(client)
  }
}

const actions = {
  [types.ADD_ACCOUNT] (state, {account}) {
    const client = new TwitterApi.TwitterApi({
      consumerKey: account.consumerKey,
      consumerSecret: account.consumerSecret,
      accessToken: account.accessToken,
      accessTokenSecret: account.accessTokenSecret
    })
    console.dir(client)
    client.startUserStreaming((data) => {
      if (data['created_at']) {
        state.dispatch(types.PUSH_TIMELINE, data)
      }
    })
    state.commit(types.ADD_ACCOUNT, {client: client})
  },
  [types.FAVORITE] ({ commit, state }, args) {
    args['account'].favorite(args['idStr']).then(() => {
    }).catch(err => {
      console.error(err, err.stack)
    })
  },
  [types.RETWEET] ({ commit, state }, args) {
    args['account'].retweet(args['idStr']).then(() => {
    }).catch(err => {
      console.error(err, err.stack)
    })
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
