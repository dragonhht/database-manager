package model

// DataResult 数据结果
type DataResult struct {
	// 字段列表
	Titles []string  `json:"titles"`
	// 数据
	Data   [][]interface{} `json:"data"`
	// 总数
	Total int64 `json:"total"`
}
