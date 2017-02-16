<template>
  <div class="new-tweet">
    <el-row>
      <el-input :value="input" @input.self="UPDATE_INPUT" type="textarea" :row="4" placeholder="今何してる？"></el-input>
    </el-row>
    <el-row>
      <el-button type="primary" v-on:click="UPDATE_STATUS({ account: current, status:input })">ツイート</el-button>
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
    ...mapGetters(['current', 'input'])
  },
  methods: {
    ...mapActions([types.UPDATE_STATUS, types.UPDATE_INPUT])
  }
}
</script>
