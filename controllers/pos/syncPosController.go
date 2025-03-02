package pos

import (
	"iposrestaurant/database"
	"iposrestaurant/models"
	"log"
	"net"
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
	if len(localDataList) > 0  {
		for _, localData := range localDataList {
			// Check if the local data is newer than the external data
			externalData, err := fetchExternalDataItemFromAPI(localData.UUID)
			if err != nil {
				log.Println("Error fetching external data:", err)
				continue
			}
			if externalData.UUID == "" {
				if err := sendLocalDataToAPI(localData); err != nil {
					log.Println("Error creating external data:", err)
				}
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
	db := database.PGDB

	var dataList []models.Pos
	db.Where("entreprise_uuid = ?", entrepriseUUID).Find(&dataList)

	return dataList, nil
}

// Récupérer un utilisateur externe à partir de l'API
func fetchExternalDataItemFromAPI(dataUUID string) (models.Pos, error) {
	db := database.PGDB

	var data models.Pos
	db.Where("uuid = ?", dataUUID).First(&data)

	return data, nil
}

// ParseData parses the input data to the appropriate format
func ParseData(data models.Pos) models.Pos {
	return data
}


// Envoyer des données locales à l'API
func sendLocalDataToAPI(data models.Pos) error {
	// Soumission des données vers l'API
	db := database.PGDB
	parsedData := ParseData(data)
	db.Create(&parsedData)

	return nil
}

// Update external data data in the API
func updateExternalDataInAPI(data models.Pos) error {
	// URL de l'API
	db := database.PGDB

	parsedData := ParseData(data)
	db.Model(&data).Updates(parsedData)

	return nil
}

// Delete external data in the API
func deleteExternalDataInAPI(dataUUID string) error {
	db := database.PGDB

	var data models.Pos
	db.Where("uuid = ?", dataUUID).First(&data)

	db.Delete(&data)

	return nil
}

// isEqual compares two Area structs for equality
func isEqual(a, b models.Pos) bool {
	return a.UUID == b.UUID &&
		a.UpdatedAt.Equal(b.UpdatedAt)
}
