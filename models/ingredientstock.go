package models

import (
	"time"

	"gorm.io/gorm"
)

type IngredientStock struct {
	gorm.Model

	UUID            string      `gorm:"type:uuid;not null;unique" json:"uuid"`
	PosUUID         string      `json:"pos_uuid"`
	Pos             Pos         `gorm:"foreignKey:PosUUID;references:UUID"`
	IngredientUUID  string      `json:"ingredient_uuid"`
	Ingredient      Product     `gorm:"foreignKey:IngredientUUID;references:UUID"`
	Description     string      `json:"description"`
	Quantity        uint64      `gorm:"not null" json:"quantity"`
	FournisseurUUID string      `json:"fournisseur_uuid"`
	Fournisseur     Fournisseur `gorm:"foreignKey:FournisseurUUID;references:UUID"`
	PrixAchat       float64     `gorm:"not null" json:"prix_achat"`
	DateExpiration  time.Time   `gorm:"not null" json:"date_expiration"`
	Signature       string      `json:"signature"`
	CodeEntreprise  uint64      `json:"code_entreprise"`
}

type IngredientUsage struct {
	UUID           string  `gorm:"column:uuid"`
	PlatUUID       string  `gorm:"column:plat_uuid"`
	IngredientName string  `gorm:"column:name"`
	Qty            float64 `gorm:"column:qty"`
	Unite          string  `gorm:"column:unite"`
	Price          float64 `gorm:"column:price"`
}
