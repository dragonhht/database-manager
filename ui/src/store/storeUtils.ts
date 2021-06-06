/** 状态监听常用方法工具 */
import Store from '@/store/store'

/** 历史值存储 */
const history: any = {}

/**
 * 监听值是否改变，改变后执行处理函数
 * @param key 监听的key
 * @param handler 处理函数
 */
export function subscribe(key: String, handler: Function) {
  Store.subscribe(() => {
    subscribeChange(key, handler)
  })
}

function subscribeChange(key: String, handler: Function): Boolean {
  const state = Store.getState()
  let value = eval('state.' + key)
  let historyVal = eval('history.' + key)
  if (historyVal !== value) {
    // 添加进入历史值
    eval('history.' + key + "=value")
    // 处理函数
    handler()
    return true
  }
  return false
}

/**
 * 监听多个值，当任意一个值发生改变则执行处理函数
 * @param handler 处理函数
 * @param keys 监听的key集合
 */
export function subscribeForOne(handler: Function, ...keys: String[]) {
  Store.subscribe(() => {
    for (let index in keys) {
      let key = keys[index]
      let ok = subscribeChange(key, handler)
      if (ok) return
    }
  })
}