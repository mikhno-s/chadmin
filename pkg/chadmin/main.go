package chadmin

import (
	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/logger"
)

func New() *CHAdmin {
	cha := &CHAdmin{}

	cha.Server = fiber.New(fiber.Config{
		// Views: template_engine,
	})

	cha.Server.Server().LogAllErrors = true

	// Adding middlewares
	cha.Server.Use(logger.New())

	// Static
	cha.Server.Static("/", "./dist")

	// api v1 routes
	api := cha.Server.Group("/api")
	v1 := api.Group("/v1")

	v1.Get("/ping", cha.Ping)
	v1.Post("/connect", cha.Connect)

	return cha
}
