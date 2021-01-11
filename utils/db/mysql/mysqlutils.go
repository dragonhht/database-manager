package mysql

import (
	"database-client/model"
	"database/sql"
	"errors"
	"fmt"
	_ "github.com/go-sql-driver/mysql"
)

// mysqlOperate MySQL数据库操作工具类
type mysqlOperate struct {
	model.DbConnectMessage
	connectStr string  // 数据库连接字符串
	connect    *sql.DB // 数据库连接
}

func NewMysqlOperate(dbConnectMessage model.DbConnectMessage) *mysqlOperate {
	return &mysqlOperate{DbConnectMessage: dbConnectMessage}
}

// buildMySqlConnectStr 创建MySQL连接字符串
func (m *mysqlOperate) buildMySqlConnectStr() (string, error) {
	if m.connectStr != "" {
		return m.connectStr, nil
	}
	if m.UserName() == "" {
		return "", errors.New("用户名不能为空")
	}
	if m.Ip() == "" {
		return "", errors.New("IP不能为空")
	}
	charset := m.Charset()
	if charset == "" {
		charset = "utf8"
	}
	m.connectStr = fmt.Sprintf("%s:%s@tcp(%s:%d)/%s?charset=%s", m.UserName(),
		m.Password(), m.Ip(), m.Port(), m.Database(), charset)
	return m.connectStr, nil
}

//Connect 连接数据库
func (m *mysqlOperate) Connect(connectMsg model.DbConnectMessage) (*sql.DB, error) {
	connectStr, err := m.buildMySqlConnectStr()
	if err != nil {
		return nil, err
	}
	db, err := sql.Open("mysql", connectStr)
	m.connect = db
	return m.connect, err
}

//Query 查询
func (m *mysqlOperate) Query(sqlStr string, params ...interface{}) (*model.DbQueryModel, error) {
	if m.connect == nil {
		_, err := m.Connect(m.DbConnectMessage)
		if err != nil {
			return nil, err
		}
	}
	defer m.Close()
	rows, err := m.connect.Query(sqlStr, params...)
	defer rows.Close()
	if err != nil {
		return nil, err
	}
	var titles []string
	columns, err := rows.Columns()
	if err != nil {
		return nil, err
	}
	titles = columns
	colTypes, err := rows.ColumnTypes()
	if err != nil {
		return nil, err
	}
	datas := make([][]interface{}, 0)
	for rows.Next() {
		data, err := createVarByColumnType(colTypes)
		if err != nil {
			return nil, err
		}
		err = rows.Scan(data...)
		if err != nil {
			return nil, err
		}
		datas = append(datas, data)
	}
	result := model.NewDbQueryModel(titles, datas)
	return result, nil
}

// createVarByColumnType 通过字段类型创建字段变量
func createVarByColumnType(types []*sql.ColumnType) ([]interface{}, error) {
	data := make([]interface{}, len(types))
	for k, v := range types {
		value, err := createVar(v.DatabaseTypeName())
		if err != nil {
			return nil, err
		}
		data[k] = value
	}
	return data, nil
}

// createVar 按数据库字段类型创建对象
func createVar(typeName string) (interface{}, error) {
	fieldType := FIELD_TYPES[typeName]
	switch fieldType {
	case INT:
		fallthrough
	case DEC:
		fallthrough
	case BIT:
		return &sql.NullInt64{}, nil
	case FLOAT:
		return &sql.NullFloat64{}, nil
	case TIME:
		return &sql.NullTime{}, nil
	case STR:
		return &sql.NullString{}, nil
	}
	return nil, errors.New("不支持的数据库类型" + typeName)
}

//Update 更新
func (m *mysqlOperate) Update(sql string, params ...interface{}) (int64, error) {
	if m.connect == nil {
		_, err := m.Connect(m.DbConnectMessage)
		if err != nil {
			return 0, err
		}
	}
	defer m.Close()
	stmt, err := m.connect.Prepare(sql)
	defer stmt.Close()
	if err != nil {
		return 0, err
	}
	res, err := stmt.Exec(params...)
	if err != nil {
		return 0, err
	}
	affect, err := res.RowsAffected()
	if err != nil {
		return 0, nil
	}
	return affect, nil
}

//Delete 刪除
func (m *mysqlOperate) Delete(sql string, params ...interface{}) (int64, error) {
	if m.connect == nil {
		_, err := m.Connect(m.DbConnectMessage)
		if err != nil {
			return 0, err
		}
	}
	defer m.Close()
	stmt, err := m.connect.Prepare(sql)
	defer stmt.Close()
	if err != nil {
		return 0, err
	}
	res, err := stmt.Exec(params...)
	if err != nil {
		return 0, err
	}
	affect, err := res.RowsAffected()
	if err != nil {
		return 0, nil
	}
	return affect, nil
}

func (m *mysqlOperate) Insert(sql string, params ...interface{}) (int64, error) {
	if m.connect == nil {
		_, err := m.Connect(m.DbConnectMessage)
		if err != nil {
			return 0, err
		}
	}
	defer m.Close()
	stmt, err := m.connect.Prepare(sql)
	defer stmt.Close()
	if err != nil {
		return 0, err
	}
	res, err := stmt.Exec(params...)
	if err != nil {
		return 0, err
	}
	affect, err := res.RowsAffected()
	if err != nil {
		return 0, nil
	}
	return affect, nil
}

func (m *mysqlOperate) Close() {
	if m.connect != nil {
		_ = m.connect.Close()
		m.connect = nil
	}
}
