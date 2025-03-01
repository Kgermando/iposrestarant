package livraison

import (
	"fmt"
	"iposrestaurant/database"
	"iposrestaurant/models"
	"iposrestaurant/utils"
	"strconv"

	"github.com/gofiber/fiber/v2"
	"github.com/google/uuid"
)

// Paginate
func GetPaginatedLivraisonEntreprise(c *fiber.Ctx) error {
	db := database.DB
	codeEntreprise := c.Params("code_entreprise")

	start_date := c.Query("start_date")
	end_date := c.Query("end_date")

	page, err := strconv.Atoi(c.Query("page", "1"))
	if err != nil || page <= 0 {
		page = 1 // Default page number
	}
	limit, err := strconv.Atoi(c.Query("limit", "15"))
	if err != nil || limit <= 0 {
		limit = 15
	}
	offset := (page - 1) * limit

	search := c.Query("search", "")

	var dataList []models.Livraison

	var length int64
	db.Model(&models.Livraison{}).Where("code_entreprise = ?", codeEntreprise).
		Where("created_at BETWEEN ? AND ?", start_date, end_date).
		Count(&length)

	db.Joins("JOIN clients ON livraisons.client_uuid = clients.uuid").
		Joins("JOIN livreurs ON livraisons.livreur_uuid = livreurs.uuid").
		Joins("JOIN areas ON livraisons.area_uuid = areas.uuid").

		Where("livraisons.code_entreprise = ?", codeEntreprise).
		Where("livraisons.created_at BETWEEN ? AND ?", start_date, end_date).

		Where("livreurs.name_society LIKE ? OR livreurs.livreur_name LIKE ? OR operator_name LIKE ? OR clients.fullname LIKE ? OR areas.name LIKE ? OR livraisons.status LIKE ?", "%"+search+"%", "%"+search+"%", "%"+search+"%", "%"+search+"%", "%"+search+"%", "%"+search+"%").
		Offset(offset).
		Limit(limit).
		Order("livraisons.updated_at DESC").
		Preload("Client").
		Preload("Livreur").
		Preload("Area").
		Preload("Pos").
		Find(&dataList)

	if err != nil {
		fmt.Println("error s'est produite: ", err)
		return c.Status(500).SendString(err.Error())
	}

	// Calculate total number of pages
	totalPages := int(length) / limit
	if remainder := int(length) % limit; remainder > 0 {
		totalPages++
	}
	pagination := map[string]interface{}{
		"total_pages": totalPages,
		"page":        page,
		"page_size":   limit,
		"length":      length,
	}

	return c.JSON(fiber.Map{
		"status":     "success",
		"message":    "All livraisons",
		"data":       dataList,
		"pagination": pagination,
	})
}

// Paginate
func GetPaginatedLivraison(c *fiber.Ctx) error {
	db := database.DB
	codeEntreprise := c.Params("code_entreprise")
	posuuId := c.Params("pos_uuid")

	// Sync data with API
	if utils.IsInternetAvailable() {
		go SyncDataWithAPI(codeEntreprise, posuuId)
	} 

	start_date := c.Query("start_date")
	end_date := c.Query("end_date")

	page, err := strconv.Atoi(c.Query("page", "1"))
	if err != nil || page <= 0 {
		page = 1 // Default page number
	}
	limit, err := strconv.Atoi(c.Query("limit", "15"))
	if err != nil || limit <= 0 {
		limit = 15
	}
	offset := (page - 1) * limit

	search := c.Query("search", "")

	var dataList []models.Livraison

	var length int64
	db.Model(&models.Livraison{}).Where("code_entreprise = ?", codeEntreprise).
		Where("pos_uuid = ?", posuuId).
		Where("created_at BETWEEN ? AND ?", start_date, end_date).Count(&length)
	db.Joins("JOIN clients ON livraisons.client_uuid = clients.uuid").
		Joins("JOIN livreurs ON livraisons.livreur_uuid = livreurs.uuid").
		Joins("JOIN areas ON livraisons.area_uuid = areas.uuid").
		Where("livraisons.code_entreprise = ?", codeEntreprise).
		Where("livraisons.pos_uuid = ?", posuuId).
		Where("livraisons.created_at BETWEEN ? AND ?", start_date, end_date).
		Where("livreurs.name_society LIKE ? OR livreurs.livreur_name LIKE ? OR operator_name LIKE ? OR clients.fullname LIKE ? OR areas.name LIKE ? OR livraisons.status LIKE ?", "%"+search+"%", "%"+search+"%", "%"+search+"%", "%"+search+"%", "%"+search+"%", "%"+search+"%").
		Offset(offset).
		Limit(limit).
		Order("livraisons.updated_at DESC").
		Preload("Client").
		Preload("Livreur").
		Preload("Area").
		Preload("Pos").
		Find(&dataList)

	if err != nil {
		fmt.Println("error s'est produite: ", err)
		return c.Status(500).SendString(err.Error())
	}

	// Calculate total number of pages
	totalPages := int(length) / limit
	if remainder := int(length) % limit; remainder > 0 {
		totalPages++
	}
	pagination := map[string]interface{}{
		"total_pages": totalPages,
		"page":        page,
		"page_size":   limit,
		"length":      length,
	}

	return c.JSON(fiber.Map{
		"status":     "success",
		"message":    "All livraisons",
		"data":       dataList,
		"pagination": pagination,
	})
}

// Get All data
func GetAllLivraisons(c *fiber.Ctx) error {
	db := database.DB
	codeEntreprise := c.Params("code_entreprise")
	posuuId := c.Params("pos_uuid")

	// Sync data with 
	if utils.IsInternetAvailable() {
		go SyncDataWithAPI(codeEntreprise, posuuId)
	} 

	var data []models.Livraison
	db.Where("code_entreprise = ?", codeEntreprise).
		Where("pos_uuid = ?", posuuId).
		// Preload("Client").
		// Preload("Livreur").
		// Preload("Area").
		// Preload("Pos").
		Find(&data)
	return c.JSON(fiber.Map{
		"status":  "success",
		"message": "All livraisons",
		"data":    data,
	})
}

// Get All data by id
func GetAllLivraisonBySearch(c *fiber.Ctx) error {
	db := database.DB
	codeEntreprise := c.Params("code_entreprise")
	posuuId := c.Params("pos_uuid")

	// Sync data with API
	if utils.IsInternetAvailable() {
		go SyncDataWithAPI(codeEntreprise, posuuId)
	}
	

	search := c.Query("search", "")

	var data []models.Livraison
	db.Where("code_entreprise = ?", codeEntreprise).
		Where("pos_uuid = ?", posuuId).
		Where("livreurs.name_society LIKE ? OR livreurs.livreur_name LIKE ? OR operator_name LIKE ? OR clients.fullname LIKE ? OR areas.name LIKE ? OR livraisons.status LIKE ?", "%"+search+"%", "%"+search+"%", "%"+search+"%", "%"+search+"%", "%"+search+"%", "%"+search+"%").
		Preload("Area").
		Preload("Pos").
		Find(&data)
	return c.JSON(fiber.Map{
		"status":  "success",
		"message": "All livraisons",
		"data":    data,
	})
}

// Get one data
func GetLivraison(c *fiber.Ctx) error {
	uuid := c.Params("uuid")
	db := database.DB

	var livraison models.Livraison
	db.
		Where("uuid = ?", uuid).Preload("Client").
		Preload("Livreur").
		Preload("Area").
		Preload("Pos").First(&livraison)

	if livraison.OperatorName == "" {
		return c.Status(404).JSON(
			fiber.Map{
				"status":  "error",
				"message": "No livraison found",
				"data":    nil,
			},
		)
	}
	return c.JSON(
		fiber.Map{
			"status":  "success",
			"message": "livraison found",
			"data":    livraison,
		},
	)
}

// Create data
func CreateLivraison(c *fiber.Ctx) error {
	p := &models.Livraison{}

	if err := c.BodyParser(&p); err != nil {
		return err
	}

	p.UUID = uuid.New().String()
	database.DB.Create(p)

	return c.JSON(
		fiber.Map{
			"status":  "success",
			"message": "livraison created success",
			"data":    p,
		},
	)
}

// Update data
func UpdateLivraison(c *fiber.Ctx) error {
	uuid := c.Params("uuid")
	db := database.DB

	type UpdateData struct {
		OperatorName   string  `json:"operator_name"`
		AreaUUID       string  `json:"area_uuid"`
		CoutLivraison  float64 `json:"cout_livraison"`
		ClientUUID     string  `json:"client_uuid"`
		LivreurUUID    string  `json:"livreur_uuid"`
		PosUUID        string  `json:"pos_uuid"`
		Status         string  `json:"status"`
		Signature      string  `json:"signature"`
		CodeEntreprise uint64  `json:"code_entreprise"`
	}

	var updateData UpdateData

	if err := c.BodyParser(&updateData); err != nil {
		return c.Status(500).JSON(
			fiber.Map{
				"status":  "error",
				"message": "Review your input",
				"data":    nil,
			},
		)
	}

	livraison := new(models.Livraison)

	db.Where("uuid = ?", uuid).First(&livraison)
	livraison.OperatorName = updateData.OperatorName
	livraison.AreaUUID = updateData.AreaUUID
	livraison.ClientUUID = updateData.ClientUUID
	livraison.LivreurUUID = updateData.LivreurUUID
	livraison.CoutLivraison = updateData.CoutLivraison
	livraison.Status = updateData.Status
	livraison.Signature = updateData.Signature
	livraison.PosUUID = updateData.PosUUID
	livraison.CodeEntreprise = updateData.CodeEntreprise

	db.Save(&livraison)

	return c.JSON(
		fiber.Map{
			"status":  "success",
			"message": "livraison updated success",
			"data":    livraison,
		},
	)

}

// Delete data
func DeleteLivraison(c *fiber.Ctx) error {
	uuid := c.Params("uuid")

	db := database.DB

	var livraison models.Livraison
	db.Where("uuid = ?", uuid).First(&livraison)
	if livraison.OperatorName == "" {
		return c.Status(404).JSON(
			fiber.Map{
				"status":  "error",
				"message": "No livraison found",
				"data":    nil,
			},
		)
	}

	db.Delete(&livraison)

	return c.JSON(
		fiber.Map{
			"status":  "success",
			"message": "livraison deleted success",
			"data":    nil,
		},
	)
}
