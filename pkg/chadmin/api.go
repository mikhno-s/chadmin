package chadmin

import (
	"strconv"

	"github.com/gofiber/fiber/v2"
)

func ResponseError(status int, errorMessage string, c *fiber.Ctx) error {
	c.Status(status)
	return c.JSON(fiber.Map{
		"status": "error",
		"error":  errorMessage,
	})
}

func ResponseOK(message string, c *fiber.Ctx) error {
	return c.JSON(fiber.Map{
		"status":  "ok",
		"message": message,
	})
}

// Connect to clickhouse
func (cha *CHAdmin) Connect(c *fiber.Ctx) error {

	// Parse Clickhouse DSN from request
	r := new(ConnectRequestBody)
	if err := c.BodyParser(r); err != nil || r.URL == "" {
		return ResponseError(400, "param url is empty", c)
	}
	cha.Config.CHURL = r.URL
	// If there is already live connection - disconnect and connect again
	if cha.CHConn != nil && cha.CHConn.Stats().Open != 0 {
		if cha.chClose() != nil {
			return ResponseError(500, "could not close the previous connetion", c)
		}
	}
	if err := cha.chConnect(); err != nil {
		return ResponseError(500, err.Error(), c)
	}

	return ResponseOK("connected", c)
}

// Ping checks that config is set and connection is alive. Should be used only for api requests, but not for /api/v1/set_churl
func (cha *CHAdmin) Ping(c *fiber.Ctx) error {

	if err := cha.chCheckPing(); err != nil {
		return ResponseError(400, err.Error(), c)
	}

	return ResponseOK("pong", c)
}

func (cha *CHAdmin) GetSettings(c *fiber.Ctx) error {

	settings, err := cha.chGetSettings()
	if err != nil {
		return ResponseError(500, err.Error(), c)
	}

	return c.JSON(fiber.Map{
		"status":   "ok",
		"settings": settings,
	})
}

func (cha *CHAdmin) GetLogs(c *fiber.Ctx) error {

	limitVal := c.FormValue("limit", "100")

	limit, err := strconv.Atoi(limitVal)
	if err != nil {
		return ResponseError(500, err.Error(), c)
	}

	logs, err := cha.chGetQueryLog(limit)
	if err != nil {
		return ResponseError(500, err.Error(), c)
	}

	return c.JSON(fiber.Map{
		"status": "ok",
		"result": logs,
	})
}

func (cha *CHAdmin) GetOverview(c *fiber.Ctx) error {

	overview, err := cha.chGetOverview()
	if err != nil {
		return ResponseError(500, err.Error(), c)
	}

	return c.JSON(fiber.Map{
		"status": "ok",
		"result": overview,
	})
}

func (cha *CHAdmin) GetDisks(c *fiber.Ctx) error {

	disks, err := cha.chGetDisks()
	if err != nil {
		return ResponseError(500, err.Error(), c)
	}

	return c.JSON(fiber.Map{
		"status": "ok",
		"result": disks,
	})
}

func (cha *CHAdmin) GetTables(c *fiber.Ctx) error {

	tables, err := cha.chGetTables()
	if err != nil {
		return ResponseError(500, err.Error(), c)
	}

	return c.JSON(fiber.Map{
		"status": "ok",
		"result": tables,
	})
}

func (cha *CHAdmin) Query(c *fiber.Ctx) error {

	r := new(QueryRequestBody)
	err := c.BodyParser(r)
	if err != nil {
		return ResponseError(400, "param query is empty", c)
	}

	result, err := cha.chQuery(r.Query)
	if err != nil {
		return ResponseError(500, err.Error(), c)
	}

	return c.JSON(fiber.Map{
		"status": "ok",
		"result": result,
	})
}

// Logout clears user's session info
func (cha *CHAdmin) Disconnect(c *fiber.Ctx) error {

	if cha.CHConn != nil {
		if err := cha.chClose(); err != nil {
			return ResponseError(500, err.Error(), c)
		}
	}
	return ResponseOK("Disconnected", c)
}
