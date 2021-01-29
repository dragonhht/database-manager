package db

import (
	"database-client/model"
	"database/sql"
)

// 数据库操作

// Operation 数据库操作接口
type Operation interface {
	Connect() (*sql.DB, error)                                            // 连接数据库
	Query(sql string, params ...interface{}) (*model.DbQueryModel, error) // 查询
	Update(sql string, params ...interface{}) (int64, error)              // 更新
	Delete(sql string, params ...interface{}) (int64, error)              // 删除
	Insert(sql string, params ...interface{}) (int64, error)              // 新增
	Close()                                                               // 关闭数据库连接
}

// GetVal 通过查询结果获取返回数据
func GetVal(val interface{}) interface{} {
	switch val.(type) {
	case *sql.NullString:
		value := val.(*sql.NullString)
		return value.String
	case *sql.NullInt64:
		value := val.(*sql.NullInt64)
		return value.Int64
	case *sql.NullFloat64:
		value := val.(*sql.NullFloat64)
		return value.Float64
	case *sql.NullTime:
		value := val.(*sql.NullTime)
		return value.Time
	case *sql.NullInt32:
		value := val.(*sql.NullInt32)
		return value.Int32
	case *sql.NullBool:
		value := val.(*sql.NullBool)
		return value.Bool
	default:
		return nil
	}
}
