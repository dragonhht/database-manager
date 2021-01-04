package main

// 启动文件

func main() {
	app := initRouter()
	_ = app.Run(":8080")
}
