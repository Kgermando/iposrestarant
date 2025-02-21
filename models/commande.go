package models

import (

	"github.com/google/uuid"
	"gorm.io/gorm"
)

type Commande struct {
	ID string `gorm:"type:text;primaryKey" json:"id"`
	gorm.Model

	Reference      string         `gorm:"not null" json:"reference"`
	// Date           time.Time      `gorm:"not null" json:"date"` 
	Total          float64        `gorm:"not null" json:"total"`
	Status         string         `gorm:"not null" json:"status"`
	PosID          string           `json:"pos_id"`
	Pos            Pos            `gorm:"foreignKey:PosID"`
	CodeEntreprise uint64         `json:"code_entreprise"`
	CommandeLines  []CommandeLine `gorm:"foreignKey:CommandeID"`
}

func (commande *Commande) BeforeCreate(tx *gorm.DB) (err error) {
	commande.ID = uuid.New().String()
	return
}
