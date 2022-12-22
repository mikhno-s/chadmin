package main

import (
	"chadmin/pkg/chadmin"
)

func main() {
	cha := chadmin.New()

	cha.HTTPServer.Listen("0.0.0.0:4000")

}
