<template>
	<div class="timeline">
		<el-card class="box-card">
			<div slot="header">
				<span style="line-height: 36px;">TimeLine</span>
			</div>
      <div class="tweets">
        <tweet v-for="x in 200"></tweet>
      </div>
		</el-card>
	</div>
</template>
<style scoped>
.timeline {
  height: 100%;
}
.box-card {
  height: 100%;
}
.tweets {
  height: 80vh;
  overflow-y: auto;
}
</style>
<script>
import Tweet from './Tweet'
export default {
  components: {
    Tweet
  }
}
</script>
