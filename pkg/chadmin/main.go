package chadmin

import (
	"fmt"
	"os"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/logger"
)

func New() *CHAdmin {
	cha := &CHAdmin{}

	chUrl := os.Getenv("CH_DSN")
	if chUrl != "" {
		cha.Config.CHURL = chUrl

		if err := cha.chConnect(); err != nil {
			fmt.Println(err.Error())
			os.Exit(1)
		}
	}

	cha.HTTPServer = fiber.New(fiber.Config{
		// Views: template_engine,
	})

	cha.HTTPServer.Server().LogAllErrors = true

	// Adding middlewares
	cha.HTTPServer.Use(logger.New())

	// Static
	cha.HTTPServer.Static("/", "./dist")

	// api v1 routes
	api := cha.HTTPServer.Group("/api")
	v1 := api.Group("/v1")

	v1.Get("/ping", cha.Ping)
	v1.Get("/disconnect", cha.Disconnect)
	v1.Get("/settings", cha.GetSettings)
	v1.Get("/logs", cha.GetLogs)
	v1.Post("/connect", cha.Connect)
	v1.Post("/query", cha.Query)

	return cha
}
