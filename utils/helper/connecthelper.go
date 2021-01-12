package helper

import (
	"database-client/model"
	"database-client/utils"
	"encoding/json"
	"errors"
	"github.com/go-basic/uuid"
)

// GetConnects 获取所有已保存的连接信息
func GetConnects() (map[string]*model.ConnectMessage, error) {
	connectDir := CONFIG.ConnectionDir
	if connectDir == "" {
		return nil, errors.New("获取连接数据路径失败")
	}
	connects, err := utils.DirChildrenFiles(connectDir)
	if err != nil {
		return nil, err
	}
	result := make(map[string]*model.ConnectMessage)
	for _, v := range connects {
		path := utils.GetFileFullPath(connectDir, v)
		bytes, err := utils.FileRead(path)
		if err != nil {
			return nil, err
		}
		content, err := utils.DeAesCode(string(bytes), CryptoKey)
		if err != nil {
			return nil, err
		}
		// 解析内容
		var msg *model.ConnectMessage
		err = json.Unmarshal(content, &msg)
		if err != nil {
			return nil, err
		}
		result[v] = msg
	}
	return result, nil
}

// SaveConnect 保存连接信息
func SaveConnect(message *model.ConnectMessage) error {
	id := message.Id
	if id == "" {
		id = uuid.New()
	}
	message.Id = id
	path := utils.GetFileFullPath(CONFIG.ConnectionDir, id)
	msg, err := json.Marshal(message)
	if err != nil {
		return err
	}
	content := utils.EnAesCode(msg, CryptoKey)
	err = utils.SaveFile(path, []byte(content))
	return err
}
