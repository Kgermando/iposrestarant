package area

import (
	"fmt"
	"iposrestaurant/database"
	"iposrestaurant/models"

	"log"
	"sync"
)

var mu sync.Mutex

// SyncDataWithAPI synchronizes local data with an online API in both directions
func SyncDataWithAPI(code_entreprise string) {
	mu.Lock()
	defer mu.Unlock()

	fmt.Println("Synchronizing data with API...")

	// Récupérer des données externes à partir de l'API
	externalDataList, err := fetchExternalDataFromAPI(code_entreprise)
	if err != nil {
		log.Println("Error fetching external data:", err)
		return
	}

	fmt.Println("externalDataList", externalDataList)

	// Synchronize data from API to local
	if len(externalDataList) > 0 {
		for _, externalData := range externalDataList {
			var localData models.Area
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
	var localDataList []models.Area
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
				log.Println("Error external data :", err)
				// continue
			}

			// Mettre une condition sil n'y a pas de donnee
			if externalData.UUID == "00000000-0000-0000-0000-000000000000" || externalData.UUID == "" {
				if err := sendLocalDataToAPI(localData); err != nil {
					log.Println("Error creating external data :", err)
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
	if len(externalDataList) > 0 {
		for _, externalData := range externalDataList {
			var localData models.Area
			if err := database.DB.Where("uuid = ?", externalData.UUID).First(&localData).Error; err != nil {
				if err := deleteExternalDataInAPI(externalData.UUID); err != nil {
					log.Println("Error deleting external data:", err)
				}
			}
		}
	}
}

// Récupérer des données externes à partir de l'API
func fetchExternalDataFromAPI(code_entreprise string) ([]models.Area, error) {
	db := database.PGDB

	var dataList []models.Area
	db.Where("code_entreprise = ?", code_entreprise).Find(&dataList)

	return dataList, nil
}

// Récupérer une donnee externe à partir de l'API
func fetchExternalDataItemFromAPI(dataUUID string) (models.Area, error) {
	db := database.PGDB

	var data models.Area
	db.Where("uuid = ?", dataUUID).First(&data)

	return data, nil
}

// ParseData parses the input data to the appropriate format
func ParseData(data models.Area) models.Area {
	return data
}

// Envoyer des données locales à l'API
func sendLocalDataToAPI(data models.Area) error {
	db := database.PGDB

	// Parse the data before saving
	parsedData := ParseData(data)

	// dataItem, err := json.Marshal(data)
	// if err != nil {
	// 	return err
	// }

	fmt.Println("data send: ", parsedData)

	// Sauvegarde des données dans la base de données
	db.Create(&parsedData)

	return nil
}

// Update external data data in the API
func updateExternalDataInAPI(data models.Area) error {

	db := database.PGDB

	parsedData := ParseData(data)

	db.Model(&data).Updates(parsedData)

	// // URL de l'API
	// apiURL := fmt.Sprintf("https://i-pos-restaurant-api.up.railway.app/api/areas/update/%s", data.UUID)

	// dataItem, err := json.Marshal(data)
	// if err != nil {
	// 	return err
	// }

	// req, err := http.NewRequest(http.MethodPut, apiURL, bytes.NewBuffer(dataItem))
	// if err != nil {
	// 	return err
	// }
	// req.Header.Set("Content-Type", "application/json")

	// client := &http.Client{}
	// resp, err := client.Do(req)
	// if err != nil {
	// 	return err
	// }
	// defer resp.Body.Close()

	// if resp.StatusCode != http.StatusOK {
	// 	return fmt.Errorf("failed to update data: %s", resp.Status)
	// }

	return nil
}

// Delete external data in the API
func deleteExternalDataInAPI(dataUUID string) error {

	db := database.PGDB

	var data models.Area
	db.Where("uuid = ?", dataUUID).First(&data)

	db.Delete(&data)

	// URL de l'API
	// apiURL := fmt.Sprintf("https://i-pos-restaurant-api.up.railway.app/api/areas/delete/%s", dataUUID)

	// req, err := http.NewRequest(http.MethodDelete, apiURL, nil)
	// if err != nil {
	// 	return err
	// }
	// req.Header.Set("Content-Type", "application/json")

	// client := &http.Client{}
	// resp, err := client.Do(req)
	// if err != nil {
	// 	return err
	// }
	// defer resp.Body.Close()

	// if resp.StatusCode != http.StatusOK {
	// 	return fmt.Errorf("failed to delete data: %s", resp.Status)
	// }

	return nil
}

// isEqual compares two Area structs for equality
func isEqual(a, b models.Area) bool {
	return a.UUID == b.UUID &&
		a.CodeEntreprise == b.CodeEntreprise &&
		a.UpdatedAt.Equal(b.UpdatedAt)
}
