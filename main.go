package main

import (
	"embed"
	"encoding/json"
	"fmt"
	"io"
	"net/http"
	"os"
	"runtime"

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

const (
	repoOwner = "kgermando"
	repoName  = "iposrestaurant"
)

type Release struct {
	TagName string `json:"tag_name"`
	Assets  []struct {
		Name               string `json:"name"`
		BrowserDownloadURL string `json:"browser_download_url"`
	} `json:"assets"`
}

//go:embed all:frontend/dist/browser
var assets embed.FS

func isInternetAvailable() bool {
	_, err := http.Get("https://www.google.com")
	return err == nil
}

func CheckAndDownloadUpdates() {
	url := fmt.Sprintf("https://api.github.com/repos/%s/%s/releases/latest", repoOwner, repoName)
	resp, err := http.Get(url)
	if err != nil {
		fmt.Println("Error checking for updates:", err)
		return
	}
	defer resp.Body.Close()

	if resp.StatusCode != http.StatusOK {
		fmt.Println("Error: unable to fetch release information")
		return
	}

	var release Release
	if err := json.NewDecoder(resp.Body).Decode(&release); err != nil {
		fmt.Println("Error decoding release information:", err)
		return
	}

	fmt.Println("Latest version:", release.TagName)
	for _, asset := range release.Assets {
		if shouldDownloadAsset(asset.Name) {
			fmt.Println("Downloading asset:", asset.Name)
			if err := downloadFile(asset.BrowserDownloadURL, asset.Name); err != nil {
				fmt.Println("Error downloading asset:", err)
				return
			}
		}
	}
}

func shouldDownloadAsset(assetName string) bool {
	os := runtime.GOOS
	switch os {
	case "windows":
		return strings.Contains(assetName, "windows")
	case "darwin":
		return strings.Contains(assetName, "macos")
	case "linux":
		return strings.Contains(assetName, "linux")
	default:
		return false
	}
}

func downloadFile(url, fileName string) error {
	resp, err := http.Get(url)
	if err != nil {
		return err
	}
	defer resp.Body.Close()

	out, err := os.Create(fileName)
	if err != nil {
		return err
	}
	defer out.Close()

	_, err = io.Copy(out, resp.Body)
	return err
}

func main() {

	// Vérifier si une connexion Internet est disponible
	// if isInternetAvailable() {
	// 	// Vérifier les mises à jour logicielles
	// 	CheckAndDownloadUpdates()
	// }

	// Create an instance of the app structure
	app := NewApp()

	database.Connect()

	if isInternetAvailable() {
		database.PGConnect()
	}

	// Initialize Fiber
	fiberApp := fiber.New()

	// Middleware
	fiberApp.Use(cors.New(cors.Config{
		AllowOrigins:     "*", // "http://localhost:4300, https://i-pos-restaurant-api.up.railway.app",
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
		println("Error:", err.Error())
	}
}
