package plat

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
func GetPaginatedPlatEntreprise(c *fiber.Ctx) error {
	db := database.DB
	codeEntreprise := c.Params("code_entreprise")

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

	var dataList []models.Plat

	var length int64
	db.Model(&models.Plat{}).Where("code_entreprise = ?", codeEntreprise).Count(&length)
	db.Where("code_entreprise = ?", codeEntreprise).
		Where("name LIKE ? OR reference LIKE ?", "%"+search+"%", "%"+search+"%").
		Offset(offset).
		Limit(limit).
		Order("updated_at DESC").
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
		"message":    "All Plats",
		"data":       dataList,
		"pagination": pagination,
	})
}

// Paginate
func GetPaginatedPlat(c *fiber.Ctx) error {
	db := database.DB
	codeEntreprise := c.Params("code_entreprise")
	posuuId := c.Params("pos_uuid")

	// Synchronisation des donnees avec l'API
	if utils.IsInternetAvailable() {
		go SyncDataWithAPI(codeEntreprise, posuuId)
	}
	

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

	var dataList []models.Plat

	var length int64
	db.Model(&models.Plat{}).Where("code_entreprise = ?", codeEntreprise).
		Where("pos_uuid = ?", posuuId).Count(&length)
	db.Where("code_entreprise = ?", codeEntreprise).
		Where("pos_uuid = ?", posuuId).
		Where("name LIKE ? OR reference LIKE ?", "%"+search+"%", "%"+search+"%").
		Offset(offset).
		Limit(limit).
		Order("updated_at DESC").
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
		"message":    "All Plats",
		"data":       dataList,
		"pagination": pagination,
	})
}

// Get All data
func GetAllPlats(c *fiber.Ctx) error {
	db := database.DB
	codeEntreprise := c.Params("code_entreprise")
	posuuId := c.Params("pos_uuid")

	var data []models.Plat
	db.Where("code_entreprise = ?", codeEntreprise).
		Where("pos_uuid = ?", posuuId).
		Find(&data)
	return c.JSON(fiber.Map{
		"status":  "success",
		"message": "All Plats",
		"data":    data,
	})
}

// Get All data by id
func GetAllPlatBySearch(c *fiber.Ctx) error {
	db := database.DB
	codeEntreprise := c.Params("code_entreprise")
	posuuId := c.Params("pos_uuid")

	search := c.Query("search", "")

	var data []models.Plat
	db.Where("code_entreprise = ?", codeEntreprise).
		Where("pos_uuid = ?", posuuId).
		Where("name LIKE ? OR reference LIKE ?", "%"+search+"%", "%"+search+"%").
		Find(&data)
	return c.JSON(fiber.Map{
		"status":  "success",
		"message": "All Plats",
		"data":    data,
	})
}

// Get one data
func GetPlat(c *fiber.Ctx) error {
	uuid := c.Params("uuid")
	db := database.DB

	var plat models.Plat
	db.Find(&plat, uuid)
	if plat.Name == "" {
		return c.Status(404).JSON(
			fiber.Map{
				"status":  "error",
				"message": "No Plat name found",
				"data":    nil,
			},
		)
	}
	return c.JSON(
		fiber.Map{
			"status":  "success",
			"message": "plat found",
			"data":    plat,
		},
	)
}

// Create data
func CreatePlat(c *fiber.Ctx) error {
	p := &models.Plat{}

	if err := c.BodyParser(&p); err != nil {
		return err
	}

	// Generate UUID if not already set
	// if p.Uuid == uuid.Nil {
	// 	p.Uuid = uuid.New()
	// }
	p.UUID = uuid.New().String()

	database.DB.Create(p)

	return c.JSON(
		fiber.Map{
			"status":  "success",
			"message": "Plat created success",
			"data":    p,
		},
	)
}

// Update data
func UpdatePlat(c *fiber.Ctx) error {
	uuid := c.Params("uuid")
	db := database.DB

	type UpdateData struct {
		Reference      string  `json:"reference"`
		Name           string  `json:"name"`
		Description    string  `json:"description"`
		UniteVente     string  `json:"unite_vente"`
		PrixVente      float64 `json:"prix_vente"`
		Tva            float64 `json:"tva"`
		Signature      string  `json:"signature"`
		PosUUID          string  `json:"pos_uuid"`
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

	plat := new(models.Plat)

	db.First(&plat, uuid)
	plat.Reference = updateData.Reference
	plat.Name = updateData.Name
	plat.Description = updateData.Description
	plat.UniteVente = updateData.UniteVente
	plat.PrixVente = updateData.PrixVente
	plat.Tva = updateData.Tva
	plat.Signature = updateData.Signature
	plat.PosUUID = updateData.PosUUID
	plat.CodeEntreprise = updateData.CodeEntreprise

	db.Save(&plat)

	return c.JSON(
		fiber.Map{
			"status":  "success",
			"message": "plat updated success",
			"data":    plat,
		},
	)

}

// Delete data
func DeletePlat(c *fiber.Ctx) error {
	uuid := c.Params("uuid")

	db := database.DB

	var plat models.Plat
	db.First(&plat, uuid)
	if plat.Name == "" {
		return c.Status(404).JSON(
			fiber.Map{
				"status":  "error",
				"message": "No plat name found",
				"data":    nil,
			},
		)
	}

	db.Delete(&plat)

	return c.JSON(
		fiber.Map{
			"status":  "success",
			"message": "plat deleted success",
			"data":    nil,
		},
	)
}
