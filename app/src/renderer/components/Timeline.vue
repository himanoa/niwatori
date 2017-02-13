<template>
	<div class="timeline">
		<el-card class="box-card">
			<div slot="header">
				<span style="line-height: 36px;">TimeLine</span>
			</div>
			<tweet v-for="x in 10"></tweet>
		</el-card>
	</div>
</template>
<script>
import Tweet from './Tweet'
export default {
  components: {
    Tweet
  }
}
</script>
