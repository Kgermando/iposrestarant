package contact

import (
	"fmt"
	"iposrestaurant/database"
	"iposrestaurant/models"
	"strconv"

	"github.com/gofiber/fiber/v2"
	"github.com/google/uuid"
)

// Paginate
func GetPaginatedContact(c *fiber.Ctx) error {
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

	var dataList []models.Contact

	var length int64
	db.Model(&models.Contact{}).Where("code_entreprise = ?", codeEntreprise).Count(&length)
	db.Where("code_entreprise = ?", codeEntreprise).
		Where("fullname LIKE ? OR email LIKE ?", "%"+search+"%", "%"+search+"%").
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
		"message":    "All contacts",
		"data":       dataList,
		"pagination": pagination,
	})
}

// Get All data
func GetAllContacts(c *fiber.Ctx) error {
	db := database.DB
	codeEntreprise := c.Params("code_entreprise")

	var data []models.Contact
	db.Where("code_entreprise = ?", codeEntreprise).Find(&data)
	return c.JSON(fiber.Map{
		"status":  "success",
		"message": "All contacts",
		"data":    data,
	})
}

// Get one data
func GetContact(c *fiber.Ctx) error {
	codeEntreprise := c.Params("code_entreprise")
	uuid := c.Params("uuid")
	db := database.DB

	var contact models.Contact
	db.Where("code_entreprise = ?", codeEntreprise).Find(&contact, uuid)
	if contact.Fullname == "" {
		return c.Status(404).JSON(
			fiber.Map{
				"status":  "error",
				"message": "No contact name found",
				"data":    nil,
			},
		)
	}
	return c.JSON(
		fiber.Map{
			"status":  "success",
			"message": "contact found",
			"data":    contact,
		},
	)
}

// Create data
func CreateContact(c *fiber.Ctx) error {
	p := &models.Contact{}

	if err := c.BodyParser(&p); err != nil {
		return err
	}

	p.UUID = uuid.New().String()
	database.DB.Create(p)

	return c.JSON(
		fiber.Map{
			"status":  "success",
			"message": "contact created success",
			"data":    p,
		},
	)
}

// Update data
func UpdateContact(c *fiber.Ctx) error {
	uuid := c.Params("uuid")
	db := database.DB

	type UpdateData struct {
		Fullname string `json:"fullname"`
		Email    string `json:"email"`
		Subject  string `json:"subject"`
		Message  string `json:"message"`
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

	contact := new(models.Contact)

	db.First(&contact, uuid)
	contact.Fullname = updateData.Fullname
	contact.Email = updateData.Email
	contact.Subject = updateData.Subject
	contact.Message = updateData.Message

	db.Save(&contact)

	return c.JSON(
		fiber.Map{
			"status":  "success",
			"message": "contact updated success",
			"data":    contact,
		},
	)

}

// Delete data
func DeleteContact(c *fiber.Ctx) error {
	uuid := c.Params("uuid")

	db := database.DB

	var contact models.Contact
	db.First(&contact, uuid)
	if contact.Fullname == "" {
		return c.Status(404).JSON(
			fiber.Map{
				"status":  "error",
				"message": "No contact name found",
				"data":    nil,
			},
		)
	}

	db.Delete(&contact)

	return c.JSON(
		fiber.Map{
			"status":  "success",
			"message": "contact deleted success",
			"data":    nil,
		},
	)
}
