package models

import (
	"github.com/google/uuid"
	"gorm.io/gorm"
)

type CaisseItem struct {
	ID string `gorm:"type:text;primaryKey" json:"id"`
	gorm.Model

	CaisseID        string  `json:"caisse_id"`
	Caisse          Caisse  `gorm:"foreignKey:CaisseID"`
	TypeTransaction string  `gorm:"not null" json:"type_transaction"` // Entrée ou Sortie
	Montant         float64 `gorm:"not null" json:"montant"`          // Montant de la transaction
	Libelle         string  `json:"libelle"`                          // Description de la transaction
	Reference       string  `json:"reference"`                        // Nombre aleatoire
	Signature       string  `json:"signature"`                        // Signature de la transaction
	CodeEntreprise  uint64  `json:"code_entreprise"`                  // ID de l'entreprise
}

func (caisseItem *CaisseItem) BeforeCreate(tx *gorm.DB) (err error) {
	caisseItem.ID = uuid.New().String()
	return
}
