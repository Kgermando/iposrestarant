package models

import (
	"github.com/google/uuid"
	"gorm.io/gorm"
)

type TableBox struct {
	ID string `gorm:"type:text;primaryKey" json:"id"`

	gorm.Model

	PosID          string     `json:"pos_id"`
	Pos            Pos        `gorm:"foreignKey:PosID"`
	Name           string     `gorm:"not null" json:"name"`
	Numero         int        `gorm:"not null" json:"numero"`
	Status         string     `json:"status"` // Ouverte et Fermée
	Signature      string     `json:"signature"`
	CodeEntreprise uint64     `json:"code_entreprise"`
	Commandes      []Commande `gorm:"foreignKey:TableBoxID"`
}

func (tableBox *TableBox) BeforeCreate(tx *gorm.DB) (err error) {
	tableBox.ID = uuid.New().String() // Generate a new UUID for the tableBox ID
	return
}
