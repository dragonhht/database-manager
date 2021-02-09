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

  constructor(id?: string, name?: string, type?: string, savePwd?: boolean, ip?: string, port?: number, userName?: string,
    password?: string, database?: string, charset?: string) {
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
  }

}