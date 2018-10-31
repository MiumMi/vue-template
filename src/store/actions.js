/**
 * Created by wuwenqian on 2018/06/20.
 */

import * as types from './mutation-types'

// 设置当前tab值
export const tabIndex = ({ commit }, data) => {
  commit(types.TABINDEX, { data })
}
// 控制输入密码框的显隐
export const switchPwd = ({commit}) => {
  commit(types.SWTICHPWD)
}
// 传入密码框的方法
export const setPwdOptions = ({commit}, data) => {
  commit(types.PWDOPTIONS, { data })
}
// 控制银行卡列表的显隐
export const switchBanklist = ({commit}) => {
  commit(types.SWTICHBANKLIST)
}
// 控制toast显隐
export const showToast = ({commit}, data) => {
  commit(types.SHOWTOAST, { data })
}
// 控制登录组件显隐
export const switchLoginCom = ({commit}) => {
  commit(types.SWTICHLOGINCOM)
}
