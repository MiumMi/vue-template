<template>
    <div id="t-poppicker" class="t-poppicker t-center">
      <transition name="fade">
        <div class="mask" v-if="isShow" @click="colse(CANCEL)"></div>
      </transition>
      <transition name="transform-up">
        <div class="body" v-if="isShow">
          <div class="poppick-head tui-row">
            <p @click="colse(CANCEL)">取消</p>
            <p class="pl-20" @click="reset">重置</p>
            <p class="flex-1 t-right" @click="finish">完成</p>
          </div>
          <div class="poppick-body tui-row">
            <pipcker-col v-for="(colList, index) in list" :index="index" :list="colList" :key="index" :initval="initval ? initval[index] : {} "></pipcker-col>
          </div>
        </div>
      </transition>
    </div>
</template>

<script>
import bus from '../../js/bus'
import col from './col'
import {CANCEL, FINISH, RUN, NORMALPOP, PARENTPOP} from '../index.js'

export default {
  name: 'tPopPicker',
  components: {
    'pipcker-col': col
  },
  created () {
    bus.$on('colToPop', data => {
      if (!this.val) this.val = new Array(this.list.length)
      this.val[data.index] = data.val
      let val = this.val.slice(0)
      this.val = val.slice(0)
    })
    if (this.initval) {
      this.val = this.initval
    }
  },
  destroyed () {
    bus.$off('colToPop')
  },
  mounted () {
  },
  data () {
    return {
      isShow: false,
      list: [],
      val: null,
      initval: null,
      popType: NORMALPOP,
      closeState: CANCEL,
      CANCEL: CANCEL,
      FINISH: FINISH,
      RUN: RUN
    }
  },
  methods: {
    colse (state) {
      this.closeState = state
      this.isShow = false
      setTimeout(() => document.body.removeChild(document.getElementById('t-poppicker')), 500)
    },
    reset () {
      if (!this.val) this.val = new Array(this.list.length)
      this.list.forEach((d, i) => {
        this.val[i] = d[0]
      })
      this.val = this.val.slice(0)
      bus.$emit('resetCol')
    },
    finish () {
      if (this.val) {
        for (let i = 0; i < this.val.length; i++) {
          if (!this.val[i]) {
            this.val[i] = this.list[i][0]
          }
        }
        this.val = this.val.slice(0)
      } else {
        this.reset()
      }
      this.colse(FINISH)
    }
  },
  watch: {
    val: {
      deep: true,
      handler: function (newVal, oldVal) {
        if (this.popType === PARENTPOP) {
          bus.$emit('popwatch', {data: newVal})
        }
      }
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
