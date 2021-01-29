package helper

import (
	"database-client/enum"
	"database-client/model"
	"database-client/utils/db"
	"database-client/utils/db/mysql"
	"errors"
)

// GetDbs 通过连接信息获取数据库列表
func GetDbs(message *model.ConnectMessage) ([]string, error) {
	switch message.Type {
	case enum.MYSQL:
		return mysqlDbs(message.DbConnectMessage)
	case enum.MSSQL:
	case enum.POSTGRESQL:
	}
	return nil, errors.New("暂不支持的数据库类型")
}

// mysqlDbs 获取MySQL数据库列表
func mysqlDbs(dbConnectMessage model.DbConnectMessage) ([]string, error) {
	sqlStr := "SHOW DATABASES"
	operate := mysql.NewMysqlOperate(dbConnectMessage)
	result, err := operate.Query(sqlStr)
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
