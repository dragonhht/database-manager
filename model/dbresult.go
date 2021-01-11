package model

// dbQueryModel 关系型数据库查询结果模型
type DbQueryModel struct {
	titles []string        // 查询字段列表
	data   [][]interface{} // 数据
}

// FieldValue 字段值
type FieldValue struct {
}

//NewDbQueryModel 创建关系型数据库查询结果模型
func NewDbQueryModel(titles []string, data [][]interface{}) *DbQueryModel {
	return &DbQueryModel{titles: titles, data: data}
}

//Data 获取数据
func (d *DbQueryModel) Data() [][]interface{} {
	return d.data
}

//Titles 获取查询字段列表
func (d *DbQueryModel) Titles() []string {
	return d.titles
}
