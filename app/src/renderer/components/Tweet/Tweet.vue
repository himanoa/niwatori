<template>
  <div v-on:click="CLICKED_TWEET({index: index, route: route })"
       :style="{'background-color': index === selectedTweet(route.params.id_str) ? '#9dceff' : 'white'}"
       :class="{ retweeted: tweet['retweeted_status']['text'], tweet: true }">
    <input type="hidden" :value="selectedTweet">
    <input type="hidden" :value="index">
    <el-row :gutter="5">
      <el-col :span="2">
        <img class="icon"
             :src="tweet['retweeted_status']['user']['profile_image_url_https'] || tweet['user']['profile_image_url_https']"
             style=" width:100%;">
      </el-col>
      <el-col :span="22">
        <el-row>
          <strong :class="{ retweeted: tweet['retweeted_status']['text']}">{{tweet['retweeted_status']['user']['name'] || tweet['user']['name'] }}</strong>
          <span :class="{ retweeted: tweet['retweeted_status']['text']}">@{{tweet['retweeted_status']['user']['screen_name'] || tweet['user']['screen_name']}}</span>
          <span :class="{ retweeted: tweet['retweeted_status']['text']}"> {{formatDate()}}</span>
        </el-row>
        <el-row>
          <p :class="{ retweeted: tweet['retweeted_status']['text']}" style="width: 100%;" v-html="tweet['retweeted_status']['text'] || tweet['text']"></p>
        </el-row>
        <el-row v-if="tweet['retweeted_status']['text']">
          <p class="retweeted">retweeted by <img class="icon" style="height: 30px;":src="tweet['user']['profile_image_url_https']">@{{tweet['user']['screen_name']}}</p>
        </el-row>
        <el-row v-if="tweet['media_urls'].length > 0">
          <span v-for="media in tweet['media_urls']">
            <a :href="media" target="_blank">
              <img class="attach-image" :src="media"></img>
            </a>
          </span>
        </el-row>
        <el-row>
          <tweet-actions v-if="tweet['retweeted_status']['text']" :route="route" :tweet="tweet['retweeted_status']" :index="index"></tweet-actions>
          <tweet-actions v-else :route="route" :tweet="tweet" :index="index"></tweet-actions>
        </el-row>
      </el-col>
    </el-row>
  </tweet>
  </div>
</template>
<style scoped>
.icon {
  max-width: 60.25px;
}
.retweeted {
  color: green;
}
.el-card {
  height: 100%;
}
.box-card {
  height: 100%;
}
p {
  margin: 5px;
}
* {
	font-family: Verdana, "游ゴシック", YuGothic, "Hiragino Kaku Gothic ProN", Meiryo, sans-serif;
  color: #324057;
}
.tweet {
  padding-top: 10px;
  border-bottom: 1px solid #C6D2DF;
}

.attach-image {
  width: 80px;
  height: 80px;
}
</style>
<script>
import TweetActions from './TweetActions'
import { mapGetters, mapActions } from 'vuex'
export default {
  computed: {
    ...mapGetters(['selectedTweet'])
  },
  methods: {
    ...mapActions(['CLICKED_TWEET']),
    mediaUrls (tweet) {
      return tweet['media_urls'] || []
    },
    formatDate () {
      const date = new Date(this.tweet['retweeted_status']['created_at'] || this.tweet['created_at'])
      const dataString = date.toLocaleTimeString()
      const timeString = date.toLocaleDateString()
      return `${dataString} ${timeString}`
    }
  },
  props: {
    tweet: Object,
    index: Number,
    route: Object
  },
  components: {
    TweetActions
  }
}
</script>
