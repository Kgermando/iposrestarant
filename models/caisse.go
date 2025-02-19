package models

import (
	"github.com/google/uuid"
	"gorm.io/gorm"
)

type Caisse struct {
	gorm.Model

	Uuid uuid.UUID `gorm:"type:uuid;default:uuid_generate_v4()" json:"uuid"`
	Name           string       `gorm:"not null" json:"name"` // Nom de la caisse
	Signature      string       `json:"signature"`            // Signature de la transaction
	PosID          uint         `json:"pos_id"`               // ID du point de vente
	Pos            Pos          `gorm:"foreignKey:PosID"`     // Point de vente
	CodeEntreprise uint64       `json:"code_entreprise"`      // ID de l'entreprise
	Caisseitems    []CaisseItem `gorm:"foreignKey:CaisseID"`
}

type CaisseDashboard struct {
	ID           uint    `json:"id"`
	Name         string  `json:"name"`
	TotalEntrees float64 `json:"total_entrees"`
	TotalSorties float64 `json:"total_sorties"`
	Solde        float64 `json:"solde"`
}
