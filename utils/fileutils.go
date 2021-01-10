package utils

import (
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

// DirChildrenFiles 文件夹直接子文件路径
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
			path := dir + "/" + file.Name()
			path = strings.ReplaceAll(path, "\\", "/")
			list = append(list, path)
		}
	}
	return list, nil
}
