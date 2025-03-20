# README

## About

This is the official Wails Vanilla template.

You can configure the project by editing `wails.json`. More information about the project settings can be found
here: https://wails.io/docs/reference/project-config

## Live Development

To run in live development mode, run `wails dev` in the project directory. This will run a Vite development
server that will provide very fast hot reload of your frontend changes. If you want to develop in a browser
and have access to your Go methods, there is also a dev server that runs on http://localhost:34115. Connect
to this in your browser, and you can call your Go code from devtools.

## Building

To build a redistributable, production mode package, use `wails build`.


INFO  Wails is now using the new Go WebView2Loader. If you encounter any issues with it, please report them to https://github.com/wailsapp/wails/issues/2004. You could also use the old legacy loader with `-tags native_webview2loader`, but keep in mind this will be deprecated in the near future.

wails build -nsis -tags native_webview2loader



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