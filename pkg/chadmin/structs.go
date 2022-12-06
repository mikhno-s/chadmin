package chadmin

import (
	"github.com/ClickHouse/clickhouse-go/v2"
	"github.com/gofiber/fiber/v2"
)

type CHAdmin struct {
	HTTPServer *fiber.App
	Config     struct {
		Port  string
		CHURL string
	}
	CHConn    clickhouse.Conn
	CHServers map[string]*CHServer
}

// API Entries
type ConnectRequestBody struct {
	URL string `json:"url" form:"url"`
}
