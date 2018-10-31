const PASSWORDREG = /^[0-9a-zA-Z]{6,20}$/
const PHONEREG = /^1[3|4|5|7|8|9]\d{9}$/
export const validateMixin = {
  data () {
    return {
      PHONEREG: PHONEREG,
      PASSWORDREG: PASSWORDREG,
      aCity: {
        11: '北京',
        12: '天津',
        13: '河北',
        14: '山西',
        15: '内蒙古',
        21: '辽宁',
        22: '吉林',
        23: '黑龙江',
        31: '上海',
        32: '江苏',
        33: '浙江',
        34: '安徽',
        35: '福建',
        36: '江西',
        37: '山东',
        41: '河南',
        42: '湖北',
        43: '湖南',
        44: '广东',
        45: '广西',
        46: '海南',
        50: '重庆',
        51: '四川',
        52: '贵州',
        53: '云南',
        54: '西藏',
        61: '陕西',
        62: '甘肃',
        63: '青海',
        64: '宁夏',
        65: '新疆',
        71: '台湾',
        81: '香港',
        82: '澳门',
        91: '国外'
      }
    }
  },
  methods: {
    /**
     * 校验身份证号码（15位/18位）
     */
    isIdCardNo (num) {
      num = num.toUpperCase()
      // 身份证号码为15位或者18位，15位时全为数字，18位前17位为数字，最后一位是校验位，可能为数字或字符X。
      if (!(/(^\d{15}$)|(^\d{17}([0-9]|X)$)/.test(num))) {
        return false
      }
      // 下面分别分析出生日期和校验位
      let len = num.length
      let re = ''
      if (len === 15) {
        re = new RegExp(/^(\d{2})(\d{4})(\d{2})(\d{2})(\d{2})(\d{3})$/)
        let arrSplit = num.match(re)
        if (this.aCity[parseInt(arrSplit[1])] === null) {
          return false
        }
        // 检查生日日期是否正确
        let dtmBirth = new Date('19' + arrSplit[3] + '/' + arrSplit[4] + '/' + arrSplit[5])
        let bGoodDay
        bGoodDay = (dtmBirth.getYear() === Number(arrSplit[3])) && ((dtmBirth.getMonth() + 1) === Number(arrSplit[4])) && (dtmBirth.getDate() === Number(arrSplit[5]))
        if (!bGoodDay) {
          return false
        }
      }
      if (len === 18) {
        re = new RegExp(/^(\d{2})(\d{4})(\d{4})(\d{2})(\d{2})(\d{3})([0-9]|X)$/)
        let arrSplit = num.match(re)
        if (this.aCity[parseInt(arrSplit[1])] === null) {
          return false
        }
        // 检查生日日期是否正确
        let dtmBirth = new Date(arrSplit[3] + '/' + arrSplit[4] + '/' + arrSplit[5])
        let bGoodDay
        bGoodDay = (dtmBirth.getFullYear() === Number(arrSplit[3])) && ((dtmBirth.getMonth() + 1) === Number(arrSplit[4])) && (dtmBirth.getDate() === Number(arrSplit[5]))
        if (!bGoodDay) {
          return false
        } else {
          // 检验18位身份证的校验码是否正确。
          // 校验位按照ISO 7064:1983.MOD 11-2的规定生成，X可以认为是数字10。
          let valnum
          let arrInt = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2]
          let arrCh = ['1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2']
          let nTemp = 0
          for (let i = 0; i < 17; i++) {
            nTemp += num.substr(i, 1) * arrInt[i]
          }
          valnum = arrCh[nTemp % 11]
          if (valnum !== num.substr(17, 1)) {
            return false
          }
        }
      }
      return true
    },
    getFormatNum (value) {
      if (typeof value === 'number' || typeof value === 'string') {
        return value.toString().replace(/[^0-9.]/g, '')
      } else {
        return null
      }
    }
  }
}
