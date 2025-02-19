package models

import (
	"github.com/google/uuid"
	"gorm.io/gorm"
)

type Composition struct {
	gorm.Model

	PosID          uint       `json:"pos_id"`
	PlatID         uint       `json:"plat_id"`
	PlatUuid       uuid.UUID  `json:"plat_uuid"`                           // Added foreign key for Plat Uuid
	Plat           Plat       `gorm:"foreignKey:PlatUuid;references:Uuid"` // Updated foreign key reference
	IngredientID   uint       `json:"ingredient_id"`
	Quantity       uint64     `gorm:"not null" json:"quantity"`
	Signature      string     `json:"signature"`
	CodeEntreprise uint64     `json:"code_entreprise"`
	Ingredient     Ingredient `gorm:"foreignKey:IngredientID"`
	Pos            Pos        `gorm:"foreignKey:PosID"`
}
