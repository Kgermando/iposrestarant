package ingredientstock

import (
	"fmt"
	"iposrestaurant/database"
	"iposrestaurant/models"
	"log"
	"strconv"
	"time"

	"github.com/gofiber/fiber/v2"
	"github.com/google/uuid"
	"gorm.io/gorm"
)

// Paginate
func GetPaginatedIngredientStock(c *fiber.Ctx) error {
	db := database.DB
	ingredientUUID := c.Params("ingredient_uuid")
	start_date := c.Query("start_date")
	end_date := c.Query("end_date")

	// Sync data with API
	go SyncDataWithAPI(ingredientUUID)

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

	var dataList []models.IngredientStock

	var length int64
	db.Model(&models.IngredientStock{}).Where("ingredient_uuid = ?", ingredientUUID).Count(&length)
	db.Where("ingredient_uuid = ?", ingredientUUID).
		Where("created_at BETWEEN ? AND ?", start_date, end_date).
		Where("created_at LIKE ?", "%"+search+"%").
		Offset(offset).
		Limit(limit).
		Order("created_at DESC").
		Preload("Ingredient").
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

// Get Total data par ingredient
func GetStatsIngredientStock(c *fiber.Ctx) error {
	db := database.DB
	codeEntreprise := c.Params("code_entreprise")
	ingredientUUID := c.Params("ingredient_uuid")

	var montantTotalAchat float64
	var stockTotal float64
	var stockUsed float64
	var stockDispo float64
	var pourcentQtyDispo float64 = 0

	// Stock total
	ingStocks, err := GetTotalIngredientStock(db, codeEntreprise, ingredientUUID)
	if err != nil {
		log.Println("Erreur lors de la récupération du stock des ingrédients:", err)
		return err
	}
	for _, sale := range ingStocks {
		montantTotalAchat += sale.Price
		stockTotal += sale.Qty
	}

	// Stock used
	ingredientUsages, err := GetTotalIngredientUsage(db, codeEntreprise, ingredientUUID)
	if err != nil {
		log.Println("Erreur lors de la récupération de l'utilisation des ingrédients:", err)
		return err
	}
	for _, sale := range ingredientUsages {
		stockUsed += sale.Qty
	}

	stockDispo = stockTotal - stockUsed

	if stockTotal > 0 {
		pourcentQtyDispo = stockDispo * 100 / stockTotal
	}

	data := map[string]interface{}{
		"montanttotalachat": montantTotalAchat,
		"stocktotal":        stockTotal,
		"stockdispo":        stockDispo,
		"pourcentqtydispo":  pourcentQtyDispo,
	}

	return c.JSON(fiber.Map{
		"status":  "success",
		"message": "Stats ingredients stocks",
		"data":    data,
	})
}

// Get Total data par ingredient
func GetStatsParIngredientStock(c *fiber.Ctx) error {
	db := database.DB
	codeEntreprise := c.Params("code_entreprise")
	ingredientUUID := c.Params("ingredient_uuid")
	start_date := c.Query("start_date")
	end_date := c.Query("end_date")

	var montantTotalAchat float64
	var stockTotal float64
	var stockUsed float64
	var stockDispo float64
	var pourcentQtyDispo float64 = 0

	// Stock total
	ingStocks, err := GetTotalIngredientStockBetweenDate(db, codeEntreprise, ingredientUUID, start_date, end_date)
	if err != nil {
		log.Println("Erreur lors de la récupération du stock des ingrédients:", err)
		return err
	}
	for _, sale := range ingStocks {
		montantTotalAchat += sale.Price
		stockTotal += sale.Qty
	}

	// Stock used
	ingredientUsages, err := GetTotalIngredientUsageBetweenDate(db, codeEntreprise, ingredientUUID, start_date, end_date)
	if err != nil {
		log.Println("Erreur lors de la récupération de l'utilisation des ingrédients:", err)
		return err
	}
	for _, sale := range ingredientUsages {
		stockUsed += sale.Qty
	}

	stockDispo = stockTotal - stockUsed

	if stockTotal > 0 {
		pourcentQtyDispo = stockDispo * 100 / stockTotal
	}

	data := map[string]interface{}{
		"montanttotalachat": montantTotalAchat,
		"stocktotal":        stockTotal,
		"stockdispo":        stockDispo,
		"pourcentqtydispo":  pourcentQtyDispo,
	}

	return c.JSON(fiber.Map{
		"status":  "success",
		"message": "Stats ingredients stocks",
		"data":    data,
	})
}

// Get All data
func GetAllIngredientStocks(c *fiber.Ctx) error {
	db := database.DB
	var data []models.IngredientStock
	db.Find(&data)
	return c.JSON(fiber.Map{
		"status":  "success",
		"message": "All stocks",
		"data":    data,
	})
}

// Get one data
func GetIngredientStock(c *fiber.Ctx) error {
	id := c.Params("id")
	db := database.DB

	var stock models.IngredientStock
	db.Find(&stock, id)
	if stock.IngredientUuid == uuid.Nil {
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
			"message": "ingredientStock found",
			"data":    stock,
		},
	)
}

// Create data
func CreateIngredientStock(c *fiber.Ctx) error {
	p := &models.IngredientStock{}

	if err := c.BodyParser(&p); err != nil {
		return err
	}

	database.DB.Create(p)

	return c.JSON(
		fiber.Map{
			"status":  "success",
			"message": "ingredientStock created success",
			"data":    p,
		},
	)
}

// Update data
func UpdateIngredientStock(c *fiber.Ctx) error {
	id := c.Params("id")
	db := database.DB

	type UpdateData struct {
		PosID          uint      `json:"pos_id"`
		IngredientUuid uuid.UUID `json:"ingredient_uuid"`
		Description    string    `json:"description"`
		Quantity       uint64    `json:"quantity"`
		FournisseurID  uint      `json:"fournisseur_id"`
		PrixAchat      float64   `json:"prix_achat"`
		DateExpiration time.Time `json:"date_expiration"`
		Signature      string    `json:"signature"`
		CodeEntreprise uint64    `json:"code_entreprise"`
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

	stock := new(models.IngredientStock)

	db.First(&stock, id)
	stock.PosID = updateData.PosID
	stock.IngredientUuid = updateData.IngredientUuid
	stock.Description = updateData.Description
	stock.FournisseurID = updateData.FournisseurID
	stock.Quantity = updateData.Quantity
	stock.PrixAchat = updateData.PrixAchat
	stock.DateExpiration = updateData.DateExpiration
	stock.Signature = updateData.Signature

	db.Save(&stock)

	return c.JSON(
		fiber.Map{
			"status":  "success",
			"message": "ingredientStock updated success",
			"data":    stock,
		},
	)

}

// Delete data
func DeleteIngredientStock(c *fiber.Ctx) error {
	id := c.Params("id")

	db := database.DB

	var stock models.IngredientStock
	db.First(&stock, id)
	if stock.IngredientUuid == uuid.Nil {
		return c.Status(404).JSON(
			fiber.Map{
				"status":  "error",
				"message": "No ingredientStock name found",
				"data":    nil,
			},
		)
	}

	db.Delete(&stock)

	return c.JSON(
		fiber.Map{
			"status":  "success",
			"message": "ingredientStock deleted success",
			"data":    nil,
		},
	)
}

func GetTotalIngredientUsage(db *gorm.DB, code_entreprise string, ingredient_uuid string) ([]models.IngredientUsage, error) {
	var ingredientUsages []models.IngredientUsage
	query := `
		SELECT
			i.name,
			SUM(c.quantity * cl.quantity) AS qty,
			i.unite
		FROM
			commande_lines cl
		JOIN
			compositions c ON cl.plat_id = c.plat_id
		JOIN
			ingredients i ON c.ingredient_uuid = i.uuid
		WHERE
            cl.code_entreprise = ? AND i.uuid = ?
		GROUP BY
			i.name, i.unite;
    `
	if err := db.Raw(query, code_entreprise, ingredient_uuid).Scan(&ingredientUsages).Error; err != nil {
		return nil, err
	}

	return ingredientUsages, nil
}

func GetTotalIngredientStock(db *gorm.DB, code_entreprise string, ingredient_uuid string) ([]models.IngredientUsage, error) {
	var stock []models.IngredientUsage
	query := `
        SELECT
            i.name,
            SUM(si.quantity) AS qty,
            i.unite,
			si.prix_achat AS price
        FROM
            ingredient_stocks si
        JOIN
            ingredients i ON si.ingredient_uuid = i.uuid
	 	WHERE
            si.code_entreprise = ? AND i.uuid = ?
        GROUP BY
            i.name, i.unite, si.prix_achat;
    `
	if err := db.Raw(query, code_entreprise, ingredient_uuid).Scan(&stock).Error; err != nil {
		return nil, err
	}
	return stock, nil
}

func GetTotalIngredientUsageBetweenDate(db *gorm.DB,
	code_entreprise string,
	ingredient_uuid string,
	start_date string,
	end_date string,
) ([]models.IngredientUsage, error) {
	var ingredientUsages []models.IngredientUsage
	query := `
		SELECT
			i.name,
			SUM(c.quantity * cl.quantity) AS qty,
			i.unite
		FROM
			commande_lines cl
		JOIN
			compositions c ON cl.plat_id = c.plat_id
		JOIN
			ingredients i ON c.ingredient_uuid = i.uuid
		WHERE
            cl.code_entreprise = ? AND i.uuid = ? AND cl.created_at BETWEEN ? AND ?
		GROUP BY
			i.name, i.unite;
    `
	if err := db.Raw(query, code_entreprise, ingredient_uuid, start_date, end_date).
		Scan(&ingredientUsages).Error; err != nil {
		return nil, err
	}

	return ingredientUsages, nil
}

func GetTotalIngredientStockBetweenDate(db *gorm.DB,
	code_entreprise string,
	ingredient_uuid string,
	start_date string,
	end_date string,
) ([]models.IngredientUsage, error) {
	var stock []models.IngredientUsage
	query := `
        SELECT
            i.name,
            SUM(si.quantity) AS qty,
            i.unite,
			si.prix_achat AS price
        FROM
            ingredient_stocks si
        JOIN
            ingredients i ON si.ingredient_uuid = i.uuid
	 	WHERE
            si.code_entreprise = ? AND i.uuid = ? AND si.created_at BETWEEN ? AND ?
        GROUP BY
            i.name, i.unite, si.prix_achat;
    `
	if err := db.Raw(query, code_entreprise, ingredient_uuid, start_date, end_date).
		Scan(&stock).Error; err != nil {
		return nil, err
	}
	return stock, nil
}
