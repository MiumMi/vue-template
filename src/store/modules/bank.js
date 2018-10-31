/**
 * Created by wuwenqian on 2018/06/25.
 */
import * as types from '../mutation-types'

const state = {
  switchBanklist: false
}

/* eslint-disable */
const mutations = {
  [types.SWTICHBANKLIST] (state) {
    state.switchBanklist = !state.switchBanklist
  }
}
/* eslint-enable */
export default {
  state,
  mutations
}
