import Vue from 'vue'
import Electron from 'vue-electron'
import Resource from 'vue-resource'
import Router from 'vue-router'
import ElementUI from 'element-ui'
import TimeLine from './components/TimeLine'
import Mention from './components/Mention'
import 'element-ui/lib/theme-default/index.css'

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
      path: '/timeline',
      component: TimeLine
    },
    {
      path: '/mention',
      component: Mention
    }
  ]
})

/* eslint-disable no-new */
new Vue({
  router,
  ...App
}).$mount('#app')
