package model
// 通用类型

// Res 接口返回格式类型
type Res struct {
    Code int `json:"code"`
	Data interface{} `json:"data"`
	Msg string `json:"msg"`
}
