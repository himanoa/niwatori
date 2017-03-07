<template>
  <el-menu default-active="1-1" class="el-menu-vertical-demo" theme="dark">
    <el-submenu index="1">
      <template slot="title">アカウント</template>
      <el-menu-item-group v-for="(id, index) in clientIds" :title="accounts[id].profile.screen_name">
        <router-link tag="li" :index="'1-' + (index+1)" class='el-menu-item' :to="{ name: 'timeline', params: { accountIdStr: id } }">Home</router-link>
        <router-link tag="li" :index="'1-' + (index+2)" class='el-menu-item' :to="{ name: 'mention', params: { accountIdStr: id } }">Mention</router-link>
      </el-menu-item-group>
    </el-submenu>
    <el-menu-item id="add-account" index="2"><a href="#" @click="clickedAddAccount"><i class="el-icon-plus"></i>アカウント追加</a></el-menu-item>
  </el-menu>
</template>
<script>
import { ipcRenderer } from 'electron'
import { mapGetters } from 'vuex'
export default {
  computed: {
    ...mapGetters(['accounts', 'clientIds'])
  },
  methods: {
    clickedAddAccount () {
      console.log('fuga')
      ipcRenderer.send('openOAuthDialog')
    }
  }
}
</script>
<style scoped>
#add-account .is-active {
  color: #d1dbe5;
}
.el-menu {
  height: 100%;
}
a {
  text-decoration: none;
  color: #bfcbd9;
}
.router-link-active {
  color: #1387FF;
}
</style>
