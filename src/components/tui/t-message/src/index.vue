<template>
  <transition name="fade">
    <div class="t-message" v-if="isShow">
      <div class="mask" @click="maskClose"></div>
      <div class="body">
        <p class="body-title" v-if="option.title">{{option.title}}</p>
        <div class="body-text big-f" v-html="option.text"></div>
        <div class="body-bottom tui-row">
          <div v-if="option.type == 'double'"
          class="button cancel-button mid-f flex-1"
          :style="{color: option.cancelColor}"
          @click="cancelFunc">
            {{option.cancelText}}
          </div>
          <div class="button confime-button mid-f flex-1"
          :style="{color: option.confirmColor}"
          @click="comfirmFunc">
            {{option.confirmText}}
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
const confirmText = '确认'
const cancelText = '取消'
export default {
  name: 'tMessage',
  data () {
    return {
      option: {
        title: '',
        text: '',
        confirmText: confirmText,
        cancelText: cancelText,
        confirmColor: '',
        cancelColor: '',
        type: 'double' // single, 一个按钮， double两个按钮
      },
      isShow: false,
      actionType: ''
    }
  },
  methods: {
    doClose () {
      this.isShow = false
    },
    comfirmFunc () {
      this.actionType = 'comfirm'
      this.doClose()
    },
    cancelFunc () {
      this.actionType = 'cancel'
      this.doClose()
    },
    maskClose () {
      this.actionType = ''
      this.doClose()
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
