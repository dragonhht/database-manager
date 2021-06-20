package model

// DataQueryMessage 数据查询参数
type DataQueryMessage struct {
	// 连接id
	ConnectId string `form:"connectId" json:"connectId" binding:"required"`
	// schema
	Schema string `form:"schema" json:"schema" binding:"required"`
	// 目标对象名
	ObjectName string `form:"objectName" json:"objectName" binding:"required"`
	// 页码
	PageNo int `form:"pageNo" json:"pageNo" binding:"required"`
	// 分页大小
	PageSize int `form:"pageSize" json:"pageSize" binding:"required"`
}
