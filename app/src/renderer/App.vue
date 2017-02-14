<template>
  <div id="#app">
    <el-row>
      <el-col :span="6">
				<side-bar></side-bar>
      </el-col>
      <el-col :span="18">
        <div class="new">
          <p>fugafuga</p>
        </div>
        <div>
          <time-line></time-line>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import TimeLine from 'renderer/components/TimeLine'
  import SideBar from 'renderer/components/SideBar'
  import store from 'renderer/vuex/store'
  export default {
    store,
    components: {
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
    max-height: 10%;
    height: 10%;
  }
  * {
    height: 100%;
    margin: 0;
    padding: 0;
  }
  p { text-align: center; }
</style>
