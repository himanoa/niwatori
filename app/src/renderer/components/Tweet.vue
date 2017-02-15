<template>
  <div class="tweet">
    <input type="hidden" :value="selectedTweet">
    <input type="hidden" :value="index">
    <el-row v-if="tweet['retweeted_status']" :gutter="10">
      <el-col :span="3">
        <img :src="tweet['retweeted_status']['user']['profile_image_url_https']" style="width:100%;">
      </el-col>
      <el-col :span="21">
        <el-row>
          <strong>{{tweet['retweeted_status']['user']['name']}}</strong>
          <span>@{{tweet['retweeted_status']['user']['screen_name']}}</span>
        </el-row>
        <el-row>
          <p style="width: 100%;">{{tweet['retweeted_status']['text']}}</p>
        </el-row>
        <el-row>
          <p>retweeted by <img style="height: 30px;":src="tweet['user']['profile_image_url_https']">@{{tweet['user']['screen_name']}}</p>
        </el-row>
      </el-col>
    </el-row>
    <el-row v-else :gutter="10">
      <el-col :span="3">
        <img :src="tweet['user']['profile_image_url_https']" style="width:100%;">
      </el-col>
      <el-col :span="21">
        <el-row>
          <strong>{{tweet['user']['name']}}</strong>
          <span>@{{tweet['user']['screen_name']}}</span>
        </el-row>
        <el-row>
          <p style="width: 100%;">{{tweet['text']}}</p>
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
