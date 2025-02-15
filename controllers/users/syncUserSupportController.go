package users

import (
    "encoding/json"
    "fmt"
    "log"
    "net"
    "net/http"
    "sync"
    "time" 
    "iposrestaurant/database"
	"iposrestaurant/models"
)

var muSupport sync.Mutex

// SyncDataWithAPI synchronizes local data with an online API in both directions
func SyncDataWithAPISupport() {
    muSupport.Lock()
    defer muSupport.Unlock()

    if !isInternetAvailableSupport() {
        log.Println("No internet connection. Skipping synchronization.")
        return
    }

    // Récupérer des données externes à partir de l'API
    externalData, err := fetchExternalDataFromAPISupport()
    if err != nil {
        log.Println("Error fetching external data:", err)
        return
    }

    // Synchronize data from API to local
    for _, externalUser := range externalData {
        var localUser models.User
        if err := database.DB.Where("id = ?", externalUser.ID).First(&localUser).Error; err != nil {
            // If user does not exist locally, create it
            if err := database.DB.Create(&externalUser).Error; err != nil {
                log.Println("Error creating user:", err)
            }
        } else {
            // Si l'utilisateur existe localement, mettez-le à jour uniquement si l'utilisateur externe est plus récent
            if externalUser.UpdatedAt.After(localUser.UpdatedAt) {
                if err := database.DB.Model(&localUser).Updates(externalUser).Error; err != nil {
                    log.Println("Error updating user:", err)
                }
            }
        }
    }
}

func isInternetAvailableSupport() bool {
    _, err := net.DialTimeout("tcp", "google.com:80", 5*time.Second)
    return err == nil
}

func fetchExternalDataFromAPISupport() ([]models.User, error) {
    // Replace with the actual URL of your API
    apiURL := "https://i-pos-restaurant-api.up.railway.app/api/users/all"

    resp, err := http.Get(apiURL)
    if err != nil {
        return nil, err
    }
    defer resp.Body.Close()

    if resp.StatusCode != http.StatusOK {
        return nil, fmt.Errorf("failed to fetch data: %s", resp.Status)
    }

    var response struct {
		Data []models.User `json:"data"`
	}
	if err := json.NewDecoder(resp.Body).Decode(&response); err != nil {
		return nil, err
	}

	return response.Data, nil
}
