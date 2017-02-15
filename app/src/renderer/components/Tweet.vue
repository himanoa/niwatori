<template>
  <div class="tweet">
    <input type="hidden" :value="selectedTweet">
    <input type="hidden" :value="index">
    <el-row :gutter="10">
      <el-col :span="3">
        <img v-if="tweet['retweeted_status']" :src="tweet['retweeted_status']['user']['profile_image_url_https']" style="color: green; width:100%;">
        <img v-else :src="tweet['user']['profile_image_url_https']" style="width:100%;">
      </el-col>
      <el-col :span="21">
        <el-row v-if="tweet['retweeted_status']" style="color: green;">
          <strong>{{tweet['retweeted_status']['user']['name']}}</strong>
          <span>@{{tweet['retweeted_status']['user']['screen_name']}}</span>
        </el-row>
        <el-row v-else>
          <strong>{{tweet['user']['name']}}</strong>
          <span>@{{tweet['user']['screen_name']}}</span>
        </el-row>
        <el-row>
          <p v-if="tweet['retweeted_status']"style="width: 100%; color:green;">{{tweet['retweeted_status']['text']}}</p>
          <p v-else style="width: 100%;">{{tweet['text']}}</p>
        </el-row>
        <el-row v-if="tweet['retweeted_status']">
          <p style="color: green;">retweeted by <img style="height: 30px;":src="tweet['user']['profile_image_url_https']">@{{tweet['user']['screen_name']}}</p>
        </el-row>
      </el-col>
    </el-row>
  </tweet>
</template>
<style scoped>
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
}
.tweet {
  padding-top: 10px;
  border-bottom: 1px solid #C6D2DF;
}
</style>
<script>
import { mapGetters } from 'vuex'
export default {
  computed: {
    ...mapGetters(['selectedTweet'])
  },
  methods: {
  },
  props: {
    tweet: Object,
    index: Number
  }
}
</script>
