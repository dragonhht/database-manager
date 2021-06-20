package helper

import (
	"database-client/enum"
	"database-client/model"
	"database-client/utils/db"
	"database-client/utils/db/mysql"
	"errors"
	"fmt"
)

// GetTableData 获取表数据
func GetTableData(message *model.ConnectMessage, schema string, tableName string,
	start int, size int) (*model.DbQueryModel, error) {
	switch message.Type {
	case enum.MYSQL:
		return mysqlTableData(message.DbConnectMessage, schema, tableName, start, size)
	case enum.MSSQL:
	case enum.POSTGRESQL:
	}
	return nil, errors.New("暂不支持的数据库类型")
}

// mysqlTableData 获取MySQL表数据
func mysqlTableData(dbConnectMessage model.DbConnectMessage, schema string, tableName string,
	start int, size int) (*model.DbQueryModel, error) {
	sqlStr := fmt.Sprintf("SELECT * FROM `%s`.`%s` LIMIT %d, %d", schema, tableName, start, size)
	operate := mysql.NewMysqlOperate(dbConnectMessage)
	result, err := operate.Query(sqlStr)
	if err != nil {
		return nil, err
	}
	return result, nil
}

// GetTableDataCount 获取表数据总数
func GetTableDataCount(message *model.ConnectMessage, schema string, tableName string) (int64, error) {
	switch message.Type {
	case enum.MYSQL:
		return mysqlTableDataCount(message.DbConnectMessage, schema, tableName)
	case enum.MSSQL:
	case enum.POSTGRESQL:
	}
	return -1, errors.New("暂不支持的数据库类型")
}

// mysqlTableDataCount 获取MySQL表数据
func mysqlTableDataCount(dbConnectMessage model.DbConnectMessage, schema string, tableName string) (int64, error) {
	sqlStr := fmt.Sprintf("SELECT count(1) FROM `%s`.`%s` ", schema, tableName)
	operate := mysql.NewMysqlOperate(dbConnectMessage)
	result, err := operate.Query(sqlStr)
	if err != nil {
		return -1, err
	}
	total := db.GetVal(result.Data()[0][0]).(int64)
	return total, nil
}