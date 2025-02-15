package livraison

import (
	"fmt"
	"iposrestaurant/database"
	"iposrestaurant/models"
	"strconv"

	"github.com/gofiber/fiber/v2"
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
	db.Joins("JOIN clients ON livraisons.client_id = clients.id").
		Joins("JOIN livreurs ON livraisons.livreur_id = livreurs.id").
		Joins("JOIN areas ON livraisons.area_id = areas.id").
		Where("livraisons.code_entreprise = ?", codeEntreprise).
		Where("created_at BETWEEN ? AND ?", start_date, end_date).
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
	posId := c.Params("pos_id")

	// Sync data with API
	go SyncDataWithAPI(codeEntreprise, posId)

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
		Where("pos_id = ?", posId).
		Where("created_at BETWEEN ? AND ?", start_date, end_date).Count(&length)
	db.Joins("JOIN clients ON livraisons.client_id = clients.id").
		Joins("JOIN livreurs ON livraisons.livreur_id = livreurs.id").
		Joins("JOIN areas ON livraisons.area_id = areas.id").
		Where("livraisons.code_entreprise = ?", codeEntreprise).
		Where("livraisons.pos_id = ?", posId).
		Where("created_at BETWEEN ? AND ?", start_date, end_date).
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
	posId := c.Params("pos_id")

	// Sync data with API
	go SyncDataWithAPI(codeEntreprise, posId)

	var data []models.Livraison
	db.Where("code_entreprise = ?", codeEntreprise).
		Where("pos_id = ?", posId).
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
	posId := c.Params("pos_id")

	// Sync data with API
	go SyncDataWithAPI(codeEntreprise, posId)

	search := c.Query("search", "")

	var data []models.Livraison
	db.Where("code_entreprise = ?", codeEntreprise).
		Where("pos_id = ?", posId).
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
	id := c.Params("id")
	db := database.DB

	var livraison models.Livraison
	db.
		Preload("Client").
		Preload("Livreur").
		Preload("Area").
		Preload("Pos").
		Find(&livraison, id)
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
	id := c.Params("id")
	db := database.DB

	type UpdateData struct {
		OperatorName   string  `json:"operator_name"`
		AreaID         uint    `json:"area_id"`
		CoutLivraison  float64 `json:"cout_livraison"`
		ClientID       uint    `json:"client_id"`
		LivreurID      uint    `json:"livreur_id"`
		PosID          uint    `json:"pos_id"`
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

	db.First(&livraison, id)
	livraison.OperatorName = updateData.OperatorName
	livraison.AreaID = updateData.AreaID
	livraison.ClientID = updateData.ClientID
	livraison.LivreurID = updateData.LivreurID
	livraison.CoutLivraison = updateData.CoutLivraison
	livraison.Status = updateData.Status
	livraison.Signature = updateData.Signature
	livraison.PosID = updateData.PosID
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
	id := c.Params("id")

	db := database.DB

	var livraison models.Livraison
	db.First(&livraison, id)
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
