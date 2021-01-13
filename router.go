package main

import (
	"database-client/controller"
	"database-client/docs"
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
	apis := router.Group("/database/connect")
	apis.POST("/save", controller.SaveConnect)
	apis.GET("/list", controller.GetConnects)

	return router
}

// middlewareSetting 中间件设置
func middlewareSetting(app *gin.Engine) {
	// Cors
	app.Use(Cors())
}

// swaggerSetting Swagger配置
func swaggerSetting() {
	docs.SwaggerInfo.Title = "数据库连接工具API"
	docs.SwaggerInfo.Version = "1.0"
}

// Cors Cors配置
func Cors() gin.HandlerFunc {
	return func(c *gin.Context) {
		c.Header("Access-Control-Allow-Origin", "*")
		c.Next()
	}
}
