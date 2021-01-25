import axios from '@/config/axios/AxiosConfig'

/**
 * GET请求
 * @param url 请求路径
 * @param parmars 请求参数
 * @param headers 请求头
 */
export function get(url: string, parmars?: object, headers?: object) {
  return new Promise((resolve, reject) => {
    axios.get(url, {
      params: parmars,
      headers: headers
    })
      .then(res => {
        resolve(res.data)
      })
      .catch(err => {
        reject(err.data)
      })
  })
}

/**
 * POST请求
 * @param url 请求路径
 * @param params 请求参数
 * @param headers 请求头
 */
export function post(url: string, params?: object, headers?: object) {
  return new Promise((resolve, reject) => {
    axios.post(url, params, {
      headers: headers
    })
      .then(res => {
        resolve(res.data)
      })
      .catch(err => {
        reject(err.data)
      })
  })
}

/**
 * DELETE请求
 * @param url 请求路径
 * @param params 请求参数
 * @param headers 请求头
 */
export function del(url: string, params?: object, headers?: object) {
  return new Promise((resolve, reject) => {
    axios.delete(url, {
      params: params,
      headers: headers
    })
      .then(res => {
        resolve(res.data)
      })
      .catch(err => {
        reject(err.data)
      })
  })
}