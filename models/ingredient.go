package models

import (
	"gorm.io/gorm"
)

type Ingredient struct {
	gorm.Model

	UUID           string        `gorm:"not null;unique" json:"uuid"`
	Name           string        `gorm:"not null" json:"name"`
	Description    string        `json:"description"`
	Unite          string        `gorm:"not null" json:"unite"`
	PosUUID        string        `json:"pos_uuid"`
	Pos            Pos           `gorm:"foreignKey:PosUUID;references:UUID"`
	Signature      string        `json:"signature"`
	CodeEntreprise uint64        `json:"code_entreprise"`
	Compositions   []Composition `gorm:"foreignKey:IngredientUUID;references:UUID"`
}
