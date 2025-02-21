package models

import (
	"github.com/google/uuid"
	"gorm.io/gorm"
)

type CommandeLine struct {
	ID string `gorm:"type:text;primaryKey" json:"id"`
	gorm.Model

	CommandeID     string    `json:"commande_id"`
	Commande       Commande  `gorm:"foreignKey:CommandeID"`
	LivraisonID    string    `json:"livraison_id"` // LivraisonID est identique a commande dans le fonctionnement
	Livraison      Livraison `gorm:"foreignKey:LivraisonID"`
	ProductID      string    `json:"product_id"`           // Added foreign key for Product ID
	Product        Product   `gorm:"foreignKey:ProductID"` // Updated foreign key reference
	PlatID         string    `json:"plat_id"`              // Added foreign key for Plat ID
	Plat           Plat      `gorm:"foreignKey:PlatID"`    // Updated foreign key reference
	Quantity       uint64    `gorm:"not null" json:"quantity"`
	CodeEntreprise uint64    `json:"code_entreprise"`
}

func (commandeLine *CommandeLine) BeforeCreate(tx *gorm.DB) (err error) {
	commandeLine.ID = uuid.New().String()
	return
}
