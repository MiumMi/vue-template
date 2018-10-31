<template>
  <div class="t-step" ref="steps">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 't-step',
  mounted () {
    this.updatedLine()
  },
  methods: {
    updatedLine () {
      this.$nextTick(() => {
        const steps = this.$refs.steps
        const stepsItem = steps.getElementsByClassName('t-steps-item')
        const prevStepsHeight = []
        Array.from(stepsItem).forEach((val, index) => {
          prevStepsHeight.push(val.offsetHeight)
          if (index !== 0 && prevStepsHeight.length > 0) {
            const prevline = val.getElementsByClassName('t-prevline')[0]
            const height = prevStepsHeight[index - 1] / 2
            // const top = prevline.style.top
            prevline.style.cssText = `height:${height}px;top:${-height}px;`
          }
        })
      })
    }
  }
}
</script>
<style lang="scss" scoped>
  @import './index.scss';
</style>
