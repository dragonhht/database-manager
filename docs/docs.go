// GENERATED BY THE COMMAND ABOVE; DO NOT EDIT
// This file was generated by swaggo/swag

package docs

import (
	"bytes"
	"encoding/json"
	"strings"

	"github.com/alecthomas/template"
	"github.com/swaggo/swag"
)

var doc = `{
    "schemes": {{ marshal .Schemes }},
    "swagger": "2.0",
    "info": {
        "description": "{{.Description}}",
        "title": "{{.Title}}",
        "contact": {
            "name": "Carlos Huang",
            "url": "https://github.com/dragonhht"
        },
        "license": {
            "name": "Apache 2.0",
            "url": "http://www.apache.org/licenses/LICENSE-2.0.html"
        },
        "version": "{{.Version}}"
    },
    "host": "{{.Host}}",
    "basePath": "{{.BasePath}}",
    "paths": {
        "/database/connect/list": {
            "get": {
                "description": "获取所有保存的连接信息",
                "produces": [
                    "application/json"
                ],
                "tags": [
                    "测试"
                ],
                "summary": "获取所有连接信息",
                "parameters": [
                    {
                        "description": "message",
                        "name": "message",
                        "in": "body",
                        "required": true,
                        "schema": {
                            "$ref": "#/definitions/model.ConnectMessage"
                        }
                    }
                ],
                "responses": {
                    "200": {
                        "description": "OK",
                        "schema": {
                            "$ref": "#/definitions/model.Res"
                        }
                    }
                }
            }
        },
        "/database/connect/save": {
            "post": {
                "description": "保存或更新数据库连接信息",
                "produces": [
                    "application/json"
                ],
                "tags": [
                    "测试"
                ],
                "summary": "保存连接信息",
                "parameters": [
                    {
                        "description": "message",
                        "name": "message",
                        "in": "body",
                        "required": true,
                        "schema": {
                            "$ref": "#/definitions/model.ConnectMessage"
                        }
                    }
                ],
                "responses": {
                    "200": {
                        "description": "OK",
                        "schema": {
                            "$ref": "#/definitions/model.Res"
                        }
                    }
                }
            }
        }
    },
    "definitions": {
        "model.ConnectMessage": {
            "type": "object",
            "required": [
                "ip",
                "name",
                "userName"
            ],
            "properties": {
                "charset": {
                    "description": "编码",
                    "type": "string"
                },
                "database": {
                    "description": "数据库名称",
                    "type": "string"
                },
                "id": {
                    "description": "连接信息的id",
                    "type": "string"
                },
                "ip": {
                    "description": "IP地址",
                    "type": "string"
                },
                "name": {
                    "description": "连接名",
                    "type": "string"
                },
                "password": {
                    "description": "密码",
                    "type": "string"
                },
                "port": {
                    "description": "端口",
                    "type": "integer"
                },
                "savePwd": {
                    "description": "是否保存密码",
                    "type": "boolean"
                },
                "type": {
                    "description": "数据库类型",
                    "type": "string"
                },
                "userName": {
                    "description": "用户名",
                    "type": "string"
                }
            }
        },
        "model.Res": {
            "type": "object",
            "properties": {
                "code": {
                    "type": "integer"
                },
                "data": {
                    "type": "object"
                },
                "msg": {
                    "type": "string"
                }
            }
        }
    }
}`

type swaggerInfo struct {
	Version     string
	Host        string
	BasePath    string
	Schemes     []string
	Title       string
	Description string
}

// SwaggerInfo holds exported Swagger Info so clients can modify it
var SwaggerInfo = swaggerInfo{
	Version:     "1.0",
	Host:        "127.0.0.1:8080",
	BasePath:    "/",
	Schemes:     []string{},
	Title:       "数据库工具",
	Description: "数据库工具后端API接口文档",
}

type s struct{}

func (s *s) ReadDoc() string {
	sInfo := SwaggerInfo
	sInfo.Description = strings.Replace(sInfo.Description, "\n", "\\n", -1)

	t, err := template.New("swagger_info").Funcs(template.FuncMap{
		"marshal": func(v interface{}) string {
			a, _ := json.Marshal(v)
			return string(a)
		},
	}).Parse(doc)
	if err != nil {
		return doc
	}

	var tpl bytes.Buffer
	if err := t.Execute(&tpl, sInfo); err != nil {
		return doc
	}

	return tpl.String()
}

func init() {
	swag.Register(swag.Name, &s{})
}
