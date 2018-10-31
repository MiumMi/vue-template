<template>
  <div :class="['t-cell',{
    't-interval-up': borderFlag == 4 || borderFlag == 5,
    't-interval-down': borderFlag == 3 || borderFlag == 5,
    't-no-interval-up': borderFlag == 0 || borderFlag == 2,
    't-no-interval-down': borderFlag == 1 || borderFlag == 2,
  }]" @click="onClick">
    <div class="cell-row tui-row">
      <div class="title">
        <slot>{{title}}</slot>
      </div>
      <div class="desc">{{desc}}</div>
      <div class="value flex-1 t-right">
        <slot name='value'>{{value}}</slot>
      </div>
      <i class="r-arrow" v-show="isLink" :style="this.directionStyle"></i>
      <!-- <img class="arrow-img" src="@/assets/img/common/icon_arow_right@3x.png" alt="" v-if="isImgLink"> -->
    </div>
  </div>
</template>

<script>
export default {
  name: 'tCell',
  props: {
    value: {
      type: String,
      default: ''
    },
    desc: {
      type: String,
      default: ''
    },
    title: {
      type: String,
      default: '标题'
    },
    isImgLink: {
      type: Boolean,
      default: true
    },
    isLink: { // false true
      type: Boolean,
      default: false
    },
    linkDirection: {// right, left, up, down
      type: String,
      default: 'right'
    },
    borderType: { // interval, no-interval
      type: String,
      default: 'no-interval'
    },
    borderWhere: {// up, down, up-down
      type: String,
      default: 'up-down'
    },
    goLink: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      directionMap: new Map([
        [
          'right',
          {
            transform: 'rotate(-45deg)'
          }
        ],
        [
          'left',
          {
            transform: 'rotate(135deg)'
          }
        ],
        [
          'down',
          {
            top: '36%',
            transform: 'rotate(45deg)'
          }
        ],
        [
          'up',
          {
            top: '40%',
            transform: 'rotate(-135deg)'
          }
        ]
      ])
    }
  },
  methods: {
    onClick () {
      if (this.goLink) window.location.href = this.goLink
      this.$emit('onClick')
    }
  },
  computed: {
    directionStyle () {
      return this.directionMap.get(this.linkDirection)
    },
    borderFlag () { // 0: 无间距上面, 1: 无间距下面, 2: 无间距上下, 3: 有间距上面, 4有间距下面, 5有间距上下
      let flag = 0
      flag += this.borderType === 'no-interval' ? 0 : 3
      switch (this.borderWhere) {
        case 'up':
          flag += 0
          break
        case 'down':
          flag += 1
          break
        case 'up-down':
          flag += 2
          break
      }
      return flag
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
