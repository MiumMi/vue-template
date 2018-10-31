<template>
  <div class="t-swiper">
    <div class="t-swiper-container"
      @touchstart="touchstart"
      @touchmove="touchmove"
      @touchend="touchend" ref="swiperContainer">
      <slot></slot>
        <div class="w-full h-full t-swiper-item"
          v-for="(item, index) in showList"
          :key="index"
          :t-data-index="index">
          <img class="h-full w-full t-swiper-img" :src="item.img" alt="" v-if="item.img" />
          <p class="w-full t-swiper-desc" v-if="showDesc">item.desc</p>
        </div>
    </div>
    <div :class="['w-full', 't-swiper-dot-wrapper', `t-swiper-dot-${dotsPosition}`]" v-if="showDots">
      <span class="t-swiper-dot" v-for="(val, index) in startListLen" :key="index">
      </span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'tSwiper',
  props: {
    'list': {
      type: Array,
      default: () => {
        return []
      }
    },
    'direction': {
      type: String,
      default: () => {
        return 'horizontal'
      }
    },
    'loopDirection': {
      type: String,
      default: () => {
        return 'left'
      }
    },
    'showDots': {
      type: Boolean,
      default: () => {
        return true
      }
    },
    'showDesc': {
      type: Boolean,
      defult: () => {
        return true
      }
    },
    'dotsPosition': {
      type: String,
      default: () => {
        return 'center'
      }
    },
    'loop': {
      type: Boolean,
      default: () => {
        return true
      }
    },
    'auto': {
      type: Boolean,
      default: () => {
        return true
      }
    },
    'interval': {
      type: Number,
      default: () => {
        return 3000
      }
    },
    'duration': {
      type: Number,
      default: () => {
        return 0.5
      }
    },
    'threshold': {
      type: Number,
      default: () => {
        return 50
      }
    }
  },
  mounted () {
    this.delay = this.interval
    // 保存初始数据长度
    this.startListLen = this.list.length
    this.showList = [this.list[this.startListLen - 1], ...this.list, this.list[0]]
    // 复制第一张和最后一张
    // this.list.push(this.list[0])
    // this.list.unshift(this.list[this.startListLen - 1])

    this.$nextTick(() => {
      this.init()
    })
  },
  data () {
    return {
      currentIndex: 1,
      distance: 0,
      nodeList: [],
      dotList: [],
      positionList: [],
      offsetList: [],
      startListLen: 0,
      width: 0,
      height: 0,
      startX: null,
      startY: null,
      moveX: null,
      moveY: null,
      endX: null,
      endY: null,
      timer: null,
      delay: 3000,
      showFlag: false,
      showList: []
    }
  },
  methods: {
    // 初始化
    init () {
      if (this.direction === 'horizontal') {
        this.loopDirection = this.loopDirection !== 'left' ? this.loopDirection : 'left'
        this.getBoxWidth()
      } else if (this.direction === 'vertical') {
        this.loopDirection = this.loopDirection !== 'left' ? this.loopDirection : 'up'
        this.getBoxHeight()
      } else {
        return false
      }
      this.$nextTick(() => {
        this.getNodeList()
        this.setActiveClass()
        this.setOffset()
        this.setTransform()
        this.showFlag = true
        this.isAuto()
      })
    },
    // 转换成数组
    conversionArray (list) {
      return Array.prototype.slice.call(list)
    },
    // 获取节点
    getNodeList () {
      this.nodeList = document.querySelectorAll('.t-swiper-item')
      if (this.showDots) {
        this.dotList = document.querySelectorAll('.t-swiper-dot')
      }
    },
    // 获取盒子宽度
    getBoxWidth () {
      this.width = this.$refs.swiperContainer.offsetWidth
      this.distance = this.width
    },
    // 获取盒子高度
    getBoxHeight () {
      this.height = this.$refs.swiperContainer.offsetHeight
      this.distance = this.height
    },
    // 判断是否循环轮播
    isLoop () {
      if (!this.loop) return false
    },
    // 动画结束事件
    transitionEndHandler (e) {
      this.stop()
      this.nodeList[this.currentIndex].removeEventListener('webkitTransitionEnd', this.transitionEndHandler, false)
      if (this.loopDirection === 'right' || this.loopDirection === 'up') {
        this.currentIndex = this.startListLen
      } else {
        this.currentIndex = 1
      }
      // 移除监听事件
      this.reset()
    },
    // 判断是否自动播放, 是的话设置定时器
    isAuto () {
      if (this.auto) {
        this.timer = setTimeout(() => {
          this.move()
        }, this.delay)
      }
    },
    // 设置每个滑动元素相对于当前元素的偏移量
    setOffset () {
      this.offsetList = []
      this.offsetList = this.conversionArray(this.nodeList).map((val, index) => (index - this.currentIndex) * this.distance)
    },
    // 设置点的activeClass
    setActiveClass (current) {
      current = current || this.currentIndex - 1
      this.conversionArray(this.dotList).some((val, index) => {
        // 首先清除掉当前的active
        if (val.className.includes('t-swiper-active')) {
          val.className = 't-swiper-dot'
        }
        if (index === Number(current)) {
          val.className += ' t-swiper-active'
        }
      })
    },
    // 移动元素
    move () {
      this.stop()
      if (this.loopDirection === 'right' || this.loopDirection === 'up') {
        this.currentIndex--
      } else {
        this.currentIndex++
      }
      this.delay = this.interval
      this.go()
    },
    go () {
      if (this.currentIndex >= this.nodeList.length - 1 || this.currentIndex <= 0) {
        this.setOffset()
        this.setTransition()
        this.setTransform()
        this.nodeList[this.currentIndex].addEventListener('webkitTransitionEnd', this.transitionEndHandler, false)
      } else {
        this.setOffset()
        this.setTransition()
        this.setTransform()
        this.setActiveClass()
        this.isAuto()
      }
    },
    clearTransition (val) {
      this.nodeList.forEach((val) => {
        val.style.webkitTransition = 'none'
        val.style.transition = 'none'
      })
    },
    clearTransform (val) {
      this.nodeList.forEach((val) => {
        val.style.webkitTransform = 'none'
        val.style.transform = 'none'
      })
    },
    reset (current) {
      this.delay = this.interval - this.duration * 1000
      // 重新设置点点
      this.setActiveClass(current)
      // 清除掉所有动画及移动
      this.clearTransform()
      this.clearTransition()
      // 重新设置值
      this.setOffset()
      // 偷偷移动，不加动画的那种
      this.setTransform()
      // 再次执行轮播
      this.isAuto()
    },
    // 设置动画
    setTransition (duration) {
      duration = duration || this.duration || 0
      const transition = duration === 0 ? 'none' : `${duration}s ease-in-out`
      this.nodeList.forEach((val) => {
        val.style.webkitTransition = transition
        val.style.transition = transition
      })
    },
    // 开始滑动
    setTransform (offset) {
      offset = offset || 0
      this.nodeList.forEach((val, index) => {
        let distance = this.offsetList[index] + offset
        let transform = `translate3d(${distance}px, 0, 0)`
        if (this.direction === 'vertical') {
          transform = `translate3d(0, ${distance}px, 0)`
        }
        val.style.webkitTransform = transform
        val.style.transform = transform
      })
    },
    // 获取真实移动距离
    getDistance (distance) {
      if (distance > this.distance) {
        distance = this.distance
      } else if (distance < -this.distance) {
        distance = -this.distance
      }
      return distance
    },
    // 触摸开始事件
    touchstart (e) {
      this.stop()
      // 清除掉所有动画及移动
      this.clearTransform()
      this.clearTransition()
      // 防止清除所有偏移量之后，最后一场图片在上面显示
      this.nodeList[this.currentIndex].style.zIndex = '100'
      let [ touchObj ] = e.changedTouches
      this.startX = touchObj.pageX
      this.startY = touchObj.pageY
    },
    // 移动事件
    touchmove (e) {
      let [ touchObj ] = e.changedTouches
      this.moveX = touchObj.pageX
      this.moveY = touchObj.pageY
      let distance = this.direction === 'vertical' ? this.moveY - this.startY : this.moveX - this.startX
      distance = this.getDistance(distance)
      if (Math.abs(distance) > this.threshold) {
        this.setTransform(distance)
      }
      e.preventDefault()
    },
    // 触摸结束事件
    touchend (e) {
      // 清除掉当前的zIndex
      this.nodeList[this.currentIndex].style.zIndex = ''
      let [ touchObj ] = e.changedTouches
      this.endX = touchObj.pageX
      this.endY = touchObj.pageY
      let endDistance = this.direction === 'vertical' ? this.endY - this.startY : this.endX - this.startX
      endDistance = this.getDistance(endDistance)
      if (Math.abs(endDistance) < this.threshold) {
        this.reset()
        return
      }
      if (endDistance > this.threshold) {
        this.currentIndex--
        if (this.currentIndex < 1) {
          this.currentIndex = this.nodeList.length - 2
        }
        this.reset()
      } else if (endDistance < -this.threshold) {
        this.currentIndex++
        if (this.currentIndex > this.nodeList.length - 2) {
          this.currentIndex = 1
        }
        this.reset()
      } else {
        this.go()
      }
      e.preventDefault()
    },
    // 清除定时器
    stop () {
      this.timer && clearTimeout(this.timer)
    }
  }
}
</script>
<style lang="scss" scoped>
  @import './index.scss';
</style>
