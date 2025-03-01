package tablebox

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
func GetPaginatedTableBoxEntreprise(c *fiber.Ctx) error {
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

	var dataList []models.TableBox

	var length int64
	db.Model(&models.TableBox{}).Where("code_entreprise = ?", codeEntreprise).Count(&length)
	db.Where("code_entreprise = ?", codeEntreprise).
		Where("name LIKE ? OR CAST(numero AS TEXT) LIKE ?", "%"+search+"%", "%"+search+"%").
		Offset(offset).
		Limit(limit).
		Order("updated_at DESC").
		Preload("Commandes").
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
		"message":    "All table_boxes",
		"data":       dataList,
		"pagination": pagination,
	})
}

// Paginate
func GetPaginatedTableBox(c *fiber.Ctx) error {
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

	var dataList []models.TableBox

	var length int64
	db.Model(&models.TableBox{}).Where("code_entreprise = ?", codeEntreprise).
		Where("pos_uuid = ?", posuuId).Count(&length)
	db.Where("code_entreprise = ?", codeEntreprise).
		Where("pos_uuid = ?", posuuId).
		Where("name LIKE ? OR CAST(numero AS TEXT) LIKE ?", "%"+search+"%", "%"+search+"%").
		Offset(offset).
		Limit(limit).
		Order("updated_at DESC").
		Preload("Commandes").
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
		"message":    "All table_boxes",
		"data":       dataList,
		"pagination": pagination,
	})
}

// Get All data
func GetAllTableBox(c *fiber.Ctx) error {
	db := database.DB

	codeEntreprise := c.Params("code_entreprise")
	posuuId := c.Params("pos_uuid")

	var data []models.TableBox
	db.Where("code_entreprise = ?", codeEntreprise).
		Where("pos_uuid = ?", posuuId).Preload("Commandes").Find(&data)
	return c.JSON(fiber.Map{
		"status":  "success",
		"message": "All table_boxes",
		"data":    data,
	})
}

// Get one data
func GetTableBox(c *fiber.Ctx) error {
	uuid := c.Params("uuid")
	db := database.DB

	var tableBox models.TableBox // Find tableBox by uuid
	db.Where("uuid = ?", uuid).Preload("Commandes").First(&tableBox)
	if tableBox.Name == "" {
		return c.Status(404).JSON(
			fiber.Map{
				"status":  "error",
				"message": "No tableBox name found",
				"data":    nil,
			},
		)
	}
	return c.JSON(
		fiber.Map{
			"status":  "success",
			"message": "tableBox found",
			"data":    tableBox,
		},
	)
}

// Create data
func CreateTableBox(c *fiber.Ctx) error {
	p := &models.TableBox{}

	if err := c.BodyParser(&p); err != nil {
		return err
	}

	p.UUID = uuid.New().String() // Generate a UUID for the tableBox

	database.DB.Create(p)

	return c.JSON(
		fiber.Map{
			"status":  "success",
			"message": "tableBox created success",
			"data":    p,
		},
	)
}

// Update data
func UpdateTableBox(c *fiber.Ctx) error {
	uuid := c.Params("uuid")
	db := database.DB

	type UpdateData struct {
		PosUUID        string `json:"pos_uuid"`
		Name           string `json:"name"`
		Numero         int    `json:"numero"`
		Status         string `json:"status"`
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

	tableBox := new(models.TableBox)

	db.Where("uuid = ?", uuid).First(&tableBox)
	tableBox.PosUUID = updateData.PosUUID
	tableBox.Name = updateData.Name
	tableBox.Numero = updateData.Numero
	tableBox.Status = updateData.Status
	tableBox.Signature = updateData.Signature
	tableBox.CodeEntreprise = updateData.CodeEntreprise

	db.Save(&tableBox)

	return c.JSON(
		fiber.Map{
			"status":  "success",
			"message": "tableBox updated success",
			"data":    tableBox,
		},
	)

}

// Delete data
func DeleteTableBox(c *fiber.Ctx) error {
	uuid := c.Params("uuid")

	db := database.DB

	var tableBox models.TableBox 
	db.Where("uuid = ?", uuid).First(&tableBox)
	if tableBox.Name == "" {
		return c.Status(404).JSON(
			fiber.Map{
				"status":  "error",
				"message": "No tableBox name found",
				"data":    nil,
			},
		)
	}

	db.Delete(&tableBox)

	return c.JSON(
		fiber.Map{
			"status":  "success",
			"message": "tableBox deleted success",
			"data":    nil,
		},
	)
}
