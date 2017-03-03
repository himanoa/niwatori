<template>
  <el-menu class="el-menu-vertical-demo" theme="dark">
    <el-submenu index="1">
      <template slot="title">アカウント</template>
      <el-menu-item-group title="h1maoa">
        <router-link tag="li" class='el-menu-item' :to="{ path: '/timeline' }">Home</router-link>
        <router-link tag="li" class='el-menu-item' :to="{ path: '/mention' }">Mention</router-link>
      </el-menu-item-group>
    </el-submenu>
    <el-menu-item id="add-account" index="2"><a href="#" @click="clickedAddoAccount"><i class="el-icon-plus"></i>アカウント追加</a></el-menu-item>
  </el-menu>
</template>
<script>
import { ipcRenderer } from 'electron'
export default {
  methods: {
    clickedAddoAccount () {
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
</style>
