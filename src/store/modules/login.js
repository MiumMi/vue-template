/**
 * Created by wuwenqian on 2018/06/25.
 */
import * as types from '../mutation-types'

const state = {
  switchLoginCom: false
}

/* eslint-disable */
const mutations = {
  [types.SWTICHLOGINCOM] (state) {
    state.switchLoginCom = !state.switchLoginCom
  }
}
/* eslint-enable */
export default {
  state,
  mutations
}
