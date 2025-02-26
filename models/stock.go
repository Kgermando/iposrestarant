package models

import (
	"time"

	"gorm.io/gorm"
)

type Stock struct {
	gorm.Model

	UUID            string      `gorm:"type:uuid;not null;unique" json:"uuid"`
	PosUUID         string      `json:"pos_uuid"`
	Pos             Pos         `gorm:"foreignKey:PosUUID"`                     // Added foreign key for Product ID
	ProductUUID     string      `json:"product_uuid"`                           // Added foreign key for Product Uuid
	Product         Product     `gorm:"foreignKey:ProductUUID;references:UUID"` // Updated foreign key reference
	Description     string      `json:"description"`
	Quantity        uint64      `gorm:"not null" json:"quantity"`
	FournisseurUUID string      `json:"fournisseur_uuid"`
	Fournisseur     Fournisseur `gorm:"foreignKey:FournisseurUUID;references:UUID"`
	PrixAchat       float64     `gorm:"not null" json:"prix_achat"`
	DateExpiration  time.Time   `gorm:"not null" json:"date_expiration"`
	Signature       string      `json:"signature"`
	CodeEntreprise  uint64      `json:"code_entreprise"`
}

type FournisseurStock struct {
	Name           string  `json:"name"`
	Telephone      string  `json:"telephone"`
	TypeFourniture string  `json:"type_fourniture"`
	TotalValue     float64 `json:"total_value"`
}
