<template>
  <div class="new-tweet">
    <el-row>
      <el-input :value="input" @input.self="UPDATE_INPUT" type="textarea" :row="4" placeholder="今何してる？"></el-input>
    </el-row>
    <el-row>
      <el-button v-on:click="ATTACH_CONTENTS" icon="picture"></el-button>
      <el-button type="primary" v-on:click="UPDATE_STATUS">ツイート</el-button>
      <span>{{ inputLength }}</span>
    </el-row>
    <el-row class="attachments" v-if="attachContentsDatas.length > 0">
      <span v-for="(content, index) in attachContentsDatas">
        <img style="width: 200px; height: 200px;" :src="content"></img>
        <a class="delete" @click="DELETE_CONTENTS(index)" href="#">☓</a>
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

.el-row.attachments span {
  display: inline-block;
  position: relative;
}

.el-row.attachments span .delete {
  position: absolute;
  top: 10px;
  right: 10px;
  border-radius: 50%;
  background-color: rgba(0, 0, 0, .4);
  color: #fff;
  width: 1em;
  height: 1em;
  line-height: 1;
}
</style>
<script>
  import * as types from '../vuex/mutation-types'
  import { mapGetters, mapActions } from 'vuex'
  export default {
    computed: {
      ...mapGetters(['current', 'input', 'inputLength', 'replyTargetTweet', 'attachContentsIds', 'attachContentsDatas', 'accounts', 'clientIds'])
    },
    methods: {
      ...mapActions([types.UPDATE_STATUS, types.UPDATE_INPUT, types.ATTACH_CONTENTS, types.DELETE_CONTENTS])
    }
  }
</script>
