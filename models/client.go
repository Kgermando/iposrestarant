package models

import (
	"github.com/google/uuid"
	"gorm.io/gorm"
)

type Client struct {
	ID string `gorm:"type:text;primaryKey" json:"id"`
	gorm.Model

	Fullname       string `gorm:"not null" json:"fullname"`
	Email          string `gorm:"unique; not null" json:"email"`
	Telephone      string `gorm:"unique; not null" json:"telephone"`
	Adresse        string `json:"adresse"`
	CodeEntreprise uint64 `json:"code_entreprise"`
}

func (client *Client) BeforeCreate(tx *gorm.DB) (err error) {
	client.ID = uuid.New().String()
	return
}
