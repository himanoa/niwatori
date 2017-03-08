<template>
  <div id="#app">
    <el-row>
      <el-col :xs="8" :sm="8" :md="6" :lg="6">
				<side-bar></side-bar>
      </el-col>
      <el-col :xs="16" :sm="16" :md="18" :lg="18">
        <el-row class="new">
          <new-tweet class="new"></new-tweet>
        </el-row>
        <el-row class="timeline">
          <router-view></router-view>
        </el-row>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import TimeLine from 'renderer/components/TimeLine'
  import SideBar from 'renderer/components/SideBar'
  import NewTweet from 'renderer/components/NewTweet'
  import store from 'renderer/vuex/store'
  import * as types from 'renderer/vuex/mutation-types'
  const electron = require('electron')
  const storage = electron.remote.require('electron-json-storage')
  electron.ipcRenderer.on('success-oauth', (event, message) => {
    console.log('poepoe')
    console.dir(message)
    store.dispatch(types.ADD_ACCOUNT, { account: message[0] }).catch(err => {
      console.error(err, err.stack)
    })
  })
  async function login () {
    const datas = await new Promise((resolve, reject) => {
      storage.get('twitterOAuth', (err, data) => {
        if (err) reject(err)
        resolve(data)
      })
    }).catch(err => {
      console.error(err, err.stack)
    })
    for (const data of datas) {
      await store.dispatch(types.ADD_ACCOUNT, {account: data}).catch(err => {
        console.error(err, err.stack)
      })
    }
  }
  login()
  export default {
    components: {
      NewTweet,
      TimeLine,
      SideBar
    }
}
</script>

<style>
  html,
  body{
    margin: 0;
    padding: 0;
    height:100%;
    overflow-y: hidden;
    font-family: Verdana,  "Hiragino Kaku Gothic ProN", Meiryo, sans-serif;
  }
</style>
<style scoped>
  .new {
    width: 100%;
    height: auto !important;
  }
  * {
    height: 100%;
    margin: 0;
    padding: 0;
  }
  .timeline {
    height: calc(100% - 80px)
  }
  p { text-align: center; }
</style>
