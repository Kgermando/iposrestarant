package models

import (
	"gorm.io/gorm"
)

type BeginCaisse struct {
	gorm.Model

	UUID           string  `gorm:"not null;unique" json:"uuid"`
	CaisseUUID     string  `json:"caisse_uuid"`
	Caisse         Caisse  `gorm:"foreignKey:CaisseUUID;references:UUID"`
	Libelle        string  `gorm:"type:varchar(100);not null" json:"libelle"`
	Montant        float64 `gorm:"type:decimal(10,2);not null" json:"montant"`
	Signature      string  `gorm:"type:varchar(100);not null" json:"signature"`
	CodeEntreprise uint64  `json:"code_entreprise"`
}
