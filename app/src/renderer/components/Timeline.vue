<template>
	<div class="timeline">
		<el-card class="box-card">
      <div class="tweets">
        <tweet v-for="x in 200"></tweet>
      </div>
		</el-card>
	</div>
</template>
<style scoped>
.timeline {
  height: 88%;
  overflow-y: auto;
}
.tweets {
  height: 100%;
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
