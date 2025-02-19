package models

import (
	"time"

	"github.com/google/uuid"
	"gorm.io/gorm"
)

type Stock struct {
	gorm.Model

	PosID          uint        `json:"pos_id"`
	Pos            Pos         `gorm:"foreignKey:PosID"`
	ProductID      uint        `json:"product_id"`                             // Added foreign key for Product ID
	ProductUuid    uuid.UUID   `json:"product_uuid"`                           // Added foreign key for Product Uuid
	Product        Product     `gorm:"foreignKey:ProductUuid;references:Uuid"` // Updated foreign key reference
	Description    string      `json:"description"`
	Quantity       uint64      `gorm:"not null" json:"quantity"`
	FournisseurID  uint        `json:"fournisseur_id"`
	Fournisseur    Fournisseur `gorm:"foreignKey:FournisseurID"`
	PrixAchat      float64     `gorm:"not null" json:"prix_achat"`
	DateExpiration time.Time   `gorm:"not null" json:"date_expiration"`
	Signature      string      `json:"signature"`
	CodeEntreprise uint64      `json:"code_entreprise"`
}

type FournisseurStock struct {
	Name           string  `json:"name"`
	Telephone      string  `json:"telephone"`
	TypeFourniture string  `json:"type_fourniture"`
	TotalValue     float64 `json:"total_value"`
}
