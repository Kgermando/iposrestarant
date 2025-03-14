package ingredient

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
func GetPaginatedIngredientEntreprise(c *fiber.Ctx) error {
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

	var dataList []models.Ingredient

	var length int64
	db.Model(&models.Ingredient{}).Where("code_entreprise = ?", codeEntreprise).Count(&length)
	db.Where("code_entreprise = ?", codeEntreprise).
		Where("name LIKE ?", "%"+search+"%").
		Offset(offset).
		Limit(limit).
		Order("updated_at DESC").
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
		"message":    "All ingredients",
		"data":       dataList,
		"pagination": pagination,
	})
}

// Paginate
func GetPaginatedIngredient(c *fiber.Ctx) error {
	db := database.DB
	codeEntreprise := c.Params("code_entreprise")
	posuuId := c.Params("pos_uuid")

	// Sync data with API
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

	var dataList []models.Ingredient

	var length int64
	db.Model(&models.Ingredient{}).Where("code_entreprise = ?", codeEntreprise).
		Where("pos_uuid = ?", posuuId).Count(&length)
	db.Where("code_entreprise = ?", codeEntreprise).
		Where("pos_uuid = ?", posuuId).
		Where("name LIKE ?", "%"+search+"%").
		Offset(offset).
		Limit(limit).
		Order("updated_at DESC").
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
		"message":    "All ingredients",
		"data":       dataList,
		"pagination": pagination,
	})
}

// Get All data
func GetAllIngredients(c *fiber.Ctx) error {
	db := database.DB
	codeEntreprise := c.Params("code_entreprise")
	posuuId := c.Params("pos_uuid")

	var data []models.Ingredient
	db.Where("code_entreprise = ?", codeEntreprise).
		Where("pos_uuid = ?", posuuId).
		Preload("Pos").
		Find(&data)
	return c.JSON(fiber.Map{
		"status":  "success",
		"message": "All ingredients",
		"data":    data,
	})
}

// Get All data by id
func GetAllIngredientBySearch(c *fiber.Ctx) error {
	db := database.DB
	codeEntreprise := c.Params("code_entreprise")
	posuuId := c.Params("pos_uuid")

	search := c.Query("search", "")

	var data []models.Ingredient
	db.Where("code_entreprise = ?", codeEntreprise).
		Where("pos_uuid = ?", posuuId).
		Where("name LIKE ?", "%"+search+"%").
		Preload("Pos").
		Find(&data)
	return c.JSON(fiber.Map{
		"status":  "success",
		"message": "All ingredients",
		"data":    data,
	})
}

// Get one data
func GetIngredient(c *fiber.Ctx) error {
	uuid := c.Params("uuid")
	db := database.DB

	var ingredient models.Ingredient // Find ingredient by uuid
	db.Where("uuid = ?", uuid).First(&ingredient)
	if ingredient.Name == "" {
		return c.Status(404).JSON(
			fiber.Map{
				"status":  "error",
				"message": "No ingredient name found",
				"data":    nil,
			},
		)
	}

	return c.JSON(
		fiber.Map{
			"status":  "success",
			"message": "ingredient found",
			"data":    ingredient,
		},
	)
}

// Create data
func CreateIngredient(c *fiber.Ctx) error {
	p := &models.Ingredient{}

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
			"message": "ingredient created success",
			"data":    p,
		},
	)
}

// Update data
func UpdateIngredient(c *fiber.Ctx) error {
	uuid := c.Params("uuid")
	db := database.DB

	type UpdateData struct {
		Name           string `json:"name"`
		Description    string `json:"description"`
		Unite          string `json:"unite"`
		PosUUID        string `json:"pos_uuid"`
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

	ingredient := new(models.Ingredient)

	db.Where("uuid = ?", uuid).First(&ingredient)
	ingredient.Name = updateData.Name
	ingredient.Description = updateData.Description
	ingredient.Unite = updateData.Unite
	ingredient.Signature = updateData.Signature
	ingredient.PosUUID = updateData.PosUUID
	ingredient.CodeEntreprise = updateData.CodeEntreprise

	db.Save(&ingredient)

	return c.JSON(
		fiber.Map{
			"status":  "success",
			"message": "ingredient updated success",
			"data":    ingredient,
		},
	)

}

// Delete data
func DeleteIngredient(c *fiber.Ctx) error {
	uuid := c.Params("uuid")

	db := database.DB

	var ingredient models.Ingredient
	db.Where("uuid = ?", uuid).First(&ingredient)
	if ingredient.Name == "" {
		return c.Status(404).JSON(
			fiber.Map{
				"status":  "error",
				"message": "No ingredient name found",
				"data":    nil,
			},
		)
	}

	db.Delete(&ingredient)

	return c.JSON(
		fiber.Map{
			"status":  "success",
			"message": "ingredient deleted success",
			"data":    nil,
		},
	)
}
