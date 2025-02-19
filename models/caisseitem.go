package models

import (
	"github.com/google/uuid"
	"gorm.io/gorm"
)

type CaisseItem struct {
	gorm.Model

	CaisseUUID     uuid.UUID `json:"caisse_uuid"`
	Caisse         Caisse    `gorm:"foreignKey:CaisseUUID"`
	TypeTransaction string   `gorm:"not null" json:"type_transaction"` // Entrée ou Sortie
	Montant         float64  `gorm:"not null" json:"montant"`          // Montant de la transaction
	Libelle         string   `json:"libelle"`                          // Description de la transaction
	Reference       string   `json:"reference"`                        // Nombre aleatoire
	Signature       string   `json:"signature"`                        // Signature de la transaction
	CodeEntreprise  uint64   `json:"code_entreprise"`                  // ID de l'entreprise
}


