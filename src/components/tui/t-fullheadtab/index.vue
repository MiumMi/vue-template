<template>
  <div class="t-fullheadtab" :style="{backgroundColor: backgroundColor}">
    <ul class="list tui-row">
      <li :class="['item', {'active': index === value, 'active-bottom': (activeBottom && index === value)}]"
      :style="{width: itemWidth, flex: `0 0 ${itemWidth}` }"
      v-for="(item, index) in list" :key="index"
      @click="onClick(index)">{{item.name}}</li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 't-fullheadtab',
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
      this.onChange(index)
      this.$emit('onClick', this.list[index])
      this.$emit('updateValue', index)
    },
    onChange (index) {
      if (index !== this.value) {
        this.$emit('onChange', this.list[index])
      }
    }
  },
  computed: {
    itemWidth () {
      return this.list ? `${100 / this.list.length}%` : '100%'
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
