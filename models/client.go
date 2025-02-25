package models

import (
	"gorm.io/gorm"
)

type Client struct {
	gorm.Model

	UUID           string `gorm:"not null;unique" json:"uuid"`
	Fullname       string `gorm:"not null" json:"fullname"`
	Email          string `gorm:"unique; not null" json:"email"`
	Telephone      string `gorm:"unique; not null" json:"telephone"`
	Telephone2     string `json:"telephone2"`
	Adress         string `json:"adress"`
	Organisation   string `json:"organisation"`
	WebSite        string `json:"website"`
	Signature      string `json:"signature"`
	CodeEntreprise uint64 `json:"code_entreprise"`
}
