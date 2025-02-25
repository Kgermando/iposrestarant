package users

import (
	"fmt"
	"iposrestaurant/database"
	"iposrestaurant/models"
	"iposrestaurant/utils"
	"strconv"
	"strings"

	"github.com/gofiber/fiber/v2"
	"github.com/google/uuid"
)

// Paginate
func GetPaginatedUsers(c *fiber.Ctx) error {
	db := database.DB

	// Start the synchronization goroutine
	if utils.IsInternetAvailable() {
		go SyncDataWithAPISupport()
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

	var dataList []models.User

	var length int64
	db.Model(&models.User{}).Count(&length)

	db.
		Where("fullname LIKE ? OR role LIKE ?", "%"+search+"%", "%"+search+"%").
		Offset(offset).
		Limit(limit).
		Order("updated_at DESC").
		Preload("Entreprise").
		Preload("Pos").
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
		"message":    "All users",
		"data":       dataList,
		"pagination": pagination,
	})
}

// Query all data ID
func GetPaginatedUserByID(c *fiber.Ctx) error {
	db := database.DB
	EntrepriseUUID := c.Params("entreprise_uuid")

	// Start the synchronization goroutine
	if utils.IsInternetAvailable() {
		go SyncDataWithAPI(EntrepriseUUID)
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

	var dataList []models.User

	var length int64
	db.Model(&models.User{}).Where("entreprise_uuid = ?", EntrepriseUUID).Count(&length)
	db.Where("entreprise_uuid = ?", EntrepriseUUID).
		Where("fullname LIKE ? OR role LIKE ?", "%"+search+"%", "%"+search+"%").
		Offset(offset).
		Limit(limit).
		Order("updated_at DESC").
		Preload("Entreprise").
		Preload("Pos").
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
		"message":    "All users",
		"data":       dataList,
		"pagination": pagination,
	})
}

// query all data
func GetAllUsers(c *fiber.Ctx) error {
	db := database.DB
	var users []models.User
	db.Order("updated_at DESC").
		Preload("Entreprise").
		Preload("Pos").Find(&users)
	return c.JSON(fiber.Map{
		"status":  "success",
		"message": "All users",
		"data":    users,
	})
}

// query data by entreprise ID
func GetUserByID(c *fiber.Ctx) error {
	entrepriseuuid := c.Params("uuid")
	db := database.DB
	var users []models.User
	db.Where("entreprise_uuid = ?", entrepriseuuid).Find(&users)

	return c.JSON(fiber.Map{
		"status":  "success",
		"message": "users by id found",
		"data":    users,
	})
}

// Get one data
func GetUser(c *fiber.Ctx) error {
	uuid := c.Params("uuid")
	db := database.DB
	var user models.User
	db.Find(&user, uuid)
	if user.Fullname == "" {
		return c.Status(404).JSON(
			fiber.Map{
				"status":  "error",
				"message": "No User name found",
				"data":    nil,
			},
		)
	}
	return c.JSON(
		fiber.Map{
			"status":  "success",
			"message": "User found",
			"data":    user,
		},
	)
}

// Create data
func CreateUser(c *fiber.Ctx) error {
	p := &models.User{}

	if err := c.BodyParser(&p); err != nil {
		return err
	}

	if p.Fullname == "" {
		return c.Status(404).JSON(
			fiber.Map{
				"status":  "error",
				"message": "Form not complete",
				"data":    nil,
			},
		)
	}

	if p.Password != p.PasswordConfirm {
		c.Status(400)
		return c.JSON(fiber.Map{
			"message": "passwords do not match",
		})
	}

	user := &models.User{
		Fullname:       p.Fullname,
		Email:          p.Email,
		Telephone:      p.Telephone,
		Role:           p.Role,
		Permission:     p.Permission,
		Status:         p.Status,
		Currency:       p.Currency,
		EntrepriseUUID: p.EntrepriseUUID,
		Entreprise:     p.Entreprise,
		Signature:      p.Signature,
	}

	user.SetPassword(p.Password)

	if err := utils.ValidateStruct(*user); err != nil {
		c.Status(400)
		return c.JSON(err)
	}

	user.UUID = uuid.New().String()

	if err := database.DB.Create(user).Error; err != nil {
		c.Status(500)
		sm := strings.Split(err.Error(), ":")
		m := strings.TrimSpace(sm[1])

		return c.JSON(fiber.Map{
			"message": m,
		})
	}

	// database.DB.Create(user)

	return c.JSON(
		fiber.Map{
			"status":  "success",
			"message": "User Created success",
			"data":    user,
		},
	)
}

// Update data
func UpdateUser(c *fiber.Ctx) error {
	uuid := c.Params("uuid")
	db := database.DB

	type UpdateDataInput struct {
		Fullname       string `json:"fullname"`
		Email          string `json:"email"`
		Telephone      string `json:"telephone"`
		Role           string `json:"role"`
		Permission     string `json:"permission"`
		Status         bool   `json:"status"`
		Currency       string `json:"currency"`
		EntrepriseUUID string `json:"entreprise_uuid"`
		PosUUID        string `json:"pos_uuid"`
		Signature      string `json:"signature"`
	}
	var updateData UpdateDataInput

	if err := c.BodyParser(&updateData); err != nil {
		return c.Status(500).JSON(
			fiber.Map{
				"status":  "error",
				"message": "Review your input",
				"data":    nil,
			},
		)
	}

	user := new(models.User)

	db.First(&user, uuid)
	user.Fullname = updateData.Fullname
	user.Email = updateData.Email
	user.Telephone = updateData.Telephone
	user.Role = updateData.Role
	user.Permission = updateData.Permission
	user.Status = updateData.Status
	user.Currency = updateData.Currency
	user.EntrepriseUUID = updateData.EntrepriseUUID
	user.PosUUID = updateData.PosUUID
	user.Signature = updateData.Signature

	db.Save(&user)

	return c.JSON(
		fiber.Map{
			"status":  "success",
			"message": "User updated success",
			"data":    user,
		},
	)

}

// Delete data
func DeleteUser(c *fiber.Ctx) error {
	uuid := c.Params("uuid")

	db := database.DB

	var User models.User
	db.First(&User, uuid)
	if User.Fullname == "" {
		return c.Status(404).JSON(
			fiber.Map{
				"status":  "error",
				"message": "No User name found",
				"data":    nil,
			},
		)
	}

	db.Delete(&User)

	return c.JSON(
		fiber.Map{
			"status":  "success",
			"message": "User deleted success",
			"data":    nil,
		},
	)
}
