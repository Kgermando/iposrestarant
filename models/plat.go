package models

import (
	"github.com/google/uuid"
	"gorm.io/gorm"
)

type Plat struct {
	ID string `gorm:"type:text;primaryKey" json:"id"`
	gorm.Model

	Reference      string         `gorm:"not null" json:"reference"`
	Name           string         `gorm:"not null" json:"name"`
	Description    string         `gorm:"not null" json:"description"`
	UniteVente     string         `json:"unite_vente"`
	PrixVente      float64        `gorm:"not null" json:"prix_vente"`
	Tva            float64        `gorm:"default:0" json:"tva"`
	Signature      string         `json:"signature"`
	PosID          string         `json:"pos_id"`
	Pos            Pos            `gorm:"foreignKey:PosID"`
	CodeEntreprise uint64         `json:"code_entreprise"`
	CommadeLines   []CommandeLine `gorm:"foreignKey:PlatUuid"`
	Compositions   []Composition  `gorm:"foreignKey:PlatUuid"`
}

func (plat *Plat) BeforeCreate(tx *gorm.DB) (err error) {
	plat.ID = uuid.New().String()
	return
}
