package controller

import (
	"database-client/handler"
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
// @Router /database/db/list [get]
func Dbs(c *gin.Context) {
	connectId := c.Query("connectId")
	message := helper.CONNECT_MESSAGE_MAP[connectId]
	dbs, err := helper.GetDbs(message)
	if err != nil {
		handler.HandleResult(c, http.StatusInternalServerError, err.Error(), nil)
		return
	}
	handler.HandleResult(c, http.StatusOK, "OK", dbs)
}
