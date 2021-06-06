import React from 'react'
import { connect } from 'react-redux'
import { get } from '@/utils/HttpUtils'
import { CONNECT_LIST, DB_LIST, TABLE_LIST, VIEW_LIST } from '@/config/url/ConnectUrls'
import { TableOutlined, DatabaseOutlined, EyeOutlined, ConsoleSqlOutlined } from '@ant-design/icons'
import { ViewType } from '@/constant/Enums'
import { ConnectMessage } from '@/model/model'
import { subscribeForOne } from '@/store/storeUtils'
const cssObj = require('@/Component/css/MainTabs.less').default

interface DataNode {
  /** 标题 */
  title: String,
  /** 连接信息 */
  connectMsg: ConnectMessage,
  /** 图标 */
  icon: any,
  /** 类型 */
  type: ViewType
}

interface DataState {
  // 数据列表
  data: DataNode[]
}

class DefaultTab extends React.Component<any, DataState> {

  constructor(props: any) {
    super(props)
    // 监听当前数据连接字段，改变是触发数据更新
    subscribeForOne(() => { this.loadData() }, 'nowType', 'nowUsedConnect')
  }

  state: DataState = {
    data: []
  }

  render() {
    return <div className={cssObj['default-panel']}>
      {this.state.data.map(it => (
        <div>
          {it.icon}
          {it.title}
        </div>
      ))}
    </div>
  }

  /**
   * 数据加载
   */
  loadData = () => {
    switch (this.props.nowType) {
      case ViewType.TABLE:
        this.loadTables()
        break
      case ViewType.VIEW:
        this.loadViews()
        break
      default:
        this.setState({
          data: []
        })
    }
  }

  /**
   * 加载表
   */
  loadTables = async () => {
    let tables: DataNode[] = []
    let connectMsg = this.props.nowUsedConnect
    await get(`${TABLE_LIST}?connectId=${connectMsg?.id}&database=${connectMsg?.database}&schema=${connectMsg?.schema ? connectMsg?.schema : ''}`)
      .then((res: any) => {
        if (res.code === 200) {
          let data = res.data
          data.forEach((el: string) => {
            tables.push({
              title: el,
              icon: <TableOutlined />,
              connectMsg: connectMsg,
              type: ViewType.TABLE
            })
          });
        }
      })
    this.setState({
      data: tables
    })
  }

  /**
   * 加载视图
   */
  loadViews = async () => {
    let views: DataNode[] = []
    let connectMsg = this.props.nowUsedConnect
    await get(`${VIEW_LIST}?connectId=${connectMsg?.id}&database=${connectMsg?.database}&schema=${connectMsg?.schema ? connectMsg?.schema : ''}`)
      .then((res: any) => {
        if (res.code === 200) {
          let data = res.data
          data.forEach((el: string) => {
            views.push({
              title: el,
              icon: <EyeOutlined />,
              connectMsg: connectMsg,
              type: ViewType.TABLE
            })
          });
        }
      })
    this.setState({
      data: views
    })
  }
}

const mapStateToProps = (state: any) => {
  return {
    nowType: state.nowType,
    nowUsedConnect: state.nowUsedConnect
  }
}

export default connect(mapStateToProps)(DefaultTab)