package stock

import (
	"iposrestaurant/database"
	"iposrestaurant/models"
	"log"
	"sync"
)

var mu sync.Mutex

// SyncDataWithAPI synchronizes local data with an online API in both directions
func SyncDataWithAPI(product_uuid string) {
	mu.Lock()
	defer mu.Unlock()

	// Récupérer des données externes à partir de l'API
	externalDataList, err := fetchExternalDataFromAPI(product_uuid)
	if err != nil {
		log.Println("Error fetching external data:", err)
		return
	}

	// Synchronize data from API to local
	if len(externalDataList) > 0 {
		for _, externalData := range externalDataList {
			var localData models.Stock
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
	var localDataList []models.Stock
	if err := database.DB.Find(&localDataList).Error; err != nil {
		log.Println("Error fetching local data:", err)
		return
	}

	// Synchroniser les données du local vers l'API
	if len(localDataList) > 0 {
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
	if len(externalDataList) > 0  {
		for _, externalData := range externalDataList {
			var localData models.Stock
			if err := database.DB.Where("uuid = ?", externalData.UUID).First(&localData).Error; err != nil {
				if err := deleteExternalDataInAPI(externalData.UUID); err != nil {
					log.Println("Error deleting external data:", err)
				}
			}
		}
	}

}

// Récupérer des données externes à partir de l'API
func fetchExternalDataFromAPI(product_uuid string) ([]models.Stock, error) {
	db := database.PGDB

	var dataList []models.Stock
	db.Where("product_uuid = ?", product_uuid).Find(&dataList)

	return dataList, nil
}

// Récupérer une donnee externe à partir de l'API
func fetchExternalDataItemFromAPI(dataUUID string) (models.Stock, error) {
	db := database.PGDB

	var data models.Stock
	db.Where("uuid = ?", dataUUID).First(&data)

	return data, nil
}


// ParseData parses the input data to the appropriate format
func ParseData(data models.Stock) models.Stock {
	return data
}

// Envoyer des données locales à l'API
func sendLocalDataToAPI(data models.Stock) error {
	db := database.PGDB
	parsedData := ParseData(data)
	db.Create(&parsedData)

	return nil
}

// Update external data data in the API
func updateExternalDataInAPI(data models.Stock) error {
	// URL de l'API
	db := database.PGDB

	parsedData := ParseData(data)
	db.Model(&data).Updates(parsedData)

	return nil
}

// Delete external data in the API
func deleteExternalDataInAPI(dataUUID string) error {
	db := database.PGDB

	var data models.Stock
	db.Where("uuid = ?", dataUUID).First(&data)

	db.Delete(&data)

	return nil
}

// isEqual compares two Area structs for equality
func isEqual(a, b models.Stock) bool {
	return a.UUID == b.UUID &&
		a.CodeEntreprise == b.CodeEntreprise &&
		a.UpdatedAt.Equal(b.UpdatedAt)
}
