import React from 'react'
import { post } from '@/utils/HttpUtils'
import { Table } from 'antd'
import { ConnectMessage } from '@/model/model'
import { ViewType } from '@/constant/Enums'
import { TableProps } from '@/Component/modal/table/TableModels'

class TableTab extends React.Component<TableProps, any> {
  render() {
    return <div>{this.props.title}</div>
  }
}

export default TableTab