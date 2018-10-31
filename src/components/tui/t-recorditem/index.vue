<template>
  <div class="t-recorditem" ref="tRecoedItem" :style="{ height: tRecoedItemheight, width: tRecoedItemwidth }">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 't-recorditem',
  props: {
  },
  mounted () {
    this.calculateSelfPosition()
    this.$nextTick(() => this.calculateSelfPosition())
  },
  data () {
    return {
      tRecoedItemId: -1,
      tRecoedItemheight: 'auto',
      tRecoedItemwidth: 'auto'
    }
  },
  methods: {
    calculateSelfPosition () {
      let childrenList = Array.from(this.$refs.tRecoedItem.parentNode.children)
      for (let i = 0; i < childrenList.length; i++) {
        if (childrenList[i] === this.$refs.tRecoedItem) {
          this.tRecoedItemId = i
        }
      }
      this.$refs.tRecoedItem.setAttribute(`record-key`, this.tRecoedItemId)
      this.tRecoedItemheight = `${String(this.$refs.tRecoedItem.clientHeight)}px`
      this.tRecoedItemwidth = `${String(this.$refs.tRecoedItem.clientWidth)}px`
    }
  },
  watch: {

  }
}
</script>
<style lang="scss" scoped>
  @import './index.scss';
</style>
