package finance

import (
	"iposrestaurant/database"
	"iposrestaurant/models"
	"log" 
	"sync" 
)

var mu sync.Mutex

// SyncDataWithAPI synchronizes local data with an online API in both directions
func SyncDataWithAPI(code_entreprise string, pos_uuid string) {
	mu.Lock()
	defer mu.Unlock()
 
	// Récupérer des données externes à partir de l'API
	externalDataList, err := fetchExternalDataFromAPI(code_entreprise, pos_uuid)
	if err != nil {
		log.Println("Error fetching external data:", err)
		return
	}

	// Synchronize data from API to local
	if len(externalDataList) > 0 {
		for _, externalData := range externalDataList {
			var localData models.Caisse
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
	var localDataList []models.Caisse
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
		var localData models.Caisse
		if err := database.DB.Where("uuid = ?", externalData.UUID).First(&localData).Error; err != nil {
			if err := deleteExternalDataInAPI(externalData.UUID); err != nil {
				log.Println("Error deleting external data:", err)
			}
		}
	}
}

// Récupérer des données externes à partir de l'API
func fetchExternalDataFromAPI(code_entreprise string, pos_uuid string) ([]models.Caisse, error) {

	db := database.PGDB

	var dataList []models.Caisse
	db.Where("code_entreprise = ?", code_entreprise).Where("pos_uuid = ?", pos_uuid).Find(&dataList)

	return dataList, nil
}

// Récupérer une donnee externe à partir de l'API
func fetchExternalDataItemFromAPI(dataUUID string) (models.Caisse, error) {
	db := database.PGDB

	var data models.Caisse
	db.Where("uuid = ?", dataUUID).First(&data)

	return data, nil
}

// Envoyer des données locales à l'API
func sendLocalDataToAPI(data models.Caisse) error {
	// Soumission des données vers l'API
	db := database.PGDB 
	db.Create(data)

	return nil
}

// Update external data data in the API
func updateExternalDataInAPI(data models.Caisse) error {
	// URL de l'API
	db := database.PGDB

	db.Model(&data).Updates(data)

	return nil
}

// Delete external data in the API
func deleteExternalDataInAPI(dataUUID string) error {
	db := database.PGDB

	var data models.Caisse
	db.First(&data, dataUUID)

	db.Delete(&data)

	return nil
}

// isEqual compares two Area structs for equality
func isEqual(a, b models.Caisse) bool {
	return a.UUID == b.UUID &&
		a.CodeEntreprise == b.CodeEntreprise &&
		a.UpdatedAt.Equal(b.UpdatedAt)
}
