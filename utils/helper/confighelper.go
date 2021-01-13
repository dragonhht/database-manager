package helper

import (
	"database-client/utils"
	"github.com/go-basic/uuid"
)

// config 配置信息
type config struct {
	DataDir       string // 数据存储路径
	ConnectionDir string // 连接信息存储路径
}

// CONFIG 配置信息
var CONFIG = LoadConfig()

// 加密秘钥
var CryptoKey = LoadCryptoKey()

// LoadConfig 加载配置文件
func LoadConfig() config {
	confs, err := utils.LoadYaml("./config/ini.yml")
	if err != nil {
		panic(err)
	}
	baseDir := confs["data-dir"]
	connectionDir := utils.GetFileFullPath(baseDir, confs["data-connect-dir"])
	return config{
		DataDir:       baseDir,
		ConnectionDir: connectionDir,
	}
}

// LoadCryptoKey 加载加密key
func LoadCryptoKey() []byte {
	path := utils.GetFileFullPath(CONFIG.DataDir, "USERPWD")
	exist, err := utils.FileIsExist(path)
	if err != nil {
		panic(err)
	}
	if exist {
		key, err := utils.FileRead(path)
		if err != nil {
			panic(err)
		}
		return key
	} else {
		key := []byte(uuid.New())
		err := utils.SaveFile(path, utils.Md5(key))
		if err != nil {
			panic("保存密钥失败")
		}
		return key
	}
}
