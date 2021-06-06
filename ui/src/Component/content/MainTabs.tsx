import React from 'react'
import { Tabs } from 'antd'
const { TabPane } = Tabs
import { MainTabMessage } from '@/model/model'
import { connect } from 'react-redux'
import DefaultTab from '@/Component/content/DefaultTab'

interface MainTabsState {
  // 页签面板数组
  panes: MainTabMessage[],
  // 当前激活面板
  activeTab: string
}

// 默认页签面板
let defaultPanel = <DefaultTab></DefaultTab>

class MainTabs extends React.Component<any, MainTabsState> {

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
    this.setState({
      activeTab: key
    })
    console.log(this.props.nowUsedConnect)
  }
}

const mapStateToProps = (state: any) => {
  return {
    nowType: state.nowType,
    nowUsedConnect: state.nowUsedConnect
  }
}

export default connect(mapStateToProps)(MainTabs)