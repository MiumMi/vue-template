/**
 * Created by SZL on 2017/10/10.
 */
import Vue from 'vue'
import Vuex from 'vuex'
import tabModel from './modules/tabbar'
import pwdModel from './modules/password'
import bankModel from './modules/bank'
import toastModel from './modules/toast'
import loginModel from './modules/login'
import * as actions from './actions'
import * as getters from './getters'

// eslint-disable-next-line
Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  actions,
  getters,
  modules: {
    tabModel,
    pwdModel,
    bankModel,
    toastModel,
    loginModel
  },
  strict: debug
})
