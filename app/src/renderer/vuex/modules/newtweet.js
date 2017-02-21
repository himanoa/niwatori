const electron = require('electron')
const {dialog} = electron.remote
import * as types from '../mutation-types'
import * as urlRegex from 'url-regex'
const state = {
  input: '',
  replyTargetTweet: {
    id_str: ''
  },
  attachContents: []
}

const getters = {
  input: state => state.input,
  inputLength: state => {
    return 140 - state.input.replace(urlRegex(), 'aaaaaaaaaaaaaaaaaaaaaaa').length
  },
  replyTargetTweet: state => state.replyTargetTweet,
  attachContents: state => state.attachContents,
  attachContentsIds: state => state.attachContents
}
const mutations = {
  [types.UPDATE_STATUS] (state) {
    state.input = ''
    state.attachContents = []
  },
  [types.UPDATE_INPUT] (state, { message }) {
    state.input = message
  },
  [types.REPLY] (state, { targetReply }) {
    state.replyTargetTweet = targetReply
    // ex. "@h1manoa @h2manoa @h3manoa I am a @niwatori_dev." -> "@h1manoa @h2manoa @h3manoa @niwatori_dev"
    const replyTargets = `@${state.replyTargetTweet['user']['screen_name']} `
    state.input = `${replyTargets} ${state.input}`
  },
  [types.ATTACH_CONTENTS] (state, { content }) {
    if (state.attachContents.length > 3) {
      console.dir('だめだよ')
    } else {
      console.log('ATTACH_CONTENTS')
      console.dir(state.attachContents)
      state.attachContents.push(content)
    }
  }
}

const actions = {
  [types.UPDATE_STATUS] ({commit}, args) {
    const param = {
      'status': args['status'],
      'in_reply_to_status_id': args['target']['id_str'] || undefined,
      'media_ids': args['medias'].toString() || undefined
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
  },
  [types.ATTACH_CONTENTS] ({commit}, account) {
    dialog.showOpenDialog({
      properties: ['openFile'],
      filters: [
        { name: 'Images', extensions: ['jpg', 'png', 'gif'] }
      ]}, function (filePath) {
      for (let file of filePath) {
        account.mediaUpload(file).then(data => {
          console.dir(data)
          commit(types.ATTACH_CONTENTS, { content: data['media_id_string'] })
        })
      }
    })
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
