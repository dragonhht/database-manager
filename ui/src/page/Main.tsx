import React from 'react'
import { Layout } from 'antd'
import { Provider } from 'react-redux'
import store from '@/store/store'
const { Header, Footer, Sider, Content } = Layout

const mainCss = require('@/css/Main.less').default
import HeaderMenu from '@/page/HeaderMenu'
import ConnectTree from '@/Component/aside/ConnectTree'
import MainTabs from '@/Component/content/MainTabs'
import '@/css/public.css'

/** 主页面 */
class Main extends React.Component {
  render() {
    return <Provider store={store}>
      <Layout className={mainCss.main}>
        <Header className={mainCss.header}>
          <HeaderMenu></HeaderMenu>
        </Header>
        <Layout>
          <Sider className={mainCss['left-aside']}>
            <ConnectTree></ConnectTree>
          </Sider>
          <Content>
            <MainTabs></MainTabs>
          </Content>
          <Sider className={mainCss['right-aside']}>Sider</Sider>
        </Layout>
        <Footer className={mainCss.footer}>Footer</Footer>
      </Layout>
    </Provider>
  }
}

export default Main