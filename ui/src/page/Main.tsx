import React from 'react'
import { Layout } from 'antd'
const { Header, Footer, Sider, Content } = Layout

const mainCss = require('@/css/Main.less').default
import HeaderMenu from '@/page/HeaderMenu'
import ConnectTree from '@/Component/aside/ConnectTree'

/** 主页面 */
class Main extends React.Component {
  render() {
    return <Layout className={mainCss.main}>
      <Header className={mainCss.header}>
        <HeaderMenu></HeaderMenu>
      </Header>
      <Layout>
        <Sider className={mainCss['left-aside']}>
          <ConnectTree></ConnectTree>
        </Sider>
        <Content>Content</Content>
        <Sider className={mainCss['right-aside']}>Sider</Sider>
      </Layout>
      <Footer className={mainCss.footer}>Footer</Footer>
    </Layout>
  }
}

export default Main