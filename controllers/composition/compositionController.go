package composition

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
func GetPaginatedComposition(c *fiber.Ctx) error {
	db := database.DB
	platUUID := c.Params("plat_uuid")

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

	var dataList []models.Composition

	var length int64
	db.Model(&models.Composition{}).Where("plat_uuid = ?", platUUID).Count(&length)
	db.Where("plat_uuid = ?", platUUID).
		Joins("JOIN plats ON compositions.plat_id=plats.id").
		Where("plats.name LIKE ? OR plats.reference LIKE ?", "%"+search+"%", "%"+search+"%").
		Offset(offset).
		Limit(limit).
		Order("compositions.created_at DESC").
		Preload("Plat").
		Preload("Ingredient").
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
		"message":    "All compositions",
		"data":       dataList,
		"pagination": pagination,
	})
}

// Get data
func GetCompositionMargeBeneficiaire(c *fiber.Ctx) error {
	db := database.DB
	platUUID := c.Params("plat_uuid")

	var data models.Composition

	db.Model(&models.Composition{}).Where("plat_uuid = ?", platUUID).Preload("Plat").Preload("Ingredient").Last(&data)

	return c.JSON(fiber.Map{
		"status":  "success",
		"message": "Total qty compositions",
		"data":    data,
	})
}

// Get Total data
func GetTotalComposition(c *fiber.Ctx) error {
	db := database.DB
	platUUID := c.Params("plat_uuid")

	// var data []models.Composition
	var totalQty int64

	db.Model(&models.Composition{}).Where("plat_uuid = ?", platUUID).Select("SUM(quantity)").Scan(&totalQty)

	return c.JSON(fiber.Map{
		"status":  "success",
		"message": "Total qty compositions",
		"data":    totalQty,
	})
}

// Get All data
func GetAllCompositions(c *fiber.Ctx) error {
	db := database.DB
	codeEntreprise := c.Params("code_entreprise")
	posuuId := c.Params("pos_uuid")

	// Synchronize data from API to local
	if utils.IsInternetAvailable() {
		go SyncDataWithAPI(codeEntreprise, posuuId)
	}

	var data []models.Composition
	db.Where("code_entreprise = ?", codeEntreprise).
		Where("pos_uuid = ?", posuuId).
		Preload("Plat").
		Preload("Ingredient").
		Find(&data)
	return c.JSON(fiber.Map{
		"status":  "success",
		"message": "All compositions",
		"data":    data,
	})
}

// Get one data
func GetComposition(c *fiber.Ctx) error {
	uuid := c.Params("uuid")
	db := database.DB

	var composition models.Composition
	db.Where("uuid = ?", uuid).Preload("Plat").Preload("Ingredient").First(&composition)

	if composition.PlatUUID == "00000000-0000-0000-0000-000000000000" {
		return c.Status(404).JSON(
			fiber.Map{
				"status":  "error",
				"message": "No composition name found",
				"data":    nil,
			},
		)
	}
	return c.JSON(
		fiber.Map{
			"status":  "success",
			"message": "composition found",
			"data":    composition,
		},
	)
}

// Create data
func CreateComposition(c *fiber.Ctx) error {
	p := &models.Composition{}

	if err := c.BodyParser(&p); err != nil {
		return err
	}

	p.UUID = uuid.New().String()
	
	database.DB.Create(p)

	return c.JSON(
		fiber.Map{
			"status":  "success",
			"message": "composition created success",
			"data":    p,
		},
	)
}

// Update data
func UpdateComposition(c *fiber.Ctx) error {
	uuid := c.Params("uuid")
	db := database.DB

	type UpdateData struct {
		PlatUUID         string `json:"plat_uuid"` // Updated PlatID to PlatUUID
		IngredientUUID   string `json:"ingredient_uuid"`
		Quantity       uint64 `json:"quantity"`
		Signature      string `json:"signature"`
		CodeEntreprise uint64 `json:"code_entreprise"`
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

	composition := new(models.Composition)

	db.Where("uuid = ?", uuid).First(&composition)
	composition.PlatUUID = updateData.PlatUUID
	composition.IngredientUUID = updateData.IngredientUUID
	composition.Quantity = updateData.Quantity
	composition.Signature = updateData.Signature
	composition.CodeEntreprise = updateData.CodeEntreprise

	db.Save(&composition)

	return c.JSON(
		fiber.Map{
			"status":  "success",
			"message": "composition updated success",
			"data":    composition,
		},
	)

}

// Delete data
func DeleteComposition(c *fiber.Ctx) error {
	uuid := c.Params("uuid")

	db := database.DB

	var composition models.Composition
	db.Where("uuid = ?", uuid).First(&composition)
	if composition.PlatUUID == "00000000-0000-0000-0000-000000000000" {
		return c.Status(404).JSON(
			fiber.Map{
				"status":  "error",
				"message": "No composition name found",
				"data":    nil,
			},
		)
	}

	db.Delete(&composition)

	return c.JSON(
		fiber.Map{
			"status":  "success",
			"message": "composition deleted success",
			"data":    nil,
		},
	)
}
