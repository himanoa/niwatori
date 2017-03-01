<template>
  <div class="tweet" v-on:click="CLICKED_TWEET(index)" :style="{'background-color': index === selectedTweet ? '#9dceff' : 'white'}">
    <input type="hidden" :value="selectedTweet">
    <input type="hidden" :value="index">
    <el-row :gutter="5">
      <el-col :span="2">
        <img class="icon" v-if="tweet['retweeted_status']" :src="tweet['retweeted_status']['user']['profile_image_url_https']" style=" width:100%;">
        <img v-else class="icon" :src="tweet['user']['profile_image_url_https']" style="width:100%;">
      </el-col>
      <el-col :span="22">
        <el-row v-if="tweet['retweeted_status']">
          <strong class="retweeted">{{tweet['retweeted_status']['user']['name']}}</strong>
          <span class="retweeted">@{{tweet['retweeted_status']['user']['screen_name']}}</span>
          <span class="retweeted"> {{new Date(tweet['retweeted_status']['created_at']).toLocaleDateString() + ' ' + new Date(tweet['retweeted_status']['created_at']).toLocaleTimeString()}}</span>
        </el-row>
        <el-row v-else>
          <strong>{{tweet['user']['name']}}</strong>
          <span>@{{tweet['user']['screen_name']}}</span>
          <span> {{new Date(tweet['created_at']).toLocaleDateString() + ' ' + new Date(tweet['created_at']).toLocaleTimeString()}}</span>
        </el-row>
        <el-row>
          <p class="retweeted" v-if="tweet['retweeted_status']"style="width: 100%;" v-html="tweet['retweeted_status']['text']"></p>
          <p v-else style="width: 100%;" v-html="tweet['text']"></p>
        </el-row>
        <el-row v-if="tweet['retweeted_status']">
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
          <tweet-actions v-if="tweet['retweeted_status']" :tweet="tweet['retweeted_status']" :index="index"></tweet-actions>
          <tweet-actions v-else :tweet="tweet" :index="index"></tweet-actions>
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
    }
  },
  props: {
    tweet: Object,
    index: Number
  },
  components: {
    TweetActions
  }
}
</script>
