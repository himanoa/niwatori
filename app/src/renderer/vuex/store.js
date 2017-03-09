import Vue from 'vue'
import Vuex from 'vuex'
import timeline from './modules/timeline'
import account from './modules/account'
import search from './modules/search'
import newtweet from './modules/newtweet'
import list from './modules/list'
Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    timeline,
    account,
    newtweet,
    search,
    list
  }
})
