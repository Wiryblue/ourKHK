package main

import (
	"net/http"
	"ourKHK/backend/handlers"
)

func main() {
	http.HandleFunc("/login", handlers.Login)
	http.ListenAndServe(":8000", nil)
}
