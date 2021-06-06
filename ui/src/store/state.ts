import { ViewType } from '@/constant/Enums'
import { ConnectMessage } from '@/model/model'

export interface State {
  /** 当前使用的连接信息 */
  nowUsedConnect?: ConnectMessage
  /** 当前查看对象类型 */
  nowType?: ViewType
}

let state: State = {
  nowUsedConnect: undefined,
  nowType: ViewType.NULL
}

export default state