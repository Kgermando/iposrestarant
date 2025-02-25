package models

import (
	"gorm.io/gorm"
)

type Product struct {
	gorm.Model

	UUID           string         `gorm:"not null;unique" json:"uuid"`
	Reference      string         `gorm:"not null" json:"reference"`
	Name           string         `gorm:"not null" json:"name"`
	Description    string         `gorm:"not null" json:"description"`
	UniteVente     string         `json:"unite_vente"`
	PrixVente      float64        `gorm:"not null" json:"prix_vente"`
	Tva            float64        `gorm:"default:0" json:"tva"`
	Signature      string         `json:"signature"`
	PosUUID        string         `json:"pos_uuid"`
	Pos            Pos            `gorm:"foreignKey:PosUUID;references:UUID"`
	CodeEntreprise uint64         `json:"code_entreprise"`
	Stocks         []Stock        `gorm:"foreignKey:ProductUUID;references:UUID"`
	CommadeLines   []CommandeLine `gorm:"foreignKey:ProductUUID;references:UUID"`
}
