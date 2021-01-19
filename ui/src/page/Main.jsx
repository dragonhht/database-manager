import React from 'react'
import { Layout } from 'antd'
const { Header, Footer, Sider, Content } = Layout
import mainCss from '@/css/Main.less'
import HeaderMenu from '@/page/HeaderMenu'

/** 主页面 */
class Main extends React.Component {
  render () {
    return <Layout className={mainCss.main}>
      <Header className={mainCss.header}>
        <HeaderMenu></HeaderMenu>
      </Header>
      <Layout>
        <Sider className={mainCss['left-aside']}>Sider</Sider>
        <Content>Content</Content>
        <Sider className={mainCss['right-aside']}>Sider</Sider>
      </Layout>
      <Footer className={mainCss.footer}>Footer</Footer>
    </Layout>
  }
}

export default Main