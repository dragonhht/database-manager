package helper

import (
	"database-client/enum"
	"database-client/model"
	"database-client/utils/db"
	"database-client/utils/db/mysql"
	"errors"
)

// GetViews 视图信息
func GetViews(message *model.ConnectMessage, database string, schema string) ([]string, error) {
	switch message.Type {
	case enum.MYSQL:
		return mysqlViews(message.DbConnectMessage, database, schema)
	case enum.MSSQL:
	case enum.POSTGRESQL:
	}
	return nil, errors.New("暂不支持的数据库类型")
}

// mysqlViews MySQL数据库获取视图信息
func mysqlViews(dbConnectMessage model.DbConnectMessage, database string, schema string) ([]string, error) {
	ds := database
	if ds == "" {
		ds = schema
	}
	sqlStr := "select table_name from information_schema.views where table_schema=?"
	operate := mysql.NewMysqlOperate(dbConnectMessage)
	result, err := operate.Query(sqlStr, ds)
	if err != nil {
		return nil, err
	}
	dbs := make([]string, len(result.Data()))
	for k, v := range result.Data() {
		value := db.GetVal(v[0])
		if value != nil {
			dbs[k] = value.(string)
		}
	}
	return dbs, nil
}
