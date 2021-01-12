package model

// DbConnectMessage 数据库连接信息
type DbConnectMessage struct {
	// 用户名
	UserName string `form:"userName" json:"userName" binding:"required"`
	// 密码
	Password string `form:"password" json:"password"`
	// 端口
	Port int `form:"port" json:"port"`
	// IP地址
	Ip string `form:"ip" json:"ip" binding:"required"`
	// 数据库名称
	Database string `form:"database" json:"database"`
	// 编码
	Charset string `form:"charset" json:"charset"`
}

//NewDbConnectMessage 创建数据库连接信息对象
func NewDbConnectMessage(userName string, password string, port int, ip string, database string, charset string) DbConnectMessage {
	return DbConnectMessage{
		UserName: userName,
		Password: password,
		Port:     port,
		Ip:       ip,
		Database: database,
		Charset:  charset,
	}
}
