package area

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
func GetPaginatedArea(c *fiber.Ctx) error {
	db := database.DB
	codeEntreprise := c.Params("code_entreprise")

	// Synchronize data with API
	if utils.IsInternetAvailable() {
		go SyncDataWithAPI(codeEntreprise)
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

	var dataList []models.Area

	var length int64
	db.Model(&models.Area{}).Where("code_entreprise = ?", codeEntreprise).Count(&length)
	db.Where("code_entreprise = ?", codeEntreprise).
		Where("name LIKE ? OR province LIKE ?", "%"+search+"%", "%"+search+"%").
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
		"message":    "All areas",
		"data":       dataList,
		"pagination": pagination,
	})
}

// Get All data 
func GetAllAreas(c *fiber.Ctx) error {
	codeEntreprise := c.Params("code_entreprise")
	db := database.DB

	var data []models.Area
	db.Where("code_entreprise = ?", codeEntreprise).Find(&data)
	return c.JSON(fiber.Map{
		"status":  "success",
		"message": "All areas",
		"data":    data,
	})
}

// Get one data
func GetArea(c *fiber.Ctx) error {
	uuid := c.Params("uuid")
	db := database.DB

	var area models.Area
	db.Find(&area, uuid)
	if area.Name == "" {
		return c.Status(404).JSON(
			fiber.Map{
				"status":  "error",
				"message": "No area found",
				"data":    nil,
			},
		)
	}
	return c.JSON(
		fiber.Map{
			"status":  "success",
			"message": "area found",
			"data":    area,
		},
	)
}

// Create data
func CreateArea(c *fiber.Ctx) error {
	p := &models.Area{}

	if err := c.BodyParser(&p); err != nil {
		return err
	}

	p.UUID = uuid.New().String()

	database.DB.Create(p)

	return c.JSON(
		fiber.Map{
			"status":  "success",
			"message": "area created success",
			"data":    p,
		},
	)
}

// Update data
func UpdateArea(c *fiber.Ctx) error {
	uuid := c.Params("uuid")
	db := database.DB

	type UpdateData struct {
		// UUID           string `json:"uuid"`
		Name           string `json:"name"`
		Province       string `json:"province"`
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

	area := new(models.Area)

	db.First(&area, uuid)
	// area.UUID = updateData.UUID
	area.Name = updateData.Name
	area.Province = updateData.Province
	area.Signature = updateData.Signature
	area.CodeEntreprise = updateData.CodeEntreprise

	db.Save(&area)

	return c.JSON(
		fiber.Map{
			"status":  "success",
			"message": "area updated success",
			"data":    area,
		},
	)

}

// Delete data
func DeleteArea(c *fiber.Ctx) error {
	uuid := c.Params("uuid")

	db := database.DB

	var area models.Area
	db.First(&area, uuid)
	if area.Name == "" {
		return c.Status(404).JSON(
			fiber.Map{
				"status":  "error",
				"message": "No area found",
				"data":    nil,
			},
		)
	}

	db.Delete(&area)

	return c.JSON(
		fiber.Map{
			"status":  "success",
			"message": "area deleted success",
			"data":    nil,
		},
	)
}
