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
    subscribeChange(handler, key)
  })
}

/**
 * 
 * @param key 监听一个值的变化
 * @param handler 处理函数
 * @param paramKeys 处理函数参数key
 */
export function subscribeOne(key: String, handler: Function, ...paramKeys: String[]) {
  Store.subscribe(() => {
    const state = Store.getState()
    let value = eval('state.' + key)
    let historyVal = eval('history.' + key)
    if (historyVal !== value) {
      // 获取参数
      let params: any[] = []
      paramKeys.forEach(it => {
        let param = eval('state.' + it)
        params.push(param)
      })
      // 添加进入历史值
      eval('history.' + key + "=value")
      handler(...params)
    }
  })
}

function subscribeChange(handler: Function, ...keys: String[]) {
  const state = Store.getState()
  let ok = false
  let params = []
  for (let index in keys) {
    let key = keys[index]
    let value = eval('state.' + key)
    let historyVal = eval('history.' + key)
    if (historyVal !== value) {
      // 添加进入历史值
      eval('history.' + key + "=value")
      ok = true
    }
    params.push(value)
  }
  if (ok) {
    handler(...params)
  }
}

/**
 * 监听多个值，当任意一个值发生改变则执行处理函数
 * @param handler 处理函数
 * @param keys 监听的key集合
 */
export function subscribeForOne(handler: Function, ...keys: String[]) {
  Store.subscribe(() => {
    subscribeChange(handler, ...keys)
  })
}