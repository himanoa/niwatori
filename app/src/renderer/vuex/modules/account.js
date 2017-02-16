import TwitterApi from '../../api/twitter'
import * as types from '../mutation-types'

const state = {
  clients: []
}

const getters = {
  accounts: state => state.accounts
}

const mutations = {
  [types.ADD_ACCOUNT] (state, { client }) {
    state.accounts.push(client)
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
    client.startUserStreaming((data) => {
      if (data['created_at']) {
        state.commit(types.PUSH_TIMELINE, {tweet: data})
      }
    })
    state.commit(types.ADD_ACCOUNT, {client: client})
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
