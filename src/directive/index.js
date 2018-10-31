const userAgent = navigator.userAgent
const directive = {
  install: function (Vue, options) {
    Vue.directive('updown', {
      inserted: function (el, { value = {} }) {
        updownHandle(el, Object.assign(options, value))
      },
      componentUpdated: function (el, { value = {} }) {
        updownHandle(el, Object.assign(options, value))
      }
    })
    Vue.directive('bold', {
      inserted: function (el, binding) {
        if (binding.value && isObjeact(binding.value)) {
          if (binding.value.active === false) {
            return false
          }
        }
        if (userAgent.indexOf('Android') > -1 || userAgent.indexOf('Adr') > -1) {
          let orignalFontSzie = document.defaultView.getComputedStyle(el)['font-size']
          orignalFontSzie = orignalFontSzie.replace(/px/g, '')
          orignalFontSzie = orignalFontSzie - 2
          el.style.fontSize = `${orignalFontSzie}px`
          el.style.opacity = '0.80'
        }
      },
      componentUpdated: function (el, binding) {
        if (binding.value && isObjeact(binding.value)) {
          if (binding.value.active === false) {
            return false
          }
        }
        if (userAgent.indexOf('Android') > -1 || userAgent.indexOf('Adr') > -1) {
          if (el.style.fontSize) {
            return
          }
          let orignalFontSzie = document.defaultView.getComputedStyle(el)['font-size']
          orignalFontSzie = orignalFontSzie.replace(/px/g, '')
          orignalFontSzie = orignalFontSzie - 2
          el.style.fontSize = `${orignalFontSzie}px`
          el.style.opacity = '0.80'
        }
      }
    })
  }
}

const isObjeact = function (obj) {
  return Object.prototype.toString.call(obj) === '[object Object]'
}

const updownHandle = (el, { upColor, downColor, defaultColor }) => {
  let num = el.innerHTML
  num = num.replace(/(,|%|元|万|千|百|十|(<.*>))/g, '')
  if (Object.is(NaN, Number(num))) {
    el.style.color = defaultColor
    return
  }
  if (Number(num) > 0) {
    el.style.color = upColor
  } else if (Number(num) < 0) {
    el.style.color = downColor
  } else {
    el.style.color = defaultColor
    return false
  }
}

export default directive
