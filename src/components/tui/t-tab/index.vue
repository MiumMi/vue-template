<template>
  <div
  :class="['t-tab', 'w-full', 'tui-row', {'t-tab-border': typeof border == 'string'} ]"
  :style="{backgroundColor: tabBackgroundColor}">
    <slot></slot>
  </div>
</template>

<script>
import bus from '../js/bus.js'
export default {
  name: 'tTab',
  props: {
    focusitem: {
      type: Number,
      default: 0
    },
    border: String,
    tabBackgroundColor: String
  },
  model: {
    prop: 'focusitem',
    event: 'change'
  },
  created () {
    bus.$on('item2tab', val => this.itemChange(val))
  },
  beforeDestroy () {
    bus.$off('item2tab')
  },
  mounted () {
    this.activeId = this.focusitem
    bus.$emit('tab2item', this.focusitem)
  },
  data () {
    return {
      activeId: 0
    }
  },
  methods: {
    itemChange (val) {
      if (val === this.activeId) return false
      this.activeId = val
      this.$emit('change', this.activeId)
      this.$emit('onChange', this.activeId)
    }
  },
  watch: {
    focusitem (val, oldval) {
      if (val !== oldval) {
        bus.$emit('tab2item', val)
      }
    }
  }
}
</script>
<style lang="scss" scoped>
  @import '../style/_reset.scss';
  @import '../style/_color.scss';
  @import '../style/_calculate.scss';
  @import '../style/_base.scss';
  @import '../style/layout.scss';
  @import './index.scss';
</style>
