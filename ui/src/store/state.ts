import { ViewType } from '@/constant/Enums'

interface State {
  /** 当前使用的连接信息标识 */
  nowUsedConnectId: String
  /** 当前查看对象类型 */
  nowType: ViewType
}

let state: State = {
  nowUsedConnectId: '',
  nowType: ViewType.NULL
}

export default state