<template>
  <div id="#app">
    <div class="row flexbox">
      <div class="min">
				<side-bar></side-bar>
      </div>
      <div class="col-xs-9">
        <div class="row new">
          <p>fugafuga</p>
        </div>
        <div class="row tl flexbox">
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
    </div>
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
    overflow-x: hidden;
    font-family: Verdana,  "Hiragino Kaku Gothic ProN", Meiryo, sans-serif;
  }
</style>
<style scoped>
  .col-xs-9 {
    max-width: 100%;
  }
  .row {
    height: 90%;
  }
  .new {
    width: 100%;
    max-height: 10%;
    height: 10%;
  }
  * {
    height: 100%;
    width: 100%;
    margin: 0;
    padding: 0;
  }
  .flexbox {
    display: flex;
    flex-wrap: nowrap;
    width: 100%;
    height: 100%;
  }
  .row .row {
    width: 100% !important;
  }
  .tl {
    height: 90%;
    overflow-y: hidden;
    overflow-x: auto;
  }
  .min {
    flex: 1 0 100px;
    max-width: 250px;
    height: 100%;
    justify-content: flex-end;
    align-items: strech;
  }
  .medium {
    flex: 1;
    height: 100%;
    width: 120%;
    max-width: 37%;
    min-width: 400px;
    justify-content: flex-end;
  }
  p { text-align: center; }
</style>
