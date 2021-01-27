import React from 'react'
import { Menu, Dropdown, Divider, Layout } from 'antd'
import { DownOutlined } from '@ant-design/icons'
const { Header, Content } = Layout
import { ConnectMessage } from '@/model/model'
import { DatabaseType } from '@/constant/Enums'

const cssObj = require('@/css/HeaderMenu.less').default

// 新建连接弹窗
import MySQLConnectModal from '@/Component/modal/connect/MySQLConnectModal'

/** 顶部菜单 */
class HeaderMenu extends React.Component<any, any> {

  public state = {
    connectMySQLVisible: false, // 连接弹窗显示控制
    connectMsg: new ConnectMessage(), // 连接信息
  }

  render() {
    return <Layout>
      {/** 顶部菜单 */}
      <Header className={cssObj['top-menu-nav']}>
        <Dropdown overlay={this.fileMenus} trigger={['click']} placement="bottomLeft" arrow>
          <a onClick={e => e.preventDefault()} className={cssObj['menu-item']}>
            文件<DownOutlined></DownOutlined>
          </a>
        </Dropdown>
        <Divider type="vertical" className={cssObj['menu-divider']} />
      </Header>
      <Content></Content>
      <MySQLConnectModal changeVisible={this.changeConnectMySQLModal}
        visible={this.state.connectMySQLVisible}
        data={this.state.connectMsg}></MySQLConnectModal>
    </Layout>
  }

  /** 文件菜单 */
  fileMenus = (
    <Menu>
      <Menu.SubMenu title="新建连接">
        <Menu.Item>
          <a onClick={() => this.showConnectModal(DatabaseType.MYSQL)}>Mysql</a>
        </Menu.Item>
        <Menu.Item>
          <a>Postgre SQL</a>
        </Menu.Item>
      </Menu.SubMenu>
      <Menu.Item>
        <a>打开连接</a>
      </Menu.Item>
      <Menu.Item disabled>
        <a>打开连接</a>
      </Menu.Item>
    </Menu>
  )

  // 显示连接弹窗
  showConnectModal = (type: string) => {
    switch (type) {
      case DatabaseType.MYSQL: // 显示MySQL连接弹窗
        this.setState({
          connectMySQLVisible: true
        })
        break
    }
  }

  // 改变连接弹窗显示状态
  changeConnectMySQLModal = (visible: boolean, data: ConnectMessage) => {
    this.setState({
      connectMySQLVisible: visible,
      connectMsg: data
    })
  }
}

export default HeaderMenu