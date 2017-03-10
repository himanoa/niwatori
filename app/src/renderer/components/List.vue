<template>
  <div class="list">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span style="line-height: 36px;">{{ idToName[$route.params.listId]}}</span>
        <span><el-button type="primary" @click="fetchTweets()">更新</el-button></span>
      </div>
      <div class="tweets">
        <tweet v-for="(tweet, index) in currentListTweet" :tweet="tweet" :index="index" :route="$route"></tweet>
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
    ...mapGetters(['accounts', 'idToName']),
    currentListTweet: function () {
      return this.tweets.filter(val => val.receivedListId === this.$route.params.listId)
    }
  },
  data: function () {
    return {
      tweets: []
    }
  },
  methods: {
    fetchTweets: async function () {
      const tweets = await this.accounts[this.$route.params.accountIdStr].fetchList({
        listId: this.$route.params.listId,
        count: 50
      })
      this.tweets = tweets.map(val => {
        val.who = this.accounts[this.$route.params.accountIdStr].profile.screen_name
        val.receivedListId = this.$route.params.listId
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
