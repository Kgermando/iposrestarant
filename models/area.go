package models

import (
	"github.com/google/uuid"
	"gorm.io/gorm"
)

type Area struct {
	ID string `gorm:"type:text;primaryKey" json:"id"`
	gorm.Model

	Name           string      `gorm:"not null" json:"name"`
	Province       string      `gorm:"not null" json:"province"`
	Signature      string      `json:"signature"`
	CodeEntreprise uint64      `json:"code_entreprise"`
	Livraisons     []Livraison `gorm:"foreignKey:AreaID"`
}

func (area *Area) BeforeCreate(tx *gorm.DB) (err error) {
	area.ID = uuid.New().String()
	return
}

type AreaCount struct {
	AreaName string `json:"area_name"`
	Count    int64  `json:"count"`
}
