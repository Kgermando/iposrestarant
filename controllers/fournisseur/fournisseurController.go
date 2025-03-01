package fournisseur

import (
	"encoding/json"
	"fmt"
	"iposrestaurant/database"
	"iposrestaurant/models"
	"iposrestaurant/utils"
	"strconv"

	"github.com/gofiber/fiber/v2"
	"github.com/google/uuid"
)

// Paginate
func GetPaginatedFournisseur(c *fiber.Ctx) error {
	codeEntreprise := c.Params("code_entreprise")
	db := database.DB

	// Synchronize data with API
	if utils.IsInternetAvailable() {
		go SyncDataWithAPI(codeEntreprise)
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

	var dataList []models.Fournisseur
	var length int64
	db.Model(&models.Fournisseur{}).Where("code_entreprise = ?", codeEntreprise).Count(&length)
	db.Where("code_entreprise = ?", codeEntreprise).
		Where("name LIKE ?", "%"+search+"%").
		Offset(offset).
		Limit(limit).
		Order("updated_at DESC").
		Preload("Stocks").
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
		"message":    "All fournisseurs",
		"data":       dataList,
		"pagination": pagination,
	})
}

// Get All data
func GetAllFournisseurs(c *fiber.Ctx) error {
	codeEntreprise := c.Params("code_entreprise")
	db := database.DB

	var data []models.Fournisseur
	db.Where("code_entreprise = ?", codeEntreprise).Preload("Stocks").Find(&data)
	return c.JSON(fiber.Map{
		"status":  "success",
		"message": "All fournisseurs",
		"data":    data,
	})
}

// Get one data
func GetFournisseur(c *fiber.Ctx) error {
	uuid := c.Params("uuid")
	db := database.DB

	var fournisseur models.Fournisseur
	db.Where("uuid = ?", uuid).Preload("Stocks").First(&fournisseur)
	if fournisseur.Name == "" {
		return c.Status(404).JSON(
			fiber.Map{
				"status":  "error",
				"message": "No fournisseur name found",
				"data":    nil,
			},
		)
	}
	return c.JSON(
		fiber.Map{
			"status":  "success",
			"message": "fournisseur found",
			"data":    fournisseur,
		},
	)
}

// Create data
func CreateFournisseur(c *fiber.Ctx) error {
	p := &models.Fournisseur{}

	if err := c.BodyParser(&p); err != nil {
		return err
	}

	p.UUID = uuid.New().String()

	database.DB.Create(p)

	return c.JSON(
		fiber.Map{
			"status":  "success",
			"message": "fournisseur created success",
			"data":    p,
		},
	)
}

// Update data
func UpdateFournisseur(c *fiber.Ctx) error {
	uuid := c.Params("uuid")
	db := database.DB

	type UpdateData struct {
		Name           string `json:"name"`
		Adress         string `json:"adress"`
		Email          string `json:"email"`
		Telephone      string `json:"telephone"`
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

	fournisseur := new(models.Fournisseur)

	db.Where("uuid = ?", uuid).First(&fournisseur)
	fournisseur.Name = updateData.Name
	fournisseur.Adress = updateData.Adress
	fournisseur.Email = updateData.Email
	fournisseur.Telephone = updateData.Telephone
	fournisseur.Signature = updateData.Signature
	fournisseur.CodeEntreprise = updateData.CodeEntreprise

	db.Save(&fournisseur)

	return c.JSON(
		fiber.Map{
			"status":  "success",
			"message": "fournisseur updated success",
			"data":    fournisseur,
		},
	)

}

// Delete data
func DeleteFournisseur(c *fiber.Ctx) error {
	uuid := c.Params("uuid")

	db := database.DB

	var fournisseur models.Fournisseur
	db.Where("uuid = ?", uuid).First(&fournisseur)
	if fournisseur.Name == "" {
		return c.Status(404).JSON(
			fiber.Map{
				"status":  "error",
				"message": "No fournisseur name found",
				"data":    nil,
			},
		)
	}

	db.Delete(&fournisseur)

	return c.JSON(
		fiber.Map{
			"status":  "success",
			"message": "fournisseur deleted success",
			"data":    nil,
		},
	)
}

func UploadCsvDataFournisseur(c *fiber.Ctx) error {
	db := database.DB

	type UploadCSV struct {
		Data           []models.Fournisseur `json:"data"`
		CodeEntreprise uint64               `json:"code_entreprise"`
		Signature      string               `json:"signature"`
	}

	var dataUpload UploadCSV
	if err := json.Unmarshal(c.Body(), &dataUpload); err != nil {
		return c.Status(fiber.StatusBadRequest).SendString(err.Error())
	}

	var f models.Fournisseur

	for _, fournisseur := range dataUpload.Data {
		f = models.Fournisseur{
			Name:           fournisseur.Name,
			Telephone:      fournisseur.Telephone,
			Email:          fournisseur.Email,
			Adress:         fournisseur.Adress,
			TypeFourniture: fournisseur.TypeFourniture,
			Signature:      dataUpload.Signature,
			CodeEntreprise: dataUpload.CodeEntreprise,
		}
		if f.Name == "" {
			continue
		}
		f.UUID = uuid.New().String()
		db.Create(&f)
	}

	fmt.Println("clients uploaded success")

	return c.JSON(
		fiber.Map{
			"status":  "success",
			"message": "clients uploaded success",
			// "data":    dataUpload,
		},
	)
}

func GetDataUpload(data map[string]interface{}) ([]string, error) {
	var dataList []string

	dataStr, err := json.Marshal(data)
	if err != nil {
		return nil, err
	}
	dataList = append(dataList, string(dataStr))

	return dataList, nil
}
