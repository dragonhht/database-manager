import React from 'react'
import { Modal, Button, Tabs, Form, Input, Checkbox, message, notification } from 'antd'
const { TabPane } = Tabs
import { ConnectModalProp } from '@/Component/modal/connect/ConnectModel'
import { post } from '@/utils/HttpUtils'
import { SAVE_CONNECT, CONNECT_TEST } from '@/config/url/ConnectUrls'
import { DatabaseType } from '@/constant/Enums'

const cssObj = require('@/Component/css/ConnectModal.less')

// 通用Input属性
const inputProps = {
  autoComplete: 'off'
}

class MySQLConnectModal extends React.Component<ConnectModalProp, any> {

  static defaultProps = {
    title: 'MySQL连接'
  }

  public state = {
    loading: false, // 确认等待
    testLoading: false,
    data: {
      ...this.props.data
    },
  }

  connectFormRef = React.createRef<any>()
  // fnConnectFormRef = (el: any) => this.connectFormRef = el

  render() {
    const { visible, title } = this.props
    return <Modal visible={visible}
      title={title}
      onOk={this.handleOk}
      onCancel={this.handleCancel}
      centered={true}
      footer={[
        <Button key="test" onClick={() => this.connectTest()} loading={this.state.testLoading}>
          连接测试
        </Button>,
        <Button key="cancel" onClick={() => this.handleCancel()}>
          取消
      </Button>,
        <Button key="ok" type="primary" loading={this.state.loading} onClick={() => this.handleOk()}>
          确定
      </Button>,
      ]}
      bodyStyle={{ padding: '5px' }}
    >
      <Tabs type="card">
        <TabPane tab="常规" key="1">
          <Form ref={this.connectFormRef} name="Basic" labelAlign="right" labelCol={{ span: 4 }} wrapperCol={{ span: 16 }}
            onValuesChange={(_, allValues) => this.formDataChange(allValues)}>
            <Form.Item label="连接名:" name="name"
              rules={[{ required: true, message: "请输入连接名" }]}>
              <Input {...inputProps} />
            </Form.Item>
            <Form.Item label="IP地址" name="ip"
              rules={[{ required: true, message: "请输入IP地址" }]}>
              <Input {...inputProps} />
            </Form.Item>
            <Form.Item label="端口" name="port" wrapperCol={{ span: 4 }} initialValue="3306"
              rules={[{ required: true, message: "请输入端口" }]}>
              <Input {...inputProps} onKeyUp={() => this.checkPort()} />
            </Form.Item>
            <Form.Item wrapperCol={{ span: 12 }} label="用户名" name="userName"
              rules={[{ required: true, message: "请输入用户名" }]}>
              <Input {...inputProps} />
            </Form.Item>
            <Form.Item wrapperCol={{ span: 12 }} label="密码" name="password" >
              <Input {...inputProps} type="password" />
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
  handleOk = async () => {
    this.setState({
      loading: true
    })
    let result = await this.saveMassage()
    this.setState({
      loading: false
    })
    if (result !== null) {
      this.props.changeVisible(false, result)
    }
  }

  // 取消
  handleCancel = () => {
    this.props.changeVisible(false, null)
  }

  // 表单值改变
  formDataChange = (allValues: Object) => {
    this.setState({
      data: allValues
    })
  }

  // 检查端口是否为数值
  checkPort = () => {
    let port = ('' + this.state.data.port).replace(/[^\d]/g, '')
    this.setState((state: any) => {
      state.data.port = parseInt(port)
      return state.data
    })
    this.connectFormRef.current.setFieldsValue({
      port: port
    })
  }

  // 保存连接信息
  saveMassage = async () => {
    let result = null
    const params = this.state.data
    params.port = parseInt(params.port + '')
    if (!params.type || params.type === '') {
      params.type = DatabaseType.MYSQL
    }
    await post(SAVE_CONNECT, params)
      .then((res: any) => {
        if (res.code === 200) {
          result = res.data
          notification.success({
            message: '提示',
            description: '保存成功'
          })
        } else {
          notification.error({
            message: '错误',
            description: res.msg,
            duration: null
          })
        }
      })
      .catch(err => {
        notification.error({
          message: '错误',
          description: err,
          duration: null
        })
      })
    return result
  }

  // 连接测试
  connectTest = () => {
    this.setState({
      testLoading: true
    })
    const params = this.state.data
    params.port = parseInt(params.port + '')
    if (!params.type || params.type === '') {
      params.type = DatabaseType.MYSQL
    }
    post(CONNECT_TEST, params)
      .then((res: any) => {
        this.setState({
          testLoading: false
        })
        if (res.code === 200) {
          notification.success({
            message: '提示',
            description: '连接测试成功'
          })
        } else {
          notification.error({
            message: '错误',
            description: res.msg,
            duration: null
          })
        }
      })
      .catch(err => {
        this.setState({
          testLoading: false
        })
        notification.error({
          message: '错误',
          description: err,
          duration: null
        })
      })
  }
}

export default MySQLConnectModal