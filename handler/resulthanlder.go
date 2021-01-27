package handler

import (
	"github.com/gin-gonic/gin"
	"net/http"
)

// HandleResult 返回结果处理
func HandleResult(c *gin.Context, code int, msg string, data interface{}) {
	c.JSON(http.StatusOK, gin.H{
		"code": code,
		"msg":  msg,
		"data": data,
	})
}
