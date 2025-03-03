package models

import (
	"time"

	"gorm.io/gorm"
)

type TableBox struct {
	gorm.Model

	UUID           string     `gorm:"not null;unique" json:"uuid"`
	PosUUID        string     `json:"pos_uuid"`
	Pos            Pos        `gorm:"foreignKey:PosUUID;references:UUID"`
	Name           string     `gorm:"not null" json:"name"`
	Numero         int        `gorm:"not null" json:"numero"`
	Status         string     `json:"status"` // Ouverte et Fermée
	Reservation    time.Time  `json:"reservation"`
	Signature      string     `json:"signature"`
	CodeEntreprise uint64     `json:"code_entreprise"`
	Commandes      []Commande `gorm:"foreignKey:TableBoxUUID;references:UUID"`
}
