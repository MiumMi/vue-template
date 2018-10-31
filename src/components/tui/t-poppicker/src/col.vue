<template>
    <div class="t-poppicker-col t-center flex-1"
      @touchstart="tsHandle"
      @touchend="teHandle"
      @touchmove="tmHandle">
      <div class="scroller-body"
        :style="{
          transform: 'translate3d(0 ,' + this.transfromY + 'px, 0)',
          transition: transitionAnimate
        }"
        ref="scroller">
        <div class="t-poppicker-item" v-for="(item, index) in list" :key="index">{{item.val}}</div>
      </div>
    </div>
</template>

<script>
import bus from '../../js/bus'
const transitionText = 'transform .5s ease-out'

export default {
  name: 'tPopPickerCol',
  props: {
    index: {
      type: Number,
      default: 0
    },
    list: {
      type: Array
    },
    initval: Object
  },
  created () {
    bus.$on('resetCol', () => {
      this.reset()
    })
  },
  destroyed () {
    bus.$off('resetCol')
  },
  mounted () {
    this.tPopCol = this.$refs.scroller
    this.childrenNumber = this.tPopCol.children.length
    this.standarHeight = this.tPopCol.children[0].clientHeight
    this.maxScrollTop = this.standarHeight * (this.childrenNumber - 1)
    if (this.initval) {
      this.list.forEach((d, i) => {
        if (this.initval.key && d.key === this.initval.key) {
          this.selectIndex = i
          this.transfromY = this.initY = -this.standarHeight * i
        }
      })
    }
  },
  data () {
    return {
      toucheObject: null,
      transfromY: 0,
      initY: 0,
      tPopCol: null,
      tPopChildrenPositionArray: [],
      standarHeight: 0,
      childrenNumber: 0,
      maxScrollTop: 0,
      selectIndex: 0,
      transitionAnimate: transitionText
    }
  },
  methods: {
    tsHandle (e) {
      e.stopPropagation()
      e.preventDefault()
      this.toucheObject = e.touches[0]
      this.transitionAnimate = 'none'
    },
    tmHandle (e) {
      e.stopPropagation()
      e.preventDefault()
      let touche = e.touches[0]
      let moveDistance = touche.pageY - this.toucheObject.pageY
      this.transfromY = this.initY + moveDistance
    },
    teHandle (e) {
      e.stopPropagation()
      e.preventDefault()
      let gapTop = 0
      for (let i = 0; i < this.childrenNumber; i++) {
        gapTop -= this.standarHeight
        if (gapTop < this.transfromY - this.standarHeight / 2) {
          this.selectIndex = i
          this.transfromY = gapTop + this.standarHeight
          break
        }
      }
      if (this.transfromY > 0) {
        this.transfromY = 0
        this.selectIndex = 0
      }
      if (this.transfromY < -this.maxScrollTop) {
        this.transfromY = -this.maxScrollTop
        this.selectIndex = this.list.length - 1
      }
      this.initY = this.transfromY
      this.transitionAnimate = transitionText
    },
    reset () {
      this.selectIndex = 0
      this.initY = 0
      this.transfromY = 0
    }
  },
  watch: {
    selectIndex (val, oldval) {
      if (val !== oldval) bus.$emit('colToPop', { index: this.index, val: this.list[val] })
    },
    list (val, oldval) {
      if (oldval && oldval.length > 0) {
        let diffFlag = false
        val.forEach((d, i) => {
          if (d.val !== oldval[i]) {
            diffFlag = true
          }
        })
        if (diffFlag) {
          this.reset()
        }
      }
    }
  }
}
</script>
<style lang="scss" scoped>
  @import './index.scss';
  @import '../../style/_reset.scss';
  @import '../../style/_color.scss';
  @import '../../style/_calculate.scss';
  @import '../../style/_base.scss';
  @import '../../style/_layout.scss';
  @import '../../style/_animate.scss';
</style>
