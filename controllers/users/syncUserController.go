package users

import (
	"bytes"
	"encoding/json"
	"fmt"
	"iposrestaurant/database"
	"iposrestaurant/models"
	"log" 
	"net/http"
	"sync" 
)

var mu sync.Mutex

// SyncDataWithAPI synchronizes local data with an online API in both directions
func SyncDataWithAPI(entrepriseUUID string) {
	mu.Lock()
	defer mu.Unlock() 

	// Récupérer des données externes à partir de l'API
	externalData, err := fetchExternalDataFromAPI(entrepriseUUID)
	if err != nil {
		log.Println("Error fetching external data:", err)
		return
	}

	// Synchronize data from API to local
	if len(externalData) > 0 {
		for _, externalUser := range externalData {
			var localUser models.User
			if err := database.DB.Where("uuid = ?", externalUser.UUID).First(&localUser).Error; err != nil {
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

	// Fetch local data
	var localData []models.User
	if err := database.DB.Find(&localData).Error; err != nil {
		log.Println("Error fetching local data:", err)
		return
	}

	// Synchroniser les données du local vers l'API
	for _, localUser := range localData {
		// Check if the local user is newer than the external user
		externalUser, err := fetchExternalUserFromAPI(localUser.UUID)
		if err != nil {
			// If user does not exist externally, create it
			if err := sendLocalDataToAPI(localUser); err != nil {
				log.Println("Error creating external user:", err)
			}
			continue
		}

		if !isEqual(localUser, externalUser) {
			// Si l'utilisateur local est plus récent que l'utilisateur externe, mettez à jour l'utilisateur externe
			if localUser.UpdatedAt.After(externalUser.UpdatedAt) {
				if err := updateExternalUserInAPI(localUser); err != nil {
					log.Println("Error updating external data to API:", err)
				}
			}
		}
	}

	// Delete online data if it has been deleted locally
	for _, externalUser := range externalData {
		var localData models.User
		if err := database.DB.Where("uuid = ?", externalUser.UUID).First(&localData).Error; err != nil {
			if err := deleteExternalDataInAPI(externalUser.UUID); err != nil {
				log.Println("Error deleting external data:", err)
			}
		}
	}

}

func fetchExternalDataFromAPI(entrepriseUUID string) ([]models.User, error) {
	// Replace with the actual URL of your API
	apiURL := fmt.Sprintf("https://i-pos-restaurant-api.up.railway.app/api/users/all/%s", entrepriseUUID)

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

// Récupérer un utilisateur externe à partir de l'API
func fetchExternalUserFromAPI(userUUID string) (models.User, error) {
	// URL de l'API
	apiURL := fmt.Sprintf("https://i-pos-restaurant-api.up.railway.app/api/users/get/%s", userUUID)

	resp, err := http.Get(apiURL)
	if err != nil {
		return models.User{}, err
	}
	defer resp.Body.Close()

	if resp.StatusCode != http.StatusOK {
		return models.User{}, fmt.Errorf("failed to fetch data: %s", resp.Status)
	}

	var response struct {
		Data models.User `json:"data"`
	}
	if err := json.NewDecoder(resp.Body).Decode(&response); err != nil {
		return models.User{}, err
	}

	return response.Data, nil
}

// Envoyer des données locales à l'API
func sendLocalDataToAPI(user models.User) error {
	// Soumission des données vers l'API
	apiURL := "https://i-pos-restaurant-api.up.railway.app/api/users/create"

	userData, err := json.Marshal(user)
	if err != nil {
		return err
	}

	resp, err := http.Post(apiURL, "application/json", bytes.NewBuffer(userData))
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
	apiURL := fmt.Sprintf("https://i-pos-restaurant-api.up.railway.app/api/users/update/%s", user.UUID)

	userData, err := json.Marshal(user)
	if err != nil {
		return err
	}

	req, err := http.NewRequest(http.MethodPut, apiURL, bytes.NewBuffer(userData))
	if err != nil {
		return err
	}
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

// Delete external data in the API
func deleteExternalDataInAPI(dataUUID string) error {
	db := database.PGDB

	var data models.User
	db.First(&data, dataUUID)

	db.Delete(&data)

	return nil
}

// isEqual compares two Area structs for equality
func isEqual(a, b models.User) bool {
	return a.UUID == b.UUID && 
		a.EntrepriseUUID == b.EntrepriseUUID &&
		a.UpdatedAt.Equal(b.UpdatedAt)
}
