<template>
  <el-menu default-active="1-1" class="el-menu-vertical-demo" theme="dark">
    <el-menu-item-group v-for="(id, index) in clientIds" :title="accounts[id].profile.screen_name">
      <router-link tag="li" :index="'1-' + (index+1)" class='el-menu-item' :to="{ name: 'timeline', params: { accountIdStr: id } }">Home</router-link>
      <router-link tag="li" :index="'1-' + (index+2)" class='el-menu-item' :to="{ name: 'mention', params: { accountIdStr: id } }">Mention</router-link>
      <el-submenu :index="'1-' + (index+3)" >
        <template slot="title">リスト</template>
        <router-link v-for="list in lists(id)" tag="li" class='el-menu-item child' :to="{ name: 'list', params: { accountIdStr: id, listId: list.id_str } }">{{ list.name }}</router-link>
      </el-submenu>
      <el-submenu :index="'1-' + (index+4)">
        <template slot="title">検索</template>
        <el-menu-item index="2"><a href="#" @click="CHANGE_VISIABLE_DIALOG"><i class="el-icon-search"></i>検索</a></el-menu-item>
      </el-submenu>
    </el-menu-item-group>
    <el-menu-item id="add-account" index="2"><a href="#" @click="clickedAddAccount"><i class="el-icon-plus"></i>アカウント追加</a></el-menu-item>
  </el-menu>
</template>
<script>
import * as types from '../vuex/mutation-types'
import { ipcRenderer } from 'electron'
import { mapGetters, mapActions } from 'vuex'
export default {
  computed: {
    ...mapGetters(['accounts', 'clientIds', 'lists'])
  },
  methods: {
    ...mapActions([types.CHANGE_VISIABLE_DIALOG]),
    clickedAddAccount () {
      ipcRenderer.send('openOAuthDialog')
    }
  }
}
</script>
<style>
.el-submenu__title {
  line-height: 30px;
  height: 30px;
}
.el-menu-item-group__title {
  font-weight: bolder;
  padding-top: 7.5px;
  padding-bottom: 7.5px;
}
</style>
<style scoped>
.child {
  padding-left: 20px !important;
}
#add-account .is-active {
  color: #d1dbe5;
}
.el-menu {
  overflow-y: scroll;
  height: 100%;
}
.el-menu-item {
  height: 30px;
  line-height: 30px;
}
.el-menu-submenu__title {
  height: 30px;
  line-height: 30px;
}
a {
  text-decoration: none;
  color: #bfcbd9;
}
.router-link-active {
  color: #1387FF;
}
</style>
