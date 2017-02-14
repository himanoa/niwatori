<template>
  <div class="tweet">
    <el-row :gutter="10">
      <el-col :span="2">
        <img :src="tweet['user']['profile_image_url_https']" style="width:100%;">
      </el-col>
      <el-col :span="22">
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
export default {
  props: {
    tweet: Object
  }
}
</script>
