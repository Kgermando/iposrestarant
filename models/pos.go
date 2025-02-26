package models

import (
	"gorm.io/gorm"
)

type Pos struct {
	gorm.Model

	UUID           string     `gorm:"type:uuid;not null;unique" json:"uuid"`
	EntrepriseUUID string     `json:"entreprise_uuid"`
	Entreprise     Entreprise `gorm:"foreignKey:EntrepriseUUID;references:UUID"`
	Name           string     `gorm:"not null" json:"name"`
	Adresse        string     `json:"adresse"`
	Email          string     `json:"email"`
	Telephone      string     `json:"telephone"`
	Manager        string     `gorm:"not null" json:"manager"`
	Status         bool       `gorm:"not null" json:"status"` // Actif ou Inactif
	Signature      string     `json:"signature"`
	Stocks         []Stock    `gorm:"foreignKey:PosUUID;references:UUID" json:"stocks"`
	Commandes      []Commande `gorm:"foreignKey:PosUUID;references:UUID" json:"commandes"`
}
