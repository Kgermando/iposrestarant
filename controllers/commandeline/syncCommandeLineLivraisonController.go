package commandeline

import (
	"iposrestaurant/database"
	"iposrestaurant/models"
	"log"
	"sync"
)

var muCmdLineLivraison sync.Mutex

// SyncDataWithAPI synchronizes local data with an online API in both directions
func SyncDataWithAPICmdLineLivraison(livraison_uuid string) {
	muCmdLineLivraison.Lock()
	defer muCmdLineLivraison.Unlock()

	// Récupérer des données externes à partir de l'API
	externalDataList, err := fetchExternalDataFromAPICmdLineLivraison(livraison_uuid)
	if err != nil {
		log.Println("Error fetching external data:", err)
		return
	}

	// Synchronize data from API to local
	if len(externalDataList) > 0 {
		for _, externalData := range externalDataList {
			var localData models.CommandeLine
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
	var localDataList []models.CommandeLine
	if err := database.DB.Find(&localDataList).Error; err != nil {
		log.Println("Error fetching local data:", err)
		return
	}

	// Synchroniser les données du local vers l'API
	for _, localData := range localDataList {
		// Check if the local data is newer than the external data
		externalData, err := fetchExternalDataItemFromAPICmdLineLivraison(localData.UUID)
		if err != nil {
			// If data does not exist externally, create it
			if err := sendLocalDataToAPICmdLineLivraison(localData); err != nil {
				log.Println("Error creating external data:", err)
			}
			continue
		}

		if !isEqual(localData, externalData) {
			// Si l'utilisateur local est plus récent que l'utilisateur externe, mettez à jour l'utilisateur externe
			if localData.UpdatedAt.After(externalData.UpdatedAt) {
				if err := updateExternalDataInAPICmdLineLivraison(localData); err != nil {
					log.Println("Error updating external data to API:", err)
				}
			}
		}
	}

	// Delete online data if it has been deleted locally
	for _, externalData := range externalDataList {
		var localData models.CommandeLine
		if err := database.DB.Where("uuid = ?", externalData.UUID).First(&localData).Error; err != nil {
			if err := deleteExternalDataInAPI(externalData.UUID); err != nil {
				log.Println("Error deleting external data:", err)
			}
		}
	}
}

// Récupérer des données externes à partir de l'API
func fetchExternalDataFromAPICmdLineLivraison(livraison_uuid string) ([]models.CommandeLine, error) {
	// Replace with the actual URL of your API
	// apiURL := fmt.Sprintf("https://i-pos-restaurant-api.up.railway.app/api/commandes-lines/all/%s", livraison_uuid)

	// resp, err := http.Get(apiURL)
	// if err != nil {
	// 	return nil, err
	// }
	// defer resp.Body.Close()

	// if resp.StatusCode != http.StatusOK {
	// 	return nil, fmt.Errorf("failed to fetch data: %s", resp.Status)
	// }

	// var response struct {
	// 	Data []models.CommandeLine `json:"data"`
	// }
	// if err := json.NewDecoder(resp.Body).Decode(&response); err != nil {
	// 	return nil, err
	// }

	// return response.Data, nil

	db := database.PGDB

	var dataList []models.CommandeLine
	db.Where("commande_lines.livraison_uuid = ?", livraison_uuid).Find(&dataList)

	return dataList, nil
}

// Récupérer une donnee externe à partir de l'API
func fetchExternalDataItemFromAPICmdLineLivraison(dataUUID string) (models.CommandeLine, error) {
	db := database.PGDB

	var data models.CommandeLine
	db.Where("uuid = ?", dataUUID).First(&data)

	return data, nil
}

// Envoyer des données locales à l'API
func sendLocalDataToAPICmdLineLivraison(data models.CommandeLine) error {
	// Soumission des données vers l'API
	db := database.PGDB
	db.Create(data)

	return nil
}

// Update external data data in the API
func updateExternalDataInAPICmdLineLivraison(data models.CommandeLine) error {
	// URL de l'API
	db := database.PGDB

	db.Model(&data).Updates(data)

	return nil
}
