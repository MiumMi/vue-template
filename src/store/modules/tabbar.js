/**
 * Created by wuwenqian on 2018/06/20.
 */
import * as types from '../mutation-types'

const state = {
  tabIndex: 'tab1'
}

/* eslint-disable */
const mutations = {
  [types.TABINDEX] (state, { data }) {
    state.tabIndex = data
  }
}
/* eslint-enable */

export default {
  state,
  mutations
}
