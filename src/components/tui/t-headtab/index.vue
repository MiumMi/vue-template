<template>
  <div class="t-headtab" :style="{backgroundColor: backgroundColor}">
    <ul class="list tui-row">
      <li :class="['item', {'active': index === value, 'active-bottom': (activeBottom && index === value)}]" v-for="(item, index) in list" :key="index" @click="onClick(index)">{{item.name}}</li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 't-headtab',
  model: {
    prop: 'value',
    event: 'updateValue'
  },
  props: {
    value: {
      default: 0
    },
    list: {
      type: Array
    },
    backgroundColor: {
      default: '#e8e8e8',
      type: String
    },
    activeBottom: {
      default: true,
      type: Boolean
    }
  },
  data () {
    return {
    }
  },
  methods: {
    onClick (index) {
      this.$emit('onClick', this.list[index])
      this.$emit('updateValue', index)
    },
    onChange (index) {
      if (index !== this.value) {
        this.$emit('onChange', this.list[index])
      }
    }
  },
  watch: {
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
