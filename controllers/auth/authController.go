package auth

import (
	"iposrestaurant/database"
	"iposrestaurant/models"
	"iposrestaurant/utils"
	"os"
	"strconv"
	"strings"
	"time"

	"github.com/gofiber/fiber/v2"
	"github.com/google/uuid"
)

var SECRET_KEY string = os.Getenv("SECRET_KEY")

func Register(c *fiber.Ctx) error {
	db := database.PGDB

	nu := new(models.User)

	if err := c.BodyParser(&nu); err != nil {
		c.Status(400)
		return c.JSON(fiber.Map{
			"message": err.Error(),
		})
	}

	if nu.Password != nu.PasswordConfirm {
		c.Status(400)
		return c.JSON(fiber.Map{
			"message": "passwords do not match",
		})
	}

	nu.UUID = uuid.New().String()

	u := &models.User{
		UUID:           nu.UUID,
		Fullname:       nu.Fullname,
		Email:          nu.Email,
		Telephone:      nu.Telephone,
		Role:           nu.Role,
		Permission:     nu.Permission,
		Status:         nu.Status, 
		EntrepriseUUID: nu.EntrepriseUUID,
		Signature:      nu.Signature,
	}

	u.SetPassword(nu.Password)

	if err := utils.ValidateStruct(*u); err != nil {
		c.Status(400)
		return c.JSON(err)
	}

	if err := db.Create(u).Error; err != nil {
		c.Status(500)
		sm := strings.Split(err.Error(), ":")
		m := strings.TrimSpace(sm[1])

		return c.JSON(fiber.Map{
			"message": m,
		})
	}

	return c.JSON(fiber.Map{
		"message": "user account created",
	})
}

func Login(c *fiber.Ctx) error {

	lu := new(models.Login)

	if err := c.BodyParser(&lu); err != nil {
		c.Status(400)
		return c.JSON(fiber.Map{
			"message": err.Error(),
		})
	}

	if err := utils.ValidateStruct(*lu); err != nil {
		c.Status(400)
		return c.JSON(err)
	}

	u := &models.User{}

	database.DB.Where("email = ?", lu.Email).Preload("Entreprise").First(&u)

	if u.UUID == "00000000-0000-0000-0000-000000000000" {
		c.Status(404)
		return c.JSON(fiber.Map{
			"message": "Invalid email 😰",
		})
	}

	if err := u.ComparePassword(lu.Password); err != nil {
		c.Status(400)
		return c.JSON(fiber.Map{
			"message": "Mot de passe incorrect! 😰",
		})
	}

	if !u.Entreprise.Status {
		c.Status(400)
		return c.JSON(fiber.Map{
			"message": "Structure non autorisée 😰",
		})
	}

	if !u.Status {
		c.Status(400)
		return c.JSON(fiber.Map{
			"message": "Vous n'êtes pas autorisé de se connecter 😰",
		})
	}

	// token, err := utils.GenerateJwt(strconv.Itoa(int(u.ID)))
	// if err != nil {
	// 	return c.SendStatus(fiber.StatusInternalServerError)
	// }

	// cookie := fiber.Cookie{
	// 	Name:     "token",
	// 	Value:    token,
	// 	Expires:  time.Now().Add(time.Hour * 24), // 1 day,
	// 	Secure:   true,
	// 	HTTPOnly: true,
	// 	SameSite: "none",
	// 	Domain:   "localhost", // ".railway.app",
	// 	Path:     "/",
	// }

	// c.Cookie(&cookie)

	return c.JSON(fiber.Map{
		"message": "success",
		// "token":   token,
		"data": u,
	})
}

func AuthUser(c *fiber.Ctx) error {

	// cookie := c.Cookies("token")

	// userId, _ := utils.VerifyJwt(cookie)

	useruuId := c.Query("user_uuid")

	u := models.User{}

	database.DB.Where("uuid = ?", useruuId).Preload("Entreprise").Preload("Pos").First(&u)

	r := &models.UserResponse{
		Id:         u.ID,
		UUID:       u.UUID,
		Fullname:   u.Fullname,
		Email:      u.Email,
		Telephone:  u.Telephone,
		Role:       u.Role,
		Permission: u.Permission,
		Status:     u.Status, 
		Entreprise: u.Entreprise,
		Pos:        u.Pos,
		CreatedAt:  u.CreatedAt,
		UpdatedAt:  u.UpdatedAt,
	}

	return c.JSON(r)
}

func Logout(c *fiber.Ctx) error {
	cookie := fiber.Cookie{
		Name:     "token",
		Value:    "",
		Expires:  time.Now().Add(-time.Hour), // 1 day ,
		HTTPOnly: true,
	}
	c.Cookie(&cookie)

	return c.JSON(fiber.Map{
		"message": "success",
		"Logout":  "success",
	})
}

// User bioprofile
func UpdateInfo(c *fiber.Ctx) error {
	type UpdateDataInput struct {
		Fullname  string `json:"fullname"`
		Signature string `json:"signature"`
	}
	var updateData UpdateDataInput

	if err := c.BodyParser(&updateData); err != nil {
		return c.Status(500).JSON(fiber.Map{
			"status":  "error",
			"message": "Review your input",
			"errors":  err.Error(),
		})
	}

	cookie := c.Cookies("token")
	uuid, _ := utils.VerifyJwt(cookie)

	useruuid, _ := strconv.Atoi(uuid)

	user := new(models.User)

	db := database.DB

	db.First(&user, useruuid)
	db.Where("uuid = ?", useruuid).First(&user)
	user.Fullname = updateData.Fullname
	user.Signature = updateData.Signature

	db.Save(&user)

	return c.JSON(fiber.Map{
		"status":  "success",
		"message": "User successfully updated",
		"data":    user,
	})

}

func ChangePassword(c *fiber.Ctx) error {
	type UpdateDataInput struct {
		OldPassword     string `json:"old_password"`
		Password        string `json:"password"`
		PasswordConfirm string `json:"password_confirm"`
	}
	var updateData UpdateDataInput

	if err := c.BodyParser(&updateData); err != nil {
		return c.Status(500).JSON(fiber.Map{
			"status":  "error",
			"message": "Review your input",
			"errors":  err.Error(),
		})
	}

	cookie := c.Cookies("token")

	userId, _ := utils.VerifyJwt(cookie)

	user := new(models.User)

	database.DB.Where("id = ?", userId).First(&user)

	if err := user.ComparePassword(updateData.OldPassword); err != nil {
		c.Status(400)
		return c.JSON(fiber.Map{
			"message": "votre mot de passe n'est pas correct! 😰",
		})
	}

	if updateData.Password != updateData.PasswordConfirm {
		c.Status(400)
		return c.JSON(fiber.Map{
			"message": "passwords do not match",
		})
	}

	p, err := utils.HashPassword(updateData.Password)
	if err != nil {
		return err
	}

	db := database.DB
 
	db.Where("uuid = ?", user.UUID).First(&user)
	user.Password = p 

	db.Save(&user)

	// successful update remove cookies
	rmCookie := fiber.Cookie{
		Name:     "token",
		Value:    "",
		Expires:  time.Now().Add(-time.Hour), //1 day ,
		HTTPOnly: true,
	}
	c.Cookie(&rmCookie)

	return c.JSON(user)

}
