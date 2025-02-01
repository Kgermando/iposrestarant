package dashboard

import (
	"iposrestaurant/database"
	"iposrestaurant/models"

	"github.com/gofiber/fiber/v2"
)

// Get total Client et Fournisseurs
func GetTotalClientFournisseur(c *fiber.Ctx) error {
	db := database.DB
	codeEntreprise := c.Params("code_entreprise")

	var clientCount int64 = 0

	db.Model(&models.Client{}).
		Where("code_entreprise = ?", codeEntreprise).
		Count(&clientCount)

	var fournisseurCount int64 = 0
	db.Model(&models.Fournisseur{}).
		Where("code_entreprise = ?", codeEntreprise).
		Count(&fournisseurCount)

	var areaCount int64 = 0
	db.Table("livraisons").
		Where("code_entreprise = ?", codeEntreprise).
		Count(&areaCount)

	response := map[string]interface{}{
		"client":      clientCount,
		"fournisseur": fournisseurCount,
		"area":        areaCount,
	}

	return c.JSON(fiber.Map{
		"status":  "success",
		"message": "Total ventes",
		"data":    response,
	})
}

// Get Zone de livraison
func GetCourbeZoneLivraison(c *fiber.Ctx) error {
	db := database.DB
	codeEntreprise := c.Params("code_entreprise")

	var areaCounts []models.AreaCount
	db.Table("livraisons").
		Select("areas.name as area_name, COUNT(*) as count").
		Joins("JOIN areas ON livraisons.area_id = areas.id").
		Where("livraisons.code_entreprise = ?", codeEntreprise).
		Group("areas.name").
		Scan(&areaCounts)

	response := map[string]interface{}{
		"piechart": areaCounts,
	}

	return c.JSON(fiber.Map{
		"status":  "success",
		"message": "Total zone de livraisons",
		"data":    response,
	})
}

// Get Clients with most deliveries
func GetClientsWithMostDeliveries(c *fiber.Ctx) error {
	db := database.DB
	codeEntreprise := c.Params("code_entreprise")

	var livraisonAreas []models.LivraisonArea
	query := `
		SELECT
			c.fullname,
			c.telephone,
			c.email, 
			COUNT(a.id) as count
		FROM
			livraisons l
		JOIN
			clients c ON l.client_id = c.id
		JOIN
			areas a ON l.area_id = a.id
		WHERE
			l.code_entreprise = ?
		GROUP BY
			c.fullname,
			c.telephone,
			c.email
		ORDER BY count DESC
		LIMIT 10;
	`
	if err := db.Raw(query, codeEntreprise).Scan(&livraisonAreas).Error; err != nil {
		return err
	}

	return c.JSON(fiber.Map{
		"status":  "success",
		"message": "Clients with most deliveries",
		"data":    livraisonAreas,
	})
}

// Get top 10 Fournisseurs with most stock value
func GetTop10FournisseursWithMostStockValue(c *fiber.Ctx) error {
	db := database.DB
	codeEntreprise := c.Params("code_entreprise")

	var fournisseurStocks []models.FournisseurStock
	query := `
		SELECT
			f.name,
			f.telephone,
			f.type_fourniture, 
			SUM(prix_achat) as total_value
		FROM
			stocks s
		JOIN
			fournisseurs f ON s.fournisseur_id = f.id
		WHERE
			s.code_entreprise = ?
		GROUP BY
			f.name,
			f.telephone,
			f.type_fourniture
		ORDER BY total_value DESC
		LIMIT 10;
	`
	if err := db.Raw(query, codeEntreprise).Scan(&fournisseurStocks).Error; err != nil {
		return err
	}

	return c.JSON(fiber.Map{
		"status":  "success",
		"message": "Top 10 Fournisseurs with most stock value",
		"data":    fournisseurStocks,
	})
}
