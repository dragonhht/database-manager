import axios from 'axios'
/** axios配置 */

const instance = axios.create({
  baseURL: 'http://localhost:9999/database',
  timeout: 6000,
})

instance.defaults.headers['Content-Type'] = 'application/json'

export default instance