import React from 'react'
import { Tabs } from 'antd'
const { TabPane } = Tabs
import { MainTabMessage } from '@/model/model'
import store from '@/store/store'
const cssObj = require('@/Component/css/MainTabs.less').default

interface MainTabsState {
  // 页签面板数组
  panes: MainTabMessage[],
  // 当前激活面板
  activeTab: string
}

// 默认页签面板
let defaultPanel = <div className={cssObj['default-panel']}></div>

export default class MainTabs extends React.Component<any, MainTabsState> {

  state: MainTabsState = {
    panes: [
      new MainTabMessage('对象', '-1', undefined, defaultPanel), // 默认页签
    ],
    activeTab: '-1'
  }

  componentDidMount() {
    store.subscribe(() => {
      console.log('store.getState().nowUsedConnectId', store.getState().nowType)
    })
  }

  render() {
    return <Tabs
      hideAdd
      size="small"
      activeKey={this.state.activeTab}
      type="editable-card"
      onChange={(key) => this.change(key)}>
      {this.state.panes.map(pane => (
        <TabPane tab={pane.title} key={pane.key} closeIcon={pane.key === '-1' ? <i></i> : null}>
          {pane.content}
        </TabPane>
      ))}
    </Tabs>
  }

  /**
   * 页签切换
   * @param key 
   */
  change = (key: string) => {
    console.log('active', key)
    this.setState({
      activeTab: key
    })
  }


}