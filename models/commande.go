package models

import (
	"gorm.io/gorm"
)

type Commande struct {
	gorm.Model

	UUID           string         `gorm:"not null;unique" json:"uuid"`
	Reference      string         `gorm:"not null" json:"reference"`
	Ncommande      uint64         `json:"ncommande"` // Number Random
	Status         string         `gorm:"not null" json:"status"`
	ClientUUID     string         `json:"client_uuid"`
	Client         Client         `gorm:"foreignKey:ClientUUID;references:UUID"`
	PosUUID        string         `json:"pos_uuid"`
	Pos            Pos            `gorm:"foreignKey:PosUUID;references:UUID"`
	Signature      string         `json:"signature"`
	CodeEntreprise uint64         `json:"code_entreprise"`
	CommandeLines  []CommandeLine `gorm:"foreignKey:CommandeUUID;references:UUID"`
}
