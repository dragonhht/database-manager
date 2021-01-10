package utils

import "github.com/spf13/viper"

// LoadYaml 加载并获取配置文件数据
func LoadYaml(path string) (map[string]string,  error) {
    v := viper.New()
    v.SetConfigFile(path)
	if err := v.ReadInConfig(); err != nil {
		return nil, err
	}
	kv := make(map[string]string)
	for _, k := range v.AllKeys() {
		kv[k] = v.GetString(k)
	}
	return kv, nil
}
