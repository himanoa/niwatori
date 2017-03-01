<template>
	<div class="mentions">
		<el-card class="box-card">
      <div class="tweets">
        <tweet v-for="(tweet, index) in mentions" :tweet="tweet" :index="index"></tweet>
      </div>
		</el-card>
	</div>
</template>
<style scoped>
.timeline {
  height: 100%;
  overflow-y: scroll;
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
    ...mapGetters(['mentions'])
  },
  components: {
    Tweet
  }
}
</script>
