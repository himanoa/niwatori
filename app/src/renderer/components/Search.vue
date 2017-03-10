<template>
  <div class="list">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span style="line-height: 36px;">{{searchs($route.params.accountIdStr)[$route.params.index].name}}</span>
        <span><el-button type="primary" @click="fetchTweets()">更新</el-button></span>
      </div>
      <div class="tweets">
        <tweet v-for="(tweet, index) in currentSearchTweet" :tweet="tweet" :index="index" :route="$route"></tweet>
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
import { expandEntities } from '../utils/expandEntities'
import { mapGetters } from 'vuex'
export default {
  computed: {
    ...mapGetters(['accounts', 'searchs']),
    currentSearchTweet: function () {
      return this.tweets.filter(val => val.index === this.$route.params.index)
    }
  },
  data: function () {
    return {
      tweets: []
    }
  },
  methods: {
    fetchTweets: async function () {
      console.log(this.searchs(this.$route.params.accountIdStr)[this.$route.params.index].query)
      const tweets = await this.accounts[this.$route.params.accountIdStr].fetchSearch({
        q: this.searchs(this.$route.params.accountIdStr)[this.$route.params.index].query,
        count: 50
      }).catch(err => console.dir(err))
      this.tweets = tweets.statuses.map(val => {
        console.dir(val)
        val.who = this.accounts[this.$route.params.accountIdStr].profile.screen_name
        val.index = this.$route.params.index
        if (val['retweeted_status']) {
          val['retweeted_status'] = expandEntities(val['retweeted_status'])
          val['media_urls'] = val['retweeted_status']['media_urls']
        } else {
          val = expandEntities(val)
        }
        val['retweeted_status'] = val['retweeted_status'] || { user: {} }
        return val
      })
    }
  },
  components: {
    Tweet
  }
}
</script>
