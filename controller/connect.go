package controller

import (
	"database-client/model"
	"database-client/utils/helper"
	"fmt"
	"github.com/gin-gonic/gin"
	"net/http"
)

// @Summary 保存连接信息
// @Description 保存或更新数据库连接信息
// @Tags 测试
// @Produce  json
// @Param message body model.ConnectMessage true "message"
// @Success 200 {object} model.Res
// @Router /database/connect/save [post]
func SaveConnect(c *gin.Context) {
	var message model.ConnectMessage
	if err := c.ShouldBindJSON(&message); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	fmt.Printf("message: %v\n", message)
	c.JSON(http.StatusOK, model.Res{
		Code: 200,
		Data: helper.CONFIG.DataDir,
		Msg:  "",
	})
}