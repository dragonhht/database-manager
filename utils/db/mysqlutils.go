package db

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
	connectStr string // 数据库连接字符串
	connect *sql.DB // 数据库连接
}


func newMysqlOperate(dbConnectMessage model.DbConnectMessage) *mysqlOperate {
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
func (m *mysqlOperate) Query(sql string, params ...interface{}) (*model.DbQueryModel, error) {
	if m.connect == nil {
		_, err := m.Connect(m.DbConnectMessage)
		if err != nil {
			return nil, err
		}
	}
	defer m.Close()
	rows, err := m.connect.Query(sql, params...)
	if err != nil {
		return nil, err
	}
	var titles []string
	datas := make([][]interface{}, 0)
	for rows.Next() {
		if titles == nil {
			columns, err := rows.Columns()
			if err != nil {
				return nil, err
			}
			titles = columns
		}
		data := make([]interface{}, len(titles))
		err := rows.Scan(&data[0], &data[1], &data[2])
		if err != nil {
			return nil, err
		}
		datas = append(datas, data)
	}
	result := model.NewDbQueryModel(titles, datas)
	return result, nil
}

func (m *mysqlOperate) Update(sql string, params ...interface{}) (int, error) {
	panic("implement me")
}

func (m *mysqlOperate) Delete(sql string, params ...interface{}) (int, error) {
	panic("implement me")
}

func (m *mysqlOperate) Insert(sql string, params ...interface{}) (int, error) {
	panic("implement me")
}

func (m *mysqlOperate) Close() {
	if m.connect != nil {
		_ = m.connect.Close()
		m.connect = nil
	}
}
