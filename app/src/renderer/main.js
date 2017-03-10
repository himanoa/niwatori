import Vue from 'vue'
import Electron from 'vue-electron'
import Resource from 'vue-resource'
import Router from 'vue-router'
import ElementUI from 'element-ui'
import Root from './components/Root'
import TimeLine from './components/TimeLine'
import Mention from './components/Mention'
import List from './components/List'
import Search from './components/Search'
import 'element-ui/lib/theme-default/index.css'
import store from 'renderer/vuex/store'
import { sync } from 'vuex-router-sync'
import App from './App'

Vue.use(ElementUI)
Vue.use(Electron)
Vue.use(Resource)
Vue.use(Router)
Vue.config.debug = true

const router = new Router({
  scrollBehavior: () => ({ y: 0 }),
  routes: [
    {
      path: '/',
      component: Root
    },
    {
      path: '/timeline/:accountIdStr',
      name: 'timeline',
      component: TimeLine
    },
    {
      path: '/mention/:accountIdStr',
      name: 'mention',
      component: Mention
    },
    {
      path: '/list/:accountIdStr/:listId',
      name: 'list',
      component: List
    },
    {
      path: '/search/:accountIdStr/:index',
      name: 'search',
      component: Search
    }
  ]
})
sync(store, router)
/* eslint-disable no-new */
new Vue({
  store,
  router,
  ...App
}).$mount('#app')
