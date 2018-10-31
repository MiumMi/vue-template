// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
/* eslint-disable */
import App from './App'
import router from './router'
import store from './store'
import directive from './directive/index'
import { vuemixin } from './vuemixin/allmixin'
import api from './api/ajax'
import chart from './lib/chart'
import help from './lib/service'
import {
  /* eslint-disable no-unused-vars */
  Button,
  Scroll,
  Radio,
  Picker,
  DatePicker,
  CascadePicker,
  Switch,
  Loading
} from 'cube-ui'
Vue.use(Button)
Vue.use(Scroll)
Vue.use(Radio)
Vue.use(Picker)
Vue.use(DatePicker)
Vue.use(CascadePicker)
Vue.use(Switch)
Vue.use(Loading)
Vue.use(directive, {
  upColor: '#FF5941',
  downColor: '#5BAE00',
  defaultColor: '#333'
})
Vue.prototype.$chart = chart
Vue.prototype.$help = help
Vue.prototype.$api = api

Vue.mixin(vuemixin)

Vue.config.productionTip = false


new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
/* eslint-enable */
