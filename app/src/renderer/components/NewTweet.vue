<template>
  <div class="new-tweet">
    <el-row>
      <el-input :value="input" @input.self="UPDATE_INPUT" type="textarea" :row="4" placeholder="今何してる？"></el-input>
    </el-row>
    <el-row>
      <el-button type='primary' v-on:click="ATTACH_CONTENTS(current)" icon="picture"></el-button>
      <el-button type="primary" v-on:click="UPDATE_STATUS({ account: current, status:input, target: replyTargetTweet, medias: attachContentsIds })">ツイート</el-button>
      <span>{{ inputLength }}</span>
    </el-row>
    <el-row v-if="attachContentsDatas.length > 0">
      <span v-for="content in attachContentsDatas">
        <img style="width: 200px; height: 200px;" :src="content"></img>
      </span>
    </el-row>
  </div>
</template>
<style scoped>
.el-row {
  margin-right: 20px;
  margin-left: 20px;
  margin-top: 10px;
  margin-bottom: 10px;
}
</style>
<script>
  import * as types from '../vuex/mutation-types'
  import { mapGetters, mapActions } from 'vuex'
  export default {
    computed: {
      ...mapGetters(['current', 'input', 'inputLength', 'replyTargetTweet', 'attachContentsIds', 'attachContentsDatas'])
    },
    methods: {
      ...mapActions([types.UPDATE_STATUS, types.UPDATE_INPUT, types.ATTACH_CONTENTS])
    }
  }
</script>
