package handler

import (
	"github.com/gin-gonic/gin"
)

// HandleResult 返回结果处理
func HandleResult(c *gin.Context, code int, msg string, data interface{}) {
	c.JSON(code, gin.H{
		"code": code,
		"msg":  msg,
		"data": data,
	})
}
