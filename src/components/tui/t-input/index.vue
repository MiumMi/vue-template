<template>
  <div class="t-input tui-row">
    <slot name="prefix"></slot>
    <input class="input flex-1"
    ref="input"
    v-model="inputVal"
    :disabled="disabled"
    :type="type"
    :placeholder="placeholder"
    @keyup="keyup"
    @keydown="keydown"
    @onchang="onchange"
    />
    <slot name="suffix"></slot>
  </div>
</template>

<script>
// 这个组件的修订可能不是那么的好 希望后续开发的人员可以看看该如何修订
export default {
  name: 'tInput',
  model: {
    prop: 'value',
    event: 'updateValue'
  },
  props: {
    value: {
      default: null
    },
    disabled: {
      type: Boolean,
      default: false
    },
    type: {
      type: String,
      default: 'text'
    },
    placeholder: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      inputVal: null
    }
  },
  methods: {
    keyup (event) {
      this.$emit('onKeyup', event)
    },
    keydown (event) {
      this.$emit('onKeydown', event)
    },
    onchange (event) {
      this.$emit('onChange', event)
    }
  },
  watch: {
    inputVal (val, oldval) {
      this.$emit('updateValue', val)
    },
    value (val) {
      this.inputVal = val
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
