class Service {
  // list: 需要排序的列表， key: 需要排序的值, type排序的方式
  sort (list, key, type) {
    return type === 'desc' ? this.sortDesc(list, key) : this.sortAsc(list, key)
  }
  // 倒叙排序
  sortDesc (list, key) {
    return list.sort((a, b) => -(a[key] - b[key])).slice(0)
  }
  // 正序排序
  sortAsc (list, key) {
    return list.sort((a, b) => a[key] - b[key]).slice(0)
  }
  // 数据格式化
  assetsFormat (target, replaceStr) {
    target = Number(target)
    if (Object.is(NaN, target)) {
      let nullStr = replaceStr || '0.00'
      return nullStr
    }
    let handle = Number(target.toFixed(2)).toFixed(2)
    let flag = ''
    if (handle.includes('-')) {
      flag = '-'
    }
    let tempInt = Number(handle.split('.')[0]).toLocaleString().replace(/\.\d{2}$/, '')
    tempInt = flag ? tempInt.includes('-') ? tempInt : `-${tempInt}` : tempInt
    return `${tempInt}.${handle.split('.')[1]}`
  }
}

export default new Service()
