<template>
  <div id="#app">
    <div class="row flexbox">
      <div class="min">
				<side-bar></side-bar>
      </div>
      <div class="medium">
				<time-line></time-line>
      </div>
      <div class="medium">
				<time-line></time-line>
      </div>
      <div class="medium">
				<time-line></time-line>
      </div>
    </div>
  </div>
</template>

<script>
  import TimeLine from 'renderer/components/TimeLine'
  import SideBar from 'renderer/components/SideBar'
  export default {
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
    height: 100%;
    overflow-y: hidden;
    font-family: Verdana,  "Hiragino Kaku Gothic ProN", Meiryo, sans-serif;
  }
</style>
<style scoped>
  * {
    height: 100%;
    margin: 0;
    padding: 0;
  }
  .flexbox {
    display: flex;
    flex-wrap: nowrap;
    width: 100%;
    height: 100%;
  }
  .min {
    flex: 1 0 150px;
    max-width: 250px;
    height: 100%;
    justify-content: flex-start;
    align-items: strech;
  }
  .medium {
    flex: 1;
    height: 100%;
    min-width: 300px;
    justify-content: flex-start;
    align-items: strech;
  }
  p { text-align: center; }
</style>
