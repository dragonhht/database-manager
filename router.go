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
	// swagger
	router.Use(Cors())
	router.GET("/swagger/*any", ginSwagger.WrapHandler(swaggerFiles.Handler))

	apis := router.Group("/database/connect")

	apis.POST("/save", controller.SaveConnect)

	return router
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
