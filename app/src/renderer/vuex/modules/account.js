import TwitterApi from '../../api/twitter'
import * as types from '../mutation-types'

const state = {
  clients: {},
  clientIds: []
}

const getters = {
  accounts: state => state.clients,
  clientIds: state => state.clientIds,
  current: state => state.clients[state.route.params.id]
}

const mutations = {
  [types.ADD_ACCOUNT] (state, { client }) {
    if (state.clients[client.profile.id_str]) {
      state.clients[client.profile.id_str].destroyStream()
      state.clients[client.profile.id_str] = undefined
    }
    state.clients[client.profile.id_str] = client
    state.clients = {...state.clients}
    state.clientIds.push(client.profile.id_str)
    state.clientIds = [..clientIds]
  }
}

const actions = {
  async [types.ADD_ACCOUNT] ({ state, dispatch, commit }, {account}) {
    const client = new TwitterApi.TwitterApi({
      consumerKey: account.consumerKey,
      consumerSecret: account.consumerSecret,
      accessToken: account.accessToken,
      accessTokenSecret: account.accessTokenSecret
    })
    await client.startUserStreaming((stream) => {
      client.destroyStream = stream.destroy
      dispatch(types.INIT_ACCOUNT, client.profile.id_str)
      stream.on('delete', (data) => {
        dispatch(types.DELETE_TWEET, { idStr: data['delete']['status']['id_str'], who: client.profile.idStr })
      })
      stream.on('data', (data) => {
        if (data['delete']) {
          console.log('fugafuga')
        } else if (data['created_at']) {
          dispatch(types.PUSH_TIMELINE, {tweet: data, who: client.profile.id_str})
        }
      })
    })
    commit(types.ADD_ACCOUNT, {client: client})
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
