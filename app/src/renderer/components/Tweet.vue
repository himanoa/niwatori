<template>
  <div class="tweet">
    <el-row :gutter="10">
      <el-col :span="2">
        <img src="https://s.gravatar.com/avatar/390f0177c1ed7a9b4f3eaa4555e80e19?s=80" style="width:100%;">
      </el-col>
      <el-col :span="22">
        <el-row>
          <strong>ひまのあ</strong>
          <span>@h1manoa</span>
        </el-row>
        <el-row>
          <p style="width: 100%;">辛いお気持ちが辛いお気持ちと重なって辛い感じになった<a href="https://himanoa.com">himanoa.com</a></p>
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
