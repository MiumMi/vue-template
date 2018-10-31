<template>
  <button
  :class="['t-button', 'w-full', {'disabled': disabled}, buttonClass]"
  @click="click"
  :style="{ color: buttonFontColor, backgroundColor: buttonColor }">
    <span class="icon"><slot name="icon"></slot></span>
    <span class="text"><slot>{{text ? text: buttonText}}</slot></span>
  </button>
</template>

<script>
const buttonText = '按钮'
export default {
  name: 'tButton',
  props: {
    type: {
      type: String
    },
    text: {
      type: String
    },
    disabled: {
      type: Boolean
    },
    buttonClass: {
      type: String
    },
    buttonFontColor: {
      type: String
    },
    buttonColor: {
      type: String
    }
  },
  data () {
    return {
      buttonText: buttonText
    }
  },
  methods: {
    click () {
      if (this.disabled) return false
      this.$emit('onClick')
    }
  }
}
</script>
<style lang="scss" scoped>
  @import './index.scss';
</style>
