<template>
  <div class="list">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span style="line-height: 36px;">{{ idToName[$route.params.listId] }}</span>
      </div>
      <div class="tweets">
        <tweet v-for="(tweet, index) in tweets" :tweet="tweet" :index="index" :route="$route"></tweet>
      </div>
		</el-card>
	</div>
</template>
<style scoped>
.list {
  height: 100%;
  overflow-y: scroll;
}
.tweets {
  height: 100%;
}
</style>
<script>
import Tweet from './Tweet/Tweet'
import { mapGetters } from 'vuex'
export default {
  data: () => {
    return {
      tweets: []
    }
  },
  computed: {
    ...mapGetters(['accounts', 'idToName'])
  },
  methods: {
    fetchTweets: async function () {
      this.tweets = await this.accounts[this.$route.params.accountIdStr].fetchList({
        listId: this.$route.params.listId
      })
    }
  },
  components: {
    Tweet
  }
}
</script>
