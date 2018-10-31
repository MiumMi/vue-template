<template>
  <div class="t-head w-full tui-row" :style="{ backgroundColor: headBackgroundColor}">
    <div class="t-head-icon" v-show="isBack" @click="onBack" :style="{ borderColor: headIconColor }"></div>
    <div class="t-head-back">
      <slot name="backicon"></slot>
    </div>
    <div class="t-head-el left flex-1 t-left"
    :style="{flex: '0 0 ' + leftWidth, minWidth : leftWidth}"
    @click="onClickLeft">
      <slot name="left"></slot>
    </div>
    <div class="t-head-el title t-center"
    :style="{flex: '0 0 ' + titleWidth, minWidth : titleWidth}"
    @click="onClickTitle">
      <slot name="title">
        <div class="text" :style="{ color: headTitleColor }">{{text}}</div>
      </slot>
    </div>
    <div class="t-head-el right flex-1 t-right"
    :style="{flex: '0 0 ' + rightWidth, minWidth : rightWidth}"
    @click="onClickRight">
      <slot name="right"></slot>
    </div>
  </div>
</template>
<script>
export default {
  name: 'tHead',
  props: {
    titleWidth: {
      type: String,
      default: '40%'
    },
    leftWidth: {
      type: String,
      default: '30%'
    },
    rightWidth: {
      type: String,
      default: '30%'
    },
    text: {
      type: String,
      default: '标题'
    },
    isBack: {
      type: Boolean,
      default: true
    },
    headBackgroundColor: String,
    headIconColor: String,
    headTitleColor: String
  },
  created () {},
  data () {
    return {
    }
  },
  methods: {
    onBack () {
      this.$emit('onBack')
    },
    onClickLeft () {
      this.$emit('onClickLeft')
    },
    onClickRight () {
      this.$emit('onClickRight')
    },
    onClickTitle () {
      this.$emit('onClickTitle')
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
