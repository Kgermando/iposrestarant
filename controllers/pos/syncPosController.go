package pos

import (
	"bytes"
	"encoding/json"
	"fmt"
	"iposrestaurant/database"
	"iposrestaurant/models"
	"log"
	"net"
	"net/http"
	"sync"
	"time"
)

var mu sync.Mutex

// SyncDataWithAPI synchronizes local data with an online API in both directions
func SyncDataWithAPI(entrepriseUUID string) {
	mu.Lock()
	defer mu.Unlock()

	if !isInternetAvailable() {
		log.Println("No internet connection. Skipping synchronization.")
		return
	}

	// Récupérer des données externes à partir de l'API
	externalDataList, err := fetchExternalDataFromAPI(entrepriseUUID)
	if err != nil {
		log.Println("Error fetching external data:", err)
		return
	}

	// Synchronize data from API to local
	if len(externalDataList) > 0 {
		for _, externalData := range externalDataList {
			var localData models.Pos
			if err := database.DB.Where("uuid = ?", externalData.UUID).First(&localData).Error; err != nil {
				// If data does not exist locally, create it
				if err := database.DB.Create(&externalData).Error; err != nil {
					log.Println("Error creating data:", err)
				}
			} else {
				// Si l'utilisateur existe localement, mettez-le à jour uniquement si l'utilisateur externe est plus récent
				if externalData.UpdatedAt.After(localData.UpdatedAt) {
					if err := database.DB.Model(&localData).Updates(externalData).Error; err != nil {
						log.Println("Error updating data:", err)
					}
				}
			}
		}
	}

	// Fetch local data
	var localDataList []models.Pos
	if err := database.DB.Find(&localDataList).Error; err != nil {
		log.Println("Error fetching local data:", err)
		return
	}

	// Synchroniser les données du local vers l'API
	for _, localData := range localDataList {
		// Check if the local data is newer than the external data
		externalData, err := fetchExternalDataItemFromAPI(localData.UUID)
		if err != nil {
			// If data does not exist externally, create it
			if err := sendLocalDataToAPI(localData); err != nil {
				log.Println("Error creating external data:", err)
			}
			continue
		}

		if !isEqual(localData, externalData) {
			// Si l'utilisateur local est plus récent que l'utilisateur externe, mettez à jour l'utilisateur externe
			if localData.UpdatedAt.After(externalData.UpdatedAt) {
				if err := updateExternalDataInAPI(localData); err != nil {
					log.Println("Error updating external data to API:", err)
				}
			}
		}
	}

	// Delete online data if it has been deleted locally
	for _, externalData := range externalDataList {
		var localData models.Pos
		if err := database.DB.Where("uuid = ?", externalData.UUID).First(&localData).Error; err != nil {
			if err := deleteExternalDataInAPI(externalData.UUID); err != nil {
				log.Println("Error deleting external data:", err)
			}
		}
	}
}

func isInternetAvailable() bool {
	_, err := net.DialTimeout("tcp", "google.com:80", 5*time.Second)
	return err == nil
}

func fetchExternalDataFromAPI(entrepriseUUID string) ([]models.Pos, error) {
	// Replace with the actual URL of your API
	apiURL := fmt.Sprintf("https://i-pos-restaurant-api.up.railway.app/api/pos/all/%s", entrepriseUUID)

	resp, err := http.Get(apiURL)
	if err != nil {
		return nil, err
	}
	defer resp.Body.Close()

	if resp.StatusCode != http.StatusOK {
		return nil, fmt.Errorf("failed to fetch data: %s", resp.Status)
	}

	var response struct {
		Data []models.Pos `json:"data"`
	}
	if err := json.NewDecoder(resp.Body).Decode(&response); err != nil {
		return nil, err
	}

	return response.Data, nil
}

// Récupérer un utilisateur externe à partir de l'API
func fetchExternalDataItemFromAPI(dataUUID string) (models.Pos, error) {
	// URL de l'API
	apiURL := fmt.Sprintf("https://i-pos-restaurant-api.up.railway.app/api/pos/get/%s", dataUUID)

	resp, err := http.Get(apiURL)
	if err != nil {
		return models.Pos{}, err
	}
	defer resp.Body.Close()

	if resp.StatusCode != http.StatusOK {
		return models.Pos{}, fmt.Errorf("failed to fetch data: %s", resp.Status)
	}

	var response struct {
		Data models.Pos `json:"data"`
	}
	if err := json.NewDecoder(resp.Body).Decode(&response); err != nil {
		return models.Pos{}, err
	}

	return response.Data, nil
}

// Envoyer des données locales à l'API
func sendLocalDataToAPI(data models.Pos) error {
	// Soumission des données vers l'API
	apiURL := "https://i-pos-restaurant-api.up.railway.app/api/pos/create"

	dataItem, err := json.Marshal(data)
	if err != nil {
		return err
	}

	resp, err := http.Post(apiURL, "application/json", bytes.NewBuffer(dataItem))
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
func updateExternalDataInAPI(data models.Pos) error {
	// URL de l'API
	apiURL := fmt.Sprintf("https://i-pos-restaurant-api.up.railway.app/api/pos/update/%s", data.UUID)

	dataItem, err := json.Marshal(data)
	if err != nil {
		return err
	}

	req, err := http.NewRequest(http.MethodPut, apiURL, bytes.NewBuffer(dataItem))
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

	var data models.Pos
	db.First(&data, dataUUID)

	db.Delete(&data)

	return nil
}

// isEqual compares two Area structs for equality
func isEqual(a, b models.Pos) bool {
	return a.UUID == b.UUID &&
		a.UpdatedAt.Equal(b.UpdatedAt)
}
