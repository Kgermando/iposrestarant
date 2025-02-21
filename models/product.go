package models

import (
	"github.com/google/uuid"
	"gorm.io/gorm"
)

type Product struct {
	ID string `gorm:"type:text;primaryKey" json:"id"`
	gorm.Model

	Reference      string         `gorm:"not null" json:"reference"`
	Name           string         `gorm:"not null" json:"name"`
	Description    string         `gorm:"not null" json:"description"`
	UniteVente     string         `json:"unite_vente"`
	PrixVente      float64        `gorm:"not null" json:"prix_vente"`
	Tva            float64        `gorm:"default:0" json:"tva"`
	Signature      string         `json:"signature"`
	PosID          string           `json:"pos_id"`
	Pos            Pos            `gorm:"foreignKey:PosID"`
	CodeEntreprise uint64         `json:"code_entreprise"`
	Stocks         []Stock        `gorm:"foreignKey:ProductUuid"`
	CommadeLines   []CommandeLine `gorm:"foreignKey:ProductUuid"`
}

func (product *Product) BeforeCreate(tx *gorm.DB) (err error) {
	product.ID = uuid.New().String()
	return
}
