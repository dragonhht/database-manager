import axios from '@/config/axios/AxiosConfig'
import { notification } from 'antd'

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
        if (res.data.code !== 200) {
          notification.error({
            message: '错误',
            description: res.data.msg,
            duration: null
          })
        }
        resolve(res.data)
      })
      .catch(err => {
        notification.error({
          message: '错误',
          description: err.data,
          duration: null
        })
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
        if (res.data.code !== 200) {
          notification.error({
            message: '错误',
            description: res.data.msg,
            duration: null
          })
        }
        resolve(res.data)
      })
      .catch(err => {
        notification.error({
          message: '错误',
          description: err.data,
          duration: null
        })
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
        if (res.data.code !== 200) {
          notification.error({
            message: '错误',
            description: res.data.msg,
            duration: null
          })
        }
        resolve(res.data)
      })
      .catch(err => {
        notification.error({
          message: '错误',
          description: err.data,
          duration: null
        })
        reject(err.data)
      })
  })
}