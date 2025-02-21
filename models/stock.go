package models

import (
	"time"

	"github.com/google/uuid"
	"gorm.io/gorm"
)

type Stock struct {
	ID string `gorm:"type:text;primaryKey" json:"id"`
	gorm.Model

	PosID          string        `json:"pos_id"`
	Pos            Pos         `gorm:"foreignKey:PosID"`
	ProductID      string        `json:"product_id"`                             // Added foreign key for Product ID
	ProductUUID    string      `json:"product_uuid"`                           // Added foreign key for Product Uuid
	Product        Product     `gorm:"foreignKey:ProductUuid;references:Uuid"` // Updated foreign key reference
	Description    string      `json:"description"`
	Quantity       uint64      `gorm:"not null" json:"quantity"`
	FournisseurID  string        `json:"fournisseur_id"`
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

func (stock *Stock) BeforeCreate(tx *gorm.DB) (err error) {
	stock.ID = uuid.New().String()
	return
}
