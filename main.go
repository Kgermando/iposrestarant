package main

import (
	"embed"
	"net/http"

	"strings"

	"iposrestaurant/database"
	"iposrestaurant/routes"

	"log"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
	"github.com/wailsapp/wails/v2"
	"github.com/wailsapp/wails/v2/pkg/options"
	"github.com/wailsapp/wails/v2/pkg/options/assetserver"
)

//go:embed all:frontend/dist/browser
var assets embed.FS

func isInternetAvailable() bool {
	_, err := http.Get("https://www.google.com")
	return err == nil
}

func main() {
	// Connect to the local database
	database.Connect()

	// Connect to PostgreSQL if internet is available
	// if isInternetAvailable() {
	// 	database.PGConnect()
	// } else {
	// 	log.Println("Internet is not available. Skipping PostgreSQL connection.")
	// }

	// Initialize Fiber
	fiberApp := fiber.New()

	// Middleware
	fiberApp.Use(cors.New(cors.Config{
		AllowOrigins:     "*",
		AllowHeaders:     "Origin, Content-Type, Accept",
		AllowCredentials: false,
		AllowMethods: strings.Join([]string{
			fiber.MethodGet,
			fiber.MethodPost,
			fiber.MethodHead,
			fiber.MethodPut,
			fiber.MethodDelete,
			fiber.MethodPatch,
		}, ","),
	}))

	// Set up routes
	routes.Setup(fiberApp)

	// Start Fiber server in a goroutine
	go func() {
		log.Println("Starting Fiber server on port 3000...")
		if err := fiberApp.Listen(":3000"); err != nil {
			log.Fatalf("Error starting Fiber server: %v", err)
		}
	}()

	// Create an instance of the app structure
	app := NewApp()

	// Create application with options
	err := wails.Run(&options.App{
		Title:  "iposrestaurant",
		Width:  1360,
		Height: 768,
		AssetServer: &assetserver.Options{
			Assets: assets,
		},
		BackgroundColour: &options.RGBA{R: 27, G: 38, B: 54, A: 1},
		OnStartup:        app.startup,
		Bind: []interface{}{
			app,
		},
	})

	if err != nil {
		log.Fatalf("Error running Wails application: %v", err)
	}
}
