package commande

import (
	"fmt"
	"strconv"

	"iposrestaurant/database"
	"iposrestaurant/models"
	"iposrestaurant/utils"

	"github.com/gofiber/fiber/v2"
	"github.com/google/uuid"
)

// Paginate
func GetPaginatedCommandeEntreprise(c *fiber.Ctx) error {
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

	var dataList []models.Commande

	var length int64
	db.Model(&models.Commande{}).Where("code_entreprise = ?", codeEntreprise).Count(&length)
	db.Where("code_entreprise = ?", codeEntreprise).
		Where("ncommande LIKE ? OR status LIKE ?", "%"+search+"%", "%"+search+"%").
		Offset(offset).
		Limit(limit).
		Order("updated_at DESC").
		Preload("TableBox").
		Preload("CommandeLines").
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
		"message":    "All commandes",
		"data":       dataList,
		"pagination": pagination,
	})
}

// Paginate
func GetPaginatedCommandeByTableBox(c *fiber.Ctx) error {
	db := database.DB
	codeEntreprise := c.Params("code_entreprise")
	posUUID := c.Params("pos_uuid")
	tableBoxUUID := c.Params("table_box_uuid")

	// Sync data with API
	if utils.IsInternetAvailable() {
		go SyncDataWithAPI(codeEntreprise, posUUID)
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

	var dataList []models.Commande

	var length int64
	db.Model(&models.Commande{}).Where("code_entreprise = ?", codeEntreprise).
		Where("pos_uid = ?", posUUID).Where("table_box_uuid = ?", tableBoxUUID).Count(&length)
	db.Where("code_entreprise = ?", codeEntreprise).
		Where("pos_uuid = ?", posUUID).
		Where("table_box_uuid = ?", tableBoxUUID).
		Where("ncommande LIKE ?", "%"+search+"%").
		Offset(offset).
		Limit(limit).
		Order("updated_at DESC").
		Preload("TableBox").
		Preload("CommandeLines").
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
		"message":    "All commandes",
		"data":       dataList,
		"pagination": pagination,
	})
}

// Get All data
func GetAllCommandes(c *fiber.Ctx) error {
	db := database.DB
	codeEntreprise := c.Params("code_entreprise")
	posuuId := c.Params("pos_uuid")

	// Sync data with API
	if utils.IsInternetAvailable() {
		go SyncDataWithAPI(codeEntreprise, posuuId)
	}

	var data []models.Commande
	db.Where("code_entreprise = ?", codeEntreprise).
		Where("pos_uuid = ?", posuuId).
		Preload("TableBox").
		Preload("CommandeLines").
		Find(&data)
	return c.JSON(fiber.Map{
		"status":  "success",
		"message": "All commandes",
		"data":    data,
	})
}

func GetTotalCommande(c *fiber.Ctx) error {
	db := database.DB
	codeEntreprise := c.Params("code_entreprise")
	tableBoxuuId := c.Params("table_box_uuid")

	// var commandes []models.Commande
	var total int64

	db.Model(&models.Commande{}).Where("code_entreprise = ?", codeEntreprise).
		Where("table_box_uuid = ?", tableBoxuuId).Count(&total)

	return c.JSON(fiber.Map{
		"status":  "success",
		"message": "total commandes",
		"data":    total,
	})
}

// Get one data
func GetCommande(c *fiber.Ctx) error {
	uuid := c.Params("uuid")
	db := database.DB
	var commande models.Commande  
	db.Where("uuid = ?", uuid).Preload("TableBox").Preload("CommandeLines").
	First(&commande)

	if commande.Ncommande == 0 {
		return c.Status(404).JSON(
			fiber.Map{
				"status":  "error",
				"message": "No commande name found",
				"data":    nil,
			},
		)
	}
	return c.JSON(
		fiber.Map{
			"status":  "success",
			"message": "commande found",
			"data":    commande,
		},
	)
}

// Create data
func CreateCommande(c *fiber.Ctx) error {
	p := &models.Commande{}

	if err := c.BodyParser(&p); err != nil {
		return err
	}

	p.UUID = uuid.New().String()
	
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
func UpdateCommande(c *fiber.Ctx) error {
	uuid := c.Params("uuid")
	db := database.DB

	type UpdateData struct {
		PosUUID          string `json:"pos_uuid"`
		Ncommande      uint64 `json:"ncommande"` // Number Random
		Status         string `json:"status"`    // Ouverte et Fermée
		ClientUUID       string `json:"client_uuid"`
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

	commande := new(models.Commande)

	db.Where("uuid = ?", uuid).First(&commande)
	commande.PosUUID = updateData.PosUUID
	commande.Ncommande = updateData.Ncommande
	commande.Status = updateData.Status
	commande.ClientUUID = updateData.ClientUUID
	commande.Signature = updateData.Signature
	commande.CodeEntreprise = updateData.CodeEntreprise

	db.Save(&commande)

	return c.JSON(
		fiber.Map{
			"status":  "success",
			"message": "commande updated success",
			"data":    commande,
		},
	)

}

// Delete data
func DeleteCommande(c *fiber.Ctx) error {
	uuid := c.Params("uuid")

	db := database.DB

	var commande models.Commande
	db.Where("uuid = ?", uuid).First(&commande)
	if commande.Ncommande == 0 {
		return c.Status(404).JSON(
			fiber.Map{
				"status":  "error",
				"message": "No commande name found",
				"data":    nil,
			},
		)
	}

	db.Delete(&commande)

	return c.JSON(
		fiber.Map{
			"status":  "success",
			"message": "commande deleted success",
			"data":    nil,
		},
	)
}
