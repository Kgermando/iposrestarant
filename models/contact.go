package models

import (
	"github.com/google/uuid"
	"gorm.io/gorm"
)

type Contact struct {
	ID string `gorm:"type:text;primaryKey" json:"id"`

	gorm.Model

	Fullname string `gorm:"not null" json:"fullname"`
	Email    string `gorm:"not null" json:"email"`
	Subject  string `gorm:"not null" json:"subject"`
	Message  string `gorm:"not null" json:"message"`
}

func (contact *Contact) BeforeCreate(tx *gorm.DB) (err error) {
	contact.ID = uuid.New().String()
	return
}
