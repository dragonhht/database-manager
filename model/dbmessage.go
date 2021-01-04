package model

// DbConnectMessage 数据库连接信息
type DbConnectMessage struct {
	userName string // 用户名
	password string // 密码
	port int // 端口
	ip string // IP地址
	database string // 数据库名称
	charset string // 编码
}

//NewDbConnectMessage 创建数据库连接信息对象
func NewDbConnectMessage(userName string, password string, port int, ip string, database string, charset string) DbConnectMessage {
	return DbConnectMessage{userName: userName, password: password, port: port, ip: ip, database: database, charset: charset}
}

//Charset 编码
func (d DbConnectMessage) Charset() string {
	return d.charset
}

//Database 数据库名称
func (d DbConnectMessage) Database() string {
	return d.database
}

//Ip IP
func (d DbConnectMessage) Ip() string {
	return d.ip
}

//Port 端口
func (d DbConnectMessage) Port() int {
	return d.port
}

//Password 密码
func (d DbConnectMessage) Password() string {
	return d.password
}

//UserName 用户名
func (d DbConnectMessage) UserName() string {
	return d.userName
}
