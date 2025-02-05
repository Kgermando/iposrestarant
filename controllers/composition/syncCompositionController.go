package composition 

import (
    "bytes"
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

var mu sync.Mutex

// SyncDataWithAPI synchronizes local data with an online API in both directions
func SyncDataWithAPI(code_entreprise string, pos_id string) {
    mu.Lock()
    defer mu.Unlock()

    if !isInternetAvailable() {
        log.Println("No internet connection. Skipping synchronization.")
        return
    }

    // Récupérer des données externes à partir de l'API
    externalDataList, err := fetchExternalDataFromAPI(code_entreprise, pos_id)
    if err != nil {
        log.Println("Error fetching external data:", err)
        return
    }

    // Synchronize data from API to local
    for _, externalData := range externalDataList {
        var localData models.Composition
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

    // Fetch local data
    var localDataList []models.Composition
    if err := database.DB.Find(&localDataList).Error; err != nil {
        log.Println("Error fetching local data:", err)
        return
    }

    // Synchroniser les données du local vers l'API
    for _, localData := range localDataList {
        // Check if the local user is newer than the external user
        externalData, err := fetchExternalDataItemFromAPI(localData.ID)
        if err != nil {
            // If user does not exist externally, create it
            if err := sendLocalDataToAPI(localData); err != nil {
                log.Println("Error creating external user:", err)
            }
            continue
        }

        // Si l'utilisateur local est plus récent que l'utilisateur externe, mettez à jour l'utilisateur externe
        if localData.UpdatedAt.After(externalData.UpdatedAt) {
            if err := updateExternalDataInAPI(localData); err != nil {
                log.Println("Error updating external data to API:", err)
            }
        }
    }
}

func isInternetAvailable() bool {
    _, err := net.DialTimeout("tcp", "google.com:80", 5*time.Second)
    return err == nil
}

// Récupérer des données externes à partir de l'API
func fetchExternalDataFromAPI(code_entreprise string, pos_id string) ([]models.Composition, error) {
    // Replace with the actual URL of your API
    apiURL := fmt.Sprintf("https://i-pos-restaurant-api.up.railway.app/api/compositions/%s/%s/all", code_entreprise, pos_id)

    resp, err := http.Get(apiURL)
    if err != nil {
        return nil, err
    }
    defer resp.Body.Close()

    if resp.StatusCode != http.StatusOK {
        return nil, fmt.Errorf("failed to fetch data: %s", resp.Status)
    }

    var dataList []models.Composition
    if err := json.NewDecoder(resp.Body).Decode(&dataList); err != nil {
        return nil, err
    }

    return dataList, nil
}

// Récupérer une donnee externe à partir de l'API
func fetchExternalDataItemFromAPI(dataID uint) (models.Composition, error) {
    // URL de l'API
    apiURL := fmt.Sprintf("https://i-pos-restaurant-api.up.railway.app/api/compositions/get/%d", dataID)

    resp, err := http.Get(apiURL)
    if err != nil {
        return models.Composition{}, err
    }
    defer resp.Body.Close()

    if resp.StatusCode != http.StatusOK {
        return models.Composition{}, fmt.Errorf("failed to fetch data: %s", resp.Status)
    }

    var data models.Composition
    if err := json.NewDecoder(resp.Body).Decode(&data); err != nil {
        return models.Composition{}, err
    }

    return data, nil
}

// Envoyer des données locales à l'API
func sendLocalDataToAPI(data models.Composition) error {
    // Soumission des données vers l'API
    apiURL := "https://i-pos-restaurant-api.up.railway.app/api/compositions/create"

    dataItem, err := json.Marshal(data)
    if err != nil {
        return err
    }

    // Création de la requête HTTP
    req, err := http.NewRequest(http.MethodPut, apiURL, bytes.NewBuffer(dataItem))
    if err != nil {
        return err
    }
    // Ajout des en-têtes
    req.Header.Set("Content-Type", "application/json")

    client := &http.Client{}
    resp, err := client.Do(req)
    if err != nil {
        return err
    }
    defer resp.Body.Close()

    if resp.StatusCode != http.StatusOK {
        return fmt.Errorf("failed to send data: %s", resp.Status)
    }

    return nil
}

// Update external data data in the API
func updateExternalDataInAPI(data models.Composition) error {
    // URL de l'API
    apiURL := fmt.Sprintf("https://i-pos-restaurant-api.up.railway.app/api/compositions/update/%d", data.ID)

    dataItem, err := json.Marshal(data)
    if err != nil {
        return err
    }

    // Création de la requête HTTP
    req, err := http.NewRequest(http.MethodPut, apiURL, bytes.NewBuffer(dataItem))
    if err != nil {
        return err
    }
    // Ajout des en-têtes
    req.Header.Set("Content-Type", "application/json")

    client := &http.Client{}
    resp, err := client.Do(req)
    if err != nil {
        return err
    }
    defer resp.Body.Close()

    if resp.StatusCode != http.StatusOK {
        return fmt.Errorf("failed to update data: %s", resp.Status)
    }

    return nil
}
