package users

import ( 
	"iposrestaurant/database"
	"iposrestaurant/models"
	"log" 
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
	db := database.PGDB

	var dataList []models.User
	db.Where("entreprise_uuid = ?", entrepriseUUID).Find(&dataList)

	return dataList, nil
}

// Récupérer un utilisateur externe à partir de l'API
func fetchExternalUserFromAPI(dataUUID string) (models.User, error) {
	db := database.PGDB

	var data models.User
	db.Where("uuid = ?", dataUUID).First(&data)

	return data, nil
}

// Envoyer des données locales à l'API
func sendLocalDataToAPI(data models.User) error {
	db := database.PGDB
	db.Create(data)

	return nil
}

// Update external user data in the API
func updateExternalUserInAPI(data models.User) error {
	// URL de l'API
	db := database.PGDB

	db.Model(&data).Updates(data)

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
