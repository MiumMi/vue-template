/*
 * @Author: wwq
 * @Date: 2018-2-24 09:19
 * @Last Modified by: wwq
 * 
 */
import native from './native'

class App {
  // 原生交互：注册方法
  on (type, func) {
    native.on(type, func)
  }
}

export default new App ()
