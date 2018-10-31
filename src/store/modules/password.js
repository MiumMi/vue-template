/**
 * Created by wuwenqian on 2018/06/25.
 */
import * as types from '../mutation-types'

const state = {
  switchPwd: false,
  pwdOptions: {}
}

/* eslint-disable */
const mutations = {
  [types.SWTICHPWD] (state) {
    state.switchPwd = !state.switchPwd
  },
  [types.PWDOPTIONS] (state, { data }) {
    state.pwdOptions = data
  }
}
/* eslint-enable */
export default {
  state,
  mutations
}
