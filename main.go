package main

// 启动文件

// @title 数据库工具
// @version 1.0
// @description 数据库工具后端API接口文档
// @contact.name Carlos Huang
// @contact.url https://github.com/dragonhht
// @license.name Apache 2.0
// @license.url http://www.apache.org/licenses/LICENSE-2.0.html
// @host 127.0.0.1:8080
// @BasePath /
func main() {
	app := initRouter()
	_ = app.Run(":9999")
}
