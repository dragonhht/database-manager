import React from 'react'
import { Modal, Button, Tabs, Form, Input, Checkbox, message } from 'antd'
const { TabPane } = Tabs
import { ConnectModalProp } from '@/Component/modal/connect/ConnectModel'
import { post } from '@/utils/HttpUtils'
import { SAVE_CONNECT } from '@/config/url/ConnectUrls'
import { ConnectMessage } from '@/model/model'

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
              <Input {...inputProps} />
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
      params.type = 'mysql'
    }
    await post(SAVE_CONNECT, params)
      .then((res: any) => {
        if (res.code === 200) {
          result = res.data
          message.success('保存成功')
        } else {
          message.error(res.msg)
        }
      })
      .catch(err => {
        message.error(err)
      })
    return result
  }
}

export default MySQLConnectModal