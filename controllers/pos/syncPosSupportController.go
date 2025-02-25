package pos

import (
	"encoding/json"
	"fmt"
	"iposrestaurant/database"
	"iposrestaurant/models"
	"log"  
	"net/http"
	"sync" 
)

var muSupport sync.Mutex

// SyncDataWithAPI synchronizes local data with an online API in both directions
func SyncDataWithAPISupport() {
	muSupport.Lock()
	defer muSupport.Unlock() // Déverrouiller la fonction à la fin

	// Récupérer des données externes à partir de l'API
	externalDataList, err := fetchExternalDataFromAPISupport()
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

}
 

func fetchExternalDataFromAPISupport() ([]models.Pos, error) {
	// Replace with the actual URL of your API
	apiURL := "https://i-pos-restaurant-api.up.railway.app/api/pos/all"

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
