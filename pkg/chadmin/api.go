package chadmin

import (
	"github.com/gofiber/fiber/v2"
)

// Connect connects to clickhouse
func (cha *CHAdmin) Connect(c *fiber.Ctx) error {
	r := new(ConnectRequestBody)

	if err := c.BodyParser(r); err != nil || r.URL == "" {
		c.Status(400)
		return c.JSON(fiber.Map{
			"status": "error",
			"error":  "param url is empty",
		})
	}

	cha.Config.CHURL = r.URL

	err := cha.chConnect()
	if err != nil {
		c.Status(500)
		return c.JSON(fiber.Map{
			"status": "error",
			"error":  "could not connect to clickhouse. Error:\n" + err.Error(),
		})
	}

	return c.JSON(fiber.Map{
		"status":  "ok",
		"message": "connected successfully",
	})
}

// Ping checks that config is set and connection is alive. Should be used only for api requests, but not for /api/v1/set_churl
func (cha *CHAdmin) Ping(c *fiber.Ctx) error {

	if cha.Config.CHURL == "" || cha.CHConn == nil {
		c.Status(400)
		return c.JSON(fiber.Map{
			"status": "error",
			"error":  "clickhouse connection is not configured",
		})
	}

	if cha.chCheckPing() != nil {
		return c.JSON(fiber.Map{
			"status": "error",
			"error":  "could not connect to clickhouse",
		})
	}
	return c.JSON(fiber.Map{
		"status":  "ok",
		"message": "pong",
	})
}
