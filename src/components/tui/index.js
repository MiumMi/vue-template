/*
* @Author: tang
* @Date: 2018-1-30
* @Last Modified: tang
*/

/*
* @Author: tang
* @Date: 2018-1-30
* @Last Modified: tang
* @Method: js方法的组件
*/
import tActionSheet from './t-actionsheet/index.js'
import tMessage from './t-message/index.js'
import tPoppicker from './t-poppicker/index.js'
import tToast from './t-toast/index.js'

/*
* @Author: tang
* @Date: 2018-1-30
* @Last Modified: tang
* @Method: css组件
*/

// 使用了chuckName 依赖于vue-router
const tButton = () => import(/* webpackChunkName: "group-tui" */ './t-button/index.vue')
const tCell = () => import(/* webpackChunkName: "group-tui" */ './t-cell/index.vue')
const tHead = () => import(/* webpackChunkName: "group-tui" */ './t-head/index.vue')
const tInput = () => import(/* webpackChunkName: "group-tui" */ './t-input/index.vue')
const tItemswiper = () => import(/* webpackChunkName: "group-tui" */ './t-itemswiper/index.vue')
const tRecord = () => import(/* webpackChunkName: "group-tui" */ './t-record/index.vue')
const tRecorditem = () => import(/* webpackChunkName: "group-tui" */ './t-recorditem/index.vue')
const tTab = () => import(/* webpackChunkName: "group-tui" */ './t-tab/index.vue')
const tTabitem = () => import(/* webpackChunkName: "group-tui" */ './t-tabitem/index.vue')
const tHeadtab = () => import(/* webpackChunkName: "group-tui" */ './t-headtab/index.vue')
const tFullHeadtab = () => import(/* webpackChunkName: "group-tui" */ './t-fullheadtab/index.vue')
const tSwiper = () => import(/* webpackChunkName: "group-tui" */ './t-swiper/index.vue')
const tSwiperItem = () => import(/* webpackChunkName: "group-tui" */ './t-swiperItem/index.vue')
const tSteps = () => import(/* webpackChunkName: "group-tui" */ './t-steps/index.vue')
const tStepsItem = () => import(/* webpackChunkName: "group-tui" */ './t-stepsItem/index.vue')

export {
  tActionSheet,
  tButton,
  tCell,
  tHead,
  tInput,
  tItemswiper,
  tMessage,
  tPoppicker,
  tRecord,
  tRecorditem,
  tTab,
  tTabitem,
  tToast,
  tHeadtab,
  tFullHeadtab,
  tSwiper,
  tSwiperItem,
  tSteps,
  tStepsItem
}
