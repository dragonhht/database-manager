package controller

import (
	"database-client/handler"
	"database-client/model"
	"database-client/utils/helper"
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
	var message *model.ConnectMessage
	if err := c.ShouldBindJSON(&message); err != nil {
		handler.HandleResult(c, http.StatusInternalServerError, err.Error(), nil)
		return
	}
	err := helper.TestConnect(message)
	if err != nil {
		handler.HandleResult(c, http.StatusInternalServerError, err.Error(), nil)
		return
	}
	err = helper.SaveConnect(message)
	if err != nil {
		handler.HandleResult(c, http.StatusInternalServerError, err.Error(), nil)
		return
	}
	handler.HandleResult(c, http.StatusOK, "OK", message)
}

// @Summary 测试连接
// @Description 测试数据库连接
// @Tags 测试
// @Produce  json
// @Param message body model.ConnectMessage true "message"
// @Success 200 {object} model.Res
// @Router /database/connect/test [post]
func TestConnect(c *gin.Context) {
	var message *model.ConnectMessage
	if err := c.ShouldBindJSON(&message); err != nil {
		handler.HandleResult(c, http.StatusInternalServerError, err.Error(), nil)
		return
	}
	err := helper.TestConnect(message)
	if err != nil {
		handler.HandleResult(c, http.StatusInternalServerError, err.Error(), nil)
		return
	}
	handler.HandleResult(c, http.StatusOK, "OK", nil)
}

// @Summary 获取所有连接信息
// @Description 获取所有保存的连接信息
// @Tags 测试
// @Produce  json
// @Param message body model.ConnectMessage true "message"
// @Success 200 {object} model.Res
// @Router /database/connect/list [get]
func GetConnects(c *gin.Context) {
	connectMap, err := helper.GetConnects()
	if err != nil {
		handler.HandleResult(c, http.StatusInternalServerError, err.Error(), nil)
		return
	}
	size := len(connectMap)
	connects := make([]*model.ConnectMessage, size)
	index := 0
	for _, v := range connectMap {
		connects[index] = v
		index++
	}
	handler.HandleResult(c, http.StatusOK, "OK", connects)
}
