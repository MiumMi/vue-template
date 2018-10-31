<template>
  <div class="tui-row w-full h-full t-steps-item" ref="stepsItem">
    <div class="t-steps-icon">
      <span :class="['t-steps-line', 't-prevline', {'t-success-line': success}]" v-if="step !== 'first'" :style="preveLineStyle"></span>
      <span :class="['t-steps-line', 't-nextline', {'t-success-line': success}]" v-if="step !== 'last'" :style="nextLineStyle"></span>
      <img src="./img/success@3x.png" alt="" class="t-steps-icon"/>
      <slot name="icon"></slot>
    </div>
    <div>
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 't-steps-item',
  props: {
    'step': {
      type: String,
      default: () => {
        return 'other'
      }
    },
    'success': {
      type: Boolean,
      default: () => {
        return false
      }
    }
  },
  data () {
    return {
      nextLineStyle: {},
      preveLineStyle: {},
      prevHeight: ''
    }
  },
  mounted () {
    this.updateStepLine()
  },
  methods: {
    updateStepLine () {
      this.$nextTick(() => {
        const stepsItem = this.$refs.stepsItem
        const icon = stepsItem.getElementsByClassName('t-steps-icon')[0]
        const iconWidth = icon.offsetWidth
        const iconHeight = icon.offsetHeight
        const nowHeight = stepsItem.offsetHeight
        this.nextLineStyle = {
          top: `${iconHeight / 2}px`,
          left: `${iconWidth / 2}px`,
          height: `${nowHeight / 2}px`
        }
        this.preveLineStyle = {
          left: `${iconWidth / 2}px`
        }
        this.prevHeight = iconHeight / 2
      })
    }
  }
}
</script>
<style lang="scss" scoped>
  @import './index.scss';
</style>
