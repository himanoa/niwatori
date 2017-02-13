<template>
  <div id="#app">
    <el-row>
			<el-col :span="3">
				<p>fuga</p>
			</el-col>
      <el-col :xs="21" :md="7" :sm="11">
				<time-line></time-line>
      </el-col>
      <el-col :xs="0" :md="7" :sm="10">
				<time-line></time-line>
      </el-col>
      <el-col :xs="0" :md="7" :sm="0">
				<time-line></time-line>
      </el-col>
    </el-row>
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
