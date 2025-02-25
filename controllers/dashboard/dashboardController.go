package dashboard

import (
	"fmt"
	"iposrestaurant/database"
	"iposrestaurant/models"
	"strconv"
	"time"

	"github.com/gofiber/fiber/v2"
	"gorm.io/gorm"
)

// Get data
func GetStock(c *fiber.Ctx) error {
	db := database.DB
	productUUID := c.Params("product_uuid")

	var data models.Stock

	db.Model(data).Where("product_uuid = ?", productUUID).Last(&data)

	return c.JSON(fiber.Map{
		"status":  "success",
		"message": "Total qty stocks",
		"data":    data,
	})
}

// Paginate
func GetPaginatedStock(c *fiber.Ctx) error {
	db := database.DB
	codeEntreprise := c.Params("code_entreprise")

	startDateStr := c.Query("start_date")
	endDateStr := c.Query("end_date")

	fmt.Println("startDateStr", startDateStr)
	fmt.Println("endDateStr", endDateStr)

	page, err := strconv.Atoi(c.Query("page", "1"))
	if err != nil || page <= 0 {
		page = 1 // Default page number
	}
	limit, err := strconv.Atoi(c.Query("limit", "10"))
	if err != nil || limit <= 0 {
		limit = 10
	}
	offset := (page - 1) * limit

	var dataList []models.Stock

	var length int64
	db.Model(&models.Stock{}).Where("stocks.code_entreprise = ?", codeEntreprise).Count(&length)
	db.Where("stocks.code_entreprise = ?", codeEntreprise).
		Where("stocks.created_at BETWEEN ? AND ?", startDateStr, endDateStr).
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
	totalPages := len(dataList) / limit
	if remainder := len(dataList) % limit; remainder > 0 {
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
		"message":    "All dashboard stocks",
		"data":       dataList,
		"pagination": pagination,
	})
}

// Paginate
func GetPaginatedCommandeLine(c *fiber.Ctx) error {
	db := database.DB
	codeEntreprise := c.Params("code_entreprise")

	startDateStr := c.Query("start_date")
	endDateStr := c.Query("end_date")
	page, err := strconv.Atoi(c.Query("page", "1"))
	if err != nil || page <= 0 {
		page = 1 // Default page number
	}
	limit, err := strconv.Atoi(c.Query("limit", "10"))
	if err != nil || limit <= 0 {
		limit = 10
	}
	offset := (page - 1) * limit

	var dataList []models.CommandeLine

	var length int64
	db.Model(&models.CommandeLine{}).Where("commande_lines.code_entreprise = ?", codeEntreprise).Count(&length)
	db.Where("commande_lines.code_entreprise = ?", codeEntreprise).
		Where("commande_lines.created_at BETWEEN ? AND ?", startDateStr, endDateStr).
		Offset(offset).
		Limit(limit).
		Order("commande_lines.updated_at DESC").
		Preload("Product").
		Preload("Plat").
		Preload("Commande.Client").
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
	pagination := map[string]interface{}{
		"total_pages": totalPages,
		"page":        page,
		"page_size":   limit,
		"length":      length,
	}

	return c.JSON(fiber.Map{
		"status":     "success",
		"message":    "All dashboard commandeLines",
		"data":       dataList,
		"pagination": pagination,
	})
}

func GetEntreeSortie(c *fiber.Ctx) error {
	db := database.DB
	codeEntreprise := c.Params("code_entreprise")

	start_date := c.Query("start_date")
	end_date := c.Query("end_date")

	var products []models.Product
	db.Where("products.code_entreprise = ?", codeEntreprise).
		Where("products.created_at BETWEEN ? AND ?", start_date, end_date).
		Preload("Stocks").Preload("CommadeLines").Find(&products)

	response := []map[string]interface{}{}
	for _, product := range products {

		var totalStockIn uint64 = 0
		for _, entry := range product.Stocks {
			totalStockIn += entry.Quantity
		}

		var totalStockOut uint64 = 0
		for _, orderLine := range product.CommadeLines {
			totalStockOut += orderLine.Quantity
		}

		response = append(response, map[string]interface{}{
			"product":   product.Name,
			"stock_in":  totalStockIn,
			"stock_out": totalStockOut,
		})
	}

	return c.JSON(fiber.Map{
		"status":  "success",
		"message": "Entrees et sorties",
		"data":    response,
	})
}

func GetSaleProfit(c *fiber.Ctx) error {
	db := database.DB
	codeEntreprise := c.Params("code_entreprise")

	start_date := c.Query("start_date")
	end_date := c.Query("end_date")

	var commandes []models.Commande

	db.Where("commandes.code_entreprise = ?", codeEntreprise).
		Where("commandes.created_at BETWEEN ? AND ?", start_date, end_date).
		Preload("CommandeLines.Product").Find(&commandes)

	salesByMonth := make(map[string]float64)
	profitsByMonth := make(map[string]float64)

	for _, commande := range commandes {
		month := commande.CreatedAt.Format("2006-01")
		for _, line := range commande.CommandeLines {
			stockEntry := getStockEntry(line.ProductUUID, db)
			saleAmount := line.Product.PrixVente * float64(line.Quantity)
			profitAmount := (line.Product.PrixVente - stockEntry.PrixAchat) * float64(line.Quantity)

			salesByMonth[month] += saleAmount
			profitsByMonth[month] += profitAmount
		}
	}

	var response []map[string]interface{}
	for month, sales := range salesByMonth {
		response = append(response, map[string]interface{}{
			"mois":    month,
			"ventes":  sales,
			"profits": profitsByMonth[month],
		})
	}

	return c.JSON(fiber.Map{
		"status":  "success",
		"message": "Ventes et profits",
		"data":    response,
	})
}

func GetStockDisponible(c *fiber.Ctx) error {
	db := database.DB
	codeEntreprise := c.Params("code_entreprise")

	start_date := c.Query("start_date")
	end_date := c.Query("end_date")

	var products []models.Product
	db.Where("products.code_entreprise = ?", codeEntreprise).
		Where("products.created_at BETWEEN ? AND ?", start_date, end_date).
		Preload("Stocks").Preload("CommadeLines").Find(&products)

	stockTotal := make(map[string]uint64)

	for _, product := range products {
		var stockEntries []models.Stock
		var commandeLines []models.CommandeLine

		db.Where("product_uuid = ?", product.UUID).Find(&stockEntries)
		db.Where("product_uuid = ?", product.UUID).Find(&commandeLines)

		var totalStockIn uint64 = 0
		for _, entry := range stockEntries {
			totalStockIn += entry.Quantity
		}

		var totalStockOut uint64 = 0
		for _, line := range commandeLines {
			totalStockOut -= line.Quantity
		}

		stockTotal[product.Name] = totalStockIn + totalStockOut
	}

	return c.JSON(fiber.Map{
		"status":  "success",
		"message": "Stocks disponible",
		"data":    stockTotal,
	})
}

func GetTotalProductInStock(c *fiber.Ctx) error {
	db := database.DB
	codeEntreprise := c.Params("code_entreprise")

	start_date := c.Query("start_date")
	end_date := c.Query("end_date")

	var stocks []models.Stock
	db.Where("stocks.code_entreprise = ?", codeEntreprise).
		Where("stocks.created_at BETWEEN ? AND ?", start_date, end_date).
		Preload("Product").Find(&stocks)

	var totalProducts uint64 = 0
	for _, entry := range stocks {
		totalProducts += entry.Quantity
	}

	return c.JSON(fiber.Map{
		"status":  "success",
		"message": "Stocks disponible",
		"data":    totalProducts,
	})
}

func GetTotalStockDispoSortie(c *fiber.Ctx) error {
	db := database.DB
	codeEntreprise := c.Params("code_entreprise")

	start_date := c.Query("start_date")
	end_date := c.Query("end_date")

	var commandes []models.Commande
	db.Where("commandes.code_entreprise = ?", codeEntreprise).
		Where("commandes.created_at BETWEEN ? AND ?", start_date, end_date).
		Preload("CommandeLines.Product").Find(&commandes)

	var stocks []models.Stock
	db.Where("stocks.code_entreprise = ?", codeEntreprise).
		Where("stocks.created_at BETWEEN ? AND ?", start_date, end_date).
		Preload("Product").Find(&stocks)

	totalProfitAvailableStock := 0.0
	totalProfitStockInOut := 0.0

	// Calcul des profits des stocks disponibles
	for _, entry := range stocks {
		profit := (entry.Product.PrixVente - entry.PrixAchat) * float64(entry.Quantity)
		totalProfitAvailableStock += profit
	}

	// Calcul des profits des stocks entrés et sortis
	for _, commande := range commandes {
		for _, line := range commande.CommandeLines {
			stockEntry := getStockEntry(line.ProductUUID, db)
			profit := (line.Product.PrixVente - stockEntry.PrixAchat) * float64(line.Quantity)
			totalProfitStockInOut += profit
		}
	}

	response := map[string]interface{}{
		"total_profit_available_stock": totalProfitAvailableStock,
		"total_profit_stock_in_out":    totalProfitStockInOut,
	}

	return c.JSON(fiber.Map{
		"status":  "success",
		"message": "Total profits dispo et sortie",
		"data":    response,
	})
}

func GetTotalValeurProduct(c *fiber.Ctx) error {
	db := database.DB
	codeEntreprise := c.Params("code_entreprise")

	start_date := c.Query("start_date")
	end_date := c.Query("end_date")

	var stocks []models.Stock
	db.Where("stocks.code_entreprise = ?", codeEntreprise).
		Where("stocks.created_at BETWEEN ? AND ?", start_date, end_date).
		Preload("Product").Find(&stocks)

	totalValue := 0.0
	for _, entry := range stocks {
		productValue := entry.Product.PrixVente * float64(entry.Quantity)
		totalValue += productValue
	}

	return c.JSON(fiber.Map{
		"status":  "success",
		"message": "total valeur",
		"data":    totalValue,
	})
}

func GetCourbeVente24h(c *fiber.Ctx) error {
	db := database.DB
	codeEntreprise := c.Params("code_entreprise")

	var commandeLines []models.CommandeLine
	db.Where("commande_lines.code_entreprise = ?", codeEntreprise).
		Where("date(created_at) = date('now')").
		Preload("Plat").
		Preload("Product").
		Find(&commandeLines)

	hourlySales := make(map[int]float64)
	for i := 0; i < 24; i++ {
		hourlySales[i] = 0
	}

	for _, sale := range commandeLines {
		hour := sale.CreatedAt.Hour()
		hourlySales[hour] += (sale.Plat.PrixVente + sale.Product.PrixVente)
	}

	return c.JSON(fiber.Map{
		"status":  "success",
		"message": "Courbe de ventes journaliere",
		"data":    hourlySales,
	})
}

func GetTotalVente24h(c *fiber.Ctx) error {
	db := database.DB
	codeEntreprise := c.Params("code_entreprise")

	var commandeLines []models.CommandeLine
	startOfDay := time.Now().Truncate(24 * time.Hour)
	endOfDay := startOfDay.Add(24 * time.Hour).Add(-1 * time.Second)
	db.Where("commande_lines.code_entreprise = ?", codeEntreprise).
		Where("created_at BETWEEN ? AND ?", startOfDay, endOfDay).
		Preload("Plat").
		Preload("Product").
		Find(&commandeLines)

	totalSales := 0.0
	for _, sale := range commandeLines {
		totalSales += (sale.Plat.PrixVente + sale.Product.PrixVente)
	}

	return c.JSON(fiber.Map{
		"status":  "success",
		"message": "total ventes journalieres",
		"data":    totalSales,
	})
}

func getStockEntry(productUUID string, db *gorm.DB) models.Stock {
	var stock models.Stock
	if productUUID != "00000000-0000-0000-0000-000000000000" {
		db.Where("product_id = ?", productUUID).First(&stock)
	}

	return stock
}
