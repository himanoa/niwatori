<template>
  <el-menu default-active="1-1" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose" theme="dark">
    <el-submenu index="1">
      <template slot="title">アカウント</template>
      <el-menu-item-group title="h1maoa">
        <el-menu-item index="1-1">item one</el-menu-item>
        <el-menu-item index="1-2">item two</el-menu-item>
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
</style>
