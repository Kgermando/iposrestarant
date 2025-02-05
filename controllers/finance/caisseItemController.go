package finance

import (
	"fmt"
	"iposrestaurant/database"
	"iposrestaurant/models"
	"strconv"

	"github.com/gofiber/fiber/v2"
)

// Paginate
func GetPaginatedCaisseItems(c *fiber.Ctx) error {
	db := database.DB
	codeEntreprise := c.Params("code_entreprise")
	caisseId := c.Params("caisse_id")

	//  Synchronize data from API to local
	go SyncDataWithAPICaisseItem(caisseId)

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

	var dataList []models.CaisseItem

	var length int64
	db.Model(&models.CaisseItem{}).Where("code_entreprise = ?", codeEntreprise).
		Where("caisse_id = ?", caisseId).
		Where("created_at BETWEEN ? AND ?", start_date, end_date).Count(&length)
	db.Where("code_entreprise = ?", codeEntreprise).
		Where("caisse_id = ?", caisseId).
		Where("created_at BETWEEN ? AND ?", start_date, end_date).
		Where("libelle LIKE ? OR type_transaction LIKE ? OR reference LIKE ?", "%"+search+"%", "%"+search+"%", "%"+search+"%").
		Offset(offset).
		Limit(limit).
		Order("updated_at DESC").
		Preload("Caisse").
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
		"message":    "All caisses",
		"data":       dataList,
		"pagination": pagination,
	})
}

// Get All data
func GetAllCaisseItems(c *fiber.Ctx) error {
	db := database.DB
	codeEntreprise := c.Params("code_entreprise")
	caisseId := c.Params("caisse_id")

	var data []models.CaisseItem
	db.Where("code_entreprise = ?", codeEntreprise).
		Where("caisse_id = ?", caisseId).
		Preload("Caisse").
		Find(&data)
	return c.JSON(fiber.Map{
		"status":  "success",
		"message": "All caisses",
		"data":    data,
	})
}

// Get All data by id
func GetAllCaisseItemBySearch(c *fiber.Ctx) error {
	db := database.DB
	codeEntreprise := c.Params("code_entreprise")
	caisseId := c.Params("caisse_id")

	search := c.Query("search", "")

	var data []models.CaisseItem
	db.Where("code_entreprise = ?", codeEntreprise).
		Where("caisse_id = ?", caisseId).
		Where("libelle LIKE ? OR type_transaction LIKE ? OR reference LIKE ?", "%"+search+"%", "%"+search+"%", "%"+search+"%").
		Preload("Caisse").
		Find(&data)
	return c.JSON(fiber.Map{
		"status":  "success",
		"message": "All caisses items",
		"data":    data,
	})
}

// Get one data
func GetCaisseItem(c *fiber.Ctx) error {
	id := c.Params("id")
	db := database.DB

	var caisseItem models.CaisseItem
	db.Preload("Caisse").Find(&caisseItem, id)
	if caisseItem.TypeTransaction == "" {
		return c.Status(404).JSON(
			fiber.Map{
				"status":  "error",
				"message": "No caisse name found",
				"data":    nil,
			},
		)
	}
	return c.JSON(
		fiber.Map{
			"status":  "success",
			"message": "caisse found",
			"data":    caisseItem,
		},
	)
}

// Create data
func CreateCaisseItem(c *fiber.Ctx) error {
	p := &models.CaisseItem{}

	if err := c.BodyParser(&p); err != nil {
		return err
	}

	database.DB.Create(p)

	return c.JSON(
		fiber.Map{
			"status":  "success",
			"message": "caisse item created success",
			"data":    p,
		},
	)
}

// Update data
func UpdateCaisseItem(c *fiber.Ctx) error {
	id := c.Params("id")
	db := database.DB

	type UpdateData struct {
		CaisseID        uint    `json:"caisse_id"`
		TypeTransaction string  `json:"type_transaction"` // Entreé ou Sortie
		Montant         float64 `json:"montant"`          // Montant de la transaction
		Libelle         string  `json:"libelle"`          // Description de la transaction
		Reference       string  `json:"reference"`        // Nombre aleatoire
		Signature       string  `json:"signature"`        // Signature de la transaction
		CodeEntreprise  uint64  `json:"code_entreprise"`
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

	caisseItem := new(models.CaisseItem)

	db.First(&caisseItem, id)
	caisseItem.CaisseID = updateData.CaisseID
	caisseItem.TypeTransaction = updateData.TypeTransaction
	caisseItem.Montant = updateData.Montant
	caisseItem.Libelle = updateData.Libelle
	caisseItem.Reference = updateData.Reference
	caisseItem.Signature = updateData.Signature
	caisseItem.CodeEntreprise = updateData.CodeEntreprise

	db.Save(&caisseItem)

	return c.JSON(
		fiber.Map{
			"status":  "success",
			"message": "caisseItem updated success",
			"data":    caisseItem,
		},
	)

}

// Delete data
func DeleteCaisseItem(c *fiber.Ctx) error {
	id := c.Params("id")

	db := database.DB

	var caisseItem models.CaisseItem
	db.First(&caisseItem, id)
	if caisseItem.TypeTransaction == "" {
		return c.Status(404).JSON(
			fiber.Map{
				"status":  "error",
				"message": "No caisseItem name found",
				"data":    nil,
			},
		)
	}

	db.Delete(&caisseItem)

	return c.JSON(
		fiber.Map{
			"status":  "success",
			"message": "caisseItem deleted success",
			"data":    nil,
		},
	)
}
