package models

import (
	"gorm.io/gorm"
)

type Fournisseur struct {
	gorm.Model

	UUID           string  `gorm:"not null;unique" json:"uuid"`
	Name           string  `gorm:"not null" json:"name"`
	Telephone      string  `json:"telephone"`
	Email          string  `json:"email"`
	Adresse        string  `json:"adresse"`
	TypeFourniture string  `json:"type_fourniture"`
	Signature      string  `json:"signature"`
	CodeEntreprise uint64  `json:"code_entreprise"`
	Stocks         []Stock `gorm:"foreignKey:FournisseurUUID;references:UUID"`
}
