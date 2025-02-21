package models

import (
	"github.com/google/uuid"
	"gorm.io/gorm"
)

type Fournisseur struct {
	ID string `gorm:"type:text;primaryKey" json:"id"`
	gorm.Model

	Name           string  `gorm:"not null" json:"name"`
	Telephone      string  `json:"telephone"`
	Email          string  `json:"email"`
	Adresse        string  `json:"adresse"`
	TypeFourniture string  `json:"type_fourniture"`
	Signature      string  `json:"signature"`
	CodeEntreprise uint64  `json:"code_entreprise"`
	Stocks         []Stock `gorm:"foreignKey:FournisseurID"`
}

func (fournisseur *Fournisseur) BeforeCreate(tx *gorm.DB) (err error) {
	fournisseur.ID = uuid.New().String()
	return
}
