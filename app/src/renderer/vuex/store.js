import Vue from 'vue'
import Vuex from 'vuex'
import timeline from './modules/timeline'
import account from './modules/account'
import newtweet from './modules/newtweet'
Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    timeline,
    account,
    newtweet
  }
})
