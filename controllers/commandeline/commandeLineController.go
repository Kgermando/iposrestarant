package commandeline

import (
	"fmt"
	"iposrestaurant/database"
	"iposrestaurant/models"
	"strconv"

	"github.com/gofiber/fiber/v2"
	"github.com/google/uuid"
)

// Query all data ID
func GetPaginatedCommandeLineByID(c *fiber.Ctx) error {
	db := database.DB
	commandeID := c.Params("commande_id")

	// Sync data with API
	go SyncDataWithAPI(commandeID)

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

	var dataList []models.CommandeLine

	var length int64
	// var data []models.CommandeLine
	db.Model(&models.CommandeLine{}).Where("commande_id = ?", commandeID).Count(&length)
	db.Joins("JOIN commandes ON commande_lines.commande_id=commandes.id").
		Joins("JOIN products ON commande_lines.product_id=products.id").
		Where("commande_lines.commande_id = ?", commandeID).
		Where("products.name LIKE ? OR products.reference LIKE ?", "%"+search+"%", "%"+search+"%").
		Select(`
			commande_lines.id AS id,
			products.reference AS reference,
			products.name AS name,
			products.description AS description,
			products.unite_vente AS unite_vente,
			commande_lines.quantity AS quantity,
			products.prix_vente AS prix_vente,
			products.tva AS tva,
			SUM(commande_lines.quantity * products.prix_vente)
		`).
		Offset(offset).
		Limit(limit).
		Order("commande_lines.updated_at DESC").
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
		"message":    "All commandeLine by commande",
		"data":       dataList,
		"pagination": pagination,
	})
}

// Get All data
func GetAllCommandeLineById(c *fiber.Ctx) error {
	db := database.DB
	commandeID := c.Params("commande_id")

	var dataList []models.CommandeLine
	db.Where("commande_lines.commande_id = ?", commandeID).
		Order("commande_lines.updated_at DESC").
		Preload("Commande").
		Preload("Product").
		Preload("Plat").
		Find(&dataList)
	return c.JSON(fiber.Map{
		"status":  "success",
		"message": "All commande lines",
		"data":    dataList,
	})
}

// Get All data
func GetAllCommandeLineByIdLivraison(c *fiber.Ctx) error {
	db := database.DB
	livraisonID := c.Params("livraison_id")

	// Sync data with API
	go SyncDataWithAPICmdLineLivraison(livraisonID)

	var dataList []models.CommandeLine
	db.Where("commande_lines.livraison_id = ?", livraisonID).
		Order("commande_lines.updated_at DESC").
		Preload("Livraison").
		Preload("Product").
		Preload("Plat").
		Find(&dataList)
	return c.JSON(fiber.Map{
		"status":  "success",
		"message": "All commande lines",
		"data":    dataList,
	})
}

// Get All data
func GetAllCommandeLines(c *fiber.Ctx) error {
	db := database.DB
	var data []models.CommandeLine
	db.Find(&data)
	return c.JSON(fiber.Map{
		"status":  "success",
		"message": "All commandes",
		"data":    data,
	})
}

// Get Total data
func GetTotalCommandeLine(c *fiber.Ctx) error {
	db := database.DB
	productId := c.Params("product_id")

	// var data []models.CommandeLine
	var totalQty int64

	if productId != "0" {
		db.Model(&models.CommandeLine{}).Where("product_id = ?", productId).Select("SUM(quantity)").Scan(&totalQty)
	}

	return c.JSON(fiber.Map{
		"status":  "success",
		"message": "Total qty stocks",
		"data":    totalQty,
	})
}

// Get one data
func GetCommandeLine(c *fiber.Ctx) error {
	id := c.Params("id")
	db := database.DB
	var commandeLine models.CommandeLine
	db.Find(&commandeLine, id)
	if commandeLine.ProductUuid == uuid.Nil {
		return c.Status(404).JSON(
			fiber.Map{
				"status":  "error",
				"message": "No commandeLine name found",
				"data":    nil,
			},
		)
	}
	return c.JSON(
		fiber.Map{
			"status":  "success",
			"message": "commandeLine found",
			"data":    commandeLine,
		},
	)
}

// Create data
func CreateCommandeLine(c *fiber.Ctx) error {
	p := &models.CommandeLine{}

	if err := c.BodyParser(&p); err != nil {
		return err
	}

	database.DB.Create(p)

	return c.JSON(
		fiber.Map{
			"status":  "success",
			"message": "commande created success",
			"data":    p,
		},
	)
}

// Update data
func UpdateCommandeLine(c *fiber.Ctx) error {
	id := c.Params("id")
	db := database.DB

	type UpdateData struct {
		CommandeID     uint   `json:"commande_id"`
		LivraisonID    uint   `json:"livraison_id"`
		ProductUuid    uuid.UUID `json:"product_uuid"`     
		Quantity       uint64 `json:"quantity"`
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

	commandeLine := new(models.CommandeLine)

	db.First(&commandeLine, id)
	commandeLine.CommandeID = updateData.CommandeID
	commandeLine.LivraisonID = updateData.LivraisonID
	commandeLine.ProductUuid = updateData.ProductUuid
	commandeLine.Quantity = updateData.Quantity
	commandeLine.CodeEntreprise = updateData.CodeEntreprise

	db.Save(&commandeLine)

	return c.JSON(
		fiber.Map{
			"status":  "success",
			"message": "commandeLine updated success",
			"data":    commandeLine,
		},
	)

}

// Delete data
func DeleteCommandeLine(c *fiber.Ctx) error {
	id := c.Params("id")

	db := database.DB

	var commandeLine models.CommandeLine
	db.First(&commandeLine, id)
	if commandeLine.ProductID == 0 && commandeLine.PlatID == 0 {
		return c.Status(404).JSON(
			fiber.Map{
				"status":  "error",
				"message": "No commandeLine name found",
				"data":    nil,
			},
		)
	}

	db.Delete(&commandeLine)

	return c.JSON(
		fiber.Map{
			"status":  "success",
			"message": "CommandeLine deleted success",
			"data":    nil,
		},
	)
}
