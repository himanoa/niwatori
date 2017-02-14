<template>
	<div class="timeline">
		<el-card class="box-card">
      <div class="tweets">
        <tweet v-for="tweet in tweets" :tweet="tweet"></tweet>
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
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters(['tweets'])
  },
  components: {
    Tweet
  }
}
</script>
