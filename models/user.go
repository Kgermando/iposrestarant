package models

import (
	"time"

	"golang.org/x/crypto/bcrypt"
	"gorm.io/gorm"
)

type User struct {
	// ID        uuid.UUID `gorm:"primaryKey;default:uuid_generate_v4()"`

	gorm.Model

	UUID            string     `gorm:"not null;unique" json:"uuid"`
	Fullname        string     `gorm:"not null" json:"fullname"`
	Email           string     `gorm:"unique; not null" json:"email"`
	Telephone       string     `gorm:"unique; not null" json:"telephone"`
	Password        string     `json:"password" validate:"required"`
	PasswordConfirm string     `json:"password_confirm" gorm:"-"`
	Role            string     `json:"role" gorm:"default:'user'"`
	Permission      string     `json:"permission" gorm:"default:'read'"`
	Status          bool       `json:"status" gorm:"default:true"`
	Currency        string     `json:"currency" gorm:"default:'USD'"`
	EntrepriseUUID  string     `json:"entreprise_uuid"`
	Entreprise      Entreprise `gorm:"foreignKey:EntrepriseUUID;references:UUID"`
	PosUUID         string     `json:"pos_uuid"`
	Pos             Pos        `gorm:"foreignKey:PosUUID;references:UUID"`
	Signature       string     `json:"signature"`
	Code            string     `json:"code" gorm:"-"`
	Name            string     `json:"name" gorm:"-"`
}

type UserResponse struct {
	Id         uint       `json:"id,omitempty"`
	UUID       string     `json:"uuid,omitempty"`
	Fullname   string     `json:"fullname"`
	Email      string     `json:"email"`
	Telephone  string     `json:"telephone"`
	Role       string     `json:"role"`
	Permission string     `json:"permission"`
	Status     bool       `json:"status"`
	Currency   string     `json:"currency"`
	Entreprise Entreprise `json:"entreprise"`
	Pos        Pos        `json:"pos"`
	Signature  string     `json:"signature"`
	CreatedAt  time.Time  `json:"created_at"`
	UpdatedAt  time.Time  `json:"updated_at"`
}

type Login struct {
	Email string `json:"email" validate:"required,email"`
	// Telephone string `json:"telephone" validate:"required,telephone"`
	Password string `json:"password" validate:"required"`
}

func (u *User) SetPassword(p string) {
	hp, _ := bcrypt.GenerateFromPassword([]byte(p), 14)
	u.Password = string(hp)
}

func (u *User) ComparePassword(p string) error {
	err := bcrypt.CompareHashAndPassword([]byte(u.Password), []byte(p))
	return err
}

// func (user *User) BeforeCreate(tx *gorm.DB) (err error) {
// 	user.ID = uuid.New().String()
// 	return
// }
