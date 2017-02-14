import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

let state = {
  currentTweet: ''
}
let actions = {}
let mutations = {}
let getters = {}

export default new Vuex.Store({
  state,
  getters,
  actions,
  mutations
})
