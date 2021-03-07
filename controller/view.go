package controller

import (
	"database-client/handler"
	"database-client/utils/helper"
	"github.com/gin-gonic/gin"
	"net/http"
)

// @Summary 获取数据库下的所有视图
// @Description 获取数据库下的所有视图
// @Tags 测试
// @Produce  json
// @Param connectId query
// @Param database query
// @Param schema query
// @Success 200 {object} model.Res
// @Router /database/view/list [get]
func GetViews(c *gin.Context) {
	connectId := c.Query("connectId")
	database := c.Query("database")
	schema := c.Query("schema")
	message := helper.CONNECT_MESSAGE_MAP[connectId]
	tables, err := helper.GetViews(message, database, schema)
	if err != nil {
		handler.HandleResult(c, http.StatusInternalServerError, err.Error(), nil)
		return
	}
	handler.HandleResult(c, http.StatusOK, "OK", tables)
}
