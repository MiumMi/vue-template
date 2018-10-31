/**
 * Created by wuwenqian on 2018/06/20.
 */
import * as types from '../mutation-types'
import { tToast } from 'tui'

const state = {
  text: '修改成功',
  toastOptions: {
    time: 1000,
    styleOption: `width: 36.26%`
  }
}

/* eslint-disable */
const mutations = {
  [types.SHOWTOAST] (state, { data }) {
    let options = JSON.parse(JSON.stringify(state.toastOptions))
    options = data && data.options ? Object.assign(options, data.options) : options
    const text = data && data.text ? data.text : state.text
    setTimeout(() => {
      tToast.show(text, options)
    }, 1)
    // state.tabIndex = data
  }
}
/* eslint-enable */

export default {
  state,
  mutations
}
