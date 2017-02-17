import * as types from '../mutation-types'
import * as urlRegex from 'url-regex'
const state = {
  input: '',
  replyTargetTweet: {
    id_str: ''
  }
}

const getters = {
  input: state => state.input,
  inputLength: state => {
    return 140 - state.input.replace(urlRegex(), 'aaaaaaaaaaaaaaaaaaaaaaa').length
  },
  replyTargetTweet: state => state.replyTargetTweet
}

const mutations = {
  [types.UPDATE_STATUS] (state) {
    state.input = ''
  },
  [types.UPDATE_INPUT] (state, { message }) {
    state.input = message
  },
  [types.REPLY] (state, { targetReply }) {
    state.replyTargetTweet = targetReply
    // ex. "@h1manoa @h2manoa @h3manoa I am a @niwatori_dev." -> "@h1manoa @h2manoa @h3manoa @niwatori_dev"
    const replyTargets = `@${state.replyTargetTweet['user']['screen_name']} `
    state.input = `${replyTargets} ${state.input}`
  }
}

const actions = {
  [types.UPDATE_STATUS] ({commit}, args) {
    const param = {
      'status': args['status'],
      'in_reply_to_status_id': args['target']['id_str'] || undefined
    }
    console.dir(param)
    args['account'].updateStatus(param).then(() => {
      commit(types.UPDATE_STATUS)
    }).catch(err => {
      console.error(err, err.stack)
    })
  },
  [types.UPDATE_INPUT] ({commit}, event) {
    commit(types.UPDATE_INPUT, {message: event})
  },
  [types.REPLY] ({commit}, args) {
    console.dir(args['tweet'])
    args['tweet'] = args['tweet']['retweeted_status'] || args['tweet']
    commit(types.REPLY, { targetReply: args['tweet'] })
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
