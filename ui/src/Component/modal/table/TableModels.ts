import { ConnectMessage } from '@/model/model'
import { ViewType } from '@/constant/Enums'

/**
 * 表页签传入数据
 */
export class TableProps {
  /** 标题 */
  title: String
  /** 连接信息 */
  connectMsg: ConnectMessage
  /** 类型 */
  type: ViewType

  constructor(title: String, connectMsg: ConnectMessage, type: ViewType) {
    this.title = title
    this.connectMsg = connectMsg
    this.type = type
  }
}