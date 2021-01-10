package helper

import "database-client/utils"

// config 配置信息
type config struct {
    DataDir string // 数据存储路径
    ConnectionDir string // 连接信息存储路径
}

// CONFIG 配置信息
var CONFIG = LoadConfig()

// LoadConfig 加载配置文件
func LoadConfig() config {
	confs, err := utils.LoadYaml("./config/ini.yml")
	if err != nil {
		panic(err)
	}
	baseDir := confs["data-dir"]
	return config{
		DataDir: baseDir,
		ConnectionDir: baseDir + confs["data-connect-dir"],
	}
}
