<template>
  <div>
    {{ loaded() }}
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  computed: {
    ...mapGetters(['clientIds'])
  },
  methods: {
    loaded: function (route) {
      console.log('はげ')
      console.dir(this.clientIds)
      this.$router.push({ name: 'timeline', params: { accountIdStr: this.clientIds[0] } })
    }
  }
}
</script>
