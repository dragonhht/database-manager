import Store from '@/store/store'
import Action from '@/store/model/Action'
import { ViewType } from '@/constant/Enums'
import { ConnectMessage } from '@/model/model'

export default {
  /**
   * 改变当前使用的数据库连接
   * @param connectionId 数据库连接id
   */
  changeNowDb(connection: ConnectMessage) {
    let action: Action = {
      type: 'CHANGE_NOW_DB',
      payload: connection
    }
    Store.dispatch(action)
  },

  /**
   * 改变当前的查看类型
   * @param type 查看类型
   */
  changeNowType(type: ViewType) {
    let action: Action = {
      type: 'CHANGE_NOW_TYPE',
      payload: type
    }
    Store.dispatch(action)
  }
}