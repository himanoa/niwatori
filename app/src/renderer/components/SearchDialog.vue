<template>
  <div v-if="isVisiableDialog" class="search">
    <div class="base-dialog">
    <div class="dialog-overlay" v-on:click="CHANGE_VISIABLE_DIALOG"></div>
    <div class="dialog-body" style="width: 450px;height: 200px;">
      <header>
        <span>検索の追加</span>
      </header>
      <div class="form">
        <el-form label-width="60px">
          <el-form-item label="名前">
            <el-input :value="name" @input.self=updateName></el-input>
          </el-form-item>
          <el-form-item label="クエリ">
            <el-input :value="query" @input.self=updateQuery></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit">追加</el-button>
            <el-button @click="CHANGE_VISIABLE_DIALOG">キャンセル</el-button>
          </el-form-item>
        </el-form>
        </div>
    </div>
  </div></div>
</template>
<script>
import * as types from '../vuex/mutation-types'
import { mapGetters, mapActions } from 'vuex'
export default {
  data () {
    return {
      name: '',
      query: ''
    }
  },
  computed: {
    ...mapGetters(['isVisiableDialog'])
  },
  methods: {
    ...mapActions([types.ADD_SEARCH, types.CHANGE_VISIABLE_DIALOG]),
    onSubmit () {
      this.$store.dispatch('ADD_SEARCH', {name: this.name, query: this.query})
      this.$store.dispatch('CHANGE_VISIABLE_DIALOG')
    },
    updateName (name) {
      this.name = name
    },
    updateQuery (query) {
      this.query = query
    }
  }
}
</script>
<style scoped>
.el-form-item {
  padding-right: 15px;
}
header {
  padding-top: 5px;
  padding-bottom: 10px;
}
header > span {
  padding: 10px;
  color: #1F2D3D;
  font-weight: bold;
}
.base-dialog{
  position: fixed;
  left: 0;
  top: 0;
  margin: 0;
  padding: 0;
  padding: 10px;
  width: 100%;
  height: 100%;
  display: flex;
  align-content: flex-start;
  justify-content: flex-start;
}
.dialog-overlay{
  position: fixed;
  left: 0;
  top: 0;
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
  background: rgba(0,0,0,0.4);
}
.dialog-body{
  border-radius: 5px;
  z-index: 10000;
  color: #fff;
  background: #fff;
  box-shadow: 0 3px 6px rgba(0,0,0,0.2);
  transition: left 0.4s ease-out;
  margin: auto;
}
.el-form {
  padding: auto;
}
</style>
