<template>
  <div class="t-itemswiper">
    <div :class="['item-body', 'h-full', 'w-full', { 'item-border': itemBorder }]"
    @touchstart="tsHandle"
    @touchend="teHandle"
    @touchmove="tmHandle"
    @click="clickHandle"
    :style="{
      transform: 'translateX('+this.transfromX + 'px)',
      backgroundColor: itemBackgroundColor,
      color: itemFontColor
    }" ref="item">
      <slot>
        <div class="item-content">{{itemText}}</div>
      </slot>
    </div>
    <div class="option-right" ref="optionRight" @click="onLeftClick">
      <slot name="right-option">
        <div class="item-option">右边部分</div>
      </slot>
    </div>
    <div class="option-left" ref="optionLeft" @click="onRightClick">
      <slot name="left-option">
        <div class="item-option">左边部分</div>
      </slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'tItemswiper',
  props: {
    itemText: {
      type: String,
      default: 'itemswiper'
    },
    itemBackgroundColor: String,
    itemFontColor: String,
    itemBorder: {
      type: Boolean,
      default: true
    },
    lockLeftSwiper: Boolean,
    lockRightSwiper: Boolean,
    scrollerToLeftEnd: Boolean,
    scrollerToRight: Boolean
  },
  created () {
  },
  mounted () {
    this.optionRightClientWidth = this.$refs.optionRight.clientWidth
    this.optionLeftClientWidth = this.$refs.optionLeft.clientWidth
    this.refItem = this.$refs.item
    this.lockLeft = this.lockLeftSwiper || Number(this.optionLeftClientWidth) === 0
    this.lockRight = this.lockRightSwiper || Number(this.optionRightClientWidth) === 0
    if (this.scrollerToLeftEnd && !this.lockLeft) {
      this.transfromX = -this.optionRightClientWidth
      this.$emit('onLeftEnd')
    }
    if (this.scrollerToRight && !this.lockRight) {
      this.transfromX = this.optionLeftClientWidth
      this.$emit('onRightEnd')
    }
  },
  data () {
    return {
      transfromX: 0,
      toucheObject: null,
      lockLeft: true,
      lockRight: true,
      refItem: null,
      optionRightClientWidth: 0,
      optionLeftClientWidth: 0
    }
  },
  methods: {
    tsHandle (e) {
      this.toucheObject = e.touches[0]
    },
    tmHandle (e) {
      let touche = e.touches[0]
      if (this.toucheObject) {
        let moveDistance = touche.pageX - this.toucheObject.pageX
        if (Math.abs(moveDistance) > this.refItem.clientWidth / 2) {
          moveDistance = (moveDistance / Math.abs(moveDistance)) * this.refItem.clientWidth / 2
        }
        if (this.optionRightClientWidth > 0 && !this.lockRight) {
          this.transfromX = moveDistance > 0 ? 0 : moveDistance
        }
        if (this.optionLeftClientWidth > 0 && !this.lockLeft) {
          this.transfromX = moveDistance < 0 ? 0 : moveDistance
        }
        if (!this.lockLeft && !this.lockRight) {
          this.transfromX = moveDistance
        }
      } else {
        this.toucheObject = touche
      }
    },
    teHandle (e) {
      this.toucheObject = null
      if (this.transfromX > 0) {
        if (this.optionLeftClientWidth > 0) {
          if (Math.abs(this.transfromX) > this.optionLeftClientWidth / 2) {
            this.transfromX = this.optionLeftClientWidth
            this.$emit('onRightEnd')
          } else {
            this.transfromX = 0
          }
        }
      }
      if (this.transfromX < 0) {
        if (this.optionRightClientWidth > 0) {
          if (Math.abs(this.transfromX) > this.optionRightClientWidth / 2) {
            this.transfromX = -this.optionRightClientWidth
            this.$emit('onLeftEnd')
          } else {
            this.transfromX = 0
          }
        }
      }
    },
    clickHandle () {
      if (this.transfromX !== 0) {
        this.transfromX = 0
      }
      this.$emit('onItemClick')
    },
    onLeftClick () {
      this.$emit('onLeftClick')
    },
    onRightClick () {
      this.$emit('onRightClick')
    }
  },
  watch: {
    lockLeftSwiper (val) {
      this.lockLeft = val
    },
    lockRightSwiper (val) {
      this.lockRight = val
    },
    scrollerToLeftEnd (val) {
      if (val && !this.lockLeft) {
        this.transfromX = -this.optionRightClientWidth
        this.$emit('onLeftEnd')
      } else {
        this.transfromX = 0
      }
    },
    scrollerToRight (val) {
      if (val && !this.lockRight) {
        this.transfromX = this.optionLeftClientWidth
        this.$emit('onRightEnd')
      } else {
        this.transfromX = 0
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
