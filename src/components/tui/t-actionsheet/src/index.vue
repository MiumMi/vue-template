<template>
    <div id="t-actionsheet" class="t-actionsheet">
      <transition name="fade">
        <div class="mask" v-if="isShow" @click="close()"></div>
      </transition>
      <transition name="transform-up">
        <div class="body">
          <div class="actionsheet-config pa-32">
            <p class="actionsheet-title" v-if="config.title" v-html="config.title"></p>
            <p class="actionsheet-desc" v-if="config.desc" v-html="config.desc"></p>
          </div>
          <ul v-if="isShow">
            <li class="item" v-for="(item, index) in actionList" :key="index" @click="action(item)">
              <span v-if="!item.innerhtml">{{item.title ? item.title : 'name'}}</span>
              <div v-if="item.innerhtml" v-html="item.innerhtml"></div>
            </li>
            <li class="item cancel" @click="close()">{{btnText}}</li>
          </ul>
        </div>
      </transition>
    </div>
</template>

<script>
const CANCEL = '取消'
export default {
  name: 'tActionSheet',
  data () {
    return {
      config: {},
      btnText: CANCEL,
      isShow: false,
      actionList: []
    }
  },
  methods: {
    action (item) {
      item.handle && item.handle()
      this.close()
    },
    close () {
      this.isShow = false
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
