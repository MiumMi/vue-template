<template>
  <div
  :class="['t-tabitem', 'h-full', 'flex-1', {'t-tabitem-active': activeId === id}]"
  ref="tabitem"
  :style="{color: tabItemFontColor, backgroundColor: tabItemBackgroundColor}"
  @click="clickitem">
    <div class="icon" v-show="activeId !== id">
      <slot name="icon"></slot>
    </div>
    <div class="icon" v-show="activeId === id">
      <slot name="activeicon"></slot>
    </div>
    <div class="text">
      <slot>
        {{ text ? text : 'item' }}
      </slot>
    </div>
  </div>
</template>

<script>
import bus from '../js/bus.js'
export default {
  name: 'tTabitem',
  props: {
    text: String,
    tabItemFontColor: String,
    tabItemBackgroundColor: String
  },
  created () {
    bus.$on('tab2item', val => {
      this.activeId = val
    })
  },
  mounted () {
    let parentNode = this.$refs.tabitem.parentNode
    for (let i = 0; i < parentNode.children.length; i++) {
      if (parentNode.children[i] === this.$refs.tabitem) {
        this.id = i
      }
    }
  },
  data () {
    return {
      id: -1,
      activeId: null
    }
  },
  methods: {
    clickitem () {
      bus.$emit('item2tab', this.id)
      this.$emit('onClick')
    }
  },
  watch: {
    activeId (val, olaval) { // 设置onFocus事件
      if (val === this.id) {
        this.$emit('onFocus')
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
