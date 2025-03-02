package finance

import (
	"iposrestaurant/database"
	"iposrestaurant/models"
	"log"
	"sync"
)

var muCaisseItem sync.Mutex

// SyncDataWithAPI synchronizes local data with an online API in both directions
func SyncDataWithAPICaisseItem(caisse_id string) {
	muCaisseItem.Lock()
	defer muCaisseItem.Unlock()

	// Récupérer des données externes à partir de l'API
	externalDataList, err := fetchExternalDataFromAPICaisseItem(caisse_id)
	if err != nil {
		log.Println("Error fetching external data:", err)
		return
	}

	// Synchronize data from API to local
	if len(externalDataList) > 0 {
		for _, externalData := range externalDataList {
			var localData models.CaisseItem
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
	var localDataList []models.CaisseItem
	if err := database.DB.Find(&localDataList).Error; err != nil {
		log.Println("Error fetching local data:", err)
		return
	}

	// Synchroniser les données du local vers l'API
	if len(localDataList) > 0  {
		for _, localData := range localDataList {
			// Check if the local data is newer than the external data
			externalData, err := fetchExternalDataItemFromAPICaisseItem(localData.UUID)
			if err != nil {
				log.Println("Error fetching external data:", err)
				continue
			}
			if externalData.UUID == "" {
				if err := sendLocalDataToAPICaisseItem(localData); err != nil {
					log.Println("Error creating external data:", err)
				}
			}
	
			if !isEqualCaisseItem(localData, externalData) {
				// Si l'utilisateur local est plus récent que l'utilisateur externe, mettez à jour l'utilisateur externe
				if localData.UpdatedAt.After(externalData.UpdatedAt) {
					if err := updateExternalDataInAPICaisseItem(localData); err != nil {
						log.Println("Error updating external data to API:", err)
					}
				}
			}
		}
	}


	// Delete online data if it has been deleted locally
	if len(externalDataList) > 0 {
		for _, externalData := range externalDataList {
			var localData models.CaisseItem
			if err := database.DB.Where("uuid = ?", externalData.UUID).First(&localData).Error; err != nil {
				if err := deleteExternalDataInAPICaiiseItem(externalData.UUID); err != nil {
					log.Println("Error deleting external data:", err)
				}
			}
		}
	}
	
}

// Récupérer des données externes à partir de l'API
func fetchExternalDataFromAPICaisseItem(caisse_id string) ([]models.CaisseItem, error) {

	db := database.PGDB

	var dataList []models.CaisseItem
	db.Where("caisse_uuid = ?", caisse_id).Find(&dataList)

	return dataList, nil
}

// Récupérer une donnee externe à partir de l'API
func fetchExternalDataItemFromAPICaisseItem(dataUUID string) (models.CaisseItem, error) {
	db := database.PGDB

	var data models.CaisseItem
	db.Where("uuid = ?", dataUUID).First(&data)

	return data, nil
}

// ParseData parses the input data to the appropriate format
func ParseDataCaisseItem(data models.CaisseItem) models.CaisseItem {
	return data
}

// Envoyer des données locales à l'API
func sendLocalDataToAPICaisseItem(data models.CaisseItem) error {
	// Soumission des données vers l'API
	db := database.PGDB
	parsedData := ParseDataCaisseItem(data)
	db.Create(&parsedData)

	return nil
}

// Update external data data in the API
func updateExternalDataInAPICaisseItem(data models.CaisseItem) error {
	// URL de l'API
	db := database.PGDB

	parsedData := ParseDataCaisseItem(data)
	db.Model(&data).Updates(parsedData)

	return nil
}

// Delete external data in the API
func deleteExternalDataInAPICaiiseItem(dataUUID string) error {
	db := database.PGDB

	var data models.CaisseItem
	db.Where("uuid = ?", dataUUID).First(&data)

	db.Delete(&data)

	return nil
}

// isEqual compares two Area structs for equality
func isEqualCaisseItem(a, b models.CaisseItem) bool {
	return a.UUID == b.UUID &&
		a.CodeEntreprise == b.CodeEntreprise &&
		a.UpdatedAt.Equal(b.UpdatedAt)
}
