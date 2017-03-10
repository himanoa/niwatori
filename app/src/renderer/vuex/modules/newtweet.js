const electron = require('electron')
const {dialog} = electron.remote
const readFile = require('fs').readFile
import * as types from '../mutation-types'
import urlRegex from 'url-regex'
import emojinize from 'emojinize'

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
  attachContentsDatas: state => state.attachContents.map(val => `data:image/${val.extension};base64,${val.data.toString('base64')}`),
  attachContentsIds: state => state.attachContents.map(val => val.id)
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
    console.dir(targetReply)
    state.replyTargetTweet = targetReply
    // ex. "@h1manoa @h2manoa @h3manoa I am a @niwatori_dev." -> "@h1manoa @h2manoa @h3manoa @niwatori_dev"
    const replyTargets = `@${state.replyTargetTweet['user']['screen_name']}`
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
  },
  [types.DELETE_CONTENTS] (state, { number }) {
    state.attachContents.splice(number, 1)
  }
}

const actions = {
  [types.UPDATE_STATUS] ({commit, state, rootState}, args) {
    const param = {
      'status': emojinize.encode(state.input),
      'in_reply_to_status_id': state.replyTargetTweet.id_str || undefined,
      'media_ids': state.attachContents.map(val => val.id).toString() || undefined
    }
    console.dir(param)
    rootState.account.clients[rootState.route.params.accountIdStr].updateStatus(param).then(() => {
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
    args['tweet'] = args['tweet'] || args['tweet']['retweeted_status']
    commit(types.REPLY, { targetReply: args['tweet'] })
  },
  [types.ATTACH_CONTENTS] ({commit, rootState}) {
    dialog.showOpenDialog({
      properties: ['openFile'],
      filters: [
        { name: 'Images', extensions: ['jpg', 'png', 'gif'] }
      ]}, function (filePath) {
      for (let file of filePath) {
        new Promise((resolve, reject) => {
          const extension = file.split('.').pop()
          resolve({path: file, extension: extension})
        }).then(result => new Promise((resolve, reject) => {
          new Promise((resolve, reject) => {
            readFile(file, (err, data) => {
              if (err) reject(err)
              resolve(data)
            })
          }).then(data => {
            result['data'] = data
            resolve(result)
          }).catch(error => {
            reject(error, error.stack)
          })
        })).then(result => new Promise((resolve, reject) => {
          rootState.account.clients[rootState.route.params.accountIdStr].mediaUpload(result['data']).then(data => {
            result['id'] = data['media_id_string']
            resolve(result)
          }).catch(error => {
            reject(error)
          })
        })).then(result => {
          commit(types.ATTACH_CONTENTS, { content: result })
        }).catch(err => {
          console.error(err, err.stack)
        })
      }
    }
    )
  },
  [types.DELETE_CONTENTS] ({ commit }, number) {
    // commit(types.DELETE_CONTENTS, { number: number })
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
