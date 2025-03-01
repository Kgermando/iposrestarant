package stock

import (
	"fmt"
	"iposrestaurant/database"
	"iposrestaurant/models"
	"iposrestaurant/utils"
	"strconv"
	"time"

	"github.com/gofiber/fiber/v2"
	"github.com/google/uuid"
)

// Paginate
func GetPaginatedStock(c *fiber.Ctx) error {
	db := database.DB
	productuuid := c.Params("product_uuid") // Changed to product_uuid

	// Sync data with API
	if utils.IsInternetAvailable() {
		go SyncDataWithAPI(productuuid)
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

	var dataList []models.Stock

	var length int64
	db.Model(&models.Stock{}).Where("product_uuid = ?", productuuid).Count(&length) // Changed to product_id
	db.Where("product_uuid = ?", productuuid).                                      // Changed to product_uid
											Joins("JOIN products ON stocks.product_uuid=products.uuid"). // Changed to product_id
											Where("products.name LIKE ? OR products.reference LIKE ?", "%"+search+"%", "%"+search+"%").
											Offset(offset).
											Limit(limit).
											Order("stocks.created_at DESC").
											Preload("Product").
											Preload("Fournisseur").
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
		"message":    "All stocks",
		"data":       dataList,
		"pagination": pagination,
	})
}

// Get data
func GetStockMargeBeneficiaire(c *fiber.Ctx) error {
	db := database.DB
	productUuid := c.Params("product_uuid") // Changed to product_uuid

	var data models.Stock

	db.Model(&models.Stock{}).Where("product_uuid = ?", productUuid).Preload("Product").Last(&data) // Changed to product_uuid

	return c.JSON(fiber.Map{
		"status":  "success",
		"message": "Total qty stocks",
		"data":    data,
	})
}

// Get Total data
func GetTotalStock(c *fiber.Ctx) error {
	db := database.DB
	productUuid := c.Params("product_uuid") // Changed to product_uuid

	var totalQty int64

	db.Model(&models.Stock{}).Where("product_uuid = ?", productUuid).Select("SUM(quantity)").Scan(&totalQty) // Changed to product_uuid

	return c.JSON(fiber.Map{
		"status":  "success",
		"message": "Total qty stocks",
		"data":    totalQty,
	})
}

// Get All data
func GetAllStocks(c *fiber.Ctx) error {
	db := database.DB
	productUuid := c.Params("product_uuid") // Changed to product_uuid
	var data []models.Stock
	db.Where("product_uuid = ?", productUuid).Find(&data) // Changed to product_uuid
	return c.JSON(fiber.Map{
		"status":  "success",
		"message": "All stocks",
		"data":    data,
	})
}

// Get one data
func GetStock(c *fiber.Ctx) error {
	uuid := c.Params("uuid")
	db := database.DB

	var stock models.Stock 
	db.Where("uuid = ?", uuid).Preload("Product").Preload("Fournisseur").First(&stock)

	if stock.ProductUUID == "00000000-0000-0000-0000-000000000000" {
		return c.Status(404).JSON(
			fiber.Map{
				"status":  "error",
				"message": "No stock name found",
				"data":    nil,
			},
		)
	}
	return c.JSON(
		fiber.Map{
			"status":  "success",
			"message": "stock found",
			"data":    stock,
		},
	)
}

// Create data
func CreateStock(c *fiber.Ctx) error {
	p := &models.Stock{}

	if err := c.BodyParser(&p); err != nil {
		return err
	}

	p.UUID = uuid.New().String()

	database.DB.Create(p)

	return c.JSON(
		fiber.Map{
			"status":  "success",
			"message": "stock created success",
			"data":    p,
		},
	)
}

// Update data
func UpdateStock(c *fiber.Ctx) error {
	uuid := c.Params("uuid")
	db := database.DB

	type UpdateData struct {
		PosUUID         string    `json:"pos_uuid"`
		ProductUUID     string    `json:"product_uuid"`
		Description     string    `json:"description"`
		FournisseurUUID string    `json:"fournisseur_uuid"`
		Quantity        uint64    `json:"quantity"`
		PrixAchat       float64   `json:"prix_achat"`
		DateExpiration  time.Time `json:"date_expiration"`
		Signature       string    `json:"signature"`
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

	stock := new(models.Stock)
 
	db.Where("uuid = ?", uuid).First(&stock)
	stock.PosUUID = updateData.PosUUID
	stock.ProductUUID = updateData.ProductUUID
	stock.Description = updateData.Description
	stock.FournisseurUUID = updateData.FournisseurUUID
	stock.Quantity = updateData.Quantity
	stock.PrixAchat = updateData.PrixAchat
	stock.DateExpiration = updateData.DateExpiration
	stock.Signature = updateData.Signature

	db.Save(&stock)

	return c.JSON(
		fiber.Map{
			"status":  "success",
			"message": "stock updated success",
			"data":    stock,
		},
	)

}

// Delete data
func DeleteStock(c *fiber.Ctx) error {
	uuid := c.Params("uuid")

	db := database.DB

	var stock models.Stock
	db.Where("uuid = ?", uuid).First(&stock)
	if stock.ProductUUID == "00000000-0000-0000-0000-000000000000" {
		return c.Status(404).JSON(
			fiber.Map{
				"status":  "error",
				"message": "No stock name found",
				"data":    nil,
			},
		)
	}

	db.Delete(&stock)

	return c.JSON(
		fiber.Map{
			"status":  "success",
			"message": "stock deleted success",
			"data":    nil,
		},
	)
}
