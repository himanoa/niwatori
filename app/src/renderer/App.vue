<template>
  <div id="#app">
    <div class="row">
      <div class="col-xs-12 col-md-4 col-sm-6">
				<time-line></time-line>
      </div>
      <div class="col-xs-0 col-md-4 col-sm-6">
				<time-line></time-line>
      </div>
      <div class="col-xs-0 col-md-4 col-sm-0">
				<time-line></time-line>
      </div>
    </div>
  </div>
</template>

<script>
  import TimeLine from 'renderer/components/TimeLine'
  export default {
    components: {
      TimeLine
    }
}
</script>

<style scoped>
  * {
    margin: 0;
    padding: 0;
  }
  html,
  body { height: 100%; }
  p { text-align: center; }
</style>
