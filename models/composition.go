package models

import (
	"github.com/google/uuid"
	"gorm.io/gorm"
)

type Composition struct {
	ID string `gorm:"type:text;primaryKey" json:"id"`
	gorm.Model

	PlatID         string     `json:"plat_id"`
	Plat           Plat       `gorm:"foreignKey:PlatID"`
	IngredientID   string     `json:"ingredient_id"`
	Ingredient     Ingredient `gorm:"foreignKey:IngredientID"`
	Quantity       uint64     `gorm:"not null" json:"quantity"`
	CodeEntreprise uint64     `json:"code_entreprise"`
}

func (composition *Composition) BeforeCreate(tx *gorm.DB) (err error) {
	composition.ID = uuid.New().String()
	return
}
