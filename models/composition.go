package models

import (
	"gorm.io/gorm"
)

type Composition struct {
	gorm.Model

	UUID           string     `gorm:"type:uuid;not null;unique" json:"uuid"`
	PlatUUID       string     `json:"plat_uuid"`
	Plat           Plat       `gorm:"foreignKey:PlatUUID;references:UUID"`
	IngredientUUID string     `json:"ingredient_uuid"`
	Ingredient     Ingredient `gorm:"foreignKey:IngredientUUID;references:UUID"`
	Quantity       uint64     `gorm:"not null" json:"quantity"`
	Signature      string     `json:"signature"`
	CodeEntreprise uint64     `json:"code_entreprise"`
}
