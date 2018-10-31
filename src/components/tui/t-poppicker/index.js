
import Vue from 'vue'
import tPopPicker from './src/index.vue'
import bus from '../js/bus'

// 关闭状态
export const CANCEL = 'CANCEL'
export const FINISH = 'FINISH'
export const RUN = 'RUN'

// poptype
export const NORMALPOP = 'NORMALPOP'
export const PARENTPOP = 'PARENTPOP'

let PopPickerConstructor = Vue.extend(tPopPicker)
let instance = null
let popType = NORMALPOP
class Poppicker {
  constructor () {
    this.kepMap = new Map()
    this.parentMap = new Map()
    this.firstList = []
  }
  show (config, cb, cancelcb) {
    if (!instance) {
      instance = this.initPopPick()
      instance.$watch('isShow', (newVal, oldVal) => {
        if (!newVal && instance.$data.closeState === FINISH) {
          let _list = []
          instance.$data.val.forEach(d => _list.push(d.val))
          cb && cb(_list)
        } else if (!newVal && instance.$data.closeState === CANCEL) {
          cancelcb && cancelcb()
        }
      })
      bus.$on('popwatch', ({ data }) => {
        let list = []
        let flag = false
        list.push(this.firstList)
        for (let i = 0; i < data.length; i++) {
          if (!data[i]) {
            flag = true
            break
          } else {
            this.parentMap.has(data[i].key) ? list.push(this.parentMap.get(data[i].key)) : flag = true
          }
        }
        if (flag) {
          list = this.getChildrenList(list, list[list.length - 1][0].key, this.parentMap)
        }
        Vue.set(instance, 'list', list)
      })
    }
    document.body.appendChild(instance.$el)
    if (!config.list) {
      console.warn('您未注入任何数组')
      return false
    }
    this.clearMap()
    let list = []
    let initval = []
    if (config.type && config.type.toUpperCase() === PARENTPOP) {
      popType = PARENTPOP
      config.list.forEach(d => {
        this.kepMap.set(d.key, d)
        if (d.parent && String(d.parent) !== '0') {
          let _list = this.parentMap.has(d.parent) ? this.parentMap.get(d.parent) : []
          _list.push(d)
          this.parentMap.set(d.parent, _list)
        } else {
          this.firstList.push(d)
        }
      })
      list = this.getParentList(this.firstList, this.parentMap)
      if (config.init && config.init.length > 0) {
        let vallist = []
        let firstVal = config.init[0]
        this.firstList.forEach(d => {
          if (d.val === firstVal) {
            vallist.push(d)
          }
        })
        while (vallist.length > 1) {
          vallist.splice(-1, 1)
        }
        let targetVal = vallist[0]
        let index = 1
        while (this.parentMap.get(targetVal.key) && config.init.length > index) {
          let mapval = this.parentMap.get(targetVal.key)
          mapval.forEach(d => {
            if (d.val === config.init[index]) {
              vallist.push(d)
              targetVal = d
              index++
            }
          })
        }
        initval = vallist
        let _list = []
        let data = vallist
        let flag = false
        _list.push(this.firstList)
        for (let i = 0; i < data.length; i++) {
          if (!data[i]) {
            flag = true
            break
          } else {
            this.parentMap.has(data[i].key) ? _list.push(this.parentMap.get(data[i].key)) : flag = true
          }
        }
        if (flag) {
          _list = this.getChildrenList(_list, _list[_list.length - 1][0].key, this.parentMap)
        }
        list = _list
      }
    } else {
      popType = NORMALPOP
      let childrenMapList = []
      config.list.forEach(array => {
        let childrenList = []
        let childrenMap = new Map()
        array.forEach((d, i) => {
          childrenList.push(this.getUnit(i, d))
          childrenMap.set(d, this.getUnit(i, d))
        })
        list.push(childrenList)
        childrenMapList.push(childrenMap)
      })
      if (config.init && config.init.length > 0) {
        let vallist = []
        config.init.forEach((d, i) => {
          let map = childrenMapList[i]
          vallist.push(map.get(d))
        })
        initval = vallist
      }
    }
    Vue.set(instance, 'list', list)
    Vue.set(instance, 'isShow', true)
    Vue.set(instance, 'closeState', RUN)
    Vue.set(instance, 'popType', popType)
    Vue.set(instance, 'initval', initval)
  }
  initPopPick () {
    return new PopPickerConstructor({
      el: document.createElement('div')
    })
  }
  close () {
    this.clearMap()
    Vue.set(instance, 'isShow', false)
    Vue.set(instance, 'closeState', CANCEL)
    let el = document.getElementById('t-poppicker')
    setTimeout(() => {
      if (el) {
        document.body.removeChild(el)
      }
    }, 500)
  }
  clearMap () {
    this.kepMap.clear()
    this.parentMap.clear()
    this.firstList = []
  }
  getUnit (key, val) {
    return {val, key}
  }
  getParentList (firstList, parentMap) {
    let list = []
    list.push(firstList)
    return this.getChildrenList(list, firstList[0].key, parentMap)
  }
  getChildrenList (list, key, parentMap) {
    if (parentMap.has(key)) {
      let _list = parentMap.get(key)
      list.push(_list)
      return this.getChildrenList(list, _list[0].key, parentMap)
    } else {
      return list
    }
  }
}
export default new Poppicker()
