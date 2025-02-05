package users

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
func SyncDataWithAPI(entrepriseID string) {
    mu.Lock()
    defer mu.Unlock()

    if !isInternetAvailable() {
        log.Println("No internet connection. Skipping synchronization.")
        return
    }

    // Récupérer des données externes à partir de l'API
    externalData, err := fetchExternalDataFromAPI(entrepriseID)
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

    // Fetch local data
    var localData []models.User
    if err := database.DB.Find(&localData).Error; err != nil {
        log.Println("Error fetching local data:", err)
        return
    }

    // Synchroniser les données du local vers l'API
    for _, localUser := range localData {
        // Check if the local user is newer than the external user
        externalUser, err := fetchExternalUserFromAPI(localUser.ID)
        if err != nil {
            // If user does not exist externally, create it
            if err := sendLocalDataToAPI(localUser); err != nil {
                log.Println("Error creating external user:", err)
            }
            continue
        }

        // Si l'utilisateur local est plus récent que l'utilisateur externe, mettez à jour l'utilisateur externe
        if localUser.UpdatedAt.After(externalUser.UpdatedAt) {
            if err := updateExternalUserInAPI(localUser); err != nil {
                log.Println("Error updating external data to API:", err)
            }
        }
    }
}

func isInternetAvailable() bool {
    _, err := net.DialTimeout("tcp", "google.com:80", 5*time.Second)
    return err == nil
}

func fetchExternalDataFromAPI(entrepriseID string) ([]models.User, error) {
    // Replace with the actual URL of your API
    apiURL := fmt.Sprintf("https://i-pos-restaurant-api.up.railway.app/api/users/all/%s", entrepriseID)

    resp, err := http.Get(apiURL)
    if err != nil {
        return nil, err
    }
    defer resp.Body.Close()

    if resp.StatusCode != http.StatusOK {
        return nil, fmt.Errorf("failed to fetch data: %s", resp.Status)
    }

    var users []models.User
    if err := json.NewDecoder(resp.Body).Decode(&users); err != nil {
        return nil, err
    }

    return users, nil
}

// Récupérer un utilisateur externe à partir de l'API
func fetchExternalUserFromAPI(userID uint) (models.User, error) {
    // URL de l'API
    apiURL := fmt.Sprintf("https://i-pos-restaurant-api.up.railway.app/api/users/get/%d", userID)

    resp, err := http.Get(apiURL)
    if err != nil {
        return models.User{}, err
    }
    defer resp.Body.Close()

    if resp.StatusCode != http.StatusOK {
        return models.User{}, fmt.Errorf("failed to fetch data: %s", resp.Status)
    }

    var user models.User
    if err := json.NewDecoder(resp.Body).Decode(&user); err != nil {
        return models.User{}, err
    }

    return user, nil
}

// Envoyer des données locales à l'API
func sendLocalDataToAPI(user models.User) error {
    // Soumission des données vers l'API
    apiURL := "https://i-pos-restaurant-api.up.railway.app/api/users/create"

    userData, err := json.Marshal(user)
    if err != nil {
        return err
    }

    // Création de la requête HTTP
    req, err := http.NewRequest(http.MethodPut, apiURL, bytes.NewBuffer(userData))
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

// Update external user data in the API
func updateExternalUserInAPI(user models.User) error {
    // URL de l'API
    apiURL := fmt.Sprintf("https://i-pos-restaurant-api.up.railway.app/api/users/update/%d", user.ID)

    userData, err := json.Marshal(user)
    if err != nil {
        return err
    }

    // Création de la requête HTTP
    req, err := http.NewRequest(http.MethodPut, apiURL, bytes.NewBuffer(userData))
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
