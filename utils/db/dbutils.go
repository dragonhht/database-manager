package db

import (
	"database-client/model"
	"database/sql"
)

// 数据库操作

// Operation 数据库操作接口
type Operation interface {
	Connect(connectMsg model.DbConnectMessage) (*sql.DB, error) // 连接数据库
	Query(sql string, params ...interface{}) (*model.DbQueryModel, error) // 查询
	Update(sql string, params ...interface{}) (int, error) // 更新
	Delete(sql string, params ...interface{}) (int, error) // 删除
	Insert(sql string, params ...interface{}) (int, error) // 新增
	Close(db *sql.DB) // 关闭数据库连接
}
