/** 数据库类型 */
export enum DatabaseType {
  /** MySQL */
  MYSQL = 'MySQL',
  /** Postgre SQL */
  POSTGRE_SQL = 'PostgreSQL',
  /** SQL Server */
  MSSQL = 'MSSQL'
}

/** 查看类型 */
export enum ViewType {
  /** 未设置 */
  NULL = '-1',
  /** 表 */
  TABLE = 'table',
  /** 视图 */
  VIEW = 'view',
  /** 脚本 */
  SCRIPT = 'script'
}