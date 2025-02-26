package models

import (
	"gorm.io/gorm"
)

type Caisse struct {
	gorm.Model

	UUID           string       `gorm:"type:uuid;not null;unique" json:"uuid"`
	Name           string       `gorm:"not null" json:"name"`                  // Nom de la caisse
	Signature      string       `json:"signature"`                             // Signature de la transaction
	PosUUID        string       `json:"pos_uuid"`                              // ID du point de vente
	Pos            Pos          `gorm:"foreignKey:PosUUID;references:UUID"`    // Point de vente
	CodeEntreprise uint64       `json:"code_entreprise"`                       // ID de l'entreprise
	Caisseitems    []CaisseItem `gorm:"foreignKey:CaisseUUID;references:UUID"` // Liste des transactions
}

type CaisseDashboard struct {
	ID           uint    `json:"id"`
	UUID         string  `json:"uuid"`
	Name         string  `json:"name"`
	TotalEntrees float64 `json:"total_entrees"`
	TotalSorties float64 `json:"total_sorties"`
	Solde        float64 `json:"solde"`
}
