/** 连接信息组件使用的数据类型 */
import { ConnectMessage } from '@/model/model'

/**
 * 连接信息弹窗传入信息
 */
export class ConnectModalProp {
  /** 是否显示 */
  public visible: boolean = false
  /** 弹窗标题 */
  public title: string = ''
  /** 连接信息 */
  public data: ConnectMessage
  /** 状态改变函数 */
  public changeVisible: Function

  constructor(data: ConnectMessage, changeVisible: Function) {
    this.data = data
    this.changeVisible = changeVisible
  }
}
