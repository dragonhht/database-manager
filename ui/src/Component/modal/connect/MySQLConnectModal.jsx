import React from 'react'
import { Modal, Button } from 'antd';

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
    >

    </Modal>
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