package controller

import (
	"database-client/handler"
	"database-client/model"
	"database-client/utils/db"
	"database-client/utils/helper"
	"github.com/gin-gonic/gin"
	"net/http"
)

// @Summary 获取数据库下的所有表
// @Description 获取数据库下的所有表
// @Tags 测试
// @Produce  json
// @Param connectId query
// @Param database query
// @Param schema query
// @Success 200 {object} model.Res
// @Router /database/table/list [get]
func GetTables(c *gin.Context) {
	connectId := c.Query("connectId")
	database := c.Query("database")
	schema := c.Query("schema")
	message := helper.CONNECT_MESSAGE_MAP[connectId]
	tables, err := helper.GetTables(message, database, schema)
	if err != nil {
		handler.HandleResult(c, http.StatusInternalServerError, err.Error(), nil)
		return
	}
	handler.HandleResult(c, http.StatusOK, "OK", tables)
}


// @Summary 获取表数据
// @Description 获取表数据
// @Tags 测试
// @Produce  json
// @Param message body model.DataQueryMessage true "message"
// @Success 200 {object} model.Res
// @Router /database/table/data [post]
func GetTableData(c *gin.Context) {
	var message *model.DataQueryMessage
	if err := c.ShouldBindJSON(&message); err != nil {
		handler.HandleResult(c, http.StatusInternalServerError, err.Error(), nil)
		return
	}
	dbMessage := helper.CONNECT_MESSAGE_MAP[message.ConnectId]
	start := message.PageNo * message.PageSize
	result, err := helper.GetTableData(dbMessage, message.Schema, message.ObjectName, start, message.PageSize)
	if err != nil {
		handler.HandleResult(c, http.StatusInternalServerError, err.Error(), nil)
		return
	}
	total, err := helper.GetTableDataCount(dbMessage, message.Schema, message.ObjectName)
	if err != nil {
		handler.HandleResult(c, http.StatusInternalServerError, err.Error(), nil)
		return
	}
	data := db.NewQueryDataResult(result, total)
	handler.HandleResult(c, http.StatusOK, "OK", data)
}