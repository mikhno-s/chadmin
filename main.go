package main

import (
	"chadmin/pkg/chadmin"
	"fmt"
)

func main() {
	fmt.Println("Hello")
	cha := chadmin.New()

	cha.HTTPServer.Listen(":4000")

}
