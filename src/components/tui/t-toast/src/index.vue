<template>
  <transition name="fade">
    <div class="t-toast" v-if="isShow">
      <section class="body"
      :style="styleOption">
        <div v-html="toastHtml"></div>
        <!-- <img class="succedImg" src="@/assets/img/common/icon_succed@3x.png" alt="" v-if="showSucc"> -->
        <cube-loading :size="40" class="loading" v-if="showLoading"></cube-loading>
        <p class="toast-text">{{text}}</p>
      </section>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'tToast',
  data () {
    return {
      showLoading: false,
      showSucc: true,
      isShow: false,
      text: '',
      toastHtml: '',
      styleOption: {}
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
