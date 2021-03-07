package main

import (
	"database-client/controller"
	"database-client/docs"
	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	swaggerFiles "github.com/swaggo/files"
	ginSwagger "github.com/swaggo/gin-swagger"
)

// 路由配置

// initRouter 初始化路由
func initRouter() *gin.Engine {
	swaggerSetting()
	router := gin.Default()
	// 设置中间件
	middlewareSetting(router)
	// 配置swagger
	router.GET("/swagger/*any", ginSwagger.WrapHandler(swaggerFiles.Handler))

	// 连接信息
	connects := router.Group("/database/connect")
	connects.POST("/save", controller.SaveConnect)
	connects.GET("/list", controller.GetConnects)
	connects.POST("/test", controller.TestConnect)

	// 数据库操作
	dbs := router.Group("/database/db")
	dbs.GET("/list", controller.Dbs)

	// 表操作
	tables := router.Group("/database/table")
	tables.GET("/list", controller.GetTables)

	// 视图操作
	views := router.Group("/database/view")
	views.GET("list", controller.GetViews)

	return router
}

// middlewareSetting 中间件设置
func middlewareSetting(app *gin.Engine) {
	// Cors
	app.Use(cors.Default())
}

// swaggerSetting Swagger配置
func swaggerSetting() {
	docs.SwaggerInfo.Title = "数据库连接工具API"
	docs.SwaggerInfo.Version = "1.0"
}
