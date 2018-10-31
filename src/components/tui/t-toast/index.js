
import Vue from 'vue'
import tToast from './src/index.vue'

let ToastConstructor = Vue.extend(tToast)
let instance
let toastOption = {
  showSucc: true,
  showLoading: false,
  autoClose: true,
  time: 2000,
  toastHtml: '',
  styleOption: {
    width: '60%'
  }
}

class ToastClass {
  // 入参 text, option
  show (text, option) {
    if (!instance) {
      instance = this.init()
      document.body.appendChild(instance.$el)
    }
    if (!(text && text !== '')) return false
    let optionDefault = JSON.parse(JSON.stringify(toastOption))
    if (option) {
      optionDefault = Object.assign(optionDefault, option)
    }
    Vue.set(instance, 'text', text)
    Vue.set(instance, 'isShow', true)
    let { toastHtml, styleOption, time, autoClose, showSucc, showLoading } = optionDefault
    // option配置项目
    Vue.set(instance, 'toastHtml', toastHtml)
    Vue.set(instance, 'styleOption', styleOption)
    Vue.set(instance, 'showSucc', showSucc)
    Vue.set(instance, 'showLoading', showLoading)
    if (autoClose) {
      setTimeout(() => this.close(), time)
    }
  }
  // toast 生成器
  init () {
    return new ToastConstructor({
      el: document.createElement('div')
    })
  }
  // 关闭 toast
  close () {
    Vue.set(instance, 'isShow', false)
  }
}
export default new ToastClass()
