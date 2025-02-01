package main

import (
	"embed"

	"iposrestaurant/database"
	"iposrestaurant/routes"

	"log"
	"strings"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
	"github.com/wailsapp/wails/v2"
	"github.com/wailsapp/wails/v2/pkg/options"
	"github.com/wailsapp/wails/v2/pkg/options/assetserver"
)

//go:embed all:frontend/dist/browser
var assets embed.FS

func checkForUpdates() {
	// Logique pour vérifier les mises à jour logicielles
	log.Println("Vérification des mises à jour logicielles...")
	// ...code pour vérifier et appliquer les mises à jour...
}

func main() {
 
	// Vérifier les mises à jour logicielles
	checkForUpdates()

	// Create an instance of the app structure
	app := NewApp()

	database.Connect()

	// Initialize Fiber
	fiberApp := fiber.New()

	// Middleware
	fiberApp.Use(cors.New(cors.Config{
		AllowOrigins:  "*"  // "http://localhost:4300, https://i-pos-restaurant-api.up.railway.app",
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
		if err := fiberApp.Listen(":3000"); err != nil {
			log.Fatalf("Error starting Fiber server: %v", err)
		}
	}()

	// Create application with options
	err := wails.Run(&options.App{
		Title:  "iposrestaurant",
		Width:  1024,
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
		println("Error:", err.Error())
	}
}
