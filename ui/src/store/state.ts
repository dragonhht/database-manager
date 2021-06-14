import { ViewType } from '@/constant/Enums'
import { ConnectMessage } from '@/model/model'

export interface State {
  /** 当前使用的连接信息 */
  nowUsedConnect?: ConnectMessage
  /** 当前查看对象类型 */
  nowType?: ViewType
  /** 当前页签修改值 */
  tabIndex?: Number,
  /** 当前处理的文件名 */
  nowName?: String
}

let state: State = {
  nowUsedConnect: undefined,
  nowType: ViewType.NULL,
  tabIndex: undefined
}

export default state