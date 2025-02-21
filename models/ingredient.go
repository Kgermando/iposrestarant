package models

import (
	"github.com/google/uuid"
	"gorm.io/gorm"
)

type Ingredient struct {
	ID string `gorm:"type:text;primaryKey" json:"id"`
	gorm.Model

	Name           string        `gorm:"not null" json:"name"`
	Description    string        `json:"description"`
	Unite          string        `gorm:"not null" json:"unite"`
	PosID          string          `json:"pos_id"`
	Pos            Pos           `gorm:"foreignKey:PosID"`
	Signature      string        `json:"signature"`
	CodeEntreprise uint64        `json:"code_entreprise"`
	Compositions   []Composition `gorm:"foreignKey:IngredientID"`
}

func (ingredient *Ingredient) BeforeCreate(tx *gorm.DB) (err error) {
	ingredient.ID = uuid.New().String()
	return
}
