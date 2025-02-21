package models

import (
	"time"

	"github.com/google/uuid"
	"gorm.io/gorm"
)

type IngredientStock struct {
	ID string `gorm:"type:text;primaryKey" json:"id"`

	gorm.Model

	PosID          string        `json:"pos_id"`
	Pos            Pos         `gorm:"foreignKey:PosID"`
	IngredientUuid uuid.UUID   `json:"ingredient_uuid"` // Added foreign key for Product Uuid
	Ingredient     Product     `gorm:"foreignKey:IngredientUuid;references:Uuid"`
	Description    string      `json:"description"`
	Quantity       uint64      `gorm:"not null" json:"quantity"`
	FournisseurID  string        `json:"fournisseur_id"`
	Fournisseur    Fournisseur `gorm:"foreignKey:FournisseurID"`
	PrixAchat      float64     `gorm:"not null" json:"prix_achat"`
	DateExpiration time.Time   `gorm:"not null" json:"date_expiration"`
	Signature      string      `json:"signature"`
	CodeEntreprise uint64      `json:"code_entreprise"`
}

type IngredientUsage struct {
	Id             string    `gorm:"column:id"`
	PlatID         string    `gorm:"column:plat_id"`
	IngredientName string  `gorm:"column:name"`
	Qty            float64 `gorm:"column:qty"`
	Unite          string  `gorm:"column:unite"`
	Price          float64 `gorm:"column:price"`
}

func (ingredientStock *IngredientStock) BeforeCreate(tx *gorm.DB) (err error) {
	ingredientStock.ID = uuid.New().String()
	return
}