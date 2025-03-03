package printer

import (
	"fmt"
	"iposrestaurant/models"

	"github.com/gofiber/fiber/v2"
	"github.com/jung-kurt/gofpdf"
)

func generateInvoice(dataList []models.Printer) *gofpdf.Fpdf {
	pdf := gofpdf.New("P", "mm", "80mm", "") // Définir la largeur à 80mm
	pdf.AddPage()
	pdf.SetFont("Arial", "B", 12)
	pdf.Cell(80, 10, "Facture de consommation")
	pdf.Ln(10)

	pdf.SetFont("Arial", "", 10)

	// En-têtes de tableau
	pdf.CellFormat(40, 10, "Nom", "1", 0, "C", false, 0, "")
	pdf.CellFormat(20, 10, "Prix Unitaire", "1", 0, "C", false, 0, "")
	pdf.CellFormat(10, 10, "Qté", "1", 0, "C", false, 0, "")
	pdf.CellFormat(10, 10, "Total", "1", 1, "C", false, 0, "")

	var subTotal float64
	for _, item := range dataList {
		pdf.CellFormat(40, 10, item.Name, "1", 0, "", false, 0, "")
		pdf.CellFormat(20, 10, fmt.Sprintf("%.2f", item.UnitPrice), "1", 0, "R", false, 0, "")
		pdf.CellFormat(10, 10, fmt.Sprintf("%d", item.Quantity), "1", 0, "R", false, 0, "")
		pdf.CellFormat(10, 10, fmt.Sprintf("%.2f", item.Total), "1", 1, "R", false, 0, "")
		subTotal += item.Total
	}

	// Calculer la TVA et le total
	tva := subTotal * 0.16
	total := subTotal + tva

	pdf.Ln(5)
	pdf.CellFormat(60, 10, "Sous-total", "1", 0, "R", false, 0, "")
	pdf.CellFormat(20, 10, fmt.Sprintf("%.2f", subTotal), "1", 1, "R", false, 0, "")
	pdf.CellFormat(60, 10, "TVA (16%)", "1", 0, "R", false, 0, "")
	pdf.CellFormat(20, 10, fmt.Sprintf("%.2f", tva), "1", 1, "R", false, 0, "")
	pdf.CellFormat(60, 10, "Total", "1", 0, "R", false, 0, "")
	pdf.CellFormat(20, 10, fmt.Sprintf("%.2f", total), "1", 1, "R", false, 0, "")

	return pdf
}

// Create data
func CreatePrint(c *fiber.Ctx) error {

	items := []models.Printer{
		{Name: "Article 1", UnitPrice: 10.0, Quantity: 2, Total: 20.0},
		{Name: "Article 2", UnitPrice: 5.0, Quantity: 3, Total: 15.0},
		{Name: "Article 3", UnitPrice: 7.0, Quantity: 1, Total: 7.0},
	}
	pdf := generateInvoice(items)

	err := pdf.OutputFileAndClose("facture.pdf")
	if err != nil {
		return c.Status(500).SendString("Erreur lors de la génération de la facture")
	}

	return c.JSON(
		fiber.Map{
			"status":  "success",
			"message": "product created success",
			"data":    pdf,
		},
	)
}
