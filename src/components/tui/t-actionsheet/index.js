
import Vue from 'vue'
import tActionSheet from './src/index.vue'

let ActionSheetConstructor = Vue.extend(tActionSheet)
let instance

class ActionSheetClass {
  show (list, config) {
    if (!instance) {
      instance = this.init()
      instance.$watch('isShow', (val, olaval) => {
        if (!val) {
          this.close()
        }
      })
    }
    document.body.appendChild(instance.$el)
    if (!list || list.length === 0) {
      console.warn('列表不能为空')
      return false
    }
    Vue.set(instance, 'actionList', list)
    if (config) {
      Vue.set(instance, 'config', config)
    }
    this.open()
  }
  // actionsheet 生成器
  init () {
    return new ActionSheetConstructor({
      el: document.createElement('div')
    })
  }
  // 关闭 actionsheet
  close () {
    Vue.set(instance, 'isShow', false)
    let el = document.getElementById('t-actionsheet')
    setTimeout(() => {
      if (el) {
        document.body.removeChild(el)
      }
    }, 5)
  }
  // 打开 actionsheet
  open () {
    Vue.set(instance, 'isShow', true)
  }
}
export default new ActionSheetClass()
