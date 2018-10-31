<template>
  <div class="page">
    <router-view></router-view>
  </div>
</template>

<script>

export default {
  name: 'App',
  created () {
  },
  methods: {
    test () {
      this.$api.get(this.$api.url.getFund, {params: {}})
        .then((res) => {
        })
    },
    test2 () {
      this.$api.get(this.$api.url.findFunddetail, {
        params: { fundcode: '880005' }
      }).then((res) => {
        console.log(res)
      })
    },
    test3 () {
      this.$api.get(`${this.$api.url.resources}/pubhg/1540796055543382871.jpg`, {
        params: {}
      }).then((res) => {
      })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss">
  @import '@/assets/sass/_base.scss';
</style>
