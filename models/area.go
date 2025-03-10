package models

import (
	"gorm.io/gorm"
)

type Area struct {
	gorm.Model

	UUID           string      `gorm:"not null;unique" json:"uuid"`
	Name           string      `gorm:"not null" json:"name"`
	Province       string      `gorm:"not null" json:"province"`
	Signature      string      `json:"signature"`
	CodeEntreprise uint64      `json:"code_entreprise"`
	Livraisons     []Livraison `gorm:"foreignKey:AreaUUID;references:UUID"`
}

type AreaCount struct {
	AreaName string `json:"area_name"`
	Count    int64  `json:"count"`
}
