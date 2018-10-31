/**
 * Created by wuwenqian on 2018/06/20.
 */

// 主页面当前tab
export const getTabIndex = state => state.tabModel.tabIndex
// 获取密码框的显隐
export const getPwdState = state => state.pwdModel.switchPwd
// 获取密码框配置的方法
export const getPwdOptions = state => state.pwdModel.pwdOptions
// 获取银行卡列表的显隐
export const getBankListState = state => state.bankModel.switchBanklist
// 获取登录组件的显隐
export const getLoginComState = state => state.loginModel.switchLoginCom
