package controller

import (
	"database-client/handler"
	"database-client/model"
	"database-client/utils/helper"
	"github.com/gin-gonic/gin"
	"net/http"
)

// @Summary 数据库列表
// @Description 通过连接信息获取的数据库列表
// @Tags 测试
// @Produce  json
// @Param message body model.ConnectMessage true "message"
// @Success 200 {object} model.Res
// @Router /database/db/list [post]
func Dbs(c *gin.Context) {
	var message *model.ConnectMessage
	if err := c.ShouldBindJSON(&message); err != nil {
		handler.HandleResult(c, http.StatusInternalServerError, err.Error(), nil)
		return
	}
	dbs, err := helper.GetDbs(message)
	if err != nil {
		handler.HandleResult(c, http.StatusInternalServerError, err.Error(), nil)
		return
	}
	handler.HandleResult(c, http.StatusOK, "OK", dbs)
}
