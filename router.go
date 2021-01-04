package main

import (
	"database-client/controller"
	"github.com/gin-gonic/gin"
)

// 路由配置

// initRouter 初始化路由
func initRouter() *gin.Engine {
	router := gin.Default()
	apis := router.Group("/database")

	apis.GET("/index", controller.Index)

	return router
}
