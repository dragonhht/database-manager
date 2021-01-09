package mysql

// MySQL字段类型
const (
	INT = "INT" // 整型
	FLOAT = "FLOAT" // 浮点型
	DEC = "DEC" // 定点数类型
	BIT = "BIT" // 位类型
	TIME = "TIME" // 时间类型
	STR = "STRING" // 字符串类型
)

// 字段类型
var FIELD_TYPES = map[string]string {
	// 数值型
	"TINYINT": INT,
	"SMALLINT": INT,
	"MEDIUMINT": INT,
	"INTEGER": INT,
	"INT": INT,
	"BIGINT": INT,
	"FLOAT": FLOAT,
	"DOUBLE": FLOAT,
	"DECIMAL": DEC,
	"DEC": DEC,
	"BIT": BIT,
	// 时间类型
	"DATE": TIME,
	"TIME": TIME,
	"YEAR": TIME,
	"DATETIME": TIME,
	"TIMESTAMP": TIME,
	// 字符型
	"CHAR":STR,
	"VARCHAR":STR,
	"TINYBLOB":STR,
	"BLOB":STR,
	"MEDIUMBLOB":STR,
	"LONGBLOB":STR,
	"TINYTEXT":STR,
	"TEXT":STR,
	"MEDIUMTEXT":STR,
	"LONGTEXT":STR,
	"VARBINARY":STR,
	"BINARY":STR,
}
