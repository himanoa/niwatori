<template>
  <el-menu class="el-menu-vertical-demo" theme="dark">
    <el-submenu index="1">
      <template slot="title">アカウント</template>
      <el-menu-item-group title="h1maoa">
        <router-link tag="li" class='el-menu-item' :to="{ path: '/timeline' }">Home</router-link>
        <router-link tag="li" class='el-menu-item' :to="{ path: '/mention' }">Mention</router-link>
      </el-menu-item-group>
    </el-submenu>
  </el-menu>
</template>
<script>
</script>
<style scoped>
.el-menu {
  height: 100%;
}
a {
  text-decoration: none;
  color: #bfcbd9;
}
</style>
