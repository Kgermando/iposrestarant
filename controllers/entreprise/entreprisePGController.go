package entreprise

import (
	"fmt"
	"iposrestaurant/database"
	"iposrestaurant/models"
	"strconv"
	"time"

	"github.com/gofiber/fiber/v2"
	"github.com/google/uuid"
)

// Paginate
func GetPaginatedEntreprisePG(c *fiber.Ctx) error {
	db := database.PGDB

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

	var dataList []models.Entreprise

	var length int64
	db.Model(dataList).Count(&length)
	db.Where("name ILIKE ?", "%"+search+"%").
		Offset(offset).
		Limit(limit).
		Order("entreprises.updated_at DESC").
		Preload("Users").
		Preload("Pos").
		Find(&dataList)

	if err != nil {
		fmt.Println("error s'est produite: ", err)
		return c.Status(500).SendString(err.Error())
	}

	// Calculate total number of pages
	totalPages := len(dataList) / limit
	if remainder := len(dataList) % limit; remainder > 0 {
		totalPages++
	}

	var entrepriseInfos []models.EntrepriseInfos
	for _, entreprise := range dataList {
		entrepriseInfos = append(entrepriseInfos, models.EntrepriseInfos{
			ID:             entreprise.ID,
			UUID:           entreprise.UUID,
			TypeEntreprise: entreprise.TypeEntreprise,
			Name:           entreprise.Name,
			Code:           entreprise.Code,
			Rccm:           entreprise.Rccm,
			IdNat:          entreprise.IdNat,
			NImpot:         entreprise.NImpot,
			Adresse:        entreprise.Adresse,
			Email:          entreprise.Email,
			Telephone:      entreprise.Telephone,
			Manager:        entreprise.Manager,
			Status:         entreprise.Status,
			Abonnement:     entreprise.Abonnement,
			Signature:      entreprise.Signature,
			TotalUser:      len(entreprise.Users),
			TotalPos:       len(entreprise.Pos),
		})
	}

	pagination := map[string]interface{}{
		"total_pages": totalPages,
		"page":        page,
		"page_size":   limit,
		"length":      length,
	}

	return c.JSON(fiber.Map{
		"status":     "success",
		"message":    "All entreprises",
		"data":       entrepriseInfos,
		"pagination": pagination,
	})
}

// Get All data
func GetAllEntreprisePGs(c *fiber.Ctx) error {
	db := database.PGDB
	var data []models.Entreprise
	db.Preload("Users").Preload("Pos").Find(&data)
	return c.JSON(fiber.Map{
		"status":  "success",
		"message": "All entreprises",
		"data":    data,
	})
}

// Get one data
func GetEntreprisePG(c *fiber.Ctx) error {
	uuid := c.Params("uuid")
	db := database.PGDB
	var entreprise models.Entreprise
	db.Preload("Users").Preload("Pos").Find(&entreprise, uuid)
	if entreprise.Name == "" {
		return c.Status(404).JSON(
			fiber.Map{
				"status":  "error",
				"message": "No entreprise  name found",
				"data":    nil,
			},
		)
	}
	return c.JSON(
		fiber.Map{
			"status":  "success",
			"message": "entreprise  found",
			"data":    entreprise,
		},
	)
}

// Create data
func CreateEntreprisePG(c *fiber.Ctx) error {
	db := database.PGDB

	p := &models.Entreprise{}

	if err := c.BodyParser(&p); err != nil {
		return err
	}

	p.UUID = uuid.New().String()
	
	db.Create(p)

	return c.JSON(
		fiber.Map{
			"status":  "success",
			"message": "entreprise created success",
			"data":    p,
		},
	)
}

// Update data
func UpdateEntreprisePG(c *fiber.Ctx) error {
	uuid := c.Params("uuid")
	db := database.PGDB

	type UpdateData struct {
		TypeEntreprise string    `json:"type_entreprise"`
		Name           string    `json:"name"`
		Code           string    `json:"code"` // Code entreprise
		Rccm           string    `json:"rccm"`
		IdNat          string    `json:"idnat"`
		NImpot         string    `json:"nimpot"`
		Adresse        string    `json:"adresse"`
		Email          string    `json:"email"`     // Email officiel
		Telephone      string    `json:"telephone"` // Telephone officiel
		Manager        string    `json:"manager"`
		Status         bool      `json:"status"`
		TypeAbonnement string    `json:"type_abonnement"`
		Abonnement     time.Time `json:"abonnement"`
		Signature      string    `json:"signature"`
	}

	var updateData UpdateData

	if err := c.BodyParser(&updateData); err != nil {
		return c.Status(500).JSON(
			fiber.Map{
				"status":  "error",
				"message": "Review your iunput",
				"data":    nil,
			},
		)
	}

	entreprise := new(models.Entreprise)

	db.First(&entreprise, uuid)
	entreprise.TypeEntreprise = updateData.TypeEntreprise
	entreprise.Name = updateData.Name
	entreprise.Code = updateData.Code
	entreprise.Rccm = updateData.Rccm
	entreprise.IdNat = updateData.IdNat
	entreprise.NImpot = updateData.NImpot
	entreprise.Adresse = updateData.Adresse
	entreprise.Email = updateData.Email
	entreprise.Telephone = updateData.Telephone
	entreprise.Manager = updateData.Manager
	entreprise.Status = updateData.Status
	entreprise.TypeAbonnement = updateData.TypeAbonnement
	entreprise.Abonnement = updateData.Abonnement
	entreprise.Signature = updateData.Signature

	db.Save(&entreprise)

	return c.JSON(
		fiber.Map{
			"status":  "success",
			"message": "entreprise  updated success",
			"data":    entreprise,
		},
	)

}

// Delete data
func DeleteEntreprisePG(c *fiber.Ctx) error {
	uuid := c.Params("uuid")

	db := database.PGDB

	var entreprise models.Entreprise
	db.First(&entreprise, uuid)
	if entreprise.Name == "" {
		return c.Status(404).JSON(
			fiber.Map{
				"status":  "error",
				"message": "No Entreprise name found",
				"data":    nil,
			},
		)
	}

	db.Delete(&entreprise)

	return c.JSON(
		fiber.Map{
			"status":  "success",
			"message": "Entreprise deleted success",
			"data":    nil,
		},
	)
}
