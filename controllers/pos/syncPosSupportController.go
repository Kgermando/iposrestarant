package pos

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
    externalDataList, err := fetchExternalDataFromAPISupport()
    if err != nil {
        log.Println("Error fetching external data:", err)
        return
    }

    // Synchronize data from API to local
    for _, externalData := range externalDataList {
        var localData models.Pos
        if err := database.DB.Where("id = ?", externalData.ID).First(&localData).Error; err != nil {
            // If user does not exist locally, create it
            if err := database.DB.Create(&externalData).Error; err != nil {
                log.Println("Error creating user:", err)
            }
        } else {
            // Si l'utilisateur existe localement, mettez-le à jour uniquement si l'utilisateur externe est plus récent
            if externalData.UpdatedAt.After(localData.UpdatedAt) {
                if err := database.DB.Model(&localData).Updates(externalData).Error; err != nil {
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

func fetchExternalDataFromAPISupport() ([]models.Pos, error) {
    // Replace with the actual URL of your API
    apiURL := "https://i-pos-restaurant-api.up.railway.app/api/pos/all"

    resp, err := http.Get(apiURL)
    if err != nil {
        return nil, err
    }
    defer resp.Body.Close()

    if resp.StatusCode != http.StatusOK {
        return nil, fmt.Errorf("failed to fetch data: %s", resp.Status)
    }

    var dataList []models.Pos
    if err := json.NewDecoder(resp.Body).Decode(&dataList); err != nil {
        return nil, err
    }

    return dataList, nil
}
 