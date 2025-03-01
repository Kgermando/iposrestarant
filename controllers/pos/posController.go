package pos

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
func GetPaginatedPos(c *fiber.Ctx) error {
	db := database.DB

	// Start the synchronization goroutine
	if utils.IsInternetAvailable() {
		go SyncDataWithAPISupport()
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

	var dataList []models.Pos

	var length int64
	db.Model(&models.Pos{}).Count(&length)
	db.Where("name LIKE ? OR manager LIKE ?", "%"+search+"%", "%"+search+"%").
		Offset(offset).
		Limit(limit).
		Order("updated_at DESC").
		Preload("Entreprise").
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
		"message":    "All poss",
		"data":       dataList,
		"pagination": pagination,
	})
}

// Query all data ID
func GetPaginatedPosByID(c *fiber.Ctx) error {
	db := database.DB
	EntrepriseUUID := c.Params("entreprise_uuid")

	// Start the synchronization goroutine
	if utils.IsInternetAvailable() {
		go SyncDataWithAPI(EntrepriseUUID)
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

	var dataList []models.Pos

	var length int64
	db.Model(&models.Pos{}).Where("entreprise_uuid = ?", EntrepriseUUID).Count(&length)
	db.Where("entreprise_uuid = ?", EntrepriseUUID).
		Where("name LIKE ? OR manager LIKE ?", "%"+search+"%", "%"+search+"%").
		Offset(offset).
		Limit(limit).
		Order("updated_at DESC").
		Preload("Entreprise").
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
		"message":    "All bonCommandeLine by BonCommande",
		"data":       dataList,
		"pagination": pagination,
	})
}

// Get All data
func GetAllPoss(c *fiber.Ctx) error {
	db := database.DB
	var data []models.Pos
	db.Find(&data)
	return c.JSON(fiber.Map{
		"status":  "success",
		"message": "All poss",
		"data":    data,
	})
}

// Get All data
func GetAllPosById(c *fiber.Ctx) error {
	db := database.DB
	EntrepriseUUID := c.Params("entreprise_uuid")

	var data []models.Pos
	db.Where("entreprise_uuid = ?", EntrepriseUUID).Find(&data)
	return c.JSON(fiber.Map{
		"status":  "success",
		"message": "All poss",
		"data":    data,
	})
}

// Get one data
func GetPos(c *fiber.Ctx) error {
	uuid := c.Params("uuid")
	db := database.DB
	var pos models.Pos
	
	db.Where("uuid = ?", uuid).First(&pos)
	if pos.Name == "" {
		return c.Status(404).JSON(
			fiber.Map{
				"status":  "error",
				"message": "No pos name found",
				"data":    nil,
			},
		)
	}
	return c.JSON(
		fiber.Map{
			"status":  "success",
			"message": "pos found",
			"data":    pos,
		},
	)
}

// Create data
func CreatePos(c *fiber.Ctx) error {
	p := &models.Pos{}

	if err := c.BodyParser(&p); err != nil {
		return err
	}

	p.UUID = uuid.New().String()
	
	database.DB.Create(p)

	return c.JSON(
		fiber.Map{
			"status":  "success",
			"message": "pos created success",
			"data":    p,
		},
	)
}

// Update data
func UpdatePos(c *fiber.Ctx) error {
	uuid := c.Params("uuid")
	db := database.DB

	type UpdateData struct {
		// EntrepriseUUID string `json:"entreprise_uuid"` // ID de l'entreprise
		Name         string `json:"name"`
		Adresse      string `json:"adresse"`
		Email        string `json:"email"`
		Telephone    string `json:"telephone"`
		Manager      string `json:"manager"`
		Status       bool   `json:"status"` // Actif ou Inactif
		Signature    string `json:"signature"`
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

	pos := new(models.Pos)

	db.Where("uuid = ?", uuid).First(&pos)
	// pos.EntrepriseUUID = updateData.EntrepriseUUID
	pos.Name = updateData.Name
	pos.Adresse = updateData.Adresse
	pos.Email = updateData.Email
	pos.Telephone = updateData.Telephone
	pos.Manager = updateData.Manager
	pos.Status = updateData.Status
	pos.Signature = updateData.Signature

	db.Save(&pos)

	return c.JSON(
		fiber.Map{
			"status":  "success",
			"message": "pos updated success",
			"data":    pos,
		},
	)

}

// Delete data
func DeletePos(c *fiber.Ctx) error {
	uuid := c.Params("uuid")

	db := database.DB

	var pos models.Pos
	db.Where("uuid = ?", uuid).First(&pos)
	if pos.Name == "" {
		return c.Status(404).JSON(
			fiber.Map{
				"status":  "error",
				"message": "No pos name found",
				"data":    nil,
			},
		)
	}

	db.Delete(&pos)

	return c.JSON(
		fiber.Map{
			"status":  "success",
			"message": "pos deleted success",
			"data":    nil,
		},
	)
}
