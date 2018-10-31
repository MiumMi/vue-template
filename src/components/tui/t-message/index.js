
import Vue from 'vue'
import tMessage from './src/index.vue'

let MessageConstructor = Vue.extend(tMessage)
let instance
let msgList = []
const confirmText = '确认'
const cancelText = '取消'

class MessageClass {
  show (option, cb, cancelcb) {
    if (!instance) {
      instance = this.initTyMessage()
      instance.$watch('isShow', (val, oldval) => {
        if (!val && msgList && msgList.length > 0) {
          let msgHandle = msgList[0]
          msgList.splice(0, 1)
          if (instance.$data.actionType === 'comfirm') {
            msgHandle.cb && msgHandle.cb()
          }
          if (instance.$data.actionType === 'cancel') {
            msgHandle.cancelcb && msgHandle.cancelcb()
          }
          if (msgList.length > 0) {
            this.openMsg()
          }
        }
      })
    }
    document.body.appendChild(instance.$el)
    if (typeof option === 'object') {
      msgList.push({...option, cb, cancelcb})
    } else if (typeof option === 'string') {
      msgList.push({text: option, cb, cancelcb})
    }
    if (!instance.$data.isShow) {
      this.openMsg(option)
    }
  }
  initTyMessage () {
    return new MessageConstructor({
      el: document.createElement('div')
    })
  }
  newTemplate () {
    return {
      title: '',
      text: '', // 弹窗体内部的文案
      confirmText: confirmText,
      cancelText: cancelText,
      confirmColor: '',
      cancelColor: '',
      type: 'single' // single, 一个按钮， double两个按钮
    }
  }
  openMsg () {
    Vue.set(instance, 'isShow', true)
    Vue.set(instance, 'option', Object.assign({}, this.newTemplate(), msgList[0]))
  }
}
export default new MessageClass()
