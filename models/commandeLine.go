package models

import (
	"github.com/google/uuid"
	"gorm.io/gorm"
)

type CommandeLine struct {
	gorm.Model

	CommandeID  uint      `json:"commande_id"`
	Commande    Commande  `gorm:"foreignKey:CommandeID"`
	LivraisonID uint      `json:"livraison_id"` // LivraisonID est identique a commande dans le fonctionnement
	Livraison   Livraison `gorm:"foreignKey:LivraisonID"`

	ProductID      uint      `json:"product_id"`                             // Added foreign key for Product ID
	ProductUuid    uuid.UUID `json:"product_uuid"`                           // Added foreign key for Product Uuid
	Product        Product   `gorm:"foreignKey:ProductUuid;references:Uuid"` // Updated foreign key reference
	PlatID         uint      `json:"plat_id"`                                // Added foreign key for Plat ID
	PlatUuid       uuid.UUID `json:"plat_uuid"`                              // Added foreign key for Plat Uuid
	Plat           Plat      `gorm:"foreignKey:PlatUuid;references:Uuid"`    // Updated foreign key reference
	Quantity       uint64    `gorm:"not null" json:"quantity"`
	CodeEntreprise uint64    `json:"code_entreprise"`
}
