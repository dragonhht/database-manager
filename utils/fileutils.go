package utils

import (
	"bufio"
	"errors"
	"fmt"
	"io/ioutil"
	"os"
	"strings"
)

// FileIsExist 文件是否存在
func FileIsExist(path string) (bool, error) {
	_, err := os.Stat(path)
	if err == nil {
		return true, nil
	}
	if os.IsNotExist(err) {
		return false, nil
	}
	return false, errors.New("未知错误")
}

// FileRead 读取文件所有内容
func FileRead(path string) ([]byte, error) {
	return ioutil.ReadFile(path)
}

// SaveFile 保存文件内容
func SaveFile(path string, content []byte) error {
	err := CreateParentDir(path)
	if err != nil {
		return err
	}
	file, err := os.OpenFile(path, os.O_CREATE, 0666)
	if err != nil {
		return err
	}
	defer file.Close()
	write := bufio.NewWriter(file)
	_, err = write.Write(content)
	if err != nil {
		return err
	}
	write.Flush()
	return nil
}

// CreateParentDir 创建父级目录
func CreateParentDir(path string) error {
	last := strings.LastIndex(path, "/")
	if last == -1 {
		return errors.New("路径不存在上一级")
	}
	parentDir := path[:last]
	err := os.MkdirAll(parentDir, os.ModePerm)
	if err != nil {
		return err
	}
	return nil
}

// DirChildrenFiles 文件夹直接子文件名称
func DirChildrenFiles(dir string) ([]string, error) {
	info, err := os.Stat(dir)
	if err != nil {
		return nil, err
	}
	if !info.IsDir() {
		return nil, errors.New(fmt.Sprintf("%s 不是一个文件夹", dir))
	}
	files, err := ioutil.ReadDir(dir)
	if err != nil {
		return nil, err
	}
	list := make([]string, 0)
	for _, file := range files {
		if !file.IsDir() {
			list = append(list, file.Name())
		}
	}
	return list, nil
}

// GetFileFullPath 获取文件完整路径
func GetFileFullPath(parentDir, fileName string) string {
	str := parentDir + "/" + fileName
	return strings.ReplaceAll(str, "\\", "/")
}
