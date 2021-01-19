import React from 'react'
import { Menu, Dropdown } from 'antd';
import { DownOutlined } from '@ant-design/icons';

/** 文件菜单 */
const fileMenus = (
  <Menu>
    <Menu.SubMenu title="新建连接">
      <Menu.Item>
        <a>Mysql</a>
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

/** 顶部菜单 */
class HeaderMenu extends React.Component {
  render () {
    return <div>
      {/** 顶部下拉菜单 */}
      <div>
        <Dropdown overlay={fileMenus}>
          <a onClick={e => e.preventDefault()}>
            文件<DownOutlined></DownOutlined>
          </a>
        </Dropdown>
      </div>
    </div>
  }
}

export default HeaderMenu