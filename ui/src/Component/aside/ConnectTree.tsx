import React, { Children, useState } from 'react'
import { Tree } from 'antd'
import actionCreator from '@/store/actionCreator'
import { connect } from 'react-redux'
import { TableOutlined, DatabaseOutlined, EyeOutlined, ConsoleSqlOutlined } from '@ant-design/icons'
import { ConnectMessage } from '@/model/model'
import { CONNECT_LIST, DB_LIST, TABLE_LIST, VIEW_LIST } from '@/config/url/ConnectUrls'
import { ViewType } from '@/constant/Enums'
import { get, post } from '@/utils/HttpUtils'
// const cssObj = require('@/Component/css/ConnectTree.less').default
import '@/Component/css/ConnectTree.css'

enum NodeType {
  /** 根节点 */
  ROOT = 'root',
  /** 连接 */
  CONNECT = 'connect',
  /** 数据库 */
  DB = 'db',
  /** 表父节点 */
  TABLE_PARENT = 'table_parent',
  /** 视图父节点 */
  VIEW_PARENT = 'view_parent',
  /** 脚本父节点 */
  SCRIPT_PARENT = 'script_parent',
  /** 表节点 */
  TABLE = 'table',
  /** 视图节点 */
  VIEW = 'view',
  /** 脚本节点 */
  SCRIPT = 'script'
}

const TABLE_TYPE = [NodeType.TABLE, NodeType.TABLE_PARENT]
const VIEW_TYPE = [NodeType.VIEW, NodeType.VIEW_PARENT]
const SCRIPT_TYPE = [NodeType.SCRIPT, NodeType.SCRIPT_PARENT]
const TAB_TYPE = [NodeType.TABLE, NodeType.VIEW, NodeType.SCRIPT]

/** 树节点 */
interface DataNode {
  /** 标题 */
  title: string
  /** key */
  key: string
  /** 是否为叶子节点 */
  isLeaf?: boolean
  /** 图标 */
  icon?: any
  /** 子节点数据 */
  children?: DataNode[],
  /** 连接数据 */
  connectMsg?: ConnectMessage,
  /** 节点类型 */
  type: NodeType
}

/** 初始树形数据 */
interface TreeState {
  // 主要数据
  treeData: DataNode[],
  // 上一次点击节点
  lastSelectNode: String,
}

class ConnectTree extends React.Component<any, TreeState> {

  state: TreeState = {
    treeData: [
      {
        title: '我的连接',
        key: '-1',
        type: NodeType.ROOT
      }
    ],
    lastSelectNode: '',
  }

  componentDidMount = () => {
    this.getConnects()
  }

  render() {
    return <Tree treeData={this.state.treeData}
      className="tree-content"
      defaultExpandedKeys={["-1"]}
      showIcon
      loadData={this.onloadNodeData}
      onSelect={(key, obj) => this.selectNode(key, obj)}
    ></Tree>
  }

  /**
   * 选择树形节点
   * @param key 树形节点key
   * @param obj 
   */
  selectNode = (key: React.Key[], obj: any) => {
    let node = obj.node
    this.setState({
      lastSelectNode: node.key
    })
    actionCreator.changeNowDb(node.connectMsg)
    if (TABLE_TYPE.includes(node.type)) {
      actionCreator.changeNowType(ViewType.TABLE)
    } else if (VIEW_TYPE.includes(node.type)) {
      actionCreator.changeNowType(ViewType.VIEW)
    } else if (SCRIPT_TYPE.includes(node.type)) {
      actionCreator.changeNowType(ViewType.SCRIPT)
    } else {
      actionCreator.changeNowType(ViewType.NULL)
    }
    if (TAB_TYPE.includes(node.type)) {
      actionCreator.changeNowHandlerName(node.title)
      // 设置页签修改状态
      actionCreator.changeTabIndex()
    }
  }

  /**
   * 加载节点数据
   * @param key 节点key
   * @param children 
   */
  onloadNodeData = (node: any) => {
    return new Promise<void>(resolve => {
      const type = node.type
      const data: DataNode = {
        title: node.title,
        key: node.key,
        type: node.type,
        connectMsg: node.connectMsg
      }
      switch (type) {
        case NodeType.CONNECT: // 加载连接节点下的数据
          this.loadDbs(data)
          break
        case NodeType.DB: // 加载数据库节点
          const children = this.getDbChildren(data)
          this.setState({
            treeData: this.updateChildren(this.state.treeData, data.key, children)
          })
          break
        case NodeType.TABLE_PARENT: // 加载表
          this.loadTables(data)
          break
        case NodeType.VIEW_PARENT: // 加载视图
          this.loadViews(data)
          break
        case NodeType.SCRIPT_PARENT: // 加载脚本
          this.loadScripts(data)
          break
      }
      resolve()
    })
  }

  /**
   * 加载脚本
   * @param node 脚本父节点
   */
  loadScripts = (node: DataNode) => {
    // TODO 加载脚本
    const scripts: DataNode[] = [
      {
        title: 'script-1',
        key: node.key + '0',
        type: NodeType.SCRIPT,
        isLeaf: true,
        icon: <ConsoleSqlOutlined />
      },
      {
        title: 'script-2',
        key: node.key + '1',
        type: NodeType.SCRIPT,
        isLeaf: true,
        icon: <ConsoleSqlOutlined />
      }
    ]
    this.setState({
      treeData: this.updateChildren(this.state.treeData, node.key, scripts)
    })
  }

  /**
   * 加载视图
   * @param node 视图父节点
   */
  loadViews = async (node: DataNode) => {
    // TODO 加载视图
    const views: DataNode[] = []
    let connectMsg = node.connectMsg
    await get(`${VIEW_LIST}?connectId=${connectMsg?.id}&database=${connectMsg?.database}&schema=${connectMsg?.schema ? connectMsg?.schema : ''}`)
      .then((res: any) => {
        if (res.code === 200) {
          let data = res.data
          data.forEach((el: string) => {
            views.push({
              title: el,
              key: node.key + el,
              type: NodeType.VIEW,
              isLeaf: true,
              icon: <EyeOutlined />,
              connectMsg: connectMsg
            })
          });
        }
      })
    this.setState({
      treeData: this.updateChildren(this.state.treeData, node.key, views)
    })
  }

  /**
   * 加载表
   * @param node 表父节点
   */
  loadTables = async (node: DataNode) => {
    const tables: DataNode[] = []
    let connectMsg = node.connectMsg
    await get(`${TABLE_LIST}?connectId=${connectMsg?.id}&database=${connectMsg?.database}&schema=${connectMsg?.schema ? connectMsg?.schema : ''}`)
      .then((res: any) => {
        if (res.code === 200) {
          let data = res.data
          data.forEach((el: string) => {
            tables.push({
              title: el,
              key: node.key + el,
              type: NodeType.TABLE,
              icon: <TableOutlined />,
              isLeaf: true,
              connectMsg: connectMsg
            })
          });
        }
      })
    this.setState({
      treeData: this.updateChildren(this.state.treeData, node.key, tables)
    })
  }

  /**
   * 加载数据库列表
   * @param node 
   */
  loadDbs = async (node: DataNode) => {
    // TODO 加载数据库列表
    let dbs: DataNode[] = []
    await get(`${DB_LIST}?connectId=${node.connectMsg?.id}`).then((res: any) => {
      if (res.code === 200) {
        let data = res.data
        data.forEach((el: string) => {
          let connMsg = new ConnectMessage()
          Object.assign(connMsg, node.connectMsg)
          connMsg.database = el
          dbs.push({
            title: el,
            key: node.key + el,
            type: NodeType.DB,
            connectMsg: connMsg,
            icon: <DatabaseOutlined />
          })
        });
      }
    })
    this.setState({
      treeData: this.updateChildren(this.state.treeData, node.key, dbs)
    })
  }

  /**
   * 获取数据库节点的子节点
   */
  getDbChildren = (node: DataNode): DataNode[] => {
    let key = node.key
    // TODO 图标设置
    return [
      {
        title: '表',
        key: key + 'table',
        type: NodeType.TABLE_PARENT,
        connectMsg: node.connectMsg,
        icon: <TableOutlined />
      },
      {
        title: '视图',
        key: key + 'view',
        type: NodeType.VIEW_PARENT,
        connectMsg: node.connectMsg,
        icon: <EyeOutlined />
      },
      {
        title: '脚本',
        key: key + 'script',
        type: NodeType.SCRIPT_PARENT,
        connectMsg: node.connectMsg,
        icon: <ConsoleSqlOutlined />
      },
    ]
  }

  // 获取连接列表
  getConnects = async () => {
    // TODO 获取连接列表
    let connects: DataNode[] = []
    await get(CONNECT_LIST).then((res: any) => {
      if (res.code === 200) {
        let data = res.data
        data.forEach((el: ConnectMessage) => {
          let title = el.name
          if (!title) title = ''
          let key = el.id
          if (!key) key = ''
          connects.push({
            title: title,
            key: key,
            type: NodeType.CONNECT,
            connectMsg: el
          })
        });
      }
    })
    this.setState((state: TreeState) => {
      state.treeData = this.updateChildren(this.state.treeData, '-1', connects)
      return state
    })

  }

  /**
   * 重新加载的子节点
   * @param treeData 树形数据
   * @param key 需更新的节点key
   * @param chilren 新的子节点数据
   */
  updateChildren = (treeData: DataNode[], key: string, chilren: DataNode[]): DataNode[] => {
    return treeData.map((node: DataNode) => {
      if (node.key === key) {
        return { ...node, children: chilren }
      } else if (node.children) {
        return { ...node, children: this.updateChildren(node.children, key, chilren) }
      }
      return node
    })
  }

  /**
   * 更新指定节点数据
   * @param treeData 树形控件数据
   * @param node 更新后的节点数据
   */
  updateNode = (treeData: DataNode[], node: DataNode): DataNode[] => {
    return treeData.map((n: DataNode) => {
      if (n.key === node.key) {
        return { ...n, ...node }
      } else if (n.children) {
        return { ...n, children: this.updateNode(n.children, node) }
      }
      return n
    })
  }

}

export default connect()(ConnectTree)