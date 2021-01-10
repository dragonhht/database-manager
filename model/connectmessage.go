package model

// connectMessage 连接信息
type ConnectMessage struct {
    DbConnectMessage
	// 连接名
    Name string `form:"name" binding:"required"`
	// 是否保存密码
    SavePwd bool `form:"savePwd"`
	// 连接信息的id
    Id string `form:"id"`
}

//NewConnectMessage 创建数据库连接信息对象
func NewConnectMessage(userName string, password string, port int,
	ip string, database string, charset string, name string, savePwd bool) *ConnectMessage {
	return &ConnectMessage{
		DbConnectMessage: NewDbConnectMessage(userName, password, port, ip, database, charset),
		Name: name,
		SavePwd: savePwd,
	}
}