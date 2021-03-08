import React from 'react'

/**
 * 数据库连接信息接口
 */
export class ConnectMessage {
  /** id */
  id?: string = ''
  /** 连接名 */
  name?: string = ''
  /** 数据库类型 */
  type?: string = ''
  /** 是否保存密码 */
  savePwd?: boolean = false
  /** ip */
  ip?: string = ''
  /** 端口号 */
  port?: number = -1
  /** 用户名 */
  userName?: string = ''
  /** 密码 */
  password?: string = ''
  /** 数据库 */
  database?: string = ''
  /** 编码 */
  charset?: string = ''
  /** schema */
  schema?: string = ''

  constructor(id?: string, name?: string, type?: string, savePwd?: boolean, ip?: string, port?: number, userName?: string,
    password?: string, database?: string, charset?: string, schema?: string) {
    this.id = id
    this.name = name
    this.type = type
    this.savePwd = savePwd
    this.ip = ip
    this.port = port
    this.userName = userName
    this.password = password
    this.database = database
    this.charset = charset
    this.schema = schema
  }

}

/**
 * 主区域，页签数据
 */
export class MainTabMessage {
  /** 连接信息 */
  connectMessage?: ConnectMessage
  /** 标题 */
  title: String
  /** 键 */
  key: React.Key
  /** 内容 */
  content?: any

  constructor(title: String, key: React.Key, connectMessage?: ConnectMessage, content?: any) {
    this.connectMessage = connectMessage
    this.title = title
    this.key = key
    this.content = content
  }
}