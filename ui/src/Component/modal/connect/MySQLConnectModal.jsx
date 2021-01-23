import React from 'react'
import { Modal, Button, Tabs, Form, Input, Checkbox } from 'antd';
const { TabPane } = Tabs;

import cssObj from '@/Component/css/ConnectModal.less'

class MySQLConnectModal extends React.Component {

  static defaultProps = {
    title: 'MySQL连接'
  }

  constructor(props) {
    super(props)
    this.state = {
      loading: false, // 确认等待
      data: {
        ...props.data
      }
    }
  }

  // 初始值
  initialValues = {
    id: '',
    type: 'mysql',
    savePwd: false,
    userName: '',
    pssword: '',
    port: 3306,
    ip: '',
    database: '',
    charset: 'utf-8'
  }


  render () {
    const { visible, title, data } = this.props
    return <Modal visible={visible}
      title={title}
      onOk={this.handleOk}
      onCancel={this.handleCancel}
      centered={true}
      footer={[
        <Button key="cancel" onClick={this.handleCancel}>
          取消
      </Button>,
        <Button key="ok" type="primary" loading={this.state.loading} onClick={this.handleOk}>
          确定
      </Button>,
      ]}
      bodyStyle={{ padding: '5px' }}
    >
      <Tabs type="card">
        <TabPane tab="常规" key="1">
          <Form name="Basic" labelAlign="right" labelCol={{ span: 4 }} wrapperCol={{ span: 16 }} initialValues={this.initialValues}>
            <Form.Item label="连接名:" name="name"
              rules={[{ required: true, message: "请输入连接名" }]}>
              <Input />
            </Form.Item>
            <Form.Item label="IP地址" name="ip"
              rules={[{ required: true, message: "请输入IP地址" }]}>
              <Input />
            </Form.Item>
            <Form.Item label="端口" name="port" wrapperCol={{ span: 4 }}
              rules={[{ required: true, message: "请输入端口" }]}>
              <Input />
            </Form.Item>
            <Form.Item wrapperCol={{ span: 12 }} label="用户名" name="userName"
              rules={[{ required: true, message: "请输入用户名" }]}>
              <Input />
            </Form.Item>
            <Form.Item wrapperCol={{ span: 12 }} label="密码" name="password" >
              <Input />
            </Form.Item>
            <Form.Item wrapperCol={{ offset: 4 }} name="savePwd" valuePropName="checked">
              <Checkbox>记住密码</Checkbox>
            </Form.Item>
          </Form>
        </TabPane>
      </Tabs>
    </Modal >
  }

  // 确认
  handleOk = () => {
    this.setState({
      loading: true
    })
    console.log(this.state.data)
    this.props.changeVisible(false, this.state.data)
  }

  // 取消
  handleCancel = () => {
    this.props.changeVisible(false, null)
  }
}

export default MySQLConnectModal