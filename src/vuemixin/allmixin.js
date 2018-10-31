import { tMessage } from 'tui'
const jobData = [
  {text: '党政机关/事业单位', value: '党政机关/事业单位'},
  {text: '金融', value: '金融'},
  {text: '企业单位', value: '企业单位'},
  {text: '制造业', value: '制造业'}
]
const education = [
  {text: '初中及以下', value: '初中及以下'},
  {text: '高中/大专', value: '高中/大专'},
  {text: '大专/本科', value: '大专/本科'},
  {text: '硕士及以上', value: '硕士及以上'}
]
const addressData = [
  {
    value: '北京市',
    text: '北京市',
    children: [
      {
        value: '北京市',
        text: '北京市',
        children: [{ value: '东城区', text: '东城区' }, { value: '西城区', text: '西城区' }]
      }
    ]
  },
  {
    value: '天津市',
    text: '天津市',
    children: [
      {
        value: '天津市',
        text: '天津市',
        children: [{ value: '东城区', text: '东城区' }, { value: '西城区', text: '西城区' }]
      }
    ]
  },
  {
    value: '河北省',
    text: '河北省',
    children: [
      {
        value: '河北省',
        text: '河北省',
        children: [{ value: '东城区', text: '东城区' }, { value: '西城区', text: '西城区' }]
      }
    ]
  }
]
const crsData = [
  {text: '仅为中国税收居民', value: '0'},
  {text: '既是中国居民也是其他国家(地区)税收居民', value: '1'},
  {text: '仅为非中国税收居民', value: '2'}
]
const noTaxData = [
  {text: '税收居民国(地区)不发放', value: '0'},
  {text: '未取得纳税人识别号', value: '1'}
]
let cycleData = [
  {
    value: '每周',
    text: '每周',
    children: [
      {
        value: '周一',
        text: '周一'
      },
      {
        value: '周二',
        text: '周二'
      },
      {
        value: '周三',
        text: '周三'
      },
      {
        value: '周四',
        text: '周四'
      },
      {
        value: '周五',
        text: '周五'
      }
    ]
  }
]
let children = []
for (let i = 1; i <= 30; i++) {
  children.push({
    value: `${i}号`,
    text: `${i}号`
  })
}
const month = {
  value: '每月',
  text: '每月',
  children: children
}
cycleData.push(month)

export const vuemixin = {
  data () {
    return {
      jobPicker: null,
      datePicker: null,
      addressPicker: null,
      crsPicker: null,
      eduPicker: null
    }
  },
  created () {
  },
  methods: {
    routerPush (name, params, query) {
      params = params || {}
      query = query || {}
      this.$router.push({ name, params, query })
    },
    routerReplace (name, params, query) {
      params = params || {}
      query = query || {}
      this.$router.replace({ name, params, query })
    },
    cusService () {
      tMessage.show({
        text: `<p class="call-message PM-font" v-bold>400-820-0860</p>
          <p class="call-message-small">客服电话:交易日9:00-17:00</p>`,
        type: 'double',
        confirmText: '呼叫'
      }, () => {
      }, () => {
      })
    },
    goToForget () {
      const bind = false
      if (bind) {
        this.routerPush('bindForget')
      } else {
        this.routerPush('unbindForget')
      }
    },
    goToPhone () {
      const bind = true
      if (bind) {
        this.routerPush('phoneCode')
      } else {
        this.routerPush('resetPhone')
      }
    },
    goBack () {
      this.$router.go(-1)
    },
    openPwd (options) {
      // optionos: {
      //  title: String
      //  confirmCallBack: Function
      //  cancelCallBack: Function
      // }
      this.$store.dispatch('switchPwd')
      this.$store.dispatch('setPwdOptions', options)
    },
    fixedNum (num, decimal, str) { // 保留了几位小数
      num = Number(num)
      str = str || ''
      if (!num || Object.is(num, NaN)) {
        return '0.'.padEnd(decimal * 1 + 2, 0) + str
      }
      return num.toFixed(decimal) + str
    },
    showJobPicker (selectCb, cancelCb) {
      if (!this.jobPicker) {
        this.jobPicker = this.$createPicker({
          title: '请选择您的职业',
          data: [jobData],
          onSelect: (selectedVal, selectedIndex, selectedText) => {
            selectCb && selectCb(selectedVal, selectedIndex, selectedText)
          },
          onCancel: () => {
            cancelCb && cancelCb()
          }
        })
      }
      this.jobPicker.show()
    },
    showDatePicker (selectCb, cancelCb, { title = '请选择证件有效期', singal = true } = {title: '请选择证件有效期', singal: true}) {
      if (!this.datePicker) {
        this.datePicker = this.$createDatePicker({
          title: title,
          min: new Date(),
          max: new Date(2030, 12, 31),
          value: new Date(),
          format: {
            year: 'YYYY年',
            month: 'M月',
            date: 'D日'
          },
          onSelect: (date, selectedVal, selectedText) => {
            if (!singal) {
              this.datePicker = null
            }
            selectCb && selectCb(date, selectedVal, selectedText)
          },
          onCancel: () => {
            if (!singal) {
              this.datePicker = null
            }
            cancelCb && cancelCb()
          }
        })
      }
      this.datePicker.show()
    },
    showAddressPicker (selectCb, cancelCb, { singal = true } = { singal: true }) {
      if (!this.addressPicker) {
        this.addressPicker = this.$createCascadePicker({
          title: '请选择常用地址',
          data: addressData,
          onSelect: (selectedVal, selectedIndex, selectedText) => {
            if (!singal) {
              this.addressPicker = null
            }
            selectCb && selectCb(selectedVal, selectedIndex, selectedText)
          },
          onCancel: () => {
            cancelCb && cancelCb()
          }
        })
      }
      this.addressPicker.show()
    },
    showCrsPicker (selectCb, cancelCb) {
      if (!this.crsPicker) {
        this.crsPicker = this.$createPicker({
          title: '请选择税收居民身份',
          data: [crsData],
          onSelect: (selectedVal, selectedIndex, selectedText) => {
            selectCb && selectCb(selectedVal, selectedIndex, selectedText)
          },
          onCancel: () => {
            cancelCb && cancelCb()
          }
        })
      }
      this.crsPicker.show()
    },
    showTaxPicker (selectCb, cancelCb, { singal = true } = { singal: true }) {
      if (!this.taxPicker) {
        this.taxPicker = this.$createPicker({
          title: '无纳税人识别号原因',
          data: [noTaxData],
          onSelect: (selectedVal, selectedIndex, selectedText) => {
            if (!singal) {
              this.taxPicker = null
            }
            selectCb && selectCb(selectedVal, selectedIndex, selectedText)
          },
          onCancel: () => {
            if (!singal) {
              this.taxPicker = null
            }
            cancelCb && cancelCb()
          }
        })
      }
      this.taxPicker.show()
    },
    showCyclePicker (selectCb, cancelCb, { singal = true } = { singal: true }) {
      if (!this.cyclePicker) {
        this.cyclePicker = this.$createCascadePicker({
          title: '请选择定投周期',
          data: cycleData,
          onSelect: (selectedVal, selectedIndex, selectedText) => {
            if (!singal) {
              this.cyclePicker = null
            }
            selectCb && selectCb(selectedVal, selectedIndex, selectedText)
          },
          onCancel: () => {
            cancelCb && cancelCb()
          }
        })
      }
      this.cyclePicker.show()
    },
    showEduPicker (selectCb, cancelCb) {
      if (!this.eduPicker) {
        this.eduPicker = this.$createCascadePicker({
          title: '请选择学历',
          data: education,
          onSelect: (selectedVal, selectedIndex, selectedText) => {
            selectCb && selectCb(selectedVal, selectedIndex, selectedText)
          },
          onCancel: () => {
            cancelCb && cancelCb()
          }
        })
      }
      this.eduPicker.show()
    }
  },
  computed: {
  }
}
