package controller

import "github.com/gin-gonic/gin"

// Index
func Index(c *gin.Context) {
	c.JSON(200, gin.H{
		"title": "good",
		"name":  "huang",
	})
}
