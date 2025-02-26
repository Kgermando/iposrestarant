package pos

import ( 
	"iposrestaurant/database"
	"iposrestaurant/models"
	"log" 
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
	db := database.PGDB

	var dataList []models.Pos
	db.Find(&dataList)

	return dataList, nil
}
