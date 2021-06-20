import React from 'react'
import { Tabs } from 'antd'
const { TabPane } = Tabs
import { ConnectMessage, MainTabMessage } from '@/model/model'
import { connect } from 'react-redux'
import { subscribeOne } from '@/store/storeUtils'
import DefaultTab from '@/Component/content/DefaultTab'
import TableTab from '@/Component/content/TableTab'
import { ViewType } from '@/constant/Enums'

interface MainTabsState {
  // 页签面板数组
  panes: MainTabMessage[],
  // 当前激活面板
  activeTab: string
}

// 默认页签面板
let defaultPanel = <DefaultTab></DefaultTab>

class MainTabs extends React.Component<any, MainTabsState> {

  constructor(props: any) {
    super(props)
    // 监听tab页修改变化
    subscribeOne('tabIndex', this.changeTabIndex, 'nowType', 'nowUsedConnect', 'nowName')
  }

  state: MainTabsState = {
    panes: [
      new MainTabMessage('对象', '-1', undefined, defaultPanel), // 默认页签
    ],
    activeTab: '-1'
  }

  render() {
    return <Tabs
      hideAdd
      size="small"
      activeKey={this.state.activeTab}
      type="editable-card"
      onChange={(key) => this.change(key)}
      onEdit={this.editTab}>
      {this.state.panes.map(pane => (
        <TabPane tab={pane.title} key={pane.key} closable={pane.key !== '-1'}>
          {pane.content}
        </TabPane>
      ))}
    </Tabs>
  }

  /**
   * 移除页签
   * @param key 页签key
   */
  remove = (key: String) => {
    let panels = this.state.panes
    let reIndex = -1;
    for (let index in panels) {
      reIndex++
      let panel = panels[index]
      if (key === panel.key) {
        break
      }
    }
    if (reIndex !== 0) {
      panels.splice(reIndex, 1)
    }
    let activeKey = this.state.activeTab
    if (key === activeKey) {
      activeKey = panels[panels.length - 1].key.toString()
    }
    this.setState({
      panes: panels,
      activeTab: activeKey
    })
  }

  editTab = (key: any, action: String) => {
    if ('remove' === action) {
      this.remove(key)
    }
  }

  /**
   * 页签切换
   * @param key 当前激活的页签
   */
  change = (key: string) => {
    this.setState({
      activeTab: key
    })
  }

  /**
   * 页签改变
   * @param type 页签类型
   * @param connectMsg 连接信息
   */
  changeTabIndex = (type: String, connectMsg: ConnectMessage, name: String) => {
    let key = `${connectMsg.id ? connectMsg.id : ''}-${connectMsg.database ? connectMsg.database : ''}-${type}-${name}`
    let exist = false
    // 查找是否存在页签
    for (let index in this.state.panes) {
      let tab = this.state.panes[index]
      if (key === tab.key) {
        // 激活页签
        this.change(key)
        exist = true
        break
      }
    }
    if (!exist) {
      let objType = ViewType.NULL
      switch (type) {
        case ViewType.TABLE:
          objType = ViewType.TABLE
          break
        case ViewType.VIEW:
          objType = ViewType.VIEW
          break
        case ViewType.SCRIPT:
          objType = ViewType.SCRIPT
          break
      }
      // TODO 脚本类型待处理
      let content = <TableTab title={name} connectMsg={connectMsg} type={objType}></TableTab>
      let panel = new MainTabMessage(name, key, connectMsg, content)
      let panels = this.state.panes
      panels.push(panel)
      this.setState({
        panes: panels
      })
    }
  }
}

const mapStateToProps = (state: any) => {
  return {
    nowType: state.nowType,
    nowUsedConnect: state.nowUsedConnect
  }
}

export default connect(mapStateToProps)(MainTabs)